//understand the concept of fetch in console
async function test(){
    console.log("this is asynchronous function and we want to use fetch");
    const response = await fetch("./student.json");
    console.log(response.status);
    const stud = await response.json();
    return stud;
    console.log("finally data fetch");
}

test().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})