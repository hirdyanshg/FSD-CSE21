//function in js:block of code
//syntax:
//function fname(){
//}
//fname();
function add (num1 , num2) {
    console.log(num1 + num2);
}  
add(10, 20);
function add1 (num1 , num2) {
    return num1 + num2;
}
add1 ( 2, 1);
//arrow function
//variable in js: container to store data
//var , let , const
//syntax:()=>{}
const add2=()=>{
console.log("arrow function");
}
add2();
const add3=(num1,num2)=>{
    return num1 + num2;
}
console.log(add3(10,20));
// arguments : array like object
function addNUM(num1,num2){
    console.log(arguments);
}
addNUM(10, 20);
//nodejs: run js code outside the browser
