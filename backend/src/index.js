const express = require('express');
const server = express();
server.use(express.json());

const taksRoutes = require('./routes/taskRoutes');
server.use('/task', taksRoutes);

server.get('/teste', (req, res) => {
    res.send('Bem Vindo');
})

server.listen(3000, () => {
    console.log('API ONLINE');
});