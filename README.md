# student-grade-table

A full-stack web application tailored for individuals seeking a stress-free dressing experience, allowing them to effortlessly access their entire wardrobe catalog and curate outfits seamlessly.

## Why I Built This

As a graduate of LearningFuze, I sought to create an application that would have been invaluable to me during my days of owning an extensive wardrobe. Keeping track of my clothing inventory proved to be a cumbersome task, often resulting in unnecessary duplicate purchases. At one point, I found myself in possession of 27 puffer jackets alone.

With Tap-In-Closet, you can effortlessly upload your clothing items and promptly access your inventory without the need to rummage through closets or fall victim to the "out of sight, out of mind" dilemma. Bid farewell to duplicate purchases and the frustration of digging through folded garments. With Tap-In-Closet, organization is just a tap away – no mess, no hassle.

## Technologies Used

- React.js
- HTTP
- Node.js
- PostgreSQl
- HTML5
- CSS3
- TypeScript

## Live Demo

Try the application live at [[https://student-grade-table.lfz.com](https://student-grade-table.lfz.com)](http://tap-in-closet-dev.us-west-1.elasticbeanstalk.com/)

## Features

- User can sign-up, login or try the demo account.
- User can add items to their closet.
- User can build outfits with 'Dress Me'.
- User can view all their saved outfits.
- User can delete any article of clothing or outfit.

## Preview

![Tap-In-Closet-demo](https://github.com/annaaksenov/Tap-In-Closet/assets/121647003/f780e962-ba2a-4a5d-8538-b5e67b7e35fd)


## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 16 or higher

### Getting Started

1. Clone the repository.

    ```shell![Uploading Tap-In-Closet-demo.gif…]()

    git clone https://github.com/Learning-Fuze/sgt-react
    cd tap-in-closet
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Import the example database to MongoDB.

    ```shell
    mongoimport --db sgt-react database/dump.json
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
