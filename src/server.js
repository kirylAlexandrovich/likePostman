import server from './app.js';

const PORT = 7180;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
