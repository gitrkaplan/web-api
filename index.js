const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { ObjectId } = require('mongodb')

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
      .insertOne(req.body, (err, result) => {
        if (err) {
          console.error(err)
          res.sendStatus(500)
        }
        console.log(req.body)
        res.sendStatus(201)
      })
  })

  app.get('/api/notes', (req, res) => {
    notes
      .find(req.query)
      .toArray()
      .then(list => res.json(list))
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })

  app.put('/api/notes/:id', (req, res) => {
    notes
      .updateOne({ id: req.params.id }, req.body, (err, result) => {
        if (err) {
          console.error(err)
          res.sendStatus(500)
        }
        console.log(req.body)
        res.sendStatus(202)
      })
  })

  app.listen(3000, () => {
    console.log('Visit http://localhost:3000')
  })

})
