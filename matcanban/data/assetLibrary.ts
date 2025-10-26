
export interface ImageAsset {
    id: string;
    name: string;
    imageSeed: string; // Used by GcsImage component
    tags: string[];
}

export interface SoundAsset {
    id: string;
    name: string;
    src: string; // Placeholder URL
    tags: string[];
}

export const sampleImages: ImageAsset[] = [
    { id: 'img_01', name: 'Office Meeting', imageSeed: 'office-meeting', tags: ['work', 'business', 'people', 'team'] },
    { id: 'img_02', name: 'Supermarket Checkout', imageSeed: 'supermarket-checkout', tags: ['shopping', 'food', 'store', 'people'] },
    { id: 'img_03', name: 'Cafe Scene', imageSeed: 'cafe-scene', tags: ['coffee', 'leisure', 'people', 'relax'] },
    { id: 'img_04', name: 'Library', imageSeed: 'library-interior', tags: ['books', 'study', 'education', 'quiet'] },
    { id: 'img_05', name: 'Construction Site', imageSeed: 'construction-site', tags: ['work', 'building', 'industry'] },
    { id: 'img_06', name: 'Airport Terminal', imageSeed: 'airport-terminal', tags: ['travel', 'people', 'transport'] },
    { id: 'img_07', name: 'Classroom Lecture', imageSeed: 'classroom-lecture', tags: ['education', 'study', 'people', 'school'] },
    { id: 'img_08', name: 'Outdoor Market', imageSeed: 'outdoor-market', tags: ['shopping', 'food', 'people', 'street'] },
    { id: 'img_09', name: 'Starters: Ball', imageSeed: 'starters-ball', tags: ['toy', 'kids', 'cambridge', 'starters'] },
    { id: 'img_10', name: 'Starters: Cat', imageSeed: 'starters-cat', tags: ['animal', 'pet', 'kids', 'cambridge', 'starters'] },
    { id: 'img_11', name: 'Starters: Dog', imageSeed: 'starters-dog', tags: ['animal', 'pet', 'kids', 'cambridge', 'starters'] },
    { id: 'img_12', name: 'Starters: House', imageSeed: 'starters-house', tags: ['home', 'building', 'kids', 'cambridge', 'starters'] },
];

export const sampleSounds: SoundAsset[] = [
    { id: 'snd_01', name: 'Correct Answer', src: 'sounds/correct.mp3', tags: ['feedback', 'positive', 'success'] },
    { id: 'snd_02', name: 'Incorrect Answer', src: 'sounds/incorrect.wav', tags: ['feedback', 'negative', 'error'] },
    { id: 'snd_03', name: 'Button Click', src: 'sounds/click.mp3', tags: ['ui', 'interaction'] },
    { id: 'snd_04', name: 'Timer Tick', src: 'sounds/tick.wav', tags: ['timer', 'clock'] },
    { id: 'snd_05', name: 'Level Complete', src: 'sounds/level_up.mp3', tags: ['game', 'success', 'win'] },
    { id: 'snd_06', name: 'Airport Announcement', src: 'sounds/airport_chime.mp3', tags: ['background', 'travel', 'announcement'] },
];
