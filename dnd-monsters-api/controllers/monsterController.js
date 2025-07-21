const mongoose = require('mongoose');
const Monster = require('../models/Monster');

exports.createMonster = async (req, res) => {
  try {
    const monster = new Monster(req.body);
    await monster.save();
    res.status(201).json(monster);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create monster' });
  }
};

exports.getAllMonsters = async (req, res) => {
  try {
    const monsters = await Monster.find();
    res.json(monsters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve monsters' });
  }
};

exports.getMonsterById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid monster ID format' });
  }

  try {
    const monster = await Monster.findById(id);
    if (!monster) return res.status(404).json({ error: 'Monster not found' });
    res.json(monster);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve monster' });
  }
};

exports.updateMonster = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid monster ID format' });
  }

  try {
    const updated = await Monster.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Monster not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update monster' });
  }
};

exports.deleteMonster = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid monster ID format' });
  }

  try {
    const deleted = await Monster.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Monster not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete monster' });
  }
};
