const express = require('express');
const router = express.Router();
const TurndownService = require('turndown');
const models =require('../models');

// GET for addPost
router.get('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin){
        res.redirect('/')
    }else{
        res.render('post/add',{
            user:{
                id: userId,
                login: userLogin
            }
            });
    }

});

// POST if add
router.post('/add', (req, res) =>{
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin){
        res.redirect('/')
    }else{
    //console.log(req.body);
    const title =req.body.title.trim().replace(/ +(?= )/g, '');
    const body = req.body.body;
    const turndownService = new TurndownService();

    if(!title || !body){
        res.json({
            ok:false,
            error: 'All fields have to be filled',
            fields: ['title', 'body']
        });
    }else{
        models.Post.create({
            title,
            body: turndownService.turndown(body),
            owner: userId
        }).then(post =>{
            console.log(post);
            res.json({
                ok:true
            });
        }).catch(err => {
            console.log(err);
            res.json({
                ok:false
            });
        });
    }

    }

});

module.exports = router;