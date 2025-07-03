// utils/tts.js
import { KokoroTTS } from 'kokoro-js';

const model_id = "onnx-community/Kokoro-82M-ONNX";

const tts = async (text, options = {}) => {
    try {
        const kokoroTTS = await KokoroTTS.from_pretrained(model_id, {
            dtype: "q8",
        });

        const audio = await kokoroTTS.generate(text, {
            voice: options.voice || "af_bella",
        });
        
        return audio.save('audio.mp3');
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default tts;