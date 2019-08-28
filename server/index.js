const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors')

//const transaction = require('./routes/transaction');

// Connect to Mongodb
mongoose.Promise = global.Promise;
mongoose
    .connect(
        process.env.DB_CONNECT, {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    ).then(() => {
        console.log('MongoDb Connected')
    })
    .catch(err => {
        console.log(err)
    })


const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
//app.use(cors());

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



app.use('/', cors(corsOptions), user);
//app.use('/', transaction);


const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on ${PORT}`));