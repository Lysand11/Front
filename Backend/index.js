const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const app = express(); // la constante app tendrá ahora todo el funcionamiento del servidor
const { connectDB } = require('./database');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json()); // método que ayuda a convertir el código para que el servidor pueda entender lo que viene del cliente.
app.use(cors());

// rutas de nuestro servidor
app.use('/api/empleados',require('./routes/empleado.routes'));

// Iniciando el servidor
connectDB()
    .then(() => {
        app.listen(app.get('port'), () => {
            console.log('server activo en el puerto', app.get('port'));
        });
    })
    .catch((error) => {
        console.error('No se pudo conectar a MongoDB:', error.message);
        process.exit(1);
    });

    module.exports = app;