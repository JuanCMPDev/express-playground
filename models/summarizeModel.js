// models/summarizeModel.js
let summarizer = null;

// Model initialization function
// This function should be called before using the summarizeModel function
export const initializeSummarizer = async () => {
    try {
        console.log('Inicializando modelo de resumen...');
        const { pipeline } = await import('@xenova/transformers');
        summarizer = await pipeline('summarization', 'Xenova/bart-large-cnn');
        console.log('Modelo de resumen inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar el modelo de resumen:', error);
        throw error;
    }
};

// Function to summarize text
const summarizeModel = async (text) => {
    try {
        if (!summarizer) {
            throw new Error('El modelo de resumen no ha sido inicializado. Llama a initializeSummarizer() primero.');
        }

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