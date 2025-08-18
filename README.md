# BackEnd --- 
## Project: SPACE JUMP
* Cristian Varela Casas

## How to install in local environment

Get repository
```sh
git clone https://github.com/Spaice-Jump/BackEnd.git
```

Install dependencies with:
```sh
npm install
```

Install **MongoDB**

* Access to [MongoDB-WebSite](https://www.mongodb.com/)
* Search for "Install Community Edition on _your_platform_ (Linux, Windows, macOS)

**.env** file (sample file: .env.example)
```js
MOGODB_CONNECTION_STR=mongodb: //127.0.0.1:27017/spacejump
SERVER_URL=http://localhost:3000
JWT_SECRET=********** // secreto para el JWT
EMAIL_PASSWORD=*********** // eMail que envía los correos
PASSWOR_REMEMBER=********** // password del correo
TEXT_PASSWORD=Le escribimos de la App Space Jump para reestablecer la contraseña pinche el siguiente link:
```

Checking MongoDB

* Run NoSQLBooster for MongoDB
* Connect string: `mongodb://localhost:27017` 

## How to run in local environment

Initializating data:
```sh
npm run initDB
# creates user: demo@gmail.com / 1234
# cerates user: buyer@gmail.com / 1234
```

Start in development mode:
```sh
npm run dev
```

Result
```log  
> backend@0.0.0 dev
> cross-env DEBUG=backend:* nodemon ./bin/www

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./bin/www`
  backend:server Listening on port 3001 +0ms
Connected to MongoDB in spacejump
```
---------------------------------------------------------------------
#### API Methods

You need a MongoDB data base

The connection is located in .lib/connectMongoose.js

##### GET /api/travels

Returns all travels

##### GET "/api/travels/:id  --> Devuelve todos / o el anuncio filtrado por su iD.

Returns a travel filtered by its id.


<!-- TODO -->
{
    "travel": [
        {
            "_id": "63f4b073ec1b7490eb8f9bc6",
            "nombre": "Caja de melocotones",
            "venta": true,
            "precio": 9.99,
            "foto": "melocotones.jpg",
            "tags": [
                "lifestyle"
            ],
            "__v": 0
        }
    ]
}

##### POST "/api/travels"


Returns a JSON with the travel inserted in the API.

##### PUT "/api/travels"

return a JSON with the travel update.

##### DELETE "/api/anuncios/:id"

Confirms delete of the travel.

---------------------------------------------------------------------
