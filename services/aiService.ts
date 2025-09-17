import { GoogleGenAI, Type } from "@google/genai";
import { WritingSubcategory, WritingSeed, AIWritingFeedback, AIGrammarFeedback, AISuggestionsFeedback, FoundationTopic, PracticeMode, AIGeneratedTopic, AIGeneratedTemplate, RewriteAction, AIRewriteResponse, BilingualWord, AIGeneratedVstepAnswer, ExamTask, ExamPart, Tip, CambridgeTestPart, CambridgeQuestion } from '../types';
import { getPrompts } from './promptService';

const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

const grammarFeedbackSchema = {
  type: Type.OBJECT,
  properties: {
    errors: {
      type: Type.ARRAY,
      description: "An array of specific grammar and spelling errors found in the text.",
      items: {
        type: Type.OBJECT,
        properties: {
          error_text: { type: Type.STRING, description: "The incorrect part of the student's sentence." },
          correction: { type: Type.STRING, description: "The corrected version of that part." },
          explanation_vi: { type: Type.STRING, description: "A clear explanation of the error in Vietnamese." }
        },
        required: ['error_text', 'correction', 'explanation_vi']
      }
    },
    corrected_full_text: { type: Type.STRING, description: "The complete, corrected version of the student's text." },
    general_feedback_vi: { type: Type.STRING, description: "A brief, encouraging general feedback in Vietnamese. If the sentence is perfect, congratulate the user." }
  },
  required: ['errors', 'corrected_full_text', 'general_feedback_vi']
};

const suggestionsFeedbackSchema = {
  type: Type.OBJECT,
  properties: {
    suggestions: {
      type: Type.ARRAY,
      description: "An array of suggestions for improving the text.",
      items: {
        type: Type.OBJECT,
        properties: {
          suggestion_type: { type: Type.STRING, description: "The type of suggestion (e.g., 'Vocabulary', 'Sentence Structure', 'Clarity')." },
          original_text: { type: Type.STRING, description: "The part of the original text that could be improved." },
          suggested_text: { type: Type.STRING, description: "An improved or alternative phrasing." },
          explanation_vi: { type: Type.STRING, description: "An explanation in Vietnamese about why the suggestion improves the text." }
        },
        required: ['suggestion_type', 'original_text', 'suggested_text', 'explanation_vi']
      }
    },
    general_feedback_vi: { type: Type.STRING, description: "A brief, overall comment in Vietnamese on how to make the writing more impactful or natural." }
  },
  required: ['suggestions', 'general_feedback_vi']
};

export const getWritingFeedback = async (userInput: string, seed: WritingSeed | FoundationTopic): Promise<AIWritingFeedback> => {
    const grammarFeedback = await checkGrammar(userInput, seed);
    return {
        is_correct: grammarFeedback.errors.length === 0,
        feedback_vi: grammarFeedback.general_feedback_vi,
        corrected_sentence_en: grammarFeedback.corrected_full_text,
    };
};

export const checkGrammar = async (userInput: string, seed: WritingSeed | FoundationTopic): Promise<AIGrammarFeedback> => {
  const seedPrompt = 'prompt_en' in seed ? seed.prompt_en : seed.name_en;
  const promptTemplate = getPrompts().checkGrammar.prompt;
  const prompt = promptTemplate
    .replace('{{PROMPT}}', seedPrompt)
    .replace('{{ANSWER}}', userInput);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: grammarFeedbackSchema,
      }
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AIGrammarFeedback;
  } catch (error) {
    console.error("Error getting AI grammar feedback:", error);
    throw new Error("Could not get grammar feedback from AI.");
  }
};

export const suggestImprovements = async (userInput: string, seed: WritingSeed | FoundationTopic): Promise<AISuggestionsFeedback> => {
  const seedPrompt = 'prompt_en' in seed ? seed.prompt_en : seed.name_en;
  const promptTemplate = getPrompts().suggestImprovements.prompt;
  const prompt = promptTemplate
      .replace('{{PROMPT}}', seedPrompt)
      .replace('{{ANSWER}}', userInput);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: suggestionsFeedbackSchema,
      }
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AISuggestionsFeedback;
  } catch (error) {
    console.error("Error getting AI improvement suggestions:", error);
    throw new Error("Could not get improvement suggestions from AI.");
  }
};


const topicSchema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING, description: "A short, engaging title for the writing topic in English." },
    prompt: { type: Type.STRING, description: "The full writing prompt or question for the user to answer, in English." }
  },
  required: ['topic', 'prompt']
};

