const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './.env' }); // Make sure this path is correct

const DB = process.env.DATABASE;

if (!DB) {
  console.error('DATABASE URI is not defined in .env file');
  process.exit(1);
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to local MongoDB!'))
  .catch(err => console.error('Connection error:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
