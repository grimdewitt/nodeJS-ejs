
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const models =require('../models');

// POST is register
router.post('/register', (req, res) =>{
    const login =req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if (!login || !password || !passwordConfirm){
        res.json({
            ok:false,
            error: 'All fields have to be filled',
            fields: ['login', 'password', 'passwordConfirm']
        });
    } else if (login.length < 3 || login.length > 16) {
        res.json({
          ok: false,
          error: 'Login from 3 to 16 !',
          fields: ['login']
        });
    } else if (password !== passwordConfirm) {
        res.json({
          ok: false,
          error: 'NOT MATCH!',
          fields: ['password', 'passwordConfirm']
        });
    } else{

        models.User.findOne({
            login
        }).then(user => {
            if(!user){
                bcrypt.hash(password, null,null, (err, hash)=>{
                    models.User.create({
                        login,
                        password: hash
                    }).then(user => {
                        //console.log(user);
                        req.session.userId = user.id;
                        req.session.userLogin = user.login;
                        res.json({
                            ok:true
                        });
                    }).catch(err =>{
                        console.log(err);
                        res.json({
                            ok:false,
                            error: "Error Try again later"
                        });
                    });
                });
            } else {
                res.json({
                    ok:false,
                    error: 'Login has already been taken'
                });
            };
        });
    };
});

// Post if login
router.post('/login', (req, res) =>{
    const login =req.body.login;
    const password = req.body.password;

    //console.log(req.body);
    if (!login || !password){
        res.json({
            ok:false,
            error: 'All fields have to be filled',
            fields: ['login', 'password']
        });
    } else{
        models.User.findOne({
            login
        }).then(user => {
            if (!user){
                res.json({
                    ok:false,
                    error: "Login and password are incorrect",
                    fields: ['login', 'password']
                });
            }else{
                bcrypt.compare(password, user.password , function(err,result) {
                    if(!result){
                        res.json({
                            ok:false,
                            error: "Login and password are incorrect",
                            fields: ['login', 'password']
                        });  
                    }else{
                        req.session.userId=user.id;
                        req.session.userLogin=user.login;
                        res.json({
                            ok:true
                        });
                    }
                });
            }
        })
        .catch(err =>{
            console.log(err);
            res.json({
                ok:false,
                error: "Error Try again later"
            });
        });
    }
});

// GET for logout
router.get('/logout', (req, res) => {
    if (req.session) {
      // delete session object
      req.session.destroy(() => {
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
});

module.exports = router