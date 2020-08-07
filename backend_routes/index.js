const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('../db/model');
const saltRounds = 12;

router.use(bodyParser.urlencoded({ extended: true }))
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

router.get('/', (req, res, next) => {
    res.status(200).json({ 'msg': 'Its working' });
})

router.get('/users', (req, res, next) => {
    let resp = {};
    db.User.find().then(data => {
        if (!!data)
            resp = { 'data': data };
        res.status(200).json(resp);
    }).catch(e => res.status(500).json({ 'err': e }));

})

router.post('/user', (req, res, next) => {
    let user = {}
    db.User.findOne({ 'username': req.body.username })
        .then(u => {
            if (!!u) {
                res.status(200).json({ 'msg': 'User already exists' });
            } else {
                bcrypt.hash(req.body.password, saltRounds).then((hashed_pass) => {
                    db.User.create({
                        'name': req.body.name,
                        'password': hashed_pass,
                        'username': req.body.username,
                        'no_of_challenges':0,
                        'experience': 0,
                        'expert_in':{},
                        'voted': [],
                        'isAdmin': false,
                        'vote_count': 0
                    })
                        .then(created => {
                            if (created)
                                res.status(200).json({
                                    'success': true,
                                    'user_id': created.id
                                })
                            else
                                res.status(500).json({ 'success': false })
                        })
                })
            }
        })
})

router.post('/edit/user/:id', (req, res, next) => {
    let id = req.params.id;
    db.User.findById(id, (err, item) => {
        item.updateOne({
            'no_of_challenges': req.body.no_of_challenges,
            'experience': req.body.experience,
            'expert_in': req.body.expert_in,
        }, (e, u) => {
            if (e)
                res.status(500).json({ 'success': false })
            else
                res.status(400).json({ 'success': true, 'userid': u._id })
        })
    })
})

router.post('/delete/:userid', (req, res, next)=>{
    let del_id = req.params.userid
    let id = req.body.id;
    db.User.findById(id)
    .then(u => {
        if(!u.isAdmin)
            res.status(200).json({'success': false, 'msg': 'No Admin Privileges'})
        else {
            db.User.deleteOne({_id: del_id})
            .then(d => {
                res.status(200).json({'success': true})
            })
            .catch(e => {
                res.status(200).json({'success': false, 'msg': 'Cannot Delete.'})
            })
        }
    })
    .catch(e => {
        res.status(200).json({ 'success': false, 'msg': 'No User to delete'})
    })
})

router.post('/vote/:id', (req, res, next) => {
    let userid = req.params.id;
    let voterId = req.body.voter_id;
    let user = {}
    let voter = {}
    db.User.findById(voterId, (err, item) => {
        if(!err)
        {
            voter = item;
            db.User.findById(userid)
                .then(u => {
                    user = u;
                    if (user.voted != null)
                        user.voted.forEach(item => {
                            if (item == voterId)
                                throw "err"
                        })
                    else
                        user.voted = [];
                    user.voted.push(voterId)
                    user.update({ "voted": user.voted }, (err, item) => {
                        if (err)
                            throw err
                    })
                    voter.update({ "vote_count": voter.vote_count + 1 }, (err, item) => {
                        if (err)
                            throw err
                        else
                            res.status(200).json({ 'success': true })
                    })
                })
                .catch(e => { res.json({ 'success': false, 'msg': 'No user Found' }) })
        }
        else
            res.json({ 'success': false, 'msg': 'No user Found' })
    })
})

router.post('/login', (req, res, next) => {
    let uname = req.body.username;
    let pass = req.body.password;
    db.User.findOne({username: uname})
    .then( u => {
        if(!u) {
            res.status(200).json({'success': false});
        }
        else {
            bcrypt.compare(pass, u.password, (err, item) => {
                if(err) {
                    res.status(200).json({ 'success': false, 'msg': 'wrong Username or password' })
                }
                else {
                    res.status(200).json({'success': true, 'user': u })
                }
            })
        }
    })
    .catch(e => {
        res.status(200).json({'success': false})
    })
})
module.exports = router;