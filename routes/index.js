const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest }= require('../middleware/auth')




// Articals Database connection
const Articals =require('../models/Articals')

// @description Login/Landingpage
// @route  Get/


router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{layout:'login'})
})

// @route Get/dashboard

router.get('/dashboard',ensureAuth, async (req,res)=>{
    try {
        const articals= await Articals.find({user: req.user.id}).lean() 
        res.render('dashboard',{
            name: req.user.firstName,
            articals
        })   
    } catch (err) {
        console.error(err)
        res.render('error/500')
        
    }

})








module.exports= router