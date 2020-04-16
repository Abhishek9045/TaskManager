const { Router } = require('express')
const { Todos } = require('../db')


const route = Router()

// route.get('/', async (req, res) => {
//     const todos = await Todos.findAll().then(function(result) {
      
//       console.log(result) // "Some User token"
//       res.send(result)
//     }).catch(function(error){
//       console.log(error)
//     })
    
//   })

route.get('/:id', async(req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer'
    })
  }
  
  let task = await Todos.findByPk(req.params.id)
  if (!task) {
      return res.status(404).send({
          error: 'No task found with id = ' + req.params.id,
      })
  }

  res.status(202).send({ success: 'Task details updated', newData: task })


})

route.get('/', async (req, res) => {
       Todos.findAll()
            .then((todos)=>{
                   res.status(200).send(todos)
            })
            .catch((err)=>{
              res.status(500).send({
                    error: "Could not retrive todos"
              })
            })
      
    })
  

  
  route.post('/', async (req, res) => {
    if (typeof req.body.task !== 'string') {
      return res.status(400).send({ error: 'Task name not provided' })
    }
    
     
   const newtodo =  await Todos.create({
        task : req.body.task,
        description : req.body.description,
        Priority : req.body.Priority,
        done : req.body.done,
        due : req.body.due
    })
  
    res.status(201).send({success: 'New task added', data : newtodo})
  })

  route.put('/:id', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'task id must be an integer',
        })
    }
    let task = await Todos.findByPk(req.params.id)
    if (!task) {
        return res.status(404).send({
            error: 'No task found with id = ' + req.params.id,
        })
    }
 
    let priority = ['Low', 'Medium', 'High']
    if (!priority.includes(req.body.Priority)) {
        return res.status(400).send({ error: 'Task priority not provided' })
    }
 
    if (isNaN(Date.parse(req.body.due))) {
        return res.status(400).send({ error: 'Task due date not provided' })
    }
    
    task.Priority = req.body.Priority
    task.done = req.body.done
    task.due = req.body.due
 
    await task.save()
 
    res.status(202).send({ success: 'Task details updated', newData: task })
 
})



module.exports = route