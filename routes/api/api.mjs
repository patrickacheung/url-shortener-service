import express from 'express';

const router = new express.Router();

router.get('/shorten', (req, res) => {
  res.send('i am shorten api');
});

router.get('/redirect', (req, res) => {
  res.send('i am redirect api');
});

router.get('/get', (req, res) => {
  res.send('i am get api');
});

export default router;
