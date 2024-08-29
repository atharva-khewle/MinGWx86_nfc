const express = require('express');
const cors = require('cors');

const app = express();

// Enable all CORS requests
app.use(cors());

app.get('/', (req, res) => {
  res.send('CORS is enabled! and server running lessssssssssss gooooooooooooooooooooooooooooooooooo');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
