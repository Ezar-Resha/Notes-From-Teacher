"use strict"

const {User} = require("../models/index.js")
const bcrypt = require('bcryptjs')
const session = require('express-session')
const {Op} = require('sequelize')

class UserController{

    // Login page with success / error queries
    static login(req,res){

        const {reg,err,out} = req.query;
        
        res.render('login', {reg,err,out})
    }

    // login process with password check.
    static loginProcess(req,res){  
        const {name,password} = req.body;

        User.findOne({where:{name:name}})
        .then((user) =>{
            if(!user) return res.redirect(`/login/?err=User+not+found.`)

            const passwordCheck =  bcrypt.compareSync(password, user.password)

            if(passwordCheck){
                
                // succesfull login
                req.session.userId = user.id;
                req.session.role = user.role;
                return res.redirect(`/home`)
                //

            } else {
                const error = "Invalid name or password. Try again."
                return res.redirect(`/login/?err=${error}`)
            }
        })
    }

    // leads to registration page
    static register(req,res){
        const {err} = req.query;
        res.render('register',{err})
    }

    // registration process after POST
    static registerProcess(req,res){

        const {name,password,passwordConfirm, email, role} = req.body

        if(password !== passwordConfirm){
            const err = 'Password does not match.'
            return res.redirect(`/register/?err=${err}`)
        }
        // Hashing in hook
        User.findOne({where:{
            name:{
                [Op.iLike]:name}
            }
        })
        .then((user) =>{
            if(user){
                const err = 'User already exists. try another name'
                return res.redirect(`/register/?err=${err}`)
            } else {
                return User.create({
                    name:name,
                    email:email,
                    password:password,
                    role:role
                })
            }
        })
        .then((user) =>{
            res.redirect('/login?reg=success');
        })
        .catch((err) =>{
            console.log(err);
            res.send(err);
        })
    }

    // for log out
    static logout(req,res){
        req.session.destroy((err) =>{
            if(err) res.send(err)
            else{
                res.redirect('/login?out=success')
            }
        })
    }

}

module.exports = UserController;