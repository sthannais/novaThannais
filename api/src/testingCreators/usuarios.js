const { Personal, Rol, Administrador, Auxiliar, Ayudante, Chofer, AdministradorMaestro } = require('../db')
const bcrypt = require('bcryptjs');

const choferes = [
    {
        name: 'Juan',
        lastname: 'Perez',
        email: 'juan@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Pedro',
        lastname: 'Gomez',
        email: 'pedro@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Maria',
        lastname: 'Gonzalez',
        email: 'maria@gmail.com',
        password: '123456789',
        rut: '123456789',
    }
]

const auxiliares = [
    {
        name: 'Jose',
        lastname: 'Perez',
        email: 'jose@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Luis',
        lastname: 'Gomez',  
        email: 'Luis@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Ana',
        lastname: 'Gonzalez',
        email: 'ana@gmail.com',
        password: '123456789',
        rut: '123456789',
    }
]

const ayudantes = [
    {
        name: 'Carlos',
        lastname: 'Perez',
        email: 'carlos@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Miguel',
        lastname: 'Gomez',
        email: 'miguel@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Lucia',
        lastname: 'Gonzalez',
        email: 'lucia@gmail.com',
        password: '123456789',
        rut: '123456789',
    }
]

const administradores = [
    {
        name: 'Jorge',
        lastname: 'Perez',
        email: 'jorge@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Raul',
        lastname: 'Gomez',
        email: 'raul@gmail.com',
        password: '123456789',
        rut: '123456789',
    },
    {
        name: 'Sofia',
        lastname: 'Gonzalez',
        email: 'sofia@gmail.com',
        password: '123456789',
        rut: '123456789',
    }
]

const administradorMaestro = [
    {
        name: 'Jorge',
        lastname: 'Soto',
        email: 'jorgesoto@gmail.com',
        password: '123456789',
        rut: '123456789',
    }
]

const createChoferes = async () => {

    choferes.map(c => async function () {

        const actualChofer = await Personal.create({
            name: c.name,
            lastname: c.lastname,
            email: c.email,
            password: bcrypt.hashSync(c.password, 10),
            rut: c.rut,
        });

        // Seteo el chofer al personal
        const chofer = await Chofer.create();
        actualChofer.setChofer(chofer);

        // Seteo el rol al personal
        const rol = await Rol.findOne({
            where: {
                name: 'Chofer'
            }
        });
        actualChofer.setRol(rol);

    }())
};

const createAuxiliares = async () => {

    auxiliares.map(c => async function () {

        const actualAuxiliar = await Personal.create({
            name: c.name,
            lastname: c.lastname,
            email: c.email,
            password: bcrypt.hashSync(c.password, 10),
            rut: c.rut,
        });

        // Seteo el auxiliar al personal
        const auxiliar = await Auxiliar.create();
        actualAuxiliar.setAuxiliar(auxiliar);

        // Seteo el rol al personal
        const rol = await Rol.findOne({
            where: {
                name: 'Auxiliar'
            }
        });
        actualAuxiliar.setRol(rol);

    }())
};

const createAyudantes = async () => {

    ayudantes.map(c => async function () {

        const actualAyudante = await Personal.create({
            name: c.name,
            lastname: c.lastname,
            email: c.email,
            password: bcrypt.hashSync(c.password, 10),
            rut: c.rut,
        });

        // Seteo el ayudante al personal
        const ayudante = await Ayudante.create();
        actualAyudante.setAyudante(ayudante);

        // Seteo el rol al personal
        const rol = await Rol.findOne({
            where: {
                name: 'Ayudante'
            }
        });
        actualAyudante.setRol(rol);

    }())
};

const createAdministradores = async () => {

    administradores.map(c => async function () {

        const actualAdministrador = await Personal.create({
            name: c.name,
            lastname: c.lastname,
            email: c.email,
            password: bcrypt.hashSync(c.password, 10),
            rut: c.rut,
        });

        // Seteo el administrador al personal
        const administrador = await Administrador.create();
        actualAdministrador.setAdministrador(administrador);

        // Seteo el rol al personal
        const rol = await Rol.findOne({
            where: {
                name: 'Administrador'
            }
        });
        actualAdministrador.setRol(rol);

    }())
};


module.exports = {
    createChoferes,
    createAuxiliares,
    createAyudantes,
    createAdministradores,
};



