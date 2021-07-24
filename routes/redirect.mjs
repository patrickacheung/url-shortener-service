import express from 'express';

import {asdf, qwer} from '../db/pool.mjs';

const router = new express.Router();

router.get('/:code', (req, res) => {
  // check if shortCode exists in postgres.
  asdf();
  qwer();

  // if not return failure message + status code

  res.redirect('https://www.wikipedia.org');
});

export default router;
