// scripts/copy-views.js
const shell = require('shelljs');

// Remove existing dist/views directory
shell.rm('-rf', 'dist/views');

// Copy views from src to dist
shell.cp('-R', 'src/views', 'dist/views');
