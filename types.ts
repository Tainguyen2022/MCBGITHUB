import { Modality } from "@google/genai";

// FIX: Removed incorrect import. '@google/genai' does not export 'types'.

// --- USER & AUTH ---
export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'Admin' | 'Premium' | 'Free';
    packages: string[];
    activated: boolean;
    mobileLogin: boolean;
    joinDate: string;
    expiryDate: string;
    registered_at: string;
    avatar?: string;
    bananaBalance: number; 
    lastDailyBonus?: string; // NEW: Timestamp for daily bonus
}

// --- NEW INTERACTIVE QUIZ TYPES ---
export interface IeltsPart1TheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Part 1';
    explanation_vi: string;
}

export interface IeltsPart1WritingTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Writing Part 1';
    explanation_vi: string;
}

export interface IeltsPart2WritingTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Writing Task 2';
    explanation_vi: string;
}

export interface IeltsPart2WritingAdvancedTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu';
    explanation_vi: string;
}


export interface IeltsReadingTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Reading';
    explanation_vi: string;
}

export interface IeltsListeningTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Listening';
    explanation_vi: string;
}

export interface ToeicPart1TheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết TOEIC Listening Part 1';
    explanation_vi: string;
}

// FIX: Add missing ToeicPart2Question interface to resolve module export error.
export interface ToeicPart2Question {
    id: string;
    questionAudioSrc: string;
    transcript: string;
    options: { text: string; audioSrc: string }[];
    correctOption: string;
    questionType: string;
    explanation_vi: string;
}

// NEW: Interfaces for Cambridge Theory Quizzes
export interface CambridgeMoversTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết Cambridge Movers';
    explanation_vi: string;
}

export interface CambridgeFlyersTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết Cambridge Flyers';
    explanation_vi: string;
}


// --- PRACTICE TESTS (NEW) ---
export interface TestListItem {
    id: string;
    title: string;
    path: string;
    disabled?: boolean;
    // FIX: Add optional state property for navigation with state, resolving errors in data/testLists.ts.
    state?: any;
}

// FIX: Added missing PracticeTest interface.
export interface PracticeTest {
    id: string;
    title: string;
    examType: 'TOEIC' | 'IELTS' | 'VSTEP';
    durationMinutes: number;
    questionCount: number;
    isFree: boolean;
}


// --- GRAMMAR ---
export type Subject = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it' | 'N (số nhiều)' | 'danh từ số ít';

export interface Lemma {
    type: 'verb' | 'adj' | 'adv' | 'noun' | 'prep' | 'conj';
    text: string;
    base?: string;
    past?: string;
    pp?: string;
    ing?: string;
    vi?: string;
    article?: 'a' | 'an';
}

export interface Flags {
    tense: 'present' | 'past' | 'future';
    aspect: 'simple' | 'progressive' | 'perfect' | 'perfect_progressive';
    voice: 'active' | 'passive';
    polarity: 'affirmative' | 'negative' | 'interrogative';
    near_future: boolean;
    short_answer: boolean;
    contractions: boolean;
}

export interface GrammarState {
    subject: Subject;
    lemma: Lemma;
    flags: Flags;
    unitId: string | null;
}

export interface Unit {
    id: string;
    group_id: number;
    vi: string;
    en: string;
    tags?: Partial<Flags> & { category?: string };
    canonKey: string;
    coreRef: string;
    applicable?: boolean;
}

export interface Group {
    id: number;
    code: string;
    vi: string;
    en: string;
}

export interface VocabItem {
    word?: string;
    vi?: string;
    base?: string;
    past?: string;
    pp?: string;
    ing?: string;
    article?: 'a' | 'an';
    ipa?: string;
}

export interface VocabPack {
    [key: string]: VocabItem[];
}

export type CustomVocabData = Record<string, VocabItem[]>;


// --- SPEAKING ---
export interface DialogueTurn {
    speaker: string;
    en: string;
    ipa: string;
    vi: string;
}

export interface Scenario {
    id: string;
    imageSeed: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
    categoryGroup: string;
    dialogue: DialogueTurn[];
    vocabulary: (VocabItem & { pos: string })[];
}

