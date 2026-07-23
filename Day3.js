//Promises
//Promise way 1
const promiseOne=new Promise((resolve, reject)=>{
    console.log("Promise one is done");
    resolve("operation successful");
    let success=true;
    if(success){
        resolve("operation successful");
    } else {
        reject("operation failed");
    }
});
promiseOne.then((result)=>{
    console.log(result);
    }).catch((error)=>{
    console.error(error);
});