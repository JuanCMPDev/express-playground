// app.js
import express from 'express';
import multer from 'multer';
import summarizeController from './controllers/summarizeController.js';

const app = express();
const upload = multer({ dest: './uploads/' });

app.post('/summarize', upload.single('article'), summarizeController);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});