export interface ExamTask {
    id: string;
    title: string;
    prompt: string;
    prepTime: number;
    speakTime: number;
}

export interface ToeicTask extends ExamTask {
    imageSeed?: string;
    sampleAnswer_en?: string;
    sampleAnswer_vi?: string;
    outline_en?: string;
    outline_vi?: string;
    vocabulary?: WritingVocabItem[];
}

export interface IeltsTask extends ExamTask {
    sampleAnswer_en?: string;
    sampleAnswer_vi?: string;
    outline_en?: string;
    outline_vi?: string;
    vocabulary?: WritingVocabItem[];
}

export interface VstepTask extends ExamTask {
    imageSeed?: string;
    sampleAnswer_en?: string;
    sampleAnswer_vi?: string;
    outline_en?: string;
    outline_vi?: string;
    vocabulary?: WritingVocabItem[];
}

export interface ExamPart<T extends ExamTask> {
    id: string;
    vi: string;
    en: string;
    skills: string[];
    tasks: T[];
}

export interface ExamData<T extends ExamTask> {
    [partId: string]: ExamPart<T>;
}

export interface SentenceStructure {
    id: string;
    title: string;
    vi: string;
    description: string;
    example: string;
}

export interface SentenceStructureGroup {
    category: string;
    vi: string;
    items: SentenceStructure[];
}

export interface VstepSeedP1 {
    id: string;
    exam: "VSTEP";
    part: "P1";
    topics: string[];
    tpl: number[];
    n: number;
}
export interface VstepSeedP2 {
    id: string;
    exam: "VSTEP";
    part: "P2";
    s: string;
    sol: string[];
}
export interface VstepSeedP3 {
    id: string;
    exam: "VSTEP";
    part: "P3";
    core: string;
    ideas: string[];
    followup: string[];
}

// --- WRITING ---
export interface WritingVocabItem {
    word: string;
    ipa: string;
    pos: string; // part of speech
    vi: string;
}

export interface WritingSeed {
    code: string;
    topic: string;
    prompt_en: string;
    prompt_vi: string;
    prompt_vi_short?: string;
    must_use: string[];
    focus: string;
    imageSeed?: string;
    sample_answer_en?: string;
    sample_answer_vi?: string;
    sample_outline_en?: string;
    sample_outline_vi?: string;
    vocabulary?: WritingVocabItem[];
    practice?: Partial<FoundationPracticeData>;
}

export interface WritingSubcategory {
    track_id: string;
    task_type: string;
    subcategory_id: string;
    subcategory_name_vi: string;
    level: string;
    test_tags: string[];
    objective_vi: string;
    seeds: WritingSeed[];
}

export interface WritingCategory {
    category_id: string;
    track_name_vi: string;
    subcategories: WritingSubcategory[];
}

export type PracticeMode = 
  | 'free_write'
  | 'reorder'
  | 'fill_blank'
  | 'find_error'
  | 'choose_phrase'
  | 'matching'
  | 'drag_drop';

export interface BilingualWord {
  en: string;
  vi: string;
}

export interface BilingualText {
  en: string;
  vi: string;
}

export interface FoundationPracticeData {
    reorder?: { words: BilingualWord[]; answer: string; }[];
    fill_blank?: { sentence: BilingualText; missing_word: string; options: string[] }[];
    find_error?: { sentence: BilingualText; error_word: string; correct_word: string; }[];
    choose_phrase?: { sentence: BilingualText; correct_phrase: string; options: string[] }[];
    matching?: { col_a: BilingualWord[]; col_b: BilingualWord[]; correct_pairs: {key: string; value: string}[] }[];
    drag_drop?: { sentence_parts: BilingualWord[]; correct_order: string[] }[];
}


export interface FoundationTopic {
    id: string;
    name_vi: string;
    name_en: string;
    level: 'easy' | 'medium' | 'advanced';
    category: 'Cấu trúc câu' | 'Thì (Tenses)' | 'Từ vựng' | 'Giới từ' | 'Mạo từ' | 'Đại từ' | 'Tính từ & Trạng từ' | 'Câu hỏi' | 'Ngữ pháp nâng cao';
    sentence: string; // The correct, final sentence
    practice: FoundationPracticeData;
}

