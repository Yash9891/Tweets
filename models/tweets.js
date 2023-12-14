const mongoose=require('mongoose');
//Creating models 
const tweetSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
        
    },
    category:{
        type:String,
        lowercase:true,
        enum:['good','verygood','notgood']
    }
})

const Tweet=mongoose.model('Tweet',tweetSchema);
module.exports=Tweet;