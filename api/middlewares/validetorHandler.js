const boom = require('@hapi/boom');

// Aquí se crea un middleware de forma dinámica (se usa closure).

// Si se recibe el schema, con schema.validate() se valida la información que se desea validar. La información viene de data, la cual viene de un request (body, params, query).

// Si hay un error (no cumple con la validación), entonces se envía un error de tipo boom. Si no hay error, el servicio sigue (next()).

// con { abortEarly: false } me manda todo los errores juntos y no uno por uno

const validatorJoiHandler = (schema, propiedadReq) => {
  return (req, res, next) => {
    const data = req[propiedadReq];
              // req.body;
              // req.params;
              // req.query;
    const { error } = schema.validate(data, { abortEarly: false });
    if(error){
      next(boom.badRequest(error));
    }
    next();
  };
};

module.exports = validatorJoiHandler;
