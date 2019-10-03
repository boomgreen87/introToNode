const express = require('express');
const hbs = require('hbs');
const path = require('path');
const sql = require('./utils/sql');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + "/views"));

app.get('/', (req, res) => {
  res.render('home', { homemessage: "Hey there!", bio: "This is confusing af dude"});
})

app.get('/users', (req, res) => {
    // Get user data when we hit this route

    // Try a database connection
    // If the connection fails, log error(s) to the console and quit.
    sql.getConnection((err, connection) => {
      if (err) {
        return console.log(err.message);
      }

      let query = "SELECT * FROM tbl_card;";

      sql.query(query, (err, rows) => {
        // We're done with our DB connection, so let someone else use it
        connection.release();

        // If something broke, quit and show an error message
        if (err) { return console.log(err.message) }

        // Show the data
        console.log(rows);

        res.render('user', rows[0]);
      })
    })
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})