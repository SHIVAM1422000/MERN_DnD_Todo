const mongoose = require("mongoose");
// {task:"", date:"25/2/2023",year:2023,month:"February",completed: true},

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Must Provide A Task..!!"],
    },
    date: String,
    year: String,
    month: String,
    completed: {
        type: Boolean,
        default: false,
    },
});

const TasksSchema = new mongoose.Schema({
    tasks: {type:[TaskSchema], required:true},
});

module.exports = mongoose.model("Tasks", TasksSchema);
