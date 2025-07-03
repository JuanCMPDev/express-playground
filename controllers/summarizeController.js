// controllers/summarizeController.js
import fs from 'fs';
import summarizeModel from '../models/summarizeModel.js';
import tts from '../utils/tts.js';

const summarize = async (req, res) => {
    try {
        const articlePath = req.file.path;
        const articleText = fs.readFileSync(articlePath, 'utf8');

        // Summarize the article
        const summarizedText = await summarizeModel(articleText);

        console.log(summarizedText);


        // Convert the summarized text to speech
        const audioBuffer = await tts(summarizedText);


        // Set metadata
        const metadata = {
            title: 'Summarized Article',
            artist: 'AI',
            album: 'Summarized Articles',
        };

        // Return the audio and metadata
        res.set("Content-Disposition", `attachment; filename="summarized-article.mp3"`);
        res.set("Content-Type", "audio/mpeg");
        res.set("metadata", JSON.stringify(metadata));
        res.send(audioBuffer);

        // Remove the uploaded file
        fs.unlinkSync(articlePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export default summarize;