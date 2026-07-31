//EventEmitter is class
//emit ("event param"):trigger/create/fire and on("event param",callback):listen/subscribe/handle
//  const EventEmitter = require('events');
//  const event = new EventEmitter();
//  event.on("greet", ()=>{
//      console.log("This is event emitter");
//  })
// event.once("greet", ()=>{
//     console.log("call event only once");
// });
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");

//1. create a custom EventEmitter thta triggers "greet" or "exit"
//2.Simulate DOM-like event handling in Node.js using events
class MyEmitter extends EventEmitter {}
const event=new MyEmitter()
event.on("greet", (msg)=>{
    console.log(`hello ${msg}`);//Template literals: `${var}
})
event.on("exit", ()=>{
    console.log("exit event triggered");
});
event.emit("greet","CSE21");