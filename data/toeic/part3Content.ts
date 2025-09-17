import { ToeicTask } from '../../types';

type ToeicTaskContent = Pick<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;

// Q5-7 tasks do not have pre-generated sample content, so this map is empty.
// It exists to maintain a consistent modular structure.
export const toeicPart3Content: Record<string, ToeicTaskContent> = {};