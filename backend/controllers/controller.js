const Tasks = require("../models/TaskSchema");

// let freq=0

const getAllTasks = async (req, res) => {

  try {
    const task = await Tasks.find({});
    // const task = await Tasks.find(
    //     {
    //         'tasks._id':'63fc473c353a1374c5ccf1a5'
    //     }
    //     )
    res.status(201).send(task );
  } catch (error) {
    // console.log("Error in creating Task", error)
    res.status(500).send({ "error-msg": error });
  }
};

const updateTasks = async (req, res) => {
    // console.log("FROM REQ.BODY" , freq++)
    // console.log(req.body)
  
    try {
        const update_task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        if (!update_task) {
            return res
            .status(200)
            .json({ "No Task Found With The Id": req.params.id });
        } else {
            res.status(200).send(update_task);
        }
    } catch (error) {
        res.status(404).send( "Error Message in update route", error );
    }
    
};

const createTask = async (req, res) => {
    try {
        if(!req.body.tasks){
            return res.status(401).send("Nothing in the body")
        }
    const task = await Tasks.create(req.body);
    res.status(201).send(req.body);
  } catch (error) {
    // console.log("Error in creating Task", error)
    res.status(500).send({ "error-msg": error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleted_Task = await Tasks.findOneAndDelete({ _id: req.params.id });
    if (!deleted_Task) {
      return res
        .status(200)
        .json({ "No Task Found With The Id": req.params.id });
    } else {
      res.status(200).json({ deleted_Task });
    }
  } catch (error) {
    // console.log("Error in creating Task", error)
    res.status(500).send({ "error-msg": error });
  }
};

module.exports = {
  getAllTasks,
  updateTasks,
  createTask,
  deleteTask,
};
