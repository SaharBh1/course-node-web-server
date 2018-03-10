const express=require('express')
const hbs=require('hbs')
const fs=require('fs')
var app=express()
const port=process.env.PORT ||3000
app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now}:${req.method}**${req.url}`
console.log(log);
fs.appendFile('server.log',log+'\n');
next()
})

//app.use((req,res,next)=>{
//	res.render('maintenance.hbs')
//})


app.set('view engine','hbs')
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase()
})


app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About',
		welcomeMessage:'welcome to my page'
	})
})
app.get('/home',(req,res)=>{
	res.render('home.hbs',{
		pageTitle:'home',
	welcomeMessage:'welcome to my home'
	})
	
})

app.listen(port,()=>{
	console.log(`server is up on port${port}`)
})