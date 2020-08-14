const express = require('express');
const cors = require('cors');
const { query } = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(cors());
app.use(express.json());

const projects = [];

/**
 * Middlewares
 * 
 * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dadps da requisição
 */

 function logRequests(request, response, next) {
     const { method, url } = request;

     const logLabel = `[${method.toUpperCase()}] ${url}`;

     console.log(logLabel);

     return next();
 }

 app.use(logRequests);

 function validateProjectId(request, response, next){
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({error: 'Invalid project ID'})
    }

    return next();
 }

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    const { tittle } = request.query;

    const results = tittle
        ? projects.filter (project => project.tittle.includes(tittle))
        : projects;

    return response.json(results);
}); 

app.post('/projects', (request, response) => {
    const {tittle, owner} = request.body;
    
    const project = { id: uuid(), tittle, owner};

    projects.push(project);
    
    return response.json(project);
}); 

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const {tittle, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({error:"project not found"})
    }

    const project = {
        id,
        tittle,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
}); 

app.delete('/projects/:id', (request, response) => {

    const { id } = request.params;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({error:"project not found"})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send(); 
});

app.listen(3333, () => {
    console.log("Backend Started :D")
});