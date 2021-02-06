const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model');


router.get('/projects', (req,res,next)=>{
  Project.find()
         .populate('tasks')
         .then(response =>{
           res.json(response)
         })
         .catch(err =>{
           res.status(500).json(err)
         })
})


//Retrieve Details of Specific Project
router.get('/projects/:projectId', (req, res, next) =>{
  if(!mongoose.Types.ObjectId.isValid(req.params.projectId)){
    res.status(400).json({message: "This is not a valid Project ID, please try again"})
  }

  Project.findById(req.params.projectId)
         .then(project =>{
           res.json(project)
         })
         .catch(err=>{
           res.status(500).json(err)
         })
})

router.post('/projects',(req,res,next)=>{
  const {title, description, tasks} = req.body

  Project.create({
    title,
    description,
    tasks: []
  })
  .then(response =>{
    res.json(response)
  })
  .catch(error=>{
    res.status(500).json(error)
  })

})

//Update Project
router.put('/projects/:projectId', (req, res, next) =>{
  if(!mongoose.Types.ObjectId.isValid(req.params.projectId)){
    res.status(400).json({message: "This is not a valid Project ID, please try again"})
  }

  Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
         .then(project =>{
           res.json({project, message:'Project was successfuly Updated!'} )
         })
         .catch(error =>{
           res.status(500).json(error)
         })
})

//Delete Specific Project
router.delete('/projects/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router