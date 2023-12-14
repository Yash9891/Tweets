//creating models and require it in here
const Tweet=require('./models/tweets')
const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/tweetApp').then(()=>{
    console.log("Mongo Connection Open!!");
}).catch(err=>{
    console.log("OHH no Mongo connection error");
    console.log(err);

})

//Use insertMany method  to create many  Product 
const commentsTweet=[
    {
        name:"This is nice",
        price:1.00,
        category:"good"
    },
    {
        name:"This is wrong",
        price:2.00,
        category:"verygood"
    },
    {
        name:"I love to GoodZilaa.",
        price:4.00,
        category:"verygood"
    },
    {
        name:"I dont like Superman.",
        price:3.00,
        category:"notgood"
    }

]
Tweet.insertMany(commentsTweet).then(res=>{
    console.log(res);
}).catch(e=>{
    console.log(e);
})