//Creamos función que nos hará llegar a un middleware de tipo error:
const logErrors = (err, req, res, next) => {
  console.group(err); //mostrar el error en servidor para poder monitorearlo
  next(err); //importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
};

// Crear formato para devolverlo al cliente que se complementa con la función anterior:
const errorsHandler = (err, req, res, next) => {
  // Crear formato para devolverlo al cliente que se complementa con la función anterior:
  res.status(500).json({
    //indicar que el error es estatus 500 Internal Server Error
    message: err.message, //mostrar al cliente el mensaje de error
    stack: err.stack, //mostrar info del error
  });
};

//este meddleware es para controlar si el error es del tipo Boom
const boomErrorsHandler = (err, req, res, next) => {
  if (err.isBoom) {
    //aca se pregunta si es del tipo boom
    const { output } = err; //output es una propiedad pre definida de la libreria boom
    res.status(output.statusCode).json(output.payload);output // si no es del tipo boom (output.statusCode) se encarga de buscar el codigo y (output.payload) el msj de erro
  } else{ // el else es para cortar el sincronismo del codigo por q si era del tipo boom sin el else seguia al next(err) y en realidad se tenia q terminar en la parte true del if, esto hacia que tire un erro que decia "Cannot set headers after they are sent to the client"
    next(err);
  }
};

module.exports = { logErrors, errorsHandler, boomErrorsHandler };
//si no es del tipo boom tiraremos este codigo para controlar el erro nomral
