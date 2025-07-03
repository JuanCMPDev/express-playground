// models/summarizeModel.js
import { pipeline } from '@xenova/transformers';

const summarizeModel = async (text) => {
    try {
        const summarizer = await pipeline('summarization', 'Xenova/bart-large-cnn');
        const output = await summarizer(text, {
            min_length: 50,
            max_length: 200,
            do_sample: false,
        });
        return output[0].summary_text;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default summarizeModel;