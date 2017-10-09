const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

MongoClient.connect('mongodb://localhost/notebook', (err, db) => {

  if (err) {
    console.error(err)
    process.exit(1)
  }

  const notes = db.collection('notes')
  const app = express()
  app.use(jsonParser)

  app.post('/api/notes', (req, res) => {
    notes
    notes.insertOne({note: req.body}, (err, result) => {
      if (err) {
        console.error(err)
        res.sendStatus(500)
      }
      console.log(req.body)
      res.sendStatus(201)
    })
  })

  app.listen(3000, () => {
    console.log('Visit http://localhost:3000')
  })

})
