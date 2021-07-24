import express from 'express';
import validUrl from 'valid-url';
import {nanoid} from 'nanoid';

const router = new express.Router();

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

  res.json({
    id: -1, // how do we generate a good id?...
    shortened_url: shortenedUrl,
    original_url: originalUrl,
  });
});

router.get('/urls/:id', (req, res) => {
  // query from db. if valid return good response, else return bad response.
  res.json({
    id: req.params.id,
    shortened_url: 'shortenedUrl',
    original_url: 'originalUrl',
  });
});

export default router;
