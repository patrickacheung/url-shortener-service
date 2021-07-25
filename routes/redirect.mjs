import express from 'express';

import {query} from '../db/pool.mjs';

const router = new express.Router();
const redirectQueryText = 'SELECT original_url FROM urls WHERE shortened_url = $1';

router.get('/:code', async (req, res) => {
  const shortCode = req.params.code;
  const shortUrl = 'http://' + req.get('Host') + '/' + shortCode;
  try {
    const queryRes = await query(redirectQueryText, [shortUrl]);
    if (queryRes.rows.length == 0) {
      return res.status(400).json({
        status: 'shortcode not found',
      });
    }

    res.redirect(queryRes.rows[0].original_url);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'internal server error',
    });
  }
});

export default router;
