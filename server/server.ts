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
  itemId: number;
  image: string;
  category: string;
};

type OutfitItems = {
  itemId: number;
  outfitId: number;
}

type Outfit = {
  outfitId: number;
  userId: number;
}

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
app.use(express.static('public'));


// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;
//I added this below
const serverPublicStaticDir = new URL('../server/public', import.meta.url).pathname;
app.use(express.static(serverPublicStaticDir));

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
    const sql = 'select * from "closet" where "userId" = $1 order by "itemId" desc;';
     const result = await db.query<User>(sql, [req.user?.userId]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/upload/closet', authMiddleware, uploadsMiddleware.single('image'), async (req, res, next) => {
  console.log('body and user:', req.file, req.body, req.user);
  try {
    if (!req.user) {
      throw new ClientError(401, 'not authenticated');
    }
    if (!req.file) {
    throw new ClientError(400, 'No file uploaded');
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

//  app.post('/api/build/outfits', authMiddleware, async (req, res, next) => {
//   console.log('body and user:', req.body, req.user);
//   try {
//     if (!req.user) {
//       throw new ClientError(401, 'not authenticated');
//     }
//     const { image, category } = req.body as Partial<Item>;
//     if (!image || !category) {
//       throw new ClientError(401, 'requires two or more items to be selected');
//     }
//     const sql = `insert into "outfits"
//     ("image", "category", "userId")
//     values ($1, $2, $3) returning *;`;
//     const params = [image, category, req.user.userId];
//     const result = await db.query<Item>(sql, params);
//     res.status(201).json(result.rows);
//   } catch (err) {
//     console.error('Error processing request:', err);
//     next(err);
//   }
// });

// app.post('/api/build/outfits', authMiddleware, async (req, res, next) => {
//   console.log('body and user:', req.body, req.user);
//  try {
//     if (!req.user) {
//       throw new ClientError(401, 'not authenticated');
//     }
//     // Ensure that req.body is an array
//     if (!Array.isArray(req.body) || req.body.length < 2) {
//       throw new ClientError(400, 'requires two or more items to be selected');
//     }
//     // Iterate over the array and insert each item into the database
//     const insertPromises = req.body.map(async (item) => {
//       const {itemId, image, category } = item as Partial<Outfit>;

//       if (!itemId || !image || !category) {
//         throw new ClientError(400, 'Each item must have image and category');
//       }
//       const sql = `insert into "outfits" ("itemId", "image", "category", "userId") values ($1, $2, $3, $4) returning *;`;
//       const params = [itemId, image, category, req.user?.userId];
//       const result = await db.query<Outfit>(sql, params);
//       return result.rows[0];
//     });
//     const insertedItems = await Promise.all(insertPromises);
//     res.status(201).json(insertedItems);
//   } catch (err) {
//     console.error('Error processing request:', err);
//     next(err);
//   }
// });

// app.post('/api/build/outfits', authMiddleware, async (req, res, next) => {
//   console.log('body and user:', req.body, req.user);
//   try {
//     if (!req.user) {
//       throw new ClientError(401, 'not authenticated');
//     }

//     // Ensure that req.body is an array
//     if (!Array.isArray(req.body) || req.body.length === 0) {
//       throw new ClientError(400, 'requires an array of items');
//     }

//     // Assuming each item in the array represents an individual outfit
//     const outfits = req.body;

//     // Validate each outfit
//     outfits.forEach((outfit) => {
//       outfit.forEach((item: Outfit) => {
//         const { image, category } = item as Partial<Outfit>;
//         if (!image || !category) {
//           throw new ClientError(400, 'Each item must have image and category');
//         }
//       });
//     });

//     // Insert each outfit item into the "outfits" table and collect the results
//     const insertedItems = [];
//     for (const outfit of outfits) {
//       const sql = `
//         INSERT INTO "outfits" ("userId", "image", "category")
//         VALUES ($1, $2, $3)
//         RETURNING *;
//       `;
//       const params = [
//         req.user.userId,
//         outfit.map((item: Outfit) => item.image).join(', '), // Concatenate images (modify as needed)
//         outfit.map((item: Outfit) => item.category).join(', '), // Concatenate categories (modify as needed)
//       ];
//       const result = await db.query<Outfit>(sql, params);
//       insertedItems.push(...result.rows);
//     }

//     res.status(201).json(insertedItems);
//   } catch (err) {
//     console.error('Error processing request:', err);
//     next(err);
//   }
// });

app.post('/api/build/outfits', authMiddleware, async (req, res, next) => {
  console.log('body and user:', req.body, req.user);
  if (!req.user) {
    throw new ClientError(401, 'not authenticated');
  }
  try {
    const { userId } = req.user;
    const sql = `insert into "outfits" ("userId") values ($1) returning "outfitId";`;
    const params = [ userId ];
    const result = await db.query<Outfit>(sql, params);
    const outfitId = result.rows[0].outfitId;
    const outfitArray = [];
    for (const item of req.body) {
      const { itemId } = item;
      const sql2 = 'insert into "outfitItems" ("itemId", "outfitId") values ($1, $2) returning *;';
      const param2 = [ itemId, outfitId ];
      await db.query<OutfitItems>(sql2, param2);
      outfitArray.push(result.rows[0]);
    }
    res.status(201).json({ outfitId, outfitItems: outfitArray });
} catch (err) {
    console.error('Error processing request:', err);
    next(err);
  }
})
// Gets back the user's saved outfits.
app.get('/api/grab/outfits', authMiddleware, async (req, res, next) => {
 if (!req.user) {
    throw new ClientError(401, 'not authenticated');
  }
  try {
    const sql = `
      SELECT "closet"."itemId", "closet"."image", "closet"."category", "outfitItems"."outfitId"
      FROM "closet"
      JOIN "outfitItems" ON "outfitItems"."itemId" = "closet"."itemId";`
    const result = await db.query<Item>(sql);
    res.status(201).json(result.rows);
    console.log('result:', res.json(result.rows));
  } catch (err) {
    next(err);
  }
})
// This will get back the current user's items used for outfits.
app.get('/api/outfitItems', authMiddleware, async (req, res, next) => {
  if (!req.user) {
    throw new ClientError(401, 'not authenticated');
  }
  try {
    const sql = 'select * from "outfitItems" order by "outfitId" desc;';
    const result = await db.query<OutfitItems>(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
})
app.get('/api/outfits', authMiddleware, async (req, res, next) => {
  try {
    const sql = 'select * from "outfits" where "userId" = $1 order by "outfitId" desc;';
    const result = await db.query<User>(sql, [req.user?.userId]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
})
// Gets back specific outfit
app.get('/api/outfitItems/:outfitId', authMiddleware, async (req, res, next) => {
  if (!req.user) {
    throw new ClientError(401, 'not authenticated');
  }
  try {
    const outfitId = Number(req.params.outfitId);
    if (!outfitId) {
      throw new ClientError(400, 'outfitId must be a positive integer');
    }
    const outfitSql = 'select * from "outfits" where "outfitId" = $1;';
    const outfitParam = [outfitId];
    const outfitResult = await db.query<OutfitItems>(outfitSql, outfitParam);
    const itemSQL = `
      SELECT "closet"."itemId", "closet"."userId", "closet"."image", "closet"."category"
      FROM "closet"
      JOIN "outfitItems" ON "outfitItems"."itemId" = "closet"."itemId"
      WHERE "outfitItems"."outfitId" = $1;`;
      const itemParam = [outfitId];
      const itemsResult = await db.query(itemSQL, itemParam);

    res.status(201).json({ outfit: outfitResult.rows, items: itemsResult.rows });
  } catch (err) {
    next(err);
  }
})

app.put('/api/update/:outfitId', authMiddleware, async (req, res) => {
   console.log('body & user:', req.body, req.user, ClientError);
  if (!req.user) {
     throw new ClientError(400, 'not authenticated');
  }
  try {
   const outfitId = Number(req.params.outfitId);
   const { toSave } = req.body;
    if (Number.isNaN(outfitId) || !Number.isInteger(outfitId) || outfitId < 1) {
      throw new ClientError(400, 'outfitId must be a positive integer');
    }
  // const sql = `UPDATE "outfitItems" SET "itemId" = $1 WHERE "outfitId" = $2 RETURNING *`;
  // const param = [req.body.itemId, outfitId];
  // const result = await db.query<OutfitItems>(sql, param);
  // const outfitArray = result.rows.map(row => ({
  //     itemId: row.itemId,
  //     outfitId: row.outfitId
  // }));
  //const { toSave } = req.body;
const outfitArray = [];
for (const item of toSave) {
    const sql = `UPDATE "outfitItems" SET "itemId" = $1 WHERE "outfitId" = $2 returning *`;
    const param = [item.itemId, outfitId];
    const result = await db.query<OutfitItems>(sql, param);
    outfitArray.push(result.rows);
}
    console.log({outfitId, outfitItems: outfitArray });
    res.status(201).json({ outfitId, outfitItems: outfitArray });
} catch (err) {
    console.error('Error processing request:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
})

// Delete an outfit.
app.delete('/api/delete/:outfitId', authMiddleware, async (req, res) => {
if (!req.user) {
  throw new ClientError(400, 'Not authenticated.');
}
 try {
  const id = Number(req.params.outfitId);
  if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
  throw new ClientError(400, 'id must be a positive integer');
  }
  const sql = `delete from "outfits" where "outfitId" = $1 returning *;`;
  const params = [id];
  await db.query(sql, params);
  const sql2 = `delete from "outfitItems" where "outfitId" = $1 returning *;`;
  await db.query(sql2, params);
  res.sendStatus(204).send('Deleted');
 } catch (err) {
  console.error(err);
  res.status(500).json({error: 'an unexpected error occurred.'});
 }
})

// app.get('/api/outfitItems', authMiddleware, async (req, res, next) => {
//   try {
//     const sql = 'select * from "outfitItems" where "userId" = $1 order by "outfitId" desc;';
//     const result = await db.query<OutfitItems>(sql, [req.user?.userId]);
//     res.status(201).json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// })

// This will get back all existing user's outfits.

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
