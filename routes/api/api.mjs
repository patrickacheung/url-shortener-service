import express from 'express';

const router = new express.Router();
const baseUrl = 'http://localhost:5000';

router.post('/shorten', async (req, res) => {
  const {longUrl} = req.body;

  // check if longUrl is a valid url

  // if valid, generate the short

  res.json({
    baseUrl: baseUrl,
    longUrl: longUrl,
  });
});

router.get('/get', (req, res) => {
  res.send('i am get api');
});

export default router;
