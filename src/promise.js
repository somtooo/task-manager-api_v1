const add = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (a>0){
                resolve(a+b)
            }else{
                reject("negative")
            }
        }, 3000)
    })
};

add(-1,3).then((sum)=>{
    console.log(sum)
}).catch((e)=>{
    console.log(e)
});