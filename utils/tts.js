// utils/tts.js
import { KokoroTTS } from "kokoro-js";

const model_id = "onnx-community/Kokoro-82M-ONNX";
let kokoroTTS = null;

// Model initialization function
// This function should be called before using the tts function
export const initializeTTS = async () => {
    try {
        console.log('Inicializando modelo TTS...');
        kokoroTTS = await KokoroTTS.from_pretrained(model_id, {
            dtype: "q8",
        });
        console.log('Modelo TTS inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar el modelo TTS:', error);
        throw error;
    }
};

// Function to convert text to speech
const tts = async (text, options = {}) => {
    try {
        if (!kokoroTTS) {
            throw new Error('El modelo TTS no ha sido inicializado. Llama a initializeTTS() primero.');
        }

        const audio = await kokoroTTS.generate(text, {
            voice: "af_bella",
        });

        return audio.save("audio.mp3");
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default tts;