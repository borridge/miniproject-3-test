require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Monster = require('../models/Monster');

const seed = async () => {
  console.log('🌱 Starting seed process...');
  await connectDB();
  console.log('✅ MongoDB connected');

  const res = await axios.get('https://www.dnd5eapi.co/api/monsters');
  const results = res.data.results.slice(0, 50);

  const monsterData = [];

  for (let result of results) {
    console.log(`📥 Fetching details for: ${result.name}`);
    const detail = await axios.get(`https://www.dnd5eapi.co${result.url}`);
    const m = detail.data;

    monsterData.push({
      index: m.index,
      name: m.name,
      type: m.type,
      size: m.size,
      alignment: m.alignment,
      armor_class: m.armor_class?.[0]?.value || m.armor_class || 0,
      hit_points: m.hit_points,
      challenge_rating: m.challenge_rating,
    });
  }

  console.log('🧹 Clearing old data...');
  await Monster.deleteMany({});
  console.log('📦 Inserting new monster data...');
  await Monster.insertMany(monsterData);
  console.log('✅ Database seeded successfully!');
  process.exit();
};

seed();
