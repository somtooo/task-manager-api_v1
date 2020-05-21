require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task')

// 5e82fd9017fe5687c4c1f8ee
// 5ec2e395909d414bfc400390

// User.findByIdAndUpdate('5ec2e395909d414bfc400390',{age:30}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:30})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// });
// 5ec2e878909d414bfc400391
const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{ age })
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5ec2e395909d414bfc400390', 2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})

const findAndDelete = async  (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

findAndDelete('5ec2e878909d414bfc400391').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})