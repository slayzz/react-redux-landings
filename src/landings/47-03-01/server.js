import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import util from 'util';

import Contaner from './Container';
import configureStore from './redux/configureStore';

const port = process.env.PORT || 3000;
const app = express();

const landName = process.env.LAND_NAME;
app.use(express.static(`src/landings/${landName}/dist/`));
app.use(express.static('static'));

const insertContent = (html, content) => html.replace('{html}', content);
const store = configureStore();

app.get('/', async (req, res) => {
  const readFile = util.promisify(fs.readFile);
  const htmlContent = await readFile(`src/landings/${landName}/dist/index.template.html`);
  const changedHtml = insertContent(htmlContent.toString(), renderToString(<Contaner store={store} />));
  res.send(changedHtml);
});

app.listen(port, () => console.log(`Serving at localost:${port}`));
