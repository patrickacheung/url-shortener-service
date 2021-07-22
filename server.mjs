import express from 'express';

import redirectRoute from './routes/redirect.mjs';
import apiRoutes from './routes/api/api.mjs';

const app = express();

app.use(express.json());
app.use('/', redirectRoute);
app.use('/api', apiRoutes);
app.use((req, res) => {
  res.status(404).json({
    status: '404 not found',
  });
});

app.listen(3000, () => {
  console.log('The application is running on port 3000!');
});