const templatePartSchema = {
  type: Type.OBJECT,
  properties: {
    en: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of useful phrases in English." },
    vi: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of useful phrases in Vietnamese." }
  },
  required: ['en', 'vi']
};

const templateSchema = {
  type: Type.OBJECT,
  properties: {
    title_en: { type: Type.STRING, description: "The English title for the template (e.g., 'Template for Opinion Essay')." },
    title_vi: { type: Type.STRING, description: "The Vietnamese title for the template (e.g., 'Dàn bài cho Dạng bài Quan điểm')." },
    introduction: templatePartSchema,
    overview: { ...templatePartSchema, description: "The overview paragraph for IELTS Task 1. Should be null for other tasks." },
    body_paragraphs: { type: Type.ARRAY, items: templatePartSchema, description: "An array for body paragraph templates. Usually two." },
    conclusion: { ...templatePartSchema, description: "The conclusion. Should be null for IELTS Task 1." }
  },
  required: ['title_en', 'title_vi', 'introduction', 'body_paragraphs']
};

export const generateWritingTopic = async (category: string, difficulty: string): Promise<AIGeneratedTopic> => {
  const promptTemplate = getPrompts().generateWritingTopic.prompt;
  const prompt = promptTemplate
    .replace('{{CATEGORY}}', category)
    .replace('{{DIFFICULTY}}', difficulty);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: topicSchema,
      }
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AIGeneratedTopic;
  } catch (error) {
    console.error("Error generating writing topic:", error);
    throw new Error("Could not generate a writing topic from AI.");
  }
};

export const generateWritingTemplate = async (exam: string, task: string, subType: string): Promise<AIGeneratedTemplate> => {
    const promptTemplate = getPrompts().generateWritingTemplate.prompt;
    const prompt = promptTemplate
        .replace('{{EXAM}}', exam)
        .replace('{{TASK}}', task)
        .replace('{{SUB_TYPE}}', subType);
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: templateSchema,
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AIGeneratedTemplate;
    } catch (error) {
        console.error("Error generating writing template:", error);
        throw new Error("Could not generate a writing template from AI.");
    }
};

export const generateSpeakingTemplate = async (exam: string, task: string, subType: string): Promise<AIGeneratedTemplate> => {
    const promptTemplate = getPrompts().generateSpeakingTemplate.prompt;
    const prompt = promptTemplate
        .replace('{{EXAM}}', exam)
        .replace('{{TASK}}', task)
        .replace('{{SUB_TYPE}}', subType);
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: templateSchema,
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AIGeneratedTemplate;
    } catch (error) {
        console.error("Error generating speaking template:", error);
        throw new Error("Could not generate a speaking template from AI.");
    }
};

const vstepAnswerSchema = {
  type: Type.OBJECT,
  properties: {
    sample_answer_en: { type: Type.STRING, description: "A well-structured, high-quality sample speaking response in English for the VSTEP prompt." },
    sample_answer_vi: { type: Type.STRING, description: "A natural-sounding Vietnamese translation of the English sample answer." }
  },
  required: ['sample_answer_en', 'sample_answer_vi']
};

export const generateVstepSampleAnswer = async (promptText: string): Promise<AIGeneratedVstepAnswer> => {
    const promptTemplate = getPrompts().generateVstepSampleAnswer.prompt;
    const prompt = promptTemplate
        .replace('{{PROMPT}}', promptText);
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: vstepAnswerSchema,
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AIGeneratedVstepAnswer;
    } catch (error) {
        console.error("Error generating VSTEP sample answer:", error);
        throw new Error("Could not generate a VSTEP sample answer from AI.");
    }
};

const rewriteSchema = {
    type: Type.OBJECT,
    properties: {
        rewritten_text: { type: Type.STRING, description: "The rewritten version of the user's text." }
    },
    required: ['rewritten_text']
};

export const rewriteText = async (userInput: string, action: RewriteAction): Promise<AIRewriteResponse> => {
    const promptTemplate = getPrompts().rewriteText.prompt;
    const prompt = promptTemplate
        .replace('{{REWRITE_ACTION}}', action)
        .replace('{{USER_TEXT}}', userInput);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: rewriteSchema,
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AIRewriteResponse;
    } catch (error) {
        console.error("Error rewriting text with AI:", error);
        throw new Error("Could not rewrite text from AI.");
    }
};


