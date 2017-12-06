"use strict"; // ES6

CommanderBox.write('System Activated', 'h1');
CommanderBox.write('Turn key to authenticate.', 'p');

CommanderBox.on('key', ()=> CommanderBox.screen('menu'));
