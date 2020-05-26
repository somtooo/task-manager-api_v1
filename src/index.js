const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT;
const path = require('path')

app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs")
app.use(express.json());
app.use(userRouter,taskRouter)


app.get('/', (req,res)=>{
    res.render('apidoc')
})

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
});

