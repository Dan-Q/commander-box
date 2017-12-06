"use strict"; // ES6

const output = document.querySelector('.output');
let buffer = [];
let handlers = {};

// Listen for keypresses and call the handler
window.addEventListener('keyup', e => {
  switch(e.key){
    case '4':
      handle('key');
      break;
    case 'b':
      handle('1');
      break;
    case '7':
      handle('2');
      break;
    case 'f':
      handle('3');
      break;
    case 'z':
      handle('a');
      break;
    case 'o':
      handle('b');
      break;
  }
});

// Adds text to the buffer to be written to the page
const write = (text, tag)=>{
  const element = document.createElement(tag);
  output.appendChild(element);
  text.match(/ *./g).forEach(letter => buffer.push([element, letter]));
}

// Loads a screen (js file)
const screen = (screen)=>{
  fetch(`screens/${screen}.js`).then(response => {
    response.text().then(body => {
      off();
      eval(body);
    });
  });
}

const clear = ()=>{
  output.innerHTML = '';
}

// Handles a (button/key/switch) event
const handle = (button)=>{
  const eventHandler = handlers[button];
  if(typeof(eventHandler) == 'undefined') return;
  eventHandler();
}

// Disables all handlers
const off = ()=>{
  handlers = {};
}

// Adds a handler for a button
const on = (button, func)=>{
  handlers[button] = func;
}

// Every X, writes more text
setInterval(()=>{
  const next = buffer.shift()
  if(typeof(next) == 'undefined') return;
  next[0].innerText += next[1];
}, 50);

screen('start');

