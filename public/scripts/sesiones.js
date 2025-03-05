const bcrypt = require('bcryptjs');

// Función para buscar un usuario por nombre y contraseña
function findUser(db, username, password, callback) {
    const query = "SELECT * FROM usuarios WHERE nombre = ?";

    db.get(query, [username], (err, user) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return callback(err, null);
        }
        if (!user) {
            return callback(null, null); // Usuario no encontrado
        }

        // Comparar la contraseña con la almacenada (encriptada)
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return callback(null, null); // Contraseña incorrecta
        }

        callback(null, user); // Devuelve el usuario si coincide
    });
}

// Función para registrar un usuario si no existe con el mismo nombre o email
function registerUser(db, userData, callback) {
    const { username, password, email } = userData;

    // Verificar si el usuario o el email ya existen
    const checkQuery = 'SELECT * FROM usuarios WHERE nombre = ? OR email = ?';

    db.get(checkQuery, [username, email], (err, existingUser) => {
        if (err) {
            console.error('Error al verificar usuario:', err);
            return callback(err, null);
        }
        if (existingUser) {
            return callback(null, { error: 'El nombre o el email ya están registrados' });
        }

        // Encriptar la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insertar el nuevo usuario
        const insertQuery = 'INSERT INTO usuarios (nombre, password, email) VALUES (?, ?, ?)';

        db.run(insertQuery, [username, hashedPassword, email], function (err) {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return callback(err, null);
            }
            callback(null, { message: 'Usuario registrado correctamente', user_id: this.lastID });
        });
    });
}

module.exports = {
    findUser,
    registerUser
};
