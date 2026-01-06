import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';
import app from './app.js';

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
