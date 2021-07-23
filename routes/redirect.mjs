import express from 'express';

const router = new express.Router();

router.get('/:code', (req, res) => {
  // check if shortCode exists in postgres.

  // if not return failure message + status code

  res.redirect('https://www.wikipedia.org');
});

export default router;
