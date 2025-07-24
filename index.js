const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
