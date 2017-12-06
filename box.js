"use strict"; // ES6

// Listen for keypresses and call the handler
window.addEventListener('keyup', e => {
  switch(e.key){
    case '4':
      CommanderBox.handle('key');
      break;
    case 'b':
      CommanderBox.handle('1');
      break;
    case '7':
      CommanderBox.handle('2');
      break;
    case 'f':
      CommanderBox.handle('3');
      break;
    case 'z':
      CommanderBox.handle('a');
      break;
    case 'o':
      CommanderBox.handle('b');
      break;
  }
});

const CommanderBox = {
  output: document.querySelector('.output'),
  buffer: [],
  handlers: {},

  // Adds text to the buffer to be written to the page
  write: (text, tag)=>{
    const element = document.createElement(tag);
    CommanderBox.output.appendChild(element);
    text.match(/ *./g).forEach(letter => CommanderBox.buffer.push([element, letter]));
  },

  // Loads a screen (js file)
  screen: (screen)=>{
    CommanderBox.off();
    CommanderBox.clear();
    fetch(`screens/${screen}.js`).then(response => {
      response.text().then(body => {
        eval(body);
      });
    });
  },

  // Clears the screen
  clear: ()=>{
    CommanderBox.output.innerHTML = '';
  },

  // Handles a (button/key/switch) event
  handle: (button)=>{
    const eventHandler = CommanderBox.handlers[button];
    if(typeof(eventHandler) == 'undefined') return;
    eventHandler();
  },

  // Disables all handlers
  off: ()=>{
    CommanderBox.handlers = {};
  },

  // Adds a handler for a button
  on: (button, func)=>{
    CommanderBox.handlers[button] = func;
  }
}

CommanderBox.screen('start');

// Every X, writes more text
setInterval(()=>{
  const next = CommanderBox.buffer.shift()
  if(typeof(next) == 'undefined') return;
  next[0].innerText += next[1];
}, 50);
