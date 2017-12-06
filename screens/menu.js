"use strict"; // ES6

CommanderBox.write('Main Menu', 'h1');
CommanderBox.write('Please press one of the following buttons:', 'p');
CommanderBox.write('[1] Something', 'p');
CommanderBox.write('Or turn key to lock system.', 'p');

CommanderBox.on('key', ()=> CommanderBox.screen('start'));
