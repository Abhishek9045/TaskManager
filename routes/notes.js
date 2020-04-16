const Notes = require('../db').Notes
const { Router } = require('express')


route = Router()


route.get('/:id', (req, res) => {
    // We want to send an array of all users
    // From our database here
 
    Notes.findAll({
    where: {
        T_id: req.params.id}
      })
      .then((notes) => {
        res.status(200).send(notes)
      })
      .catch((err) => {
        res.status(500).send({ error : 'Cannot retrive notes'})
      })
   
})
 
route.post('/', (req, res) => {
    // We expect the req to have name in it
    // We will create a new user 
 
    Notes.create({
        
        description: req.body.description,
        T_id: req.body.id
    }).then((notes) => {
        res.status(201).send(notes)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new note"
        })
    })
})
 
module.exports =  route