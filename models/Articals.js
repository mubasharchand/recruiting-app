const mongoose=require('mongoose')


const ArticalsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true 
    },
    body:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'public',
        enum: ['private' , 'public']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})


module.exports=mongoose.model('Articals',ArticalsSchema)