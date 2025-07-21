require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const monsterRoutes = require('./routes/monsterRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
connectDB();

app.get('/', (req, res) => {
  res.send('🧙 Welcome to the D&D Monsters API. Visit /api/monsters or /api-docs');
});

app.use(express.json());
app.use('/api/monsters', monsterRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
