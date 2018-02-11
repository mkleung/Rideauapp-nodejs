
npm install express
npm install cheerio
npm install request

node server

http://localhost:8081

== OR ==

npm install nodemon --save-dev

nodemon server


### Upload to heroku

heroku login


echo ‘web: ./node_modules/.bin/forever -m 5 server.js’ >Procfile


heroku create

git push heroku master


heroku ps:scale web=1

https://young-ridge-69555.herokuapp.com/

https://young-ridge-69555.herokuapp.com/