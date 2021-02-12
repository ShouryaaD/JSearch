const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isRecruiter = req.body.isRecruiter;
    bcrypt.hash(password, 12)
        .then(hashedPw => {
        
            const user = new User({
                name: name,
                email: email,
                password: hashedPw,
                isRecruiter: isRecruiter,
            });
            return user.save();
        })
        .then(result => {
            res.status(202).json({
            message: 'User Created'
        })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
         
    })
      
}

exports.login = (req, res, next) => {
    
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then( user =>{
            if (!user) {
                const error = new Error('A user with this email not found');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
           return bcrypt.compare(password, user.password);
        }
    ).then(
        isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;
            }
            
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
                name: loadedUser.name,
                isRecruiter: loadedUser.isRecruiter,
            }, 'secret', { expiresIn: '1h' });
            console.log('Login successful');
            res.status(200).json({ token: token, userId: loadedUser._id.toString(), name: loadedUser.name, isRecruiter: loadedUser.isRecruiter});
            }
        ).catch(err =>
         {if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);});
}

