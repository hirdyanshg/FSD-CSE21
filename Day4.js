//create one promise that will display user name and password
//using resolve an if data will be rejected it displays error
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let err = false;
//         if(!err){
//             resolve({ username: "JohnDoe", password: "12345" });
//         } else {
//             reject(new Error("Failed to fetch user data"));
//         }
//     }, 2000);
// })
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.error("Error:", error.message);
// });
//Async/Await
console.log("this is async/await");
async function test(){
console.log("1");
await console.log("2");
console.log("3");
console.log("4");
}
test();
console.log("6");