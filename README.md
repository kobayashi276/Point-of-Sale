Create a .env and set below variables:

DATABASE_HOST=

DATABASE_NAME=

DATABASE_USERNAME=

DATABASE_PASSWORD=

ACCESS_TOKEN_SECRET="A#1AqimJrQ%^Rqd"

MAIL_USERNAME=yuokawaii82@gmail.com

MAIL_PASSWORD=Khang789

OAUTH_CLIENTID=529794889646-h1h264o9uk2pjtmcqp26urg5bl6g34bd.apps.googleusercontent.com

OAUTH_CLIENT_SECRET=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

OAUTH_REFRESH_TOKEN=1//040rMvaXyGgKjCgYIARAAGAQSNwF-L9IraSViT9S6WKK3CyI3OmX815amlBg2YSm0ZZ-vJNk7EyaLCW-OpjA4Lvv-OltX7lK_Fb4

#API

- GET localhost:3000/api/user?email=<> Get data from user

- PUT localhost:3000/api/user?email=<> Update data user from user

- GET localhost:3000/api/product?barcode=<> Get data from product

- GET localhost:3000/api/product Get all data from product

- POST localhost:3000/api/product?barcode=<>&name=<>&importprice=<>&retailprice=<>&category=<> Add new product

- DELETE localhost:3000/api/product?barcode=<> Delete product if it have no order

- PUT localhost:3000/api/product?barcode=<>&name=<>&importprice=<>&retailprice=<>&category=<> Update product via barcode

- GET localhost:3000/api/lock?email=<> Lock user via email

- GET localhost:3000/api/unblock?email=<> Unblock user via email

- POST localhost:3000/api/order Add order and list of product

- GET localhost:3000/api/invoice?id=<> Get order and product list data

