const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter,taskRouter)

app.listen(port,()=>{
    console.log('Server is up on port' + port)
});
// const User = require('./models/user')
//
// const main = async () =>{
//     // const task = await Task.findById('5ec6b401cefbbb1df84c3b90')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//
//     const user = await User.findById('5ec6b32dc77e325d989cde11')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
//
// }
// main()
