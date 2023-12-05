const express = require('express');
const userServices = require('./../services/userServices');

const router = express.Router();

const service = new userServices();

router.get('/', async (req, res) => {
  const personas = await  service.find();
  res.status(200).json({ personas });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const persona = service.findOne(id);
  if (!persona) {
    res.status(400).json({
      message: `la persona con el ${id} no existe`,
    });
  } else {
    res.status(200).json({ persona });
  }
});

router.post('/', (req, res) => {
  const body = req.body
  const persona = service.create(body)
  res.status(201).json({ persona, message: "usuario creado" })
})

router.patch('/:id', (req, res) => {
  const body = req.body
  const { id } = req.params
  const persona = service.modificar(id, body)
  res.status(201).json({ persona, message: "usuario fue modificado" })
})

// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset,
//     });
//   } else {
//     res.send('no existe');
//   }
// });

module.exports = router;