const bilingualWordSchema = { type: Type.OBJECT, properties: { en: { type: Type.STRING }, vi: { type: Type.STRING } }, required: ['en', 'vi'] };
const bilingualTextSchema = { type: Type.OBJECT, properties: { en: { type: Type.STRING }, vi: { type: Type.STRING } }, required: ['en', 'vi'] };
const matchingPairSchema = { type: Type.OBJECT, properties: { key: { type: Type.STRING }, value: { type: Type.STRING } }, required: ['key', 'value'] };

export const practiceSchemas: Record<Exclude<PracticeMode, 'free_write'>, any> = {
    reorder: { type: Type.OBJECT, properties: { words: { type: Type.ARRAY, items: bilingualWordSchema }, answer: { type: Type.STRING } }, required: ['words', 'answer'] },
    fill_blank: { type: Type.OBJECT, properties: { sentence: bilingualTextSchema, missing_word: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['sentence', 'missing_word', 'options'] },
    find_error: { type: Type.OBJECT, properties: { sentence: bilingualTextSchema, error_word: { type: Type.STRING }, correct_word: { type: Type.STRING } }, required: ['sentence', 'error_word', 'correct_word'] },
    choose_phrase: { type: Type.OBJECT, properties: { sentence: bilingualTextSchema, correct_phrase: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['sentence', 'correct_phrase', 'options'] },
    matching: { type: Type.OBJECT, properties: { col_a: { type: Type.ARRAY, items: bilingualWordSchema }, col_b: { type: Type.ARRAY, items: bilingualWordSchema }, correct_pairs: { type: Type.ARRAY, items: matchingPairSchema } }, required: ['col_a', 'col_b', 'correct_pairs'] },
    drag_drop: { type: Type.OBJECT, properties: { sentence_parts: { type: Type.ARRAY, items: bilingualWordSchema }, correct_order: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['sentence_parts', 'correct_order'] }
};

const simpleWritingSeedSchema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING },
        prompt_en: { type: Type.STRING },
        prompt_vi: { type: Type.STRING },
        prompt_vi_short: { type: Type.STRING },
        must_use: { type: Type.ARRAY, items: { type: Type.STRING } },
        focus: { type: Type.STRING },
        imageSeed: { type: Type.STRING, description: "A descriptive seed for an image generation model, e.g., 'a team of professionals in a modern office meeting room'." }
    },
    required: ['topic', 'prompt_en', 'prompt_vi', 'prompt_vi_short', 'must_use', 'focus']
};

export const generateNewPracticeItem = async (
    subcategory: WritingSubcategory, 
    existingPrompts: string[],
    options: { withImage?: boolean } = {}
): Promise<WritingSeed> => {
    let promptTemplate = getPrompts().generateFoundationPracticeItem.prompt;
    const finalSchema = JSON.parse(JSON.stringify(simpleWritingSeedSchema));
    
    const needsImage = options.withImage === true;

    if (needsImage) {
        promptTemplate += "\n\nIMPORTANT: This is a picture description task. You MUST generate an 'imageSeed' field that describes a realistic scene for the prompt.";
        finalSchema.required.push('imageSeed');
    } else {
        promptTemplate += "\n\nIMPORTANT: Do NOT generate an 'imageSeed' field for this task. Focus only on the text-based fields.";
        if (finalSchema.properties.imageSeed) {
            delete finalSchema.properties.imageSeed;
        }
        const reqIdx = finalSchema.required.indexOf('imageSeed');
        if (reqIdx > -1) {
            finalSchema.required.splice(reqIdx, 1);
        }
    }

    const prompt = promptTemplate
      .replace('{{SUBCATEGORY_NAME}}', subcategory.subcategory_name_vi)
      .replace('{{SUBCATEGORY_OBJECTIVE}}', subcategory.objective_vi)
      .replace('{{EXISTING_PROMPTS}}', existingPrompts.map(p => `- "${p}"`).join('\n'));

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: finalSchema,
            }
        });
        const jsonText = response.text.trim();
        const newSeedData = JSON.parse(jsonText);
        
        return {
            ...newSeedData,
            code: `AI-${Date.now()}`,
            sample_answer_en: '',
            sample_answer_vi: '',
            sample_outline_en: '',
            sample_outline_vi: '',
            vocabulary: [],
            practice: {}
        } as WritingSeed;

    } catch (error) {
        console.error("Error generating new practice item:", error);
        throw new Error("Could not generate a new practice item from AI.");
    }
};

