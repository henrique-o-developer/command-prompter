const child_process = require("child_process");
const readline = require('readline');

exports.module = (mode = "shell", name = "prompt") => {
    new Promise(() => {
        var pass = () => { exec(mode) };
        var rl = readline.createInterface(process.stdin, process.stdout);

        console.log(`
${name}

to change the mode type >>>changeMode newMode
        `)

        function exec() {
            rl.setPrompt(`(${mode}) ${__dirname} >>>`)
            rl.prompt();

            rl.on('line', cmd => {
                let bap = false;

                cmd = cmd.trim();  

                if (cmd.startsWith("changeMode")) {
                    mode = cmd.split(" ")[1];

                    return pass();
                }

                switch (mode) {
                    case "node": {
                        console.log(eval(cmd));

                        return pass();
                    }

                    case "shell": {
                        bap = true;

                        return child_process.exec(cmd, (error, stdout, stderr) => { if (error) { console.log(`err: ${error.message}`); return; } if (stderr) { console.log(`STD err: ${stderr}`); return; } console.log(`${stdout}`); pass(); })
                    }


                }

                if (!bap) return pass();
            })
        }

        pass();
    
        return {
            getMode() {
                return mode;
            }
        }

    })
}