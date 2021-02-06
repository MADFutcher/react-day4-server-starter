const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model');


router.get('/projects', (req,res,next)=>{
  res.send('This is working')
})

module.exports = router