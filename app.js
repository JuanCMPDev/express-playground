// app.js
import express from 'express';
import multer from 'multer';
import summarizeController from './controllers/summarizeController.js';
import { initializeSummarizer } from './models/summarizeModel.js';
import { initializeTTS } from './utils/tts.js';

const app = express();
const upload = multer({ dest: './uploads/' });

app.post('/summarize', upload.single('article'), summarizeController);

const port = 3000;

// Initialize models before starting the server
const initializeModels = async () => {
    try {
        console.log('Iniciando carga de modelos...');

        // Initialize summarizer and TTS models
        await Promise.all([
            initializeSummarizer(),
            initializeTTS()
        ]);

        console.log('Todos los modelos han sido inicializados correctamente');
    } catch (error) {
        console.error('Error al inicializar los modelos:', error);
        process.exit(1); // Exit the process if models fail to initialize
    }
};

// Initialize models and then start the server
const startServer = async () => {
    await initializeModels();

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log('Modelos cargados y servidor listo para recibir peticiones');
    });
};

startServer().catch(error => {
    console.error('Error al arrancar el servidor:', error);
    process.exit(1);
});