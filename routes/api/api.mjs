import express from 'express';
import validUrl from 'valid-url';
import {nanoid} from 'nanoid';

import {query} from '../../db/pool.mjs';

const router = new express.Router();
const insertQueryText = 'INSERT INTO urls(shortened_url, original_url) VALUES($1, $2) RETURNING id';
const getQueryText = 'SELECT * FROM urls WHERE id = $1';

router.post('/shorten', async (req, res) => {
  const baseUrl = 'http://' + req.get('Host');
  const {originalUrl} = req.body;

  if (!validUrl.isWebUri(originalUrl)) {
    return res.status(400).json({
      status: 'originalUrl is invalid',
    });
  }

  const shortId = nanoid();
  const shortenedUrl = baseUrl + '/' + shortId;

  try {
    const queryRes = await query(insertQueryText, [shortenedUrl, originalUrl]);
    
    res.json({
      id: queryRes.rows[0].id,
      shortened_url: shortenedUrl,
      original_url: originalUrl,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'internal server error',
    });
  }
});

router.get('/urls/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const queryRes = await query(getQueryText, [id]);
    console.log(queryRes);

    res.json({
      id: req.params.id,
      shortened_url: 'shortenedUrl',
      original_url: 'originalUrl',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'internal server error',
    });
  }
});

export default router;
