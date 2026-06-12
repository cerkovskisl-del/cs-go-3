const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

// Šī rindiņa liks serverim rādīt tavu HTML failu
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('Spēlētājs pieslēdzās: ' + socket.id);

    // Šeit tu vēlāk pievienosi spēles loģiku (piem., pozīciju sūtīšanu)
    socket.on('gajiens', (dati) => {
        socket.broadcast.emit('gajiens', dati);
    });

    socket.on('disconnect', () => {
        console.log('Spēlētājs atslēdzās');
    });
});

// IZMAIŅA ŠEIT: Render videi ir obligāti vajadzīgs '0.0.0.0' portam
const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveris darbojas uz porta ${PORT}`);
});
