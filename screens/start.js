"use strict"; // ES6

write('System Activated', 'h1');
write('Turn key to authenticate.', 'p');

on('key', ()=>{
  alert('key turned');
});
