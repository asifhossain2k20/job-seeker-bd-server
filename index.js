const express = require('express')
const bodyParser=require('body-parser')
const { MongoClient } = require('mongodb');
const cors=require('cors')
const app = express()
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.skhdz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json())
app.use(cors());

const port = 5000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("jobSeekerBd").collection("allJobs");
    console.log("DATABASE 100% Connected")

    app.post('/addJobs',(req,res) => {
        const job=req.body;
        collection.insertOne(job)
        .then(result => {
            console.log(result.insertedCount);
        })
    })

    app.get('/availableJobs',(req, res)=>{
        collection.find({})
        .toArray((err,documents)=>{
            res.send(documents)
        })
    })


});

    app.get('/', (req, res) => {
        res.send('Welcome to server !')
    })
    
  app.listen(process.env.PORT || port)