const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))
const port = process.env.PORT || 3000
const url ="mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority"
mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

    .then(client => {
        console.log('Connected to databases')
        const db = client.db('JournalDB')
        const writeUps = db.collection('WriteUps')
        app.set('view engine', 'ejs')
        app.listen(port, function (req, res) {
            console.log('server is running')
        })
        app.get('/', function (req, res) {
            res.render('index.ejs')
        })
        app.set('views', __dirname + '/views');
        app.get('/write-a-blog', function (req, res) {
            res.render('write.ejs')
        })
        app.get('/blogs',function(req,res){
            mongoclient.connect(url, function(err, db) {
                var myquery = { Name: req.body.NameId,  Topic: req.body.TopicId,
                WriteUp: req.body.TextId,
                Likes:req.body.LikeId}
                var dbo = db.db("JournalDB")
                var newvalues = { $set: {Likes:req.body.LikeId+1} };
                dbo.collection("WriteUps").updateOne(myquery, newvalues, function(err, res) {
     
                  console.log("1 document updated");
                
                });
             });
            db.collection('WriteUps').find().toArray()
            .then(result=>{
                console.log(result)
                res.render('blogs.ejs', {Blogs:result})
            })

            .catch(error=>{
                console.error(error)
            })
            
          
           })
          
           

     
        app.post('/blogs',function(req,res){
            writeUps.insertOne(req.body)
            .then(result=>{ 
                res.redirect('/blogs')
            })
    
    
            .catch(error=>{
                console.error(error)
            })
        })
    })












