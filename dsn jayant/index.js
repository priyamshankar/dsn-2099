/*  */const express=require('express');
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')



const app=express()

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));



mongoose.connect("mongodb://localhost:27017/Blog")

const blogSchema=new mongoose.Schema({
    date:Number,
    month:String,
    content:String
});



const Blog=new mongoose.model('Blog',blogSchema)

let blog_arr=[]
Blog.find(function(err,blogs){
    if (err){
        console.log(err);
    }else{
        blogs.forEach(function(blog){
            blog_arr.push([blog.date,blog.month,blog.content])
        })
    }
});


app.get('/',function(req,res){
    res.render('jayant',{blogs:blog_arr})
})

app.get('/enter',function(req,res){
    res.render('jayant1')
})


app.listen(3000,function(){
    console.log('server created');
})