const child_process = require("child_process");
const readline = require('readline');

var langs = {
    comprompter: {
        run: () => {
            bap = true;

            if (cmd.toLowerCase().startsWith("help")) {
                console.log("langs: " + Object.keys(langs).join(", "))

                pass();
            } else pass();
        }
    },
    node: {
        run: () => {
            console.log(eval(cmd))
        }
    },
    shell: {
        run: () => {
            bap = true;

            child_process.exec(cmd, (error, stdout, stderr) => { if (error) { console.log(`err: ${error.message}`); return pass(); } if (stderr) { console.log(`STD err: ${stderr}`); return pass(); } console.log(`${stdout}`); pass(); })
        }
    }
}

exports.module = (mode = "comprompter", name = "prompt", newComands = [], blockedCommands = [], addons = []) => {
    var rl = readline.createInterface(process.stdin, process.stdout);

    if (addons instanceof String) "get All addons of this folder";
    
    addons.forEach(v => {
        eval(removeL(v.setup.toString()));
    })

    new Promise(() => {
        var pass = () => { rl.removeAllListeners(); exec(mode) };

        var f = (v, cmd, fn) => {
            v.compare = v.compare || fn
            v.mode = v.mode || mode;

            if (v.mode.toLowerCase() == mode) cmd = v.compare(cmd, v.word, v.content);

            return cmd;
        }

        console.log(`
            ${name}

            to get help use (>>>help) on comPrompter mode
        `.replaceAll("            ", ""))

        function exec() {
            rl.setPrompt(`(${mode}) ${__dirname} >>>`)
            rl.prompt();

            rl.on('line', cmd => {
                let bap = false;

                cmd = cmd.trim();  

                addons.forEach(v => {
                    eval(removeL(v.command.toString()));
                })

                newComands.forEach(v => cmd = f(v, cmd, (cmd, w, c) => cmd.replace(w, c)));
                blockedCommands.forEach(v => cmd = f(v, cmd, (cmd, w) => cmd.replace(w, "")));

                if (cmd.toLowerCase().startsWith("changemode")) {
                    if (langs[cmd.split(" ")[1].toLowerCase()]) mode = cmd.split(" ")[1];
                    else console.error("this lang not exist\nenter comPrompt and type help to help")

                    return pass();
                }

                try {
                    eval(removeL(langs[mode].run.toString()));
                } catch(e) {
                    console.log("Error: " + e)
                }

                if (!bap) return pass();
            })
        }

        pass();
    })

    return {
        getMode() {
            return mode;
        },

        getArgs() {
            return Array.from(arguments);
        },
        
        getRl() {
            return rl;
        },

        customCode(code) {
            eval(removeL(code));
        }
    }
}

function removeL(txt) {
    txt = txt.replaceAll("{", "{\n")
             .replaceAll("}", "\n}")

    let i = txt.indexOf('\n');

    txt = txt.split("").slice(i, txt.lenght).join("");

    i = txt.length -1;

    txt = txt.split("").slice(0, i-1).join("");

    return txt;
}