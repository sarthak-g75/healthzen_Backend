const { spawn } = require("child_process");
const hello = async()=>{
    try{

        const getPythonScriptStdout = (arg) => {
            const python = spawn('python', ['app.py', 21, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            return new Promise((resolve, reject) => {
                let result = ""
                python.stdout.on('data', (data) => {
                    result += data
                });
                python.on('close', () => {
                    resolve(result)
                });
                python.on('error', (err) => {
                    reject(err)
                });
            })
        }
        
        let charges = "" ;
        getPythonScriptStdout('./python.py').then((output) => {
            charges += output;  
            return charges
        })
    }
     catch(error){
        console.log(error.message);
     }
}
module.exports = hello;