export const generateMorePracticeQuestions = async (
    item: WritingSeed | FoundationTopic, 
    practiceMode: Exclude<PracticeMode, 'free_write'>
): Promise<any[]> => {
    
    const mainContext = 'prompt_en' in item ? item.prompt_en : ('sentence' in item ? item.sentence : '');
    if (!mainContext) {
        throw new Error("Cannot generate practice questions without a main prompt or sentence.");
    }

    const schemaForMode = practiceSchemas[practiceMode];
    if (!schemaForMode) {
        throw new Error(`Invalid practice mode for AI generation: ${practiceMode}`);
    }
    
    const topic = 'topic' in item ? item.topic : item.name_en;
    const promptTemplate = getPrompts().generateMoreFoundationExercises.prompt;
    const prompt = promptTemplate
      .replace('{{TOPIC}}', topic)
      .replace('{{PROMPT}}', mainContext)
      .replace(/{{PRACTICE_MODE}}/g, practiceMode);
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: schemaForMode
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error(`Error generating practice questions for mode "${practiceMode}":`, error);
        throw new Error(`Could not generate new exercises for ${practiceMode} from AI.`);
    }
};


export const generateCambridgeImage = async (promptText: string): Promise<string> => {
    const promptTemplate = getPrompts().generateImageForCambridge.prompt;
    const prompt = promptTemplate.replace('{{PROMPT_TEXT}}', promptText);

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("AI did not return a valid image.");
        }
    } catch (error) {
        console.error("Error generating Cambridge image with AI:", error);
        throw new Error("Could not generate an image from AI.");
    }
};

export const generateImage = async (promptText: string): Promise<string> => {
    const promptTemplate = getPrompts().generateGenericImage.prompt;
    const prompt = promptTemplate.replace('{{PROMPT}}', promptText);

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("AI did not return a valid image.");
        }
    } catch (error) {
        console.error("Error generating image with AI:", error);
        throw new Error("Could not generate an image from AI.");
    }
};

export const generateText = async (promptText: string): Promise<string> => {
    const promptTemplate = getPrompts().generateGenericText.prompt;
    const prompt = promptTemplate.replace('{{PROMPT}}', promptText);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating text with AI:", error);
        throw new Error("Could not generate text from AI.");
    }
};

const bulkWritingSeedSchema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING },
        prompt_en: { type: Type.STRING },
        prompt_vi: { type: Type.STRING },
        prompt_vi_short: { type: Type.STRING },
        must_use: { type: Type.ARRAY, items: { type: Type.STRING } },
        focus: { type: Type.STRING }
    },
    required: ['topic', 'prompt_en', 'prompt_vi', 'prompt_vi_short', 'must_use', 'focus']
};

const bulkSpeakingTaskSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        prompt: { type: Type.STRING },
        prepTime: { type: Type.NUMBER },
        speakTime: { type: Type.NUMBER }
    },
    required: ['title', 'prompt', 'prepTime', 'speakTime']
};

const tipBilingualContentSchema = {
    type: Type.OBJECT,
    properties: {
        en: { type: Type.STRING },
        vi: { type: Type.STRING }
    },
    required: ['en', 'vi']
};

const tipExampleItemSchema = {
    type: Type.OBJECT,
    properties: {
        phrase: tipBilingualContentSchema,
        sampleSpeech: tipBilingualContentSchema,
        fullSampleSpeech: tipBilingualContentSchema
    },
    required: ['phrase', 'sampleSpeech', 'fullSampleSpeech']
};

const tipSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.NUMBER },
        title: { type: Type.STRING },
        situation: { type: Type.STRING },
        solution65: tipBilingualContentSchema,
        solution75: tipBilingualContentSchema,
        examples65: { type: Type.ARRAY, items: tipExampleItemSchema },
        examples75: { type: Type.ARRAY, items: tipExampleItemSchema }
    },
    required: ['id', 'title', 'situation', 'solution65', 'solution75', 'examples65', 'examples75']
};

const cambridgeQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING },
        questionText: bilingualTextSchema,
        imageSeed: { type: Type.STRING },
        options: { type: Type.ARRAY, items: bilingualTextSchema },
        correctAnswer: { type: Type.STRING },
        hint_vi: { type: Type.STRING },
        explanation_vi: { type: Type.STRING }
    },
    required: ['id', 'questionText', 'options', 'correctAnswer', 'hint_vi', 'explanation_vi']
};

