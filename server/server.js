const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var Blog = require('./models/blog')
const app = express()

var db_config = {
    development: 'mongodb://localhost/blog-dev',
    test: 'mongodb://localhost/blog-test'
}

var app_env = app.settings.env
console.log('------------ app_env: ', app_env);

mongoose.connect(db_config[app_env], (err, res) => {
    console.log('Connect to database' + db_config[app_env]);
});

// NOTE: set
// app.set('port', process.env.PORT || 3000)

// NOTE: use
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
    extended: false
}));

app.use('/', require('./routes'))

// // NOTE: run
// app.listen(app.get('port'), () => {
//     console.log('Listening on port ' + app.get('port'));
// })
app.listen(3000)
module.exports = app