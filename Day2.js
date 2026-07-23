// //Synchronous and Asynchronous Programming in JavaScript
// //Synchronous programming: code is executed line by line, one after the other. Each operation must complete before the next one starts. This can lead to blocking behavior, where a long-running operation can prevent other code from executing.
// console.log("JavaScript");
// function hello(){
//     console.log("Hello");
// }
// hello();
// console.log("This is synchronous programming");
// //Asynchronous programming: code can be executed independently of the main program flow. This allows for non-blocking behavior, where long-running operations can be performed in the background while other code continues to execute.
// //setTimeout is a built-in JavaScript function that allows you to schedule a function to be executed after a specified delay. It takes two arguments: the function to be executed and the delay in milliseconds.
// const hello1 = () => {
//     setTimeout(() => {
//         console.log("Hello, World!");
//     }, 2000);
// }
// console.log("This is asynchronous programming");
// hello1();
// //callback,promises,async/await
function add(n1,n2,callback){
     console.log(n1+n2);
         callback();
 }
let a=10;
let b=20;
add(a,b,sayHI);
add(a,b,Hello);
//add(Hello,sayHI,hello1);
function sayHI(){
    console.log("this is callback function");
}
function Hello(){
    console.log("HELLO BHAI");
}
//create a function display(callback) that print "welcome to  abes" and then call the callback function that print "this is callback function"
function display(callback){
    console.log("welcome to abes");
    callback();
}
function lf (){
    console.log("this is callback function");
}
display(lf); 