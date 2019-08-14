
const Template = require('../models/template');
const User = require('../models/user');

exports.getTemplates = async function (req, res, next) {
    console.log(req.body);

    try {
        
        const templates = await Template.findAll({});
        res
            .status(200)
            .send({
                statusCode: 200,
                templates 
            }
        );

    } catch (err) {
        console.log(err)
        throw new Error('error while fething templates');
    }
}

exports.addUserCard = async function (req, res, next) {
    console.log(req.body);

    try {
        const email = req.user.email;
        const activeUser = await User.findOne({
            where: {
               email
            },
        })

        const card = req.body.card;
        activeUser.createCard({
            card
        });

        res
            .status(201)
            .send({
                message: "card added successfully"
            })

    } catch (err) {
        console.log(err)
        throw new Error('error while fething templates');
    }
}

