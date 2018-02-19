== THE REGULAR WAY ==


npm install express
npm install cheerio
npm install request
npm install moment --save
npm install --save google-map-react

== STARTING THE SERVER ==

### Enter node server to start the server and add this into the browser

http://localhost:8081


== OR USE NODEMON ==

With nodemon, everytime you make changes to the site, it automatically reloads

npm install nodemon --save-dev

nodemon server


### Upload to heroku

heroku login


echo ‘web: ./node_modules/.bin/forever -m 5 server.js’ >Procfile


heroku create

git push heroku master


heroku ps:scale web=1

https://young-ridge-69555.herokuapp.com/


### Google MAPS API Key

https://developers.google.com/maps/documentation/embed/get-api-key
