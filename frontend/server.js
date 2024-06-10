const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

if (process.env.AMBIENTE == 'prd') {
    console.log(" ### -> Production environment")
}
else {
    console.log(" ### -> Development environment");
}
// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + '/dist/frontend/browser'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/browser/index.html'));
});

// Inicia a aplicação pela porta configurada
app.listen(port);
console.log(" ### -> Api available on port " + port + "\n")