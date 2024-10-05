const { spawn } = require('child_process');  
const os = require('os');  

const platform = os.platform();  

let command;  
let args;  

if (platform === 'win32') {  
    // Windows  
    command = 'powershell';  
    args = ['-Command', '$env:PWD = (Get-Location).Path; cross-env INIT_CWD=$PWD next dev"'];  
} else {  
    // Linux or macOS  
    command = 'sh';  
    args = ['-c', 'cross-env INIT_CWD=$PWD next dev"'];  
}  

const child = spawn(command, args, { stdio: 'inherit', shell: true });  

child.on('error', (error) => {  
    console.error(`Error: ${error.message}`);  
});  

child.on('exit', (code) => {  
    console.log(`Process exited with code ${code}`);  
});