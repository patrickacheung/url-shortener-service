import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
  res.send('i am redirect!');
});

export default router;
