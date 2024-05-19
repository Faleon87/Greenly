CREATE TABLE pregunta (
    idPregunta INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    fechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Otros campos relevantes
    UNIQUE (idUsuario, fechaHora)  -- Para evitar preguntas duplicadas del mismo usuario en el mismo momento
);


CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    -- Otros campos relevantes como email, fecha de registro, etc.
    UNIQUE (nombre)
);


CREATE TABLE likes (
    idLikes INT AUTO_INCREMENT PRIMARY KEY,
    numeroLikes INT DEFAULT 0,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
    -- Puedes añadir más campos según sea necesario
);


CREATE TABLE respuestas (
    idRespuesta INT AUTO_INCREMENT PRIMARY KEY,
    respuesta TEXT,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    fechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Otros campos relevantes
    UNIQUE (idUsuario, fechaHora)  -- Para evitar respuestas duplicadas del mismo usuario en el mismo momento
);

CREATE TABLE fotopregunta (
    idFotoPregunta INT AUTO_INCREMENT PRIMARY KEY,
    nombreFoto VARCHAR(255),
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
    -- Otros campos relevantes
);

CREATE TABLE pregunta (
    idPregunta INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    fechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Otros campos relevantes
    UNIQUE (idUsuario, fechaHora)  -- Para evitar preguntas duplicadas del mismo usuario en el mismo momento
);
