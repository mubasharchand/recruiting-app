const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')




// Articals Database connection
const Articals =require('../models/Articals')

// @description show add page
// @route  Get/

router.get('/add', ensureAuth, (req,res)=>{
    res.render('articals/add')
})


router.post('/', ensureAuth, async (req,res)=>{
    try {
        req.body.user =req.user.id
        await Articals.create(req.body)
        res.redirect('/dashboard')

        
    } catch (err) {
        console.error(err)
        req.render('error/500')
        
    }
})
// @description show Services
// @route  Get/

router.get('/', ensureAuth, async (req,res)=>{
    try {
        const articals= await Articals.find({ status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()

        res.render('articals/index',{
            articals
        })    
    } catch (err) {
        console.error(err)
        res.render('error/500')
        
    }
})
// @desc    Show single story
// @route   GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
      let artical = await Articals.findById(req.params.id).populate('user').lean()
  
      if (!artical) {
        return res.render('error/404')
      }
  
      if (artical.user._id != req.user.id && artical.status == 'private') {
        res.render('error/404')
      } else {
        res.render('articals/show', {
          artical,
        })
      }
    } catch (err) {
      console.error(err)
      res.render('error/404')
    }
})

// show edit page
// @route Get/articals/edit/:id

router.get('/edit/:id', ensureAuth, async(req,res)=>{
    const artical= await Articals.findOne({
        _id: req.params.id,
    }).lean()

    if(!artical){
        return res.render('error/404')
    }

    if(artical.user != req.user.id){
        res.redirect('/articals')
    } else{
        res.render('articals/edit',
        {
            artical
        })
    }
})

// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let artical = await Articals.findById(req.params.id).lean()
  
      if (!artical) {
        return res.render('error/404')
      }
  
      if (artical.user != req.user.id) {
        res.redirect('/articals')
      } else {
        artical = await Articals.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
})
// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
      let artical = await Articals.findById(req.params.id).lean()
  
      if (!artical) {
        return res.render('error/404')
      }
  
      if (artical.user != req.user.id) {
        res.redirect('/articals')
      } else {
        await Articals.remove({ _id: req.params.id })
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
})
// @desc    User stories
// @route   GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
      const articals = await Articals.find({
        user: req.params.userId,
        status: 'public',
      })
        .populate('user')
        .lean()
  
      res.render('articals/index', {
        articals,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })
  

  
  



module.exports= router