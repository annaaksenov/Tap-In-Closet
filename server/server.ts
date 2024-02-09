/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import argon2 from 'argon2';
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import {
  authMiddleware,
  ClientError,
  defaultMiddleware,
  errorMiddleware,
  uploadsMiddleware
} from './lib/index.js';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};

type Item = {
  imageId: number;
  image: string;
  category: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/users', async (req, res, next) => {
  try {
    const sql = `
      select * from "users";
    `;
    const result = await db.query<User>(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = 'insert into "users" ("username", "hashedPassword") values ($1, $2) returning *;';
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = 'select "userId", "hashedPassword" from "users" where "username" = $1;';
    const params = [username]
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login.');
    }
    const { userId, hashedPassword } = user;
    const isPassword = await argon2.verify(hashedPassword, password);
    if (!isPassword) {
      throw new ClientError(401, 'invalid login.');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.status(200).json({token, user: payload});
  } catch (err) {
    next(err);
  }
});

app.get('/api/closet', authMiddleware, async (req, res, next) => {
  console.log('called GET for closet', req.user);
  try {
     const sql = 'select * from "closet" where "userId" = $1  order by "itemId" desc;';
     const result = await db.query<User>(sql, [req.user?.userId]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// On image variable, I an assembling the image not destructuring it, like category.
app.post('/api/upload/closet', authMiddleware, uploadsMiddleware.single('image'), async (req, res, next) => {
  console.log('body and user:', req.file, req.body, req.user);
  try {
    if (!req.user) {
      throw new ClientError(401, 'not authenticated');
    }
    const image = `/images/${req.file?.filename}`;
    const { category } = req.body as Partial<Item>;
    if (!image || !category) {
      throw new ClientError(401, 'requires an image and a category to be selected');
    }
    const sql = 'insert into "closet" ("image", "category", "userId") values ($1, $2, $3) returning *;';
    const params = [image, category, req.user?.userId];
    const result = await db.query<Item>(sql, params);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error('Error processing request:', err);
    next(err);
  }
});

app.get('/api/outfits', authMiddleware, async (req, res, next) => {
  try {
    const sql = 'select * from "outfits" where "userId" = $1 order by "outfitId" desc;';
    const result = await db.query<User>(sql, [req.user?.userId]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
})
/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
