const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorsHandler, boomErrorsHandler, sequelizeErrorHandler } = require('./middlewares/errorHandler');
const app = express();
const port = process.env.PORT ||  3001;



app.use(cors())
app.get('/api', (req, res) => {
  res.send('Hola este es mi primer servidor en Express')
})
routerApi(app);
app.use(express.json()) //el .json() es para que pueda leer los archivos .json q vienen de las api y casi todos lados como el XML

// probar en el front end cuadno termine el curso a ver si esto anda por q parece q  hay q pulirlo, la case es la 24 para fijarse, tengo q agregar al array de whiteList la direccion de IP q tenga en el front

//-------------------forma para que CORS abilite url q yo quiera para hacer las recues


// const whiteList = ['http://localhost:3001', 'http://myapp.co'] // aca habilitos las url que les permitos acceder a mi informacion
// const options = {
//   origin: (origin, callback) =>{
//     if(whiteList.includes(origin) || !origin) {
//       callback(null, true) // el callback aca le da permiso
//     } else {
//       callback(new Error('no tiene permiso para axeder'))// el callback aca le niega el acceso
//     }
//   }
// }
// app.use(cors(options)) //y aca pasamos el options a los cors, no le damos el accesos a todos como con app.use(cors())

// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(boomErrorsHandler)
app.use(errorsHandler);

app.listen(port, () => {
  console.log('mi port' + port);
});
