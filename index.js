const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./db/sequelize');
const User = require('./models/user');
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);

sequelize.sync().then(() => {
  console.log("ORM table synced.");
  app.listen(3000, () => console.log(`Server running on http://localhost:${PORT}`));
});