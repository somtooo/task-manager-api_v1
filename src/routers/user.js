const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
router.post('/users', async (req,res)=>{
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken()
        user.tokens =  user.tokens.concat({token})
        await  user.save()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }

});

router.post('/users/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({token})
        await user.save()
        res.send({user,token})
    } catch (e) {
        res.status(400).send(e)

    }
})

router.post('/users/logout', auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()

    }
})

router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
});

router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try {

        const user = await User.findById(_id)
        if (!user){
            return res.status(404).send({"error":"user not found"})
        }
        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }
});

router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((updates)=> allowedUpdates.includes(updates))
    const _id = req.params.id
    if (!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try {
        const user = await  User.findById(_id)
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(_id,req.body,{new:true, runValidators: true})
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const userToDelete = await User.findByIdAndDelete(_id)
        if (!userToDelete){
            res.status(404).send({"error":"User to delete not found"})
        }
        res.send(userToDelete)
    } catch (e) {
        res.status(500).send(e)
    }

})


module.exports = router