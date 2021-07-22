import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
  res.send('i am index!');
});

export default router;