export const generateBulkFoundationExercises = async (
    item: FoundationTopic,
    practiceMode: Exclude<PracticeMode, 'free_write'>,
    quantity: number
): Promise<any[]> => {
    const schemaForMode = practiceSchemas[practiceMode];
    if (!schemaForMode) {
        throw new Error(`Invalid practice mode for AI generation: ${practiceMode}`);
    }

    const promptTemplate = getPrompts().generateBulkFoundationExercises.prompt;
    const prompt = promptTemplate
        .replace('{{TOPIC_NAME}}', item.name_en)
        .replace('{{SENTENCE}}', item.sentence)
        .replace('{{NUMBER_OF_ITEMS}}', String(quantity))
        .replace('{{PRACTICE_MODE}}', practiceMode);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: schemaForMode
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error(`Error generating bulk foundation exercises for mode "${practiceMode}":`, error);
        throw new Error(`Could not generate bulk exercises for ${practiceMode} from AI.`);
    }
};

export const generateBulkWritingSeeds = async (
    subcategory: WritingSubcategory,
    quantity: number,
    existingPrompts: string[]
): Promise<Partial<WritingSeed>[]> => {
    const promptTemplate = getPrompts().generateBulkWritingSeeds.prompt;
    const prompt = promptTemplate
        .replace('{{NUMBER_OF_ITEMS}}', String(quantity))
        .replace('{{EXAM_ID}}', subcategory.track_id)
        .replace('{{TASK_TYPE}}', subcategory.task_type)
        .replace('{{SUBCATEGORY_NAME}}', subcategory.subcategory_name_vi)
        .replace('{{OBJECTIVE}}', subcategory.objective_vi)
        .replace('{{EXISTING_PROMPTS}}', existingPrompts.map(p => `- "${p}"`).join('\n'));

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: bulkWritingSeedSchema
                }
            }
        });
        const jsonText = response.text.trim();
        const newSeeds = JSON.parse(jsonText);
        return newSeeds.map((seed: any, index: number) => ({...seed, code: `AI-BULK-${Date.now()}-${index}`}));
    } catch (error) {
        console.error("Error generating bulk writing seeds:", error);
        throw new Error("Could not generate bulk writing seeds from AI.");
    }
};

export const generateBulkSpeakingTasks = async (
    part: ExamPart<any>,
    quantity: number,
    existingPrompts: string[]
): Promise<Partial<ExamTask>[]> => {
    const promptTemplate = getPrompts().generateBulkSpeakingTasks.prompt;
    const examId = part.id.split('_')[0]; 
    const prompt = promptTemplate
        .replace('{{EXAM_ID}}', examId)
        .replace('{{NUMBER_OF_ITEMS}}', String(quantity))
        .replace('{{PART_NAME}}', part.vi)
        .replace('{{PART_SKILLS}}', part.skills.join(', '))
        .replace('{{EXISTING_PROMPTS}}', existingPrompts.map(p => `- "${p}"`).join('\n'));

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: bulkSpeakingTaskSchema
                }
            }
        });
        const jsonText = response.text.trim();
        const newTasks = JSON.parse(jsonText);
        return newTasks.map((task: any, index: number) => ({...task, id: `AI-BULK-${Date.now()}-${index}`}));
    } catch (error) {
        console.error("Error generating bulk speaking tasks:", error);
        throw new Error("Could not generate bulk speaking tasks from AI.");
    }
};

export const generateBulkTips = async (
    topic: string,
    quantity: number,
    existingTips: string[]
): Promise<Tip[]> => {
    const promptTemplate = getPrompts().generateBulkTips.prompt;
    const prompt = promptTemplate
        .replace('{{NUMBER_OF_ITEMS}}', String(quantity))
        .replace('{{TOPIC}}', topic)
        .replace('{{EXISTING_TIPS}}', existingTips.map(t => `- "${t}"`).join('\n'));

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: tipSchema
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating bulk tips:", error);
        throw new Error("Could not generate bulk tips from AI.");
    }
};

export const generateBulkCambridgeTasks = async (
    examLevel: string,
    part: CambridgeTestPart,
    quantity: number,
    existingQuestions: string[]
): Promise<CambridgeQuestion[]> => {
    const promptTemplate = getPrompts().generateBulkCambridgeTasks.prompt;
    const prompt = promptTemplate
        .replace('{{EXAM_LEVEL}}', examLevel)
        .replace('{{NUMBER_OF_ITEMS}}', String(quantity))
        .replace('{{PART_NAME}}', part.title)
        .replace('{{PART_INSTRUCTIONS}}', part.instructions_vi)
        .replace('{{EXISTING_QUESTIONS}}', existingQuestions.map(q => `- "${q}"`).join('\n'));

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: cambridgeQuestionSchema
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating bulk Cambridge tasks:", error);
        throw new Error("Could not generate bulk Cambridge tasks from AI.");
    }
};