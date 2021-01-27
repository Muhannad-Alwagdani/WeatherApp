const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors')
const { response } = require('express')

app.use(cors())

app.use(express.static('website'))

// Opening the server at port 3000
const PORT = 3000

const server = app.listen(PORT, () => {
  console.log(`server Running on localhost ${PORT}`)
})

let projectData = {}
//get route NOTE: this is not used, because i made the post route sends back data
app.get('/get', (req, res) => {
  res.send(projectData)
})
//Post Route
app.post('/post', (req, res) => {
  //Update the data
  projectData = { ...req.body }
  //send the updated data
  res.send(projectData)
})
