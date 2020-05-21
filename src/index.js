const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
//     console.log(req.method, req.path)
//
// })
app.use(express.json());
app.use(userRouter,taskRouter)

app.listen(port,()=>{
    console.log('Server is up on port' + port)
});

// const jwt = require('jsonwebtoken')
//
// const myFunction = async ()=>{
//    const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'})
//     console.log(token)
//
//     const data = jwt.verify(token,'thisismynewcoursee')
//     console.log(data)
// }
// myFunction()
