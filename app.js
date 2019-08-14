
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./util/database');

const User = require('./models/user');
const UserAuth = require('./models/userAuth');
const Card = require('./models/card');
const Connection = require('./models/connection');
const Template = require('./models/template');

const authRouter = require('./routers/auth.router');
const cardRouter = require('./routers/card.router');

const app = express();

app.use(bodyParser.json());
app.use('images', express.static(path.join(__dirname, 'images' )));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/auth', authRouter)
app.use(cardRouter)


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

User.hasOne(UserAuth);
UserAuth.belongsTo(User);
User.hasOne(Card);

const PORT = process.env.port || 3000;
sequelize
    // .sync({force: true})
    .sync()
    .then( (result) => {
        app.listen(PORT, () => {
            console.log(`card connect started on port ${PORT}`);
        })
    })
    .catch ( err => {
        console.log('err ' + err)
    });