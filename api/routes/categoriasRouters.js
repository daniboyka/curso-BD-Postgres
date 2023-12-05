// const express = require ('express');
// const categoriaServices = require('./../services/categoriasServices');

// const router = express.Router()
// const service = new categoriaServices

// router.get('/', (req, res) => {
//   const categoria = service.find()
//   res.status(200).json({categoria})
// });

// router.get('/:id', (req, res) => {
//   const {id} = req.params
//   const categoria = service.findOne(id)

//   if (!categoria) {
//     res.status(400).json({
//       message: `la categoria con el ${id} no existe`
//     });
//   } else {
//     res.status(200).json({categoria});
//   }
// });


// router.get('/:categoriaid/productos/:productoId', (req, res) => {
//   const { categoriaid, productoId } = req.params;
//   res.json({
//     categoriaid,
//     productoId,
//     name: 'salsa',
//     precie: 2,
//   });
// });

module.exports = router
