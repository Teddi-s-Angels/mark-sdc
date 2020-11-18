const express = require('express');
const app = express();
const PORT = 3333;

app.use(express.static('../client/dist')); // Host your dist folder up to the server
app.use(express.json());
// Listening for requests on the PORT
app.listen(PORT, () => {
    console.log('Serving up now at '+ JSON.stringify(PORT))
});