export interface WritingProgress {
  [itemId: string]: string;
}

export type AIContentType = PracticeMode | 'sample_answer' | 'outline' | 'vocabulary';

// New types for structured AI feedback
export interface AIGrammarError {
  error_text: string;
  correction: string;
  explanation_vi: string;
}

export interface AIGrammarFeedback {
  errors: AIGrammarError[];
  corrected_full_text: string;
  general_feedback_vi: string;
}

export interface AISuggestion {
    suggestion_type: 'Vocabulary' | 'Structure' | 'Coherence' | 'Clarity';
    original_text: string;
    suggested_text: string;
    explanation_vi: string;
}

export interface AISuggestionsFeedback {
    suggestions: AISuggestion[];
    general_feedback_vi: string;
}

export interface AIWritingFeedback {
    is_correct: boolean;
    feedback_vi: string;
    corrected_sentence_en: string;
}

export interface AIGeneratedTopic {
  topic: string;
  prompt: string;
}

export interface AITemplatePart {
  en: string[];
  vi: string[];
}

export interface AIGeneratedTemplate {
  title_en: string;
  title_vi: string;
  introduction: AITemplatePart;
  overview?: AITemplatePart;
  body_paragraphs: AITemplatePart[];
  conclusion?: AITemplatePart;
}

export type RewriteAction = 'make it longer' | 'make it shorter' | 'make it simpler' | 'make it more complex' | 'rewrite it completely';

export interface AIRewriteResponse {
    rewritten_text: string;
}

export interface AIGeneratedVstepAnswer {
  sample_answer_en: string;
  sample_answer_vi: string;
}

// FIX: Add IeltsPart2TheoryQuestion interface to resolve module export error.
export interface IeltsPart2TheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Part 2';
    explanation_vi: string;
}


// --- ADMIN & PROMPTS ---
export interface AIPrompt {
  name: string;
  description: string;
  prompt: string;
}

export interface AIPromptCollection {
  [key: string]: AIPrompt;
  checkGrammar: AIPrompt;
  suggestImprovements: AIPrompt;
  rewriteText: AIPrompt;
  generateFoundationPracticeItem: AIPrompt;
  generateMoreFoundationExercises: AIPrompt;
  generateWritingTemplate: AIPrompt;
  generateSpeakingTemplate: AIPrompt;
  generateVstepSampleAnswer: AIPrompt;
  // NEW: More specific bulk generation prompts
  generateBulkFoundationExercises: AIPrompt;
  generateBulkWritingSeeds: AIPrompt;
  generateBulkSpeakingTasks: AIPrompt;
  generateBulkTips: AIPrompt;
  generateBulkCambridgeTasks: AIPrompt;
}

// FIX: Add KidsGameItem interface for KidsCornerPage.tsx
// --- KIDS CORNER ---
export interface KidsGameItem {
    id: string;
    word: string;
    svg: React.ReactNode;
}

// --- TIPS PAGE ---
export interface TipBilingualContent {
  en: string;
  vi: string;
}

export interface TipExampleItem {
  phrase: TipBilingualContent;
  sampleSpeech: TipBilingualContent;
  fullSampleSpeech: TipBilingualContent;
}

export interface Tip {
  id: number;
  title: string;
  situation: string;
  solution65: TipBilingualContent;
  solution75: TipBilingualContent;
  examples65: TipExampleItem[];
  examples75: TipExampleItem[];
}

// NEW: Interface for compact tips
export interface CompactTip {
    id: number;
    problem: string;
    solution: string;
}

// --- NEW: CAMBRIDGE INTERACTIVE PRACTICE ---
export interface CambridgeQuestion {
    id: string;
    questionText: BilingualText;
    imageSeed?: string; // For questions with images
    options: BilingualText[];
    correctAnswer: string; // The 'en' text of the correct option
    hint_vi: string;
    explanation_vi: string;
}

export interface CambridgeTestPart {
    partId: string;
    title: string;
    instructions_vi: string;
    durationSeconds: number;
    questions: CambridgeQuestion[];
}

export interface CambridgeTest {
    exam: 'starters' | 'movers' | 'flyers';
    parts: CambridgeTestPart[];
}