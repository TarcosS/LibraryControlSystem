import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET_KEY } from "../constants";
import { isAuth } from "../middlewares/isAuth";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    const {firstName, lastName, email, password, phoneNumber} = req.body;
    if(!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(500).json({status: 'warning', message: 'Some body datas missing!'});
    }
    bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(password, salt).then(password => {
            User.create({
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
            }).then(user => {
                if(!user) res.status(500).json({status: 'warning', message: 'Global ERR User Not Found!'});
                return res.status(200).json({status: 'success', message: 'Sign up'});
            }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'User could not created!'})}});
        }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'Password could not hashed!'})}});
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'Salt could not created!'})}});
})

authRouter.post('/sign-in', (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(500).json({status: 'warning', message: 'Some body datas missing!'});
    }
    User.findOne({where: {email}}).then((user) => {
        console.log(user)
        if(user) {
            bcrypt.compare(password, user.dataValues.password, function(err, result) {
                if(err) {
                    return res.status(500).json({status: 'warning', message: 'Some Compare Errors!!!!'})
                }
                if(result) {
                    const token = jwt.sign({id: user.dataValues.id}, JWT_SECRET_KEY, {expiresIn: '1h'});
                    return res.status(200).json({status: 'success', message: 'Sign In Successfully!', data: {token}});
                } else {
                    return res.status(500).json({status: 'warning', message: 'Password is wrong!'})
                }
            });
        }else {
            return res.status(500).json({status: 'warning', message: 'User not found!'})
        }
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'User not found!!'})}});
})

authRouter.get('/getMe', isAuth, (req, res) => {
    if(req.userId) {
        User.findOne({
            where: {
                id: req.userId,
                isActive: true,
                isDeleted: false
            }
        }).then(user => {
            if(user){
                return res.status(200).json({status: 'success', message: 'User Data with JWT' , data: user});
            }else {
                return res.status(500).json({status: 'warning', message: 'User not found!!'});
            }
        }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'User not found!!'})}});
    }
})

export default authRouter;