const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const { Pool } = require("pg");

//configurar la conexion a la base de datos postgreSQL
const pool = new Pool({
    user: 'admin',
    host: 'dpg-cpfng2btg9os73bhr4l0-a',
    database: 'belleza_plus_er_22nu',
    password: 'k6W6fKoMnR1IbD4BQpcGy1tKdCSGYlCB',
    port: 5432, //Puerto predeterminado de postgreSQL
});

const app = express();
app.use(cors());
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configura Express para servir archivos estáticos desde el directorio 'public'-------------------------------
app.use(express.static('public'));
//

/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'belleza_plus_er'
});*/

pool.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos establecida');
});

// Middleware para parsear JSON
app.use(express.json());

app.get('entregable-final/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('entregable-final/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM usuario WHERE correo = ?';
    pool.query(query, [email], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            const hashedPassword = result[0].clave;
            bcrypt.compare(password, hashedPassword, (err, bcryptResult) => {
                if (bcryptResult) {
                    res.json({ exists: true });
                } else {
                    res.json({ exists: false });
                }
            });
        } else {
            res.json({ exists: false });
        }
    });
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const inserUserQuery = 'INSERT INTO usuario (nombre, correo, clave) VALUES (?, ?, ?)';
    const checkUsernameQuery = 'SELECT * FROM usuario WHERE correo = ?';

    pool.query(checkUsernameQuery, [email], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                throw err;
            }
            pool.query(inserUserQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    throw err;
                }
                res.json({ registered: true });
            });
        });
    });
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'entregable-final/signup.html'));
});

app.get('/indexAlex', (req, res) => {
    res.sendFile(path.join(__dirname, 'entregable-final/indexAlex.html'));
});

app.get('/logout', (req, res) => {
    res.redirect('/login.html');
});







//-------------------------------------------------------------



app.get('/CRUDRepo/ConsultarUsuarios', (req, res) => {
    pool.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

// Ruta para agregar una nueva persona
app.post('/CRUDRepo/AgregarUsuario', (req, res) => {
    const { nombre, correo, clave } = req.body;
    console.log("llegando a crear usuario");
    pool.query('INSERT INTO usuario (nombre, correo, clave ) VALUES (?, ?, ?)', [nombre, correo, clave], (err, results) => {
        if (err) {
            console.error('Error al agregar el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: '¡Usuario agregado exitosamente!' });
    });
});


app.put('/CRUDRepo/ActualizarUsuario/:id_Usuario', (req, res) => {
    const { id_Usuario } = req.params;
    const { nombre, correo } = req.body;
    console.log("Id_Usuario: " + id_Usuario);
    console.log("nombre: " + nombre);
    console.log("correo: " + correo);
    pool.query('UPDATE usuario SET nombre = ?, correo = ? WHERE id_Usuario = ?', [nombre, correo, id_Usuario], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: '¡Datos del usuario actualizados exitosamente!' });
    });
});

app.delete('/CRUDRepo/EliminarUsuario/:id_Usuario', (req, res) => {
    const { id_Usuario } = req.params;
    pool.query('DELETE FROM usuario WHERE id_Usuario = ?', [id_Usuario], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});




