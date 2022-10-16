# command-prompter

## pt

o command-prompter é uma biblioteca bem simples....

para usar basta usar: 

```js
const commandPrompter = require("command-prompter");

commandPrompter(
    mode /* o modo de entrada do prompt */, 
    name /* noem do prompt */, 
    newComands /* comandos adicionais ({word: "bla", ?compare(), content: "1+1"}) */, 
    blockedCommands /* comandos bloqueados ({word: "sudo", ?compare()}) */, 
    addons, /* array de addons ({setup(), command()})*/
) // => {getMode(), getArgs(), getRl(), customCode(code)}
```

# TODOS OS PARAMETROS SÃO OPCIONAIS!!!