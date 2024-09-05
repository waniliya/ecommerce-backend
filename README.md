Before run repo:

Install:

### `npm i mongoose bcryptjs cors dotenv body-parser cookie-parser express nodemon jsonwebtoken express-session multer`
Ignore multer-gridfs-storage and argon by uninstall those dependencies.

Connect with mongo database before run this repo. This repo has 3 models: user, product, order.

Moreover, create .env file in backend file to store secret keys such as access_token_secret, JWT, node_env, refresh_token and mongodb access link.

To run it:
### `nodemon index` 
This system using nodemon version 3.0.3.
