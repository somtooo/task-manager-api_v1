const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

module.exports = router

router.post('/tasks',auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});


router.get('/tasks',auth,async (req,res)=>{

    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(400).send(e)
    }

});

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner:req.user._id})
        if (!task){
            res.status(404).send(task)
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }

});

router.patch('/tasks/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((updates)=> allowedUpdates.includes(updates))
    const _id = req.params.id
    if (!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try {
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})

        if (!task){
            return res.status(404).send()
        }
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

router.delete('/tasks/:id',auth, async (req,res)=>{
    try {
        const taskToDelete = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!taskToDelete){
            res.status(404).send({"error":"Task to delete not found"})
        }
        res.send(taskToDelete)
    } catch (e) {
        res.status(500).send(e)
    }

})
