const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model');


//Get a specific task
router.get('/tasks/:taskId', (req, res, next) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.taskId)){
    res.status(400).json({message: "This is not a valid Project ID, please try again"})
  }

  Task.findById(req.params.taskId)
    .then(task => {
      res.json(task);
    })
    .catch(error => {
      res.json(error);
    });
});


// Creating a new Task
router.post('/tasks', (req, res, next) =>{

  if(!mongoose.Types.ObjectId.isValid(req.body.projectId)){
    res.status(400).json({message: "This is not a valid Project ID, please try again"})
  }
  const {title, description, projectId} = req.body

  Task.create({
    title,
    description,
    project: projectId
  })
  .then(newTask =>{
    return Project.findByIdAndUpdate(projectId, {$push: {tasks: newTask._id} }, { new: true })
  })
  .then(response =>{
    res.json(response)
  })
  .catch(error => {
    res.status(500).json(error)
  })

})

//Update Specific Task
router.put('/tasks/:taskId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true})
    .then((results) => {
      res.json({ message: `Task with ${req.params.taskId} is updated successfully.`, results});
    })
    .catch(err => {
      res.json(err);
    });
});



// DELETE route => to delete a specific task
router.delete('/tasks/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router