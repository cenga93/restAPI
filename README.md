##rest API with Node.js, express and typescript
####Base installation instruction
  ```shell
  cd Desktop/
  git clone https://github.com/cenga93/restAPI.git
  ```
#### Open project in code editor and run `npm install`
***
_If you don't have and **node** and **npm**, execute the following command:_
#### This commands is for linux OS.
  ```shell
  sudo apt update
  sudo apt install nodejs
  nodejs -v
  sudo apt install npm
  ```
***
##Routes
  ```shell
  Auth
  ```

`ME` &#8594; <span style="color:yellow">{{api_endpoint}}auth/me</span> | `GET`

`LOGIN` &#8594; <span style="color:yellow">{{api_endpoint}}auth/login </span> | `POST`

`VERIFICATION` &#8594; <span style="color:yellow">{{api_endpoint}}auth/verification/:userId</span> | `POST`

  ```shell
  User
  ```
`CREATE` &#8594; <span style="color:yellow">{{api_endpoint}}user/</span> | `POST`

`GET ALL` &#8594; <span style="color:yellow">{{api_endpoint}}user/ </span> | `GET`

`GET ONE` &#8594; <span style="color:yellow">{{api_endpoint}}user/:userId</span> | `GET`

`UPDATE` &#8594; <span style="color:yellow">{{api_endpoint}}user/:userId</span> | `PATCH`

`DELETE` &#8594; <span style="color:yellow">{{api_endpoint}}user/:userId</span> | `DELETE`


  ```shell
  Product
  ```

`CREATE` &#8594; <span style="color:yellow">{{api_endpoint}}product/</span> | `POST`

`GET ALL` &#8594; <span style="color:yellow">{{api_endpoint}}product/ </span> | `GET`

`GET ONE` &#8594; <span style="color:yellow">{{api_endpoint}}product/:productId</span> | `GET`

`UPDATE` &#8594; <span style="color:yellow">{{api_endpoint}}product/:productId</span> | `PATCH`

`DELETE` &#8594; <span style="color:yellow">{{api_endpoint}}product/:productId</span> | `DELETE`

##Dependencies
* bcrypt
* catch-async-express
* compression
* cors
* date-fns
* dotenv
* express
* express-mongo-sanitize
* http-status
* joi
* jsonwebtoken
* lodash
* mongodb
* mongoose
* nodemailer
* passport
* passport-jwt