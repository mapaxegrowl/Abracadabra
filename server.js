// Crear un servidor con Express en el puerto 3000
const express =require ("express");
const app = express();
app.listen(3000,()=>{
    console.log("Servidor esta siendo corrido en el puerto 3000, ruta --> http://localhost:3000")
});

// Definir la carpeta "assets" como carpeta pública del servidor
app.use(express.static("assets"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


// Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
const nombres = ['Bianca', 'Diego', 'Eduardo', 'Ignacio'];
// Ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(nombres);
});


// Middleware para validar si el usuario existe
const validarUsuarioMiddleware = (req, res, next) => {
    const usuario = req.params.usuario;
    if (nombres.includes(usuario)) {
        next(); // Usuario válido, pasa al siguiente middleware o ruta
    } else {
        res.sendFile('/assets/who.jpeg', { root: __dirname }); // Usuario no válido, devuelve la imagen
    }
};
// Ruta GET 
app.get('/abracadabra/juego/:usuario', validarUsuarioMiddleware, (req, res) => {
    const usuario = req.params.usuario;
    res.send(`<center><h1>¡Bienvenido al juego, ${usuario}!</h1> </center>`);
});


// Crear una ruta /abracadabra/conejo/:n que valide si el parámetro "n" coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.

app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = parseInt(req.params.n);
    const num = Math.floor(Math.random() * 4) + 1;
    if (n === num) {
      res.sendFile(__dirname + "/assets/conejito.jpg");
    } else {
      res.sendFile(__dirname + "/assets/voldemort.jpg");
    }
  });


//  Crear una ruta genérica que devuelva un mensaje diciendo "Esta página no existe..." al consultar una ruta que no esté definida en el servidor.
app.get("*", (req, res) => {

    res.send("<center><h1>Esta Pagina no Existe</h1></center>");
});