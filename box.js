"use strict"; // ES6

// Listen for keypresses and call the handler
const keyBindings = {
  '4': 'key',
  'b': '1',
  '7': '2',
  'f': '3',
  'z': 'a',
  'o': 'b'
}
window.addEventListener('keyup', e => CommanderBox.handle(keyBindings[e.key]));

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

  // Instantly adds HTML
  writeHTML: (html)=>{
    CommanderBox.output.innerHTML += html;
  },

  // Loads a screen (js file)
  screen: (screen)=>{
    CommanderBox.off();
    CommanderBox.clear();
    fetch(`screens/${screen}.js?${new Date().getTime()}`).then(response => {
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
