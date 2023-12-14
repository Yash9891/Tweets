const express=require("express");
const app=express();
const path=require('path');
const Tweet=require('./models/tweets')

//Mongo connection
const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/tweetApp').then(()=>{
    console.log("Mongo Connection Open!!");
}).catch(err=>{
    console.log("OHH no Mongo connection error");
    console.log(err);

})

//to use put request in app.js
const methodOverride=require('method-override')
app.use(methodOverride('_method'))


app.set('views',path.join(__dirname,'views'));
app.set("view engine",'ejs');
app.use(express.urlencoded({extended:true}))//to use post request in app.js

//To show the previous category option  during edit the tweet
const categories=['good','verygood','notgood'];

//****************CURD*************** */
//Route 1 to view all tweets
app.get('/tweets',async(req,res)=>{
    //to show the all Tweets related to same About Tweet(category)
   const {category}=req.query;
   if(category){
    const tweets=await Tweet.find({category})
    res.render('comments/home',{tweets,category})

   }else{
    const tweets=await Tweet.find({})
    // console.log(tweets);
    // res.send("All Tweets will be here")
    res.render('comments/home',{tweets,category:"ALL"})//use this to render home.ejs(html file) from views folder to localhost:3000/tweets
   }
    
})

//Route 2 to create a new tweet it is use to render thr form from new.ejs
app.get('/tweets/new',(req,res)=>{
    res.render('comments/new',{categories})
})
//Route 3 is use to create and submit the form data of  new.ejs form through route 2
app.post('/tweets',async(req,res)=>{
    // console.log(req.body);
    const newtweet=new Tweet(req.body);
    await newtweet.save()
    res.redirect(`/tweets/${newtweet._id}`)

})

//Route 4 to view Particular Tweet details
app.get('/tweets/:id',async(req,res)=>{
    const {id}=req.params;
    const tweet= await Tweet.findById(id) //this const tweet is used in details.esj as tweet.name 
    res.render('comments/details',{tweet})
})

//Route 5 to Update all details of the Tweet
app.get('/tweets/:id/edit',async(req,res)=>{
    const {id}=req.params;
    const tweet = await Tweet.findById(id)
    res.render('comments/edit',{tweet,categories})
})
//Route 6  this root is trigger by the form when we submit it '/tweets/:id'
app.put('/tweets/:id',async(req,res)=>{
    const {id}=req.params;
    const tweet=await Tweet.findByIdAndUpdate(id,req.body,{runvalidators:true,new:true})
    res.redirect(`/tweets/${tweet._id}`)

})

//Route 7 to Delete Tweet
app.delete('/tweets/:id',async(req,res)=>{
    const {id}=req.params;
    const deletetweet=await Tweet.findByIdAndDelete(id)
    res.redirect('/tweets');

})





app.listen(3000,()=>{
    console.log("App is listning on port 3000!");
})