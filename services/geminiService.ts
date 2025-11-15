import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Question } from '../types';

// Fix: Directly initialize GoogleGenAI with process.env.API_KEY as per coding guidelines, removing the explicit check.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const questionSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            questionText: {
                type: Type.STRING,
                description: "The question for the user, e.g., 'Lanjutkan ayat setelah...' or 'Sebutkan ayat ke-15 dari Surah...'. Must be in Bahasa Indonesia."
            },
            options: {
                type: Type.ARRAY,
                description: "An array of exactly 4 strings representing the multiple-choice options. All options must be in Arabic script.",
                items: {
                    type: Type.STRING
                }
            },
            correctAnswer: {
                type: Type.STRING,
                description: "The correct answer (the verse itself) in Arabic script. This must exactly match one of the strings in the 'options' array."
            },
            reference: {
                type: Type.STRING,
                description: "The reference of the correct verse, e.g., 'Al-Baqarah: 255'."
            }
        },
        required: ["questionText", "options", "correctAnswer", "reference"]
    }
};

const getDifficultyInstructions = (difficulty: Difficulty) => {
    switch(difficulty) {
        case 'Mudah':
            return "For 'Mudah' (Easy) level: Provide a verse and ask the user to provide the *next* verse. The question should be like 'Lanjutkan ayat berikut: [ayat]'. The options should be four different verses, one of which is the correct next verse.";
        case 'Sedang':
            return "For 'Sedang' (Medium) level: Ask the user to recite a *specific* verse from a Surah within the selected Juz. The question should be like 'Sebutkan bunyi ayat ke-[nomor] dari Surah [nama surah]'. The options should be four different verses from the same Juz.";
        case 'Susah':
            return "For 'Susah' (Hard) level: Provide a *fragment* or the *end* of a verse and ask the user to complete it and identify the Surah and verse number. The question should be like 'Lengkapi potongan ayat berikut: [...potongan ayat...]'. The options should be four complete verses that plausibly complete the fragment.";
    }
}

export const generateQuestions = async (juz: number[], difficulty: Difficulty): Promise<Question[]> => {
    const difficultyInstruction = getDifficultyInstructions(difficulty);
    const prompt = `
        You are an expert in the Quran. Your task is to generate 5 multiple-choice Quran memorization questions in Bahasa Indonesia.
        The questions must be based on the content of Juz ${juz.join(', ')}.
        The difficulty level is ${difficulty}.

        ${difficultyInstruction}

        Rules:
        1. All questions must be in Bahasa Indonesia.
        2. Provide exactly 4 options for each question in the 'options' array.
        3. One option must be the correct answer. The other three must be plausible but incorrect distractors, preferably from nearby verses or the same Surah to make it challenging.
        4. The 'correctAnswer' field must contain the exact string of the correct option from the 'options' array.
        5. All options and the correct answer must be in Arabic script.
        6. The 'reference' must be accurate for the correct answer (Surah name: verse number).
        7. Do not repeat questions.
        8. Provide a diverse set of questions from different Surahs within the selected Juz.

        Return the response as a JSON array that validates against the provided schema.
    `;

    try {
        console.log("Generating new questions from API...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: questionSchema,
            },
        });

        const jsonString = response.text.trim();
        const questions = JSON.parse(jsonString);
        
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("No questions generated or invalid format.");
        }

        // Basic validation
        if (!questions.every(q => q.options && q.options.length === 4 && q.options.includes(q.correctAnswer))) {
            throw new Error("Generated data does not conform to the multiple-choice structure.");
        }
        
        return questions as Question[];
    } catch (error) {
        console.error("Error generating questions with Gemini:", error);
        // Fallback or re-throw
        throw new Error("Gagal membuat pertanyaan. Silakan coba lagi.");
    }
};