import { DatabaseMemory } from './database-memory.js';
import {fastify} from 'fastify';

const server = fastify();
const database = new DatabaseMemory
//GET, POST, PUT, DELETE

server.post('/videos', (request, reply)=>{
    const {title, description, duration} = request.body;

    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send();
})

server.get('/videos', (request)=>{
    const search = request.query.search
    const videos = database.list(search);

    return videos;
})

server.delete('/videos/:id', (request)=>{
    
    const videoId = request.params.id;

    database.delete(videoId)
})

server.put('/videos/:id', (request, reply)=>{
    const videoId = request.params.id;
    const {title, description, duration } = request.body;

    database.update(videoId, {
        title, description, duration,
    })

    return 'passou aqui';
})

server.listen({
    port:9999,
})