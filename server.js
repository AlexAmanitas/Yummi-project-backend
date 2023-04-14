const { httpServer } = require('./app');

const mongoose = require('mongoose');

const { DB_HOST, PORT = 3003 } = process.env;

mongoose.set('strictQuery', true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connect success');
    httpServer.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
