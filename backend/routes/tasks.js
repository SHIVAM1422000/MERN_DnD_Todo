const express = require('express')
const router = express.Router()

const {getAllTasks, updateTasks, createTask, deleteTask} = require('../controllers/controller')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').patch(updateTasks).delete(deleteTask)



module.exports=router