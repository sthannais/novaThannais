//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Rol, Chofer, Administrador, Ayudante, Cuadrante, Patentes, Precio } = require('./src/db.js');
const createRoles = require('./src/testingCreators/roles.js');
const createPatentes = require('./src/testingCreators/patentes.js');
const createCuadrantes = require('./src/testingCreators/cuadrante.js');
const createPrecios = require('./src/testingCreators/precios.js');
const { createChoferes, createAdministradores, createAyudantes} = require('./src/testingCreators/usuarios.js');
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    console.log(`Servidor en puerto ${PORT}`); // eslint-disable-line no-console

    const roles = await Rol.findAll();
    if (roles.length < 1) createRoles();

    const choferes = await Chofer.findAll();
    if (choferes.length < 1) createChoferes();

    // const auxiliares = await Auxiliar.findAll();
    // if (auxiliares.length < 1) createAuxiliares();

    const ayudantes = await Ayudante.findAll();
    if (ayudantes.length < 1) createAyudantes();

    const administradores = await Administrador.findAll();
    if (administradores.length < 1) createAdministradores();

    const cuadrantes = await Cuadrante.findAll();
    if (cuadrantes.length < 1) createCuadrantes();

    const patentes = await Patentes.findAll();
    if (patentes.length < 1) createPatentes();

    const precios = await Precio.findAll();
    if (precios.length < 1) createPrecios();

  });
});
