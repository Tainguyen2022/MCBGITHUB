// AI Service temporarily disabled for local development
// This file contains AI functionality that requires @google/genai
// which is loaded via CDN importmap in production

export const generateWritingFeedback = async () => {
  return { errors: [], suggestions: [], score: 0, feedback: "AI service disabled in development" };
};

export const generateGrammarFeedback = async () => {
  return { errors: [], suggestions: [], score: 0, feedback: "AI service disabled in development" };
};

export const generateSuggestionsFeedback = async () => {
  return { errors: [], suggestions: [], score: 0, feedback: "AI service disabled in development" };
};

export const generateFoundationTopic = async () => {
  return { topic: "Sample topic", difficulty: "beginner" };
};

export const generateWritingTemplate = async () => {
  return { template: "Sample template", structure: [] };
};

export const rewriteText = async () => {
  return { rewritten: "Sample rewrite", improvements: [] };
};

export const generateVstepAnswer = async () => {
  return { answer: "Sample answer", explanation: "Sample explanation" };
};

export const generateCambridgeExplanation = async () => {
  return { explanation: "Sample explanation", tips: [] };
};

export const generateImagePrompt = async () => {
  return { prompt: "Sample image prompt" };
};

export const generateAudioScript = async () => {
  return { script: "Sample audio script" };
};

