import express from 'express';

import redirectRoute from './routes/redirect.mjs';
import apiRoutes from './routes/api/api.mjs';

const app = express();

app.use('/', redirectRoute);
app.use('/api', apiRoutes);
app.use((req, res, next) => {
  res.status(404).send('oh noes 404!');
});

app.listen(3000, () => {
  console.log('The application is running on port 3000!');
});
