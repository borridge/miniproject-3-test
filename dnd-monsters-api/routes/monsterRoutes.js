const express = require('express');
const router = express.Router();
const controller = require('../controllers/monsterController');

router.post('/', controller.createMonster);
router.get('/', controller.getAllMonsters);
router.get('/:id', controller.getMonsterById);
router.put('/:id', controller.updateMonster);
router.delete('/:id', controller.deleteMonster);

module.exports = router;
