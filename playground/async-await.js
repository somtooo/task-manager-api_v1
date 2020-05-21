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

const doWork = async () =>{
   const sum = await add(1, 99);
   const sum2 = await add(sum, 50);
   const sum3 = await add(-4,3);
   return sum3

}

doWork().then((result)=>{
    console.log('result:', result)
}).catch((e) =>{
    console.log('e:',e)
})