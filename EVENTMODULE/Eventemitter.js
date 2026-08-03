// EventEmitter is class
// emit("event param"): trigger/create/fire and on("event param", callback): listen/subscribe/handle
// const EventEmitter = require('events');
// const event = new EventEmitter();
// event.on("greet", () => {
//     console.log("This is event emitter");
// });
// event.once("greet", () => {
//     console.log("call event only once");
// });
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");

const EventEmitter = require('events');

// 1. Create a custom EventEmitter that triggers "greet" or "exit"
class MyEmitter extends EventEmitter {}
const event = new MyEmitter();
event.on("greet", (msg) => {
    console.log(`hello ${msg}`); // Template literals: `${var}`
});
event.on("exit", () => {
    console.log("exit event triggered");
});
event.emit("greet", "CSE21");

// 2. Simulate DOM-like event handling in Node.js using events
// button: click and mouseover events
class Button extends EventEmitter {
    click() {
        console.log("\ncall button click event");
        this.emit("click");
    }
    mouseover() {
        console.log("\ncall button mouseover event");
        this.emit("mouseover");
    }
}

const button = new Button();
button.on("click", () => {
    console.log("button clicked");
});
button.on("mouseover", () => {
    console.log("button mouseover");
});
button.click();
button.mouseover();

// visualize the event loop using setTimeout, setImmediate, and process.nextTick
console.log("\nvisualize the event loop");
console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

console.log("End");