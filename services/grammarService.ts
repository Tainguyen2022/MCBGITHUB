import { GrammarState, Unit, Flags, Subject, Lemma } from '../types';
import { units } from '../data/units';
import { vocab } from '../data/vocab';

// --- Type Definitions (from user suggestion) ---
type Polarity = 'affirmative' | 'negative';
type Pronoun = 'I' | 'you' | 'we' | 'they' | 'he' | 'she' | 'it';
type Aux =
  | 'do' | 'does' | 'did'
  | 'am' | 'is' | 'are'
  | 'was' | 'were'
  | 'have' | 'has' | 'had'
  | 'will' | 'would'
  | 'can' | 'could'
  | 'should' | 'may' | 'might';

// --- NEW Highlight Functions for Color Coding ---
const highlightRed = (text: string) => text ? text.split(' ').map(part => `<span class='text-red-500 font-bold'>${part}</span>`).join(' ') : '';
const highlightOrange = (text: string) => text ? text.split(' ').map(part => `<span class='text-orange-500 font-bold'>${part}</span>`).join(' ') : '';
const highlightGreen = (text: string) => text ? text.split(' ').map(part => `<span class='text-green-500 font-bold'>${part}</span>`).join(' ') : '';


// --- Lookup Tables (from user suggestion) ---
const YES: Record<Pronoun, string> = { I:'Yes, I', you:'Yes, you', we:'Yes, we', they:'Yes, they', he:'Yes, he', she:'Yes, she', it:'Yes, it' } as const;
const NO: Record<Pronoun, string> = { I:'No, I', you:'No, you', we:'No, we', they:'No, they', he:'No, he', she:'No, she', it:'No, it' } as const;

const AUX_AFFIRM: Record<Aux, Record<Pronoun, string>> = {
  do:   { I:'do',   you:'do',  we:'do',  they:'do',  he:'does', she:'does', it:'does' },
  does: { I:'do',   you:'do',  we:'do',  they:'do',  he:'does', she:'does', it:'does' },
  did:  { I:'did',  you:'did', we:'did', they:'did', he:'did',  she:'did',  it:'did'  },
  am:   { I:'am',   you:'are', we:'are', they:'are', he:'is',   she:'is',   it:'is'   },
  is:   { I:'am',   you:'are', we:'are', they:'are', he:'is',   she:'is',   it:'is'   },
  are:  { I:'am',   you:'are', we:'are', they:'are', he:'is',   she:'is',   it:'is'   },
  was:  { I:'was',  you:'were',we:'were',they:'were',he:'was', she:'was',  it:'was'  },
  were: { I:'was',  you:'were',we:'were',they:'were',he:'was', she:'was',  it:'was'  },
  have: { I:'have', you:'have',we:'have',they:'have',he:'has', she:'has',  it:'has'  },
  has:  { I:'have', you:'have',we:'have',they:'have',he:'has', she:'has',  it:'has'  },
  had:  { I:'had',  you:'had', we:'had', they:'had', he:'had',  she:'had',  it:'had'  },
  will: { I:'will', you:'will',we:'will',they:'will',he:'will',she:'will', it:'will' },
  would:{ I:'would',you:'would',we:'would',they:'would',he:'would',she:'would',it:'would' },
  can:  { I:'can',  you:'can', we:'can', they:'can', he:'can',  she:'can',  it:'can'  },
  could:{ I:'could',you:'could',we:'could',they:'could',he:'could',she:'could',it:'could' },
  should:{I:'should',you:'should',we:'should',they:'should',he:'should',she:'should',it:'should'},
  may:  { I:'may',  you:'may', we:'may', they:'may', he:'may',  she:'may',  it:'may'  },
  // FIX: Corrected duplicate 'they' property and added missing 'we' property.
  might:{ I:'might',you:'might',we:'might',they:'might',he:'might',she:'might',it:'might' },
} as const;

const AUX_NEG: Record<Aux, Record<Pronoun, string>> = {
  do:   { I:"don't",   you:"don't",  we:"don't",  they:"don't",  he:"doesn't", she:"doesn't", it:"doesn't" },
  does: { I:"don't",   you:"don't",  we:"don't",  they:"don't",  he:"doesn't", she:"doesn't", it:"doesn't" },
  did:  { I:"didn't",  you:"didn't", we:"didn't", they:"didn't", he:"didn't",  she:"didn't",  it:"didn't"  },
  am:   { I:"am not",  you:"aren't", we:"aren't", they:"aren't", he:"isn't",  she:"isn't",  it:"isn't"  },
  is:   { I:"am not",  you:"aren't", we:"aren't", they:"aren't", he:"isn't",  she:"isn't",  it:"isn't"  },
  are:  { I:"am not",  you:"aren't", we:"aren't", they:"aren't", he:"isn't",  she:"isn't",  it:"isn't"  },
  was:  { I:"wasn't",  you:"weren't",we:"weren't",they:"weren't",he:"wasn't",she:"wasn't", it:"wasn't" },
  were: { I:"wasn't",  you:"weren't",we:"weren't",they:"weren't",he:"wasn't",she:"wasn't", it:"wasn't" },
  have: { I:"haven't", you:"haven't",we:"haven't",they:"haven't",he:"hasn't",she:"hasn't", it:"hasn't" },
  has:  { I:"haven't", you:"haven't",we:"haven't",they:"haven't",he:"hasn't",she:"hasn't", it:"hasn't" },
  had:  { I:"hadn't",  you:"hadn't", we:"hadn't", they:"hadn't", he:"hadn't", she:"hadn't", it:"hadn't" },
  will: { I:"won't",   you:"won't",  we:"won't",  they:"won't",  he:"won't", she:"won't", it:"won't" },
  would:{ I:"wouldn't",you:"wouldn't",we:"wouldn't",they:"wouldn't",he:"wouldn't",she:"wouldn't",it:"wouldn't" },
  can:  { I:"can't",   you:"can't",  we:"can't",  they:"can't",  he:"can't", she:"can't", it:"can't" },
  could:{ I:"couldn't",you:"couldn't",we:"couldn't",they:"couldn't",he:"couldn't",she:"couldn't",it:"couldn't" },
  should:{I:"shouldn't",you:"shouldn't",we:"shouldn't",they:"shouldn't",he:"shouldn't",she:"shouldn't",it:"shouldn't"},
  may:  { I:"may not", you:"may not",we:"may not",they:"may not",he:"may not",she:"may not",it:"may not" },
  might:{ I:"might not",you:"might not",we:"might not",they:"might not",he:"might not",she:"might not",it:"might not" },
} as const;


// --- Helper Functions ---
const isThirdPersonSingular = (subject: Subject) => ['he', 'she', 'it', 'danh từ số ít'].includes(subject);

const getPronoun = (subject: Subject): string => {
    const subjectMap = {
        'I': 'I', 'you': 'you', 'we': 'we', 'they': 'they', 'he': 'he', 'she': 'she', 'it': 'it',
        'N (số nhiều)': 'the students',
        'danh từ số ít': 'the student'
    };
    return subjectMap[subject];
}

const getPronounVI = (subject: Subject): string => {
    const subjectMap = {
        'I': 'Tôi', 'you': 'Bạn', 'we': 'Chúng tôi', 'they': 'Họ', 'he': 'Anh ấy', 'she': 'Cô ấy', 'it': 'Nó',
        'N (số nhiều)': 'Các sinh viên',
        'danh từ số ít': 'Sinh viên'
    };
    return subjectMap[subject];
};

