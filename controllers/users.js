const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

async function signUp(req, res) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            email: req.body.email,
            password: hash
        });
        await user.save()
        res.status(201).json({ message: 'Utilisateur créé !'})

    } catch(error) {
        throw res.status(400).json({ error });
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect !'});
        } else {
            try {
                const valid = await bcrypt.compare(req.body.password, user.password);
                if (!valid) {
                    return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect !'});
                } else {
                    console.log('salut je passe ici')
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                }
            } catch(error) {
                throw res.status(500).json({ error });
            }
        }
    } catch(error) {
        throw res.status(500).json({ error });
    }
}

exports.signUp = signUp;
exports.login = login;