const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

module.exports = router

router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});


router.get('/tasks',async (req,res)=>{

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }

});

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id)
        if (!task){
            res.status(404).send(task)
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }

});

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((updates)=> allowedUpdates.includes(updates))
    const _id = req.params.id
    if (!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try {
        const task = await Task.findById(_id)
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(_id,req.body,{new:true, runValidators: true})
        if (!task){
            return res.status(404).send({"error":"task not available"})
        }
        res.send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const taskToDelete = await Task.findByIdAndDelete(_id)
        if (!taskToDelete){
            res.status(404).send({"error":"Task to delete not found"})
        }
        res.send(taskToDelete)
    } catch (e) {
        res.status(500).send(e)
    }

})
