const express = require('express')
const passport = require('passport')
const router = express.Router()

// @description Authenticate with Google
// @route  Get/auth/google


router.get('/google', passport.authenticate('google', { scope : ['profile'] }));

// @route Get/auth/google/callback

router.get('/google/callback',
            passport.authenticate('google', {
                    failureRedirect : '/'
            }),(req,res)=>{
                res.redirect('/dashboard');
    }
);
// @des logout user
// @route /auth/logout

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
});








module.exports= router