const mapSubjectToPronoun = (s: Subject): Pronoun => {
    switch (s) {
        case 'I': return 'I';
        case 'you': return 'you';
        case 'we': return 'we';
        case 'they':
        case 'N (số nhiều)': return 'they';
        case 'he': return 'he';
        case 'she': return 'she';
        case 'it':
        case 'danh từ số ít': return 'it';
        default: return 'it'; // Fallback for exhaustiveness
    }
};

// --- Conjugation Engine ---
const conjugateVerb = (lemma: Lemma, verbForm: string, subject: Subject, flags: Flags): string => {
    switch (verbForm) {
        case 'base': return lemma.base || lemma.text;
        case 'ing': return lemma.ing || `${lemma.text}ing`;
        case 'past': return lemma.past || `${lemma.text}ed`;
        case 'pp': return lemma.pp || lemma.past || `${lemma.text}ed`;
        case 's':
            const base = lemma.base || lemma.text;
             if (/(s|x|z|ch|sh)$/.test(base)) return `${base}es`;
             if (/[bcdfghjklmnpqrstvwxyz]y$/.test(base)) return `${base.slice(0, -1)}ies`;
             return `${base}s`;
        default: return lemma.text;
    }
};

const getAuxiliary = (state: GrammarState): { aux: string, verbForm: string, mainVerb: string } => {
    const { flags, subject, lemma } = state;
    const { tense, aspect, polarity, voice, near_future } = flags;
    const is3rdSg = isThirdPersonSingular(subject);
    
    let mainVerb = conjugateVerb(lemma, 'base', subject, flags); // Default verb form

    const do_not = "do not";
    const does_not = "does not";
    const did_not = "did not";
    const is_not = "is not";
    const are_not = "are not";
    const was_not = "was not";
    const were_not = "were not";
    const have_not = "have not";
    const has_not = "has not";
    const had_not = "had not";
    const will_not = "will not";

    // --- Active Voice ---
    if (voice === 'active') {
        const verb_s = conjugateVerb(lemma, 's', subject, flags);
        const verb_ing = conjugateVerb(lemma, 'ing', subject, flags);
        const verb_past = conjugateVerb(lemma, 'past', subject, flags);
        const verb_pp = conjugateVerb(lemma, 'pp', subject, flags);

        // Near Future (be going to) takes precedence
        if (near_future) {
            const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            if (polarity === 'interrogative') return { aux: `${be}`, mainVerb: `going to ${mainVerb}`, verbForm: 'interrogative_be' };
            if (polarity === 'negative') {
                const be_not = subject === 'I' ? 'am not' : (is3rdSg ? is_not : are_not);
                return { aux: be_not, mainVerb: `going to ${mainVerb}`, verbForm: 'statement' };
            }
            return { aux: `${be}`, mainVerb: `going to ${mainVerb}`, verbForm: 'statement' };
        }

        // Tense/Aspect Logic
        if (tense === 'present') {
            if (aspect === 'simple') {
                if (polarity === 'negative') return { aux: is3rdSg ? does_not : do_not, mainVerb, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: is3rdSg ? 'Does' : 'Do', mainVerb, verbForm: 'interrogative_do' };
                return { aux: '', mainVerb: is3rdSg ? verb_s : mainVerb, verbForm: 'statement' };
            }
            if (aspect === 'progressive') {
                const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
                if (polarity === 'interrogative') return { aux: be, mainVerb: verb_ing, verbForm: 'interrogative_be' };
                const be_not = subject === 'I' ? 'am not' : (is3rdSg ? is_not : are_not);
                return { aux: polarity === 'negative' ? be_not : be, mainVerb: verb_ing, verbForm: 'statement' };
            }
            if (aspect === 'perfect') {
                const have = is3rdSg ? 'has' : 'have';
                if (polarity === 'interrogative') return { aux: have, mainVerb: verb_pp, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? (is3rdSg ? has_not : have_not) : have, mainVerb: verb_pp, verbForm: 'statement' };
            }
            if (aspect === 'perfect_progressive') {
                const have = is3rdSg ? 'has' : 'have';
                if (polarity === 'interrogative') return { aux: `${have}`, mainVerb: `been ${verb_ing}`, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? (is3rdSg ? has_not : have_not) : have, mainVerb: `been ${verb_ing}`, verbForm: 'statement' };
            }
        }
        if (tense === 'past') {
            if (aspect === 'simple') {
                if (polarity === 'negative') return { aux: did_not, mainVerb, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Did', mainVerb, verbForm: 'interrogative_do' };
                return { aux: '', mainVerb: verb_past, verbForm: 'statement' };
            }
            if (aspect === 'progressive') {
                const be = is3rdSg || subject === 'I' ? 'was' : 'were';
                if (polarity === 'interrogative') return { aux: be, mainVerb: verb_ing, verbForm: 'interrogative_be' };
                const be_not = is3rdSg || subject === 'I' ? was_not : were_not;
                return { aux: polarity === 'negative' ? be_not : be, mainVerb: verb_ing, verbForm: 'statement' };
            }
            if (aspect === 'perfect') {
                if (polarity === 'interrogative') return { aux: 'Had', mainVerb: verb_pp, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? had_not : 'had', mainVerb: verb_pp, verbForm: 'statement' };
            }
             if (aspect === 'perfect_progressive') {
                if (polarity === 'interrogative') return { aux: 'had', mainVerb: `been ${verb_ing}`, verbForm: 'interrogative_have' };
                return { aux: polarity === 'negative' ? had_not : 'had', mainVerb: `been ${verb_ing}`, verbForm: 'statement' };
            }
        }
        if (tense === 'future') {
            if (aspect === 'simple') {
                if (polarity === 'negative') return { aux: will_not, mainVerb, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb, verbForm: 'statement' };
            }
            if (aspect === 'progressive') {
                if (polarity === 'negative') return { aux: will_not, mainVerb: `be ${verb_ing}`, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb: `be ${verb_ing}`, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb: `be ${verb_ing}`, verbForm: 'statement' };
            }
            if (aspect === 'perfect') {
                if (polarity === 'negative') return { aux: will_not, mainVerb: `have ${verb_pp}`, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb: `have ${verb_pp}`, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb: `have ${verb_pp}`, verbForm: 'statement' };
            }
            if (aspect === 'perfect_progressive') {
                if (polarity === 'negative') return { aux: will_not, mainVerb: `have been ${verb_ing}`, verbForm: 'statement' };
                if (polarity === 'interrogative') return { aux: 'Will', mainVerb: `have been ${verb_ing}`, verbForm: 'interrogative_will' };
                return { aux: 'will', mainVerb: `have been ${verb_ing}`, verbForm: 'statement' };
            }
        }
    }
    
    // --- Passive Voice ---
    if (voice === 'passive') {
        const verb_pp = conjugateVerb(lemma, 'pp', subject, flags);
        let be_aux = '';

        if (near_future) {
            const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            be_aux = `${be} going to be`;
        } else if (tense === 'present') {
            const be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            if (aspect === 'simple') be_aux = be;
            if (aspect === 'progressive') be_aux = `${be} being`;
            if (aspect === 'perfect') be_aux = `${is3rdSg ? 'has' : 'have'} been`;
        } else if (tense === 'past') {
            const be = is3rdSg || subject === 'I' ? 'was' : 'were';
            if (aspect === 'simple') be_aux = be;
            if (aspect === 'progressive') be_aux = `${be} being`;
            if (aspect === 'perfect') be_aux = 'had been';
        } else if (tense === 'future') {
            if (aspect === 'simple') be_aux = 'will be';
            if (aspect === 'perfect') be_aux = 'will have been';
        }

        const parts = be_aux.split(' ');
        const first_aux = parts[0];
        const rest_aux = parts.slice(1).join(' ');

        if (polarity === 'interrogative') return { aux: first_aux, mainVerb: `${rest_aux} ${verb_pp}`.trim(), verbForm: 'interrogative_be' };
        if (polarity === 'negative') {
             let first_aux_not = `${first_aux} not`;
            return { aux: first_aux_not, mainVerb: `${rest_aux} ${verb_pp}`.trim(), verbForm: 'statement' };
        }
        return { aux: be_aux, mainVerb: verb_pp, verbForm: 'statement' };
    }

    // Default fallback
    return { aux: '', mainVerb: lemma.text, verbForm: 'statement' };
};

// === NEW, type-safe short answer generator (from user suggestion) ===
export function generateShortAnswer(args: {
  subject: Pronoun;
  aux: Aux;
  want: Polarity;
}): string {
  const { subject, aux, want } = args;

  // This is now type-safe and will not widen.
  const answerPolarity: Polarity = want;

  const header = answerPolarity === 'affirmative' ? YES[subject] : NO[subject];
  const word   = answerPolarity === 'affirmative' ? AUX_AFFIRM[aux][subject] : AUX_NEG[aux][subject];

  return `${header} ${word}.`;
}

const generateVietnameseSentence = (state: GrammarState): string => {
    const { subject, lemma, flags } = state;
    const pronounVI = getPronounVI(subject);
    const lemmaVI = lemma.vi || lemma.text;

    // --- Part 1: Handle non-verb lemmas ---
    if (lemma.type !== 'verb') {
        const tenseMap = { present: '', past: 'đã', future: 'sẽ' };
        const tenseVI = tenseMap[flags.tense] || '';
        let sentence = '';

        if (lemma.type === 'adj') {
            switch (flags.polarity) {
                case 'affirmative': sentence = `${pronounVI} ${tenseVI} ${lemmaVI}.`; break;
                case 'negative': sentence = `${pronounVI} ${tenseVI} không ${lemmaVI}.`; break;
                case 'interrogative': sentence = `${pronounVI} có ${tenseVI} ${lemmaVI} không?`; break;
            }
        } else if (lemma.type === 'noun') {
            switch (flags.polarity) {
                case 'affirmative': sentence = `${pronounVI} ${tenseVI} là ${lemmaVI}.`; break;
                case 'negative': sentence = `${pronounVI} ${tenseVI} không phải là ${lemmaVI}.`; break;
                case 'interrogative': sentence = `${pronounVI} có phải ${tenseVI} là ${lemmaVI} không?`; break;
            }
        } else { // Fallback for prep, conj, adv
            switch (flags.polarity) {
                case 'affirmative': sentence = `${pronounVI} ${tenseVI} ${lemmaVI}.`; break;
                case 'negative': sentence = `${pronounVI} ${tenseVI} không ${lemmaVI}.`; break;
                case 'interrogative': sentence = `${pronounVI} có ${tenseVI} ${lemmaVI} không?`; break;
            }
        }
        return `(Dịch mẫu) ${sentence.replace(/\s+/g, ' ').trim()}`;
    }

    // --- Part 2: Handle verb lemmas with a template map ---
    const { tense, aspect, voice, polarity } = flags;
    const key = `${tense}-${aspect}-${voice}-${polarity}`;
    
    const templates: { [key: string]: string } = {
        // Present Simple
        'present-simple-active-affirmative': '{S} {V}.',
        'present-simple-active-negative': '{S} không {V}.',
        'present-simple-active-interrogative': '{S} có {V} không?',
        'present-simple-passive-affirmative': '{S} được {V}.',
        'present-simple-passive-negative': '{S} không được {V}.',
        'present-simple-passive-interrogative': '{S} có được {V} không?',
        // Present Progressive
        'present-progressive-active-affirmative': '{S} đang {V}.',
        'present-progressive-active-negative': '{S} không đang {V}.',
        'present-progressive-active-interrogative': '{S} có đang {V} không?',
        'present-progressive-passive-affirmative': '{S} đang được {V}.',
        // Present Perfect
        'present-perfect-active-affirmative': '{S} đã {V}.',
        'present-perfect-active-negative': '{S} chưa {V}.',
        'present-perfect-active-interrogative': '{S} đã {V} chưa?',
        'present-perfect-passive-affirmative': '{S} đã được {V}.',
        // Present Perfect Progressive
        'present-perfect_progressive-active-affirmative': '{S} đã và đang {V}.',

        // Past Simple
        'past-simple-active-affirmative': '{S} đã {V}.',
        'past-simple-active-negative': '{S} đã không {V}.',
        'past-simple-active-interrogative': '{S} có phải đã {V} không?',
        'past-simple-passive-affirmative': '{S} đã được {V}.',
        // Past Progressive
        'past-progressive-active-affirmative': '{S} đã đang {V}.',
        'past-progressive-passive-affirmative': '{S} đã đang được {V}.',
        // Past Perfect
        'past-perfect-active-affirmative': '{S} đã {V} (trước đó).',
        'past-perfect-passive-affirmative': '{S} đã được {V} (trước đó).',
        // Past Perfect Progressive
        'past-perfect_progressive-active-affirmative': '{S} đã liên tục {V}.',

        // Future Simple
        'future-simple-active-affirmative': '{S} sẽ {V}.',
        'future-simple-active-negative': '{S} sẽ không {V}.',
        'future-simple-active-interrogative': '{S} sẽ {V} chứ?',
        'future-simple-passive-affirmative': '{S} sẽ được {V}.',
        // Future Progressive
        'future-progressive-active-affirmative': '{S} sẽ đang {V}.',
        // Future Perfect
        'future-perfect-active-affirmative': '{S} sẽ đã {V} xong.',
        'future-perfect-passive-affirmative': '{S} sẽ đã được {V} xong.',
        // Future Perfect Progressive
        'future-perfect_progressive-active-affirmative': '{S} sẽ đã liên tục {V}.',
    };

    let template = templates[key] || '{S} {V}.'; // Default fallback

    if (flags.near_future) {
        if (voice === 'active') {
             switch (polarity) {
                case 'affirmative': template = '{S} sẽ {V}.'; break;
                case 'negative': template = '{S} sẽ không {V}.'; break;
                case 'interrogative': template = '{S} sẽ {V} chứ?'; break;
            }
        } else { // passive
             switch (polarity) {
                case 'affirmative': template = '{S} sẽ được {V}.'; break;
                case 'negative': template = '{S} sẽ không được {V}.'; break;
                case 'interrogative': template = '{S} sẽ được {V} chứ?'; break;
            }
        }
    }
    
    const result = template.replace('{S}', pronounVI).replace('{V}', lemmaVI);
    return `(Dịch mẫu) ${result.replace(/\s+/g, ' ').trim()}`;
};


// --- Main Service Functions ---

export const getFlagsForUnit = (unit: Unit, currentFlags: Flags): Flags => {
    return {
        ...currentFlags,
        tense: unit.tags?.tense || currentFlags.tense,
        aspect: unit.tags?.aspect || currentFlags.aspect,
        voice: unit.tags?.voice || 'active',
        near_future: unit.tags?.near_future || false,
        polarity: 'affirmative',
    };
};

export const generateSentence = (state: GrammarState, shortForm: boolean): { en: string; enHtml: string; vi: string; error: string | null } => {
    const { subject, lemma, flags, unitId } = state;
    const highlight = highlightRed; // The default highlight for verbs remains red.

    const unitExamples: { [key: string]: { en: string, enHtml: string, vi: string } } = {
        // Sentence Types
        '4-1': { en: "The cat sleeps.", enHtml: `The cat ${highlight('sleeps')}.`, vi: "Con mèo ngủ." },
        '4-2': { en: "The cat sleeps, and the dog plays.", enHtml: `The cat ${highlight('sleeps')}, and the dog ${highlight('plays')}.`, vi: "Con mèo ngủ, và con chó chơi." },
        '4-3': { en: "The cat sleeps when it is tired.", enHtml: `The cat ${highlight('sleeps')} when it ${highlight('is')} tired.`, vi: "Con mèo ngủ khi nó mệt." },
        '4-4': { en: "When the cat is tired, it sleeps, but the dog plays.", enHtml: `When the cat ${highlight('is')} tired, it ${highlight('sleeps')}, but the dog ${highlight('plays')}.`, vi: "Khi con mèo mệt, nó ngủ, nhưng con chó thì chơi." },
        '4-5': { en: "It is the cat that sleeps.", enHtml: `${highlight('It is')} the cat that ${highlight('sleeps')}.`, vi: "Chính là con mèo ngủ." },

        // Conditionals
        '5-1': { en: "If it rains, the cat will sleep inside.", enHtml: `If it ${highlight('rains')}, the cat ${highlight('will sleep')} inside.`, vi: "Nếu trời mưa, con mèo sẽ ngủ trong nhà." },
        '5-2': { en: "If the cat were a dog, it would bark.", enHtml: `If the cat ${highlight('were')} a dog, it ${highlight('would bark')}.`, vi: "Nếu con mèo là con chó, nó sẽ sủa." },
        '5-3': { en: "If the cat had eaten, it would not have been hungry.", enHtml: `If the cat ${highlight('had eaten')}, it ${highlight('would not have been')} hungry.`, vi: "Nếu con mèo đã ăn, nó đã không đói." },
        '5-4': { en: "If the cat had eaten, it would not be hungry now.", enHtml: `If the cat ${highlight('had eaten')}, it ${highlight('would not be')} hungry now.`, vi: "Nếu con mèo đã ăn, bây giờ nó sẽ không đói." },
        '5-5': { en: "Should it rain, the cat will sleep inside.", enHtml: `${highlight('Should')} it ${highlight('rain')}, the cat ${highlight('will sleep')} inside.`, vi: "Nếu trời mưa, con mèo sẽ ngủ trong nhà." },
        '5-6': { en: "Were the cat a dog, it would bark.", enHtml: `${highlight('Were')} the cat a dog, it ${highlight('would bark')}.`, vi: "Nếu con mèo là con chó, nó sẽ sủa." },
        '5-7': { en: "Had the cat eaten, it would not have been hungry.", enHtml: `${highlight('Had')} the cat ${highlight('eaten')}, it ${highlight('would not have been')} hungry.`, vi: "Nếu con mèo đã ăn, nó đã không đói." },
        
        // Wishes
        '6-1': { en: "I wish I had a cat.", enHtml: `I ${highlight('wish')} I ${highlight('had')} a cat.`, vi: "Tôi ước tôi có một con mèo." },
        '6-2': { en: "I wish I had bought a cat yesterday.", enHtml: `I ${highlight('wish')} I ${highlight('had bought')} a cat yesterday.`, vi: "Tôi ước tôi đã mua một con mèo hôm qua." },
        '6-3': { en: "I wish the dog would stop barking.", enHtml: `I ${highlight('wish')} the dog ${highlight('would stop')} barking.`, vi: "Tôi ước con chó sẽ ngừng sủa." },

        // Reported Speech
        '7-1': { en: "He said that the cat was sleeping.", enHtml: `He ${highlight('said')} that the cat ${highlight('was sleeping')}.`, vi: "Anh ấy nói rằng con mèo đang ngủ." },
        '7-2': { en: "He asked if the cat was sleeping.", enHtml: `He ${highlight('asked')} if the cat ${highlight('was sleeping')}.`, vi: "Anh ấy hỏi liệu con mèo có đang ngủ không." },
        '7-3': { en: "He asked where the cat was sleeping.", enHtml: `He ${highlight('asked')} where the cat ${highlight('was sleeping')}.`, vi: "Anh ấy hỏi con mèo đang ngủ ở đâu." },
        '7-4': { en: "He told me to feed the cat.", enHtml: `He ${highlight('told')} me to feed the cat.`, vi: "Anh ấy bảo tôi cho mèo ăn." },
        '7-5': { en: "Direct: 'I work.' Reported: He said he worked.", enHtml: `Direct: 'I work.' Reported: He ${highlight('said')} he ${highlight('worked')}.`, vi: "Trực tiếp: 'Tôi làm việc.' Tường thuật: Anh ấy nói anh ấy đã làm việc." },

        // Comparisons
        '8-1': { en: "The cat is as big as the dog.", enHtml: `The cat ${highlight('is as big as')} the dog.`, vi: "Con mèo to bằng con chó." },
        '8-2': { en: "The dog is bigger than the cat.", enHtml: `The dog ${highlight('is bigger than')} the cat.`, vi: "Con chó to hơn con mèo." },
        '8-3': { en: "This is the biggest cat in the world.", enHtml: `This ${highlight('is the biggest')} cat in the world.`, vi: "Đây là con mèo to nhất trên thế giới." },
        '8-4': { en: "The more the cat sleeps, the more the dog plays.", enHtml: `The more the cat ${highlight('sleeps')}, the more the dog ${highlight('plays')}.`, vi: "Mèo càng ngủ nhiều, chó càng chơi nhiều." },
        
        // Subjunctive
        '9-1': { en: "I suggest that the cat stay inside.", enHtml: `I ${highlight('suggest')} that the cat ${highlight('stay')} inside.`, vi: "Tôi đề nghị rằng con mèo nên ở trong nhà." },
        '9-2': { en: "I wish I were a cat.", enHtml: `I ${highlight('wish')} I ${highlight('were')} a cat.`, vi: "Tôi ước tôi là một con mèo." },
        '9-3': { en: "Long live the cat!", enHtml: `Long ${highlight('live')} the cat!`, vi: "Con mèo muôn năm!" },
        '9-4': { en: "It is important that the cat eat its food.", enHtml: `${highlight('It is')} important that the cat ${highlight('eat')} its food.`, vi: "Điều quan trọng là con mèo phải ăn thức ăn của nó." },
        '9-5': { en: "The cat would rather sleep than play.", enHtml: `The cat ${highlight('would rather sleep')} than play.`, vi: "Con mèo thà ngủ còn hơn chơi." },

        // Modals (Group 10)
        '10-1': { en: "The cat can climb trees.", enHtml: `The cat ${highlight('can climb')} trees.`, vi: "Con mèo có thể trèo cây." },
        '10-2': { en: "The cat must eat its food.", enHtml: `The cat ${highlight('must eat')} its food.`, vi: "Con mèo phải ăn thức ăn của nó." },
        '10-3': { en: "The cat may be sleeping.", enHtml: `The cat ${highlight('may be sleeping')}.`, vi: "Con mèo có thể đang ngủ." },
        '10-4': { en: "The cat is sleeping. It must be tired.", enHtml: `The cat is sleeping. It ${highlight('must be')} tired.`, vi: "Con mèo đang ngủ. Chắc hẳn nó mệt." },
        '10-5': { en: "The cat should not play with the wire.", enHtml: `The cat ${highlight('should not play')} with the wire.`, vi: "Con mèo không nên chơi với dây điện." },
        '10-6': { en: "The dog used to chase the cat.", enHtml: `The dog ${highlight('used to chase')} the cat.`, vi: "Con chó đã từng đuổi theo con mèo." },

        // Articles (Group 11)
        '11-1': { en: "I have a cat and an apple.", enHtml: `I ${highlight('have')} a cat and an apple.`, vi: "Tôi có một con mèo và một quả táo." },
        '11-2': { en: "I have a cat. The cat is black.", enHtml: `I ${highlight('have')} a cat. The cat ${highlight('is')} black.`, vi: "Tôi có một con mèo. Con mèo đó màu đen." },
        '11-3': { en: "Cats like milk.", enHtml: `Cats ${highlight('like')} milk.`, vi: "Mèo thích sữa." },
        '11-4': { en: "The cat is at home.", enHtml: `The cat ${highlight('is')} at home.`, vi: "Con mèo ở nhà." },

        // Adjectives (Group 12)
        '12-1': { en: "It is a small black cat.", enHtml: `It ${highlight('is')} a small black cat.`, vi: "Nó là một con mèo đen nhỏ." },
        '12-2': { en: "The cat is bored. The toy is boring.", enHtml: `The cat ${highlight('is')} bored. The toy ${highlight('is')} boring.`, vi: "Con mèo cảm thấy chán. Món đồ chơi thật nhàm chán." },
        '12-3': { en: "The cat is afraid of the dog.", enHtml: `The cat ${highlight('is afraid of')} the dog.`, vi: "Con mèo sợ con chó." },
        '12-4': { en: "It is a black cat. The cat is black.", enHtml: `It ${highlight('is')} a black cat. The cat ${highlight('is')} black.`, vi: "Đó là một con mèo đen. Con mèo đó màu đen." },
        '12-5': { en: "The dog is very big. It is absolutely huge.", enHtml: `The dog ${highlight('is')} very big. It ${highlight('is')} absolutely huge.`, vi: "Con chó rất to. Nó thực sự khổng lồ." },

        // Adverbs (Group 13)
        '13-1': { en: "The cat walks slowly.", enHtml: `The cat ${highlight('walks')} slowly.`, vi: "Con mèo đi bộ chậm rãi." },
        '13-2': { en: "The cat always sleeps on the chair.", enHtml: `The cat ${highlight('always sleeps')} on the chair.`, vi: "Con mèo luôn luôn ngủ trên ghế." },
        '13-3': { en: "The cat often plays with a ball.", enHtml: `The cat ${highlight('often plays')} with a ball.`, vi: "Con mèo thường chơi với một quả bóng." },
        '13-4': { en: "Only the cat can open that door.", enHtml: `Only the cat ${highlight('can open')} that door.`, vi: "Chỉ có con mèo mới có thể mở cánh cửa đó." },
        '13-5': { en: "The dog runs faster than the cat.", enHtml: `The dog ${highlight('runs faster than')} the cat.`, vi: "Con chó chạy nhanh hơn con mèo." },

        // Nouns (Group 14)
        '14-1': { en: "I have two cats and some water.", enHtml: `I ${highlight('have')} two cats and some water.`, vi: "Tôi có hai con mèo và một ít nước." },
        '14-2': { en: "One cat, two cats. One child, two children.", enHtml: `One cat, two cats. One child, two children.`, vi: "Một con mèo, hai con mèo. Một đứa trẻ, hai đứa trẻ." },
        '14-3': { en: "The cat food is in the bowl.", enHtml: `The cat food ${highlight('is')} in the bowl.`, vi: "Thức ăn cho mèo ở trong bát." },
        '14-4': { en: "This is the cat's toy.", enHtml: `This ${highlight('is')} the cat's toy.`, vi: "Đây là đồ chơi của con mèo." },
        '14-5': { en: "I see the big black cat.", enHtml: `I ${highlight('see')} the big black cat.`, vi: "Tôi thấy con mèo đen to lớn." },

        // Verbs (Group 15)
        '15-1': { en: "The cat sleeps. The cat chases a mouse.", enHtml: `The cat ${highlight('sleeps')}. The cat ${highlight('chases')} a mouse.`, vi: "Con mèo ngủ. Con mèo đuổi theo một con chuột." },
        '15-2': { en: "The cat is playing. The cat loves fish.", enHtml: `The cat ${highlight('is playing')}. The cat ${highlight('loves')} fish.`, vi: "Con mèo đang chơi. Con mèo thích cá." },
        '15-3': { en: "The cat wants to sleep. It avoids getting wet.", enHtml: `The cat ${highlight('wants to sleep')}. It ${highlight('avoids getting')} wet.`, vi: "Con mèo muốn ngủ. Nó tránh bị ướt." },
        '15-4': { en: "The dog woke up.", enHtml: `The dog ${highlight('woke up')}.`, vi: "Con chó đã thức dậy." },
        '15-5': { en: "I had the vet check my cat.", enHtml: `I ${highlight('had the vet check')} my cat.`, vi: "Tôi đã nhờ bác sĩ thú y kiểm tra cho mèo của tôi." },
        
        // Conjunctions (Group 16)
        '16-1': { en: "The cat sleeps, but the dog plays.", enHtml: `The cat ${highlight('sleeps')}, but the dog ${highlight('plays')}.`, vi: "Con mèo ngủ, nhưng con chó chơi." },
        '16-2': { en: "When the cat is tired, it sleeps.", enHtml: `${highlight('When')} the cat ${highlight('is')} tired, it ${highlight('sleeps')}.`, vi: "Khi con mèo mệt, nó ngủ." },
        '16-3': { en: "Both the cat and the dog are cute.", enHtml: `Both the cat and the dog ${highlight('are')} cute.`, vi: "Cả con mèo và con chó đều dễ thương." },
        '16-4': { en: "The cat is tired; however, it does not sleep.", enHtml: `The cat ${highlight('is')} tired; however, it ${highlight('does not sleep')}.`, vi: "Con mèo mệt; tuy nhiên, nó không ngủ." },
        '16-5': { en: "I have a cat, a dog, and a bird.", enHtml: `I ${highlight('have')} a cat, a dog, and a bird.`, vi: "Tôi có một con mèo, một con chó, và một con chim." },

        // Prepositions (Group 17)
        '17-1': { en: "The cat sleeps at night.", enHtml: `The cat ${highlight('sleeps')} at night.`, vi: "Con mèo ngủ vào ban đêm." },
        '17-2': { en: "The cat is on the table.", enHtml: `The cat ${highlight('is')} on the table.`, vi: "Con mèo ở trên bàn." },
        '17-3': { en: "The cat is afraid of the dog.", enHtml: `The cat ${highlight('is afraid of')} the dog.`, vi: "Con mèo sợ con chó." },
        '17-4': { en: "The cat is sleeping under the table.", enHtml: `The cat ${highlight('is sleeping')} under the table.`, vi: "Con mèo đang ngủ dưới gầm bàn." },
        '17-5': { en: "What are you looking at?", enHtml: `What ${highlight('are you looking')} at?`, vi: "Bạn đang nhìn gì vậy?" },

        // Relative Clauses (Group 18)
        '18-1': { en: "The cat that is sleeping is black.", enHtml: `The cat that ${highlight('is sleeping')} is black.`, vi: "Con mèo đang ngủ thì màu đen." },
        '18-2': { en: "My cat, which is very lazy, sleeps all day.", enHtml: `My cat, which ${highlight('is')} very lazy, ${highlight('sleeps')} all day.`, vi: "Con mèo của tôi, con mà rất lười, ngủ cả ngày." },
        '18-3': { en: "The cat (that) I see is black.", enHtml: `The cat (that) I ${highlight('see')} is black.`, vi: "Con mèo (mà) tôi thấy thì màu đen." },
        '18-4': { en: "The dog whose owner is my friend is big.", enHtml: `The dog whose owner ${highlight('is')} my friend ${highlight('is')} big.`, vi: "Con chó mà chủ của nó là bạn tôi thì to." },

        // Reduced Relative Clauses (Group 19)
        '19-1': { en: "The cat sleeping on the mat is cute.", enHtml: `The cat ${highlight('sleeping')} on the mat ${highlight('is')} cute.`, vi: "Con mèo đang ngủ trên tấm thảm thì dễ thương." },
        '19-2': { en: "The food eaten by the cat was good.", enHtml: `The food ${highlight('eaten')} by the cat ${highlight('was')} good.`, vi: "Thức ăn được con mèo ăn thì ngon." },
        '19-3': { en: "He is the first person to arrive.", enHtml: `He ${highlight('is')} the first person ${highlight('to arrive')}.`, vi: "Anh ấy là người đầu tiên đến." },
        '19-4': { en: "This is a good place to sleep.", enHtml: `This ${highlight('is')} a good place ${highlight('to sleep')}.`, vi: "Đây là một nơi tốt để ngủ." },
        
        // Prefixes (Group 20)
        '20-1': { en: "The answer is incorrect.", enHtml: `The answer ${highlight('is incorrect')}.`, vi: "Câu trả lời không chính xác." },
        '20-2': { en: "He is overweight.", enHtml: `He ${highlight('is overweight')}.`, vi: "Anh ấy bị thừa cân." },
        '20-3': { en: "This is a pre-war building.", enHtml: `This ${highlight('is')} a pre-war building.`, vi: "Đây là một tòa nhà trước chiến tranh." },
        '20-4': { en: "This is a bilingual dictionary.", enHtml: `This ${highlight('is')} a bilingual dictionary.`, vi: "Đây là một cuốn từ điển song ngữ." },

        // Suffixes (Group 21)
        '21-1': { en: "This is a new development.", enHtml: `This ${highlight('is')} a new development.`, vi: "Đây là một sự phát triển mới." },
        '21-2': { en: "This is a dangerous dog.", enHtml: `This ${highlight('is')} a dangerous dog.`, vi: "Đây là một con chó nguy hiểm." },
        '21-3': { en: "Please shorten this rope.", enHtml: `Please ${highlight('shorten')} this rope.`, vi: "Làm ơn rút ngắn sợi dây này." },
        '21-4': { en: "He runs quickly.", enHtml: `He ${highlight('runs')} quickly.`, vi: "Anh ấy chạy nhanh." },
        
        // Passive Voice (Groups 22, 23, 24)
        '22-1': { en: "English is spoken here.", enHtml: `English ${highlight('is spoken')} here.`, vi: "Tiếng Anh được nói ở đây." },
        '22-2': { en: "The house is being built.", enHtml: `The house ${highlight('is being built')}.`, vi: "Ngôi nhà đang được xây." },
        '22-3': { en: "The work has been finished.", enHtml: `The work ${highlight('has been finished')}.`, vi: "Công việc đã được hoàn thành." },
        '23-1': { en: "The letter was written yesterday.", enHtml: `The letter ${highlight('was written')} yesterday.`, vi: "Bức thư đã được viết ngày hôm qua." },
        '23-2': { en: "The road was being repaired.", enHtml: `The road ${highlight('was being repaired')}.`, vi: "Con đường đang được sửa chữa." },
        '23-3': { en: "The house had been sold.", enHtml: `The house ${highlight('had been sold')}.`, vi: "Ngôi nhà đã được bán." },
        '24-1': { en: "The work will be finished tomorrow.", enHtml: `The work ${highlight('will be finished')} tomorrow.`, vi: "Công việc sẽ được hoàn thành vào ngày mai." },
        '24-2': { en: "The car is going to be washed.", enHtml: `The car ${highlight('is going to be washed')}.`, vi: "Chiếc xe sẽ được rửa." },
        '24-4': { en: "The work will have been finished by 5 PM.", enHtml: `The work ${highlight('will have been finished')} by 5 PM.`, vi: "Công việc sẽ đã được hoàn thành trước 5 giờ chiều." },

        // Adjective Position (Group 25)
        '25-1': { en: "It is a black cat.", enHtml: `It ${highlight('is')} a black cat.`, vi: "Nó là một con mèo đen." },
        '25-2': { en: "The cat is black.", enHtml: `The cat ${highlight('is black')}.`, vi: "Con mèo thì màu đen." },
        '25-3': { en: "The cat is afraid of the dog.", enHtml: `The cat ${highlight('is afraid of')} the dog.`, vi: "Con mèo sợ con chó." },
        '25-4': { en: "I see something new.", enHtml: `I ${highlight('see')} something new.`, vi: "Tôi thấy một cái gì đó mới." },
        
        // Adverb Position (Group 26)
        '26-1': { en: "The cat always sleeps on the chair.", enHtml: `The cat ${highlight('always sleeps')} on the chair.`, vi: "Con mèo luôn ngủ trên ghế." },
        '26-2': { en: "Yesterday, the dog played in the park.", enHtml: `Yesterday, the dog ${highlight('played')} in the park.`, vi: "Hôm qua, con chó đã chơi trong công viên." },
        '26-3': { en: "The cat sleeps peacefully.", enHtml: `The cat ${highlight('sleeps')} peacefully.`, vi: "Con mèo ngủ một cách yên bình." },
        '26-4': { en: "Rarely does the cat play outside.", enHtml: `${highlight('Rarely does')} the cat ${highlight('play')} outside.`, vi: "Hiếm khi con mèo chơi ở ngoài." },
        
        // Verbs in Sentences (Group 27)
        '27-1': { en: "The cat must have been sleeping.", enHtml: `The cat ${highlight('must have been sleeping')}.`, vi: "Con mèo chắc hẳn đã đang ngủ." },
        '27-2': { en: "The cat sleeps. The dogs sleep.", enHtml: `The cat ${highlight('sleeps')}. The dogs ${highlight('sleep')}.`, vi: "Con mèo ngủ. Những con chó ngủ." },
        '27-3': { en: "The cat does not sleep. Does the cat sleep?", enHtml: `The cat ${highlight('does not sleep')}. ${highlight('Does')} the cat ${highlight('sleep')}?`, vi: "Con mèo không ngủ. Con mèo có ngủ không?" },
        '27-4': { en: "Never have I seen a cat sleep so much.", enHtml: `${highlight('Never have I seen')} a cat sleep so much.`, vi: "Chưa bao giờ tôi thấy một con mèo ngủ nhiều như vậy." },
        '27-5': { en: "Does the cat sleep? Yes, it does.", enHtml: `Does the cat sleep? Yes, it ${highlight('does')}.`, vi: "Con mèo có ngủ không? Vâng, có." },

        // Nouns in Sentences (Group 28)
        '28-1': { en: "It is raining. There is a cat on the mat.", enHtml: `${highlight('It is')} raining. ${highlight('There is')} a cat on the mat.`, vi: "Trời đang mưa. Có một con mèo trên tấm thảm." },
        '28-2': { en: "The dog chases the ball.", enHtml: `The dog ${highlight('chases')} the ball.`, vi: "Con chó đuổi theo quả bóng." },
        '28-3': { en: "The cat is a pet.", enHtml: `The cat ${highlight('is')} a pet.`, vi: "Con mèo là một thú cưng." },
        '28-4': { en: "My pet, a small cat, is sleeping.", enHtml: `My pet, a small cat, ${highlight('is sleeping')}.`, vi: "Thú cưng của tôi, một con mèo nhỏ, đang ngủ." },
        '28-5': { en: "The cat is sleeping on a mat.", enHtml: `The cat ${highlight('is sleeping')} on a mat.`, vi: "Con mèo đang ngủ trên một tấm thảm." },
        
        // Conjunctions in Sentences (Group 29)
        '29-1': { en: "The cat sleeps, and the dog plays.", enHtml: `The cat ${highlight('sleeps')}, and the dog ${highlight('plays')}.`, vi: "Con mèo ngủ, và con chó chơi." },
        '29-2': { en: "The cat sleeps when it is tired.", enHtml: `The cat ${highlight('sleeps')} when it ${highlight('is')} tired.`, vi: "Con mèo ngủ khi nó mệt." },
        '29-3': { en: "Both the cat and the dog are cute.", enHtml: `Both the cat and the dog ${highlight('are')} cute.`, vi: "Cả con mèo và con chó đều dễ thương." },
        '29-4': { en: "The cat is tired; however, it does not sleep.", enHtml: `The cat ${highlight('is')} tired; however, it ${highlight('does not sleep')}.`, vi: "Con mèo mệt; tuy nhiên, nó không ngủ." },
        
        // Sentence Formation (Group 30)
        '30-1': { en: "The cat sleeps on the mat.", enHtml: `The cat ${highlight('sleeps')} on the mat.`, vi: "Con mèo ngủ trên tấm thảm." },
        '30-2': { en: "The cat does not sleep on the mat.", enHtml: `The cat ${highlight('does not sleep')} on the mat.`, vi: "Con mèo không ngủ trên tấm thảm." },
        '30-3': { en: "Does the cat sleep on the mat?", enHtml: `${highlight('Does')} the cat ${highlight('sleep')} on the mat?`, vi: "Con mèo có ngủ trên tấm thảm không?" },
        '30-4': { en: "Where does the cat sleep?", enHtml: `Where ${highlight('does')} the cat ${highlight('sleep')}?`, vi: "Con mèo ngủ ở đâu?" },
        '30-5': { en: "Let's feed the cat. Be quiet.", enHtml: `${highlight("Let's feed")} the cat. ${highlight('Be')} quiet.`, vi: "Chúng ta hãy cho mèo ăn. Hãy im lặng." }
    };

    if (unitId && unitExamples[unitId]) {
        const example = unitExamples[unitId];
        return { ...example, vi: `(Ví dụ) ${example.vi}`, error: null };
    }
    
    const unit = units.find(u => u.id === unitId);
    
    if (unit?.applicable === false) {
        return { 
            en: "N/A", enHtml: "N/A", vi: "Không áp dụng",
            error: "KHÔNG ÁP DỤNG VỚI ĐIỂM NGỮ PHÁP NÀY"
        };
    }

    if (flags.short_answer) {
        // This part remains mostly the same, just adding enHtml
        const answerPolarity: Polarity = flags.polarity === 'negative' ? 'negative' : 'affirmative';
        
        if (lemma.type !== 'verb') {
            const is3rdSg = isThirdPersonSingular(subject);
            let be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
            if (flags.tense === 'past') {
                be = (subject === 'I' || is3rdSg) ? 'was' : 'were';
            }
            
            const pronounAsPronoun = mapSubjectToPronoun(subject);
            let answerSubject: Pronoun = pronounAsPronoun;
            if (pronounAsPronoun === 'you') answerSubject = 'I';
            else if (pronounAsPronoun === 'I') answerSubject = 'you';

            const pronoun = getPronoun(answerSubject);

            if (answerPolarity === 'affirmative') {
                 const en = `Yes, ${pronoun} ${be}.`;
                 return { en, enHtml: `Yes, ${pronoun} ${highlight(be)}.`, vi: `(Dịch mẫu) Vâng, đúng vậy.`, error: null };
            } else { 
                let be_not = `${be} not`;
                if (be === 'am') be_not = 'am not';
                else if (be === 'is') be_not = "isn't";
                else if (be === 'are') be_not = "aren't";
                else if (be === 'was') be_not = "wasn't";
                else if (be === 'were') be_not = "weren't";
                const en = `No, ${pronoun} ${be_not}.`;
                return { en, enHtml: `No, ${pronoun} ${highlight(be_not)}.`, vi: `(Dịch mẫu) Không, không phải.`, error: null };
            }
        }
        
        const questionState: GrammarState = { ...state, flags: { ...flags, polarity: 'interrogative', short_answer: false } };
        const { aux: questionAuxStr, verbForm } = getAuxiliary(questionState);

        if (!verbForm.startsWith('interrogative_')) {
            return { en: 'N/A', enHtml: 'N/A', vi: 'Không áp dụng câu trả lời ngắn', error: "Không thể tạo câu trả lời ngắn cho dạng câu này." };
        }
        
        const questionAux = questionAuxStr.toLowerCase() as Aux;
        const subjectAsPronoun = mapSubjectToPronoun(subject);

        let answerSubject: Pronoun = subjectAsPronoun;
        if (subjectAsPronoun === 'you') answerSubject = 'I';
        else if (subjectAsPronoun === 'I') answerSubject = 'you';
        
        const en = generateShortAnswer({ subject: answerSubject, aux: questionAux, want: answerPolarity });
        const enHtml = en.replace(AUX_AFFIRM[questionAux]?.[answerSubject] || AUX_NEG[questionAux]?.[answerSubject], (match) => highlight(match));

        const vi = answerPolarity === 'affirmative' ? `(Dịch mẫu) Vâng, đúng vậy.` : `(Dịch mẫu) Không, không phải.`;
        return { en, enHtml, vi, error: null };
    }

    if (lemma.type === 'conj') {
        let exampleEn = 'I like tea and he likes coffee.';
        let exampleHtml = `I ${highlight('like')} tea and he ${highlight('likes')} coffee.`;
        let exampleVi = '(Ví dụ) Tôi thích trà và anh ấy thích cà phê.';
        // Simplified for brevity, a full implementation would highlight all examples
        return { en: exampleEn, enHtml: exampleHtml, vi: exampleVi, error: null };
    }
    
     if (lemma.type !== 'verb') {
        const pronoun = getPronoun(subject);
        const is3rdSg = isThirdPersonSingular(subject);
        let be: string;
       
        if (flags.tense === 'present') be = subject === 'I' ? 'am' : is3rdSg ? 'is' : 'are';
        else if (flags.tense === 'past') be = (subject === 'I' || is3rdSg) ? 'was' : 'were';
        else be = 'will be';
        
        let mainWordHtml = lemma.text;
        if (lemma.type === 'adj') {
            mainWordHtml = highlightGreen(lemma.text);
        } else if (lemma.type === 'adv') {
            mainWordHtml = highlightOrange(lemma.text);
        }
        
        let enSentence = '', enHtml = '';
      
        if (flags.polarity === 'affirmative') {
            enSentence = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${be} ${lemma.text}.`;
            enHtml = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${highlight(be)} ${mainWordHtml}.`;
        } else if (flags.polarity === 'negative') {
            const beParts = be.split(' ');
            enSentence = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${beParts[0]} not ${beParts.slice(1).join(' ')} ${lemma.text}.`;
            enHtml = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${highlight(`${beParts[0]} not`)} ${beParts.slice(1).join(' ')} ${mainWordHtml}.`;
        } else {
            const beParts = be.split(' ');
            const capitalizedBe = beParts[0].charAt(0).toUpperCase() + beParts[0].slice(1);
            enSentence = `${capitalizedBe} ${pronoun} ${beParts.slice(1).join(' ')} ${lemma.text}?`;
            enHtml = `${capitalizedBe} ${pronoun} ${beParts.slice(1).join(' ')} ${mainWordHtml}?`;
        }
        
        const vi = generateVietnameseSentence(state);
        return {
            en: maybeShorten(enSentence.replace(/\s+/g, ' ').trim(), shortForm),
            enHtml: maybeShorten(enHtml.replace(/\s+/g, ' ').trim(), shortForm),
            vi: vi, error: null
        };
    }

    const { aux, mainVerb, verbForm } = getAuxiliary(state);
    const pronoun = getPronoun(subject);
    const capitalizedPronoun = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
    
    let enParts: (string | null | undefined)[] = [];
    let enHtmlParts: (string | null | undefined)[] = [];
    
    switch (verbForm) {
        case 'interrogative_be':
        case 'interrogative_have':
        case 'interrogative_will':
            const capitalizedAux = aux.charAt(0).toUpperCase() + aux.slice(1);
            enParts = [capitalizedAux, pronoun, mainVerb];
            enHtmlParts = [highlight(capitalizedAux), pronoun, highlight(mainVerb)];
            break;
        case 'interrogative_do':
            enParts = [aux, pronoun, mainVerb];
            enHtmlParts = [highlight(aux), pronoun, highlight(mainVerb)];
            break;
        default:
            enParts = [capitalizedPronoun, aux, mainVerb];
            enHtmlParts = [capitalizedPronoun, highlight(aux), highlight(mainVerb)];
            break;
    }
    
    // Refactored sentence construction to be more robust
    const buildSentence = (parts: (string | null | undefined)[]) => {
        return parts.filter(Boolean).join(' ');
    };

    let en = buildSentence(enParts);
    let enHtml = buildSentence(enHtmlParts);

    en += (verbForm.startsWith('interrogative_') ? '?' : '.');
    enHtml += (verbForm.startsWith('interrogative_') ? '?' : '.');
    
    const vi = generateVietnameseSentence(state);

    return { 
        en: maybeShorten(en, shortForm), 
        enHtml: maybeShorten(enHtml, shortForm),
        vi: vi.replace(/\s+/g, ' ').trim(), 
        error: null 
    };
};

// === Short-form (contractions) helper ===============================
export function toContractions(s: string): string {
  const processed = s
    // BE (affirmative)
    .replace(/\bI am\b/gi, "I'm")
    .replace(/\b(He|She|It) is\b/gi, (_m, p1) => `${p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase()}'s`)
    .replace(/\b(You|We|They) are\b/gi, (_m, p1) => `${p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase()}'re`)
    // BE (negative)
    .replace(/\bIs not\b/gi, "Isn't")
    .replace(/\bAre not\b/gi, "Aren't")
    .replace(/\bWas not\b/gi, "Wasn't")
    .replace(/\bWere not\b/gi, "Weren't")
    // DO (negative)
    .replace(/\bDo not\b/gi, "Don't")
    .replace(/\bDoes not\b/gi, "Doesn't")
    .replace(/\bDid not\b/gi, "Didn't")
    // WILL
    .replace(/\bWill not\b/gi, "Won't")
    .replace(/\b(I|You|We|They|He|She|It) will\b/gi, (_m, p1) => `${p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase()}'ll`)
    // HAVE/HAS/HAD aux
    .replace(/\b(I|You|We|They) have\b/gi, (_m, p1) => `${p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase()}'ve`)
    .replace(/\b(He|She|It) has\b/gi, (_m, p1) => `${p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase()}'s`)
    .replace(/\b(I|You|We|They|He|She|It) had\b/gi, (_m, p1) => `${p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase()}'d`)
    .replace(/\bHave not\b/gi, "Haven't")
    .replace(/\bHas not\b/gi, "Hasn't")
    .replace(/\bHad not\b/gi, "Hadn't")
    // would/should/could have
    .replace(/\b(Would|would) have\b/gi, "would've")
    .replace(/\b(Should|should) have\b/gi, "should've")
    .replace(/\b(Could|could) have\b/gi, "could've")
    .replace(/\b(I|You|We|They|He|She|It) would\b/gi, (_m, p1) => `${p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase()}'d`);

    // Handle special case "I am not" -> "I'm not" which is not handled by the above regex
    return processed.replace(/\bI am not\b/gi, "I'm not");
}

export function maybeShorten(text: string, shortForm?: boolean) {
  // The HTML version of highlighting can interfere with regex, so we do a trick:
  // Apply contractions, then re-apply highlighting to the contracted part.
  if (!shortForm) return text;
  
  const textWithoutTags = text.replace(/<span[^>]*>|<\/span>/g, '');
  const contractedText = toContractions(textWithoutTags);

  // This is a simplified re-application of highlighting. It's not perfect but works for most cases.
  // A better solution would involve tokenizing and rebuilding the string with HTML.
  const redSpan = "<span class='text-red-500 font-bold'>";
  const endSpan = "</span>";

  if (contractedText.includes("'t") || contractedText.includes("'m") || contractedText.includes("'s") || contractedText.includes("'re") || contractedText.includes("'ve") || contractedText.includes("'d") || contractedText.includes("'ll")) {
      const words = contractedText.split(' ');
      const htmlWords = words.map(word => {
          // A crude check to see if the word is likely an auxiliary verb
          if (word.toLowerCase().match(/^(is|are|was|were|have|has|had|do|does|did|will|would|can|could|should|may|might)n't$|^i'm$|^(he|she|it|that)'s$|^(you|we|they)'re$|^(i|you|we|they)'ve$|^(i|you|we|they|he|she|it)'d$|^(i|you|we|they|he|she|it)'ll$/i)) {
              return `${redSpan}${word}${endSpan}`;
          }
          return word;
      });
      // Handle cases like "It is the cat that sleeps" -> "It's the cat that sleeps"
      const mainVerbHighlighted = htmlWords.join(' ').replace(new RegExp(`(${redSpan}[^<]+${endSpan}) ([^<]+)$`), `$1 ${redSpan}$2${endSpan}`);
      return mainVerbHighlighted;
  }

  return contractedText;
}