const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
    const {tittle, owner} = request.queru;

    return response.json([
        "projeto x",
        "projeto 02",
    ]);
}); 

app.post('/projects', (request, response) => {
    return response.json([
        "projeto 03",
        "projeto 04",
    ]);
}); 


app.put('/projects/:id', (request, response) => {
    return response.json([
        "projeto 05",
        "projeto 06",
    ]);
}); 


app.delete('/projects/:id', (request, response) => {
    return response.json([
        "projeto 01",
        "projeto 02",
    ]);
}); 


app.listen(3333, () => {
    console.log("Backend Started :D")
});