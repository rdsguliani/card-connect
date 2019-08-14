const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { getHashedPassword, compareHashedPassword } = require('../util/appUtility');
const UserAuth = require('../models/userAuth');

exports.registerUser = async function (req, res, next) {
    console.log(req.body);

    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            email: req.body.email
        });

        const encryptedPassword = await getHashedPassword( req.body.password )

        const userInAuth = await user.createUserAuth({ userName: req.body.email,
                                                       password: encryptedPassword
                                                });
        res
            .status(201)
            .send({
                statusCode: 201,
                statusMessage: 'Create Success',
                body: 'user added successfully'
                
            })                                         

    } catch (err) {
        console.log(err)
        throw new Error('user already Exists !!');
    }
}

exports.signIn = async function (req, res, next) {
    console.log(req.query);
    try {
        const email = req.query.email;
        const loggedInUser = await UserAuth.findOne({
            where: {
                userName: email
            },
            include: [ User ]
        })

        // console.log(loggedInUser);

        if (!loggedInUser) {
            throw new Error(' USER NOT FOUND !!')
        }

        const isMatch = await compareHashedPassword(req.query.password, loggedInUser.password)

        if (!isMatch) {
            throw new Error('Password didnt match')
        }

        const user = loggedInUser.user;

        const token = jwt.sign({
            email: email,
            userId: loggedInUser.id
        }, 
        'mysecretsecret',
        { expiresIn: '1h' }
        )

        res
            .status(200)
            .send({
                statusCode: 200,
                statusMessage: 'Validation Success',
                token, 
                user 
            });
    } catch (err) {
        res
            .status(401)
            .send({
                statusCode: 401,
                statusMessage: 'Invalid Details',
            });
        throw new Error('Error while authenticating !!');
    }
}

exports.refreshToken = async function (req, res, next) {
    console.log(req.user);
    const authHeader = req.get('Authorization');
    let token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, 'mysecretsecret');
    console.log(decodedToken);

    const date = Math.round(new Date().getTime()/1000);

    if(date < decodedToken.exp) {
        res
        .status(200)
        .send({
            statusCode: 200,
            statusMessage: 'Success',
            token
        });

        return;
    }

    token = jwt.sign({
        email: req.user.email,
        userId: req.user.userId
    }, 
    'mysecretsecret',
    { expiresIn: '1h' }
    )

    res
    .status(200)
    .send({
        statusCode: 200,
        statusMessage: 'Success',
        token
    });
}