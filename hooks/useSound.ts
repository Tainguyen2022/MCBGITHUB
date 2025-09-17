// Sound effects for practice exercises
export const playCorrectSound = () => {
  try {
    // Create audio context for web audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Success sound - cheerful chime
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Play ascending notes (C-E-G)
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(frequency, startTime);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    playNote(523.25, now, 0.15); // C5
    playNote(659.25, now + 0.1, 0.15); // E5
    playNote(783.99, now + 0.2, 0.3); // G5
    
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};

export const playIncorrectSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Error sound - gentle descending tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    // Descending notes (G-E-C) with softer tone
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(frequency, startTime);
      osc.type = 'triangle'; // Softer tone
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    playNote(392.00, now, 0.2); // G4
    playNote(329.63, now + 0.15, 0.2); // E4
    playNote(261.63, now + 0.3, 0.3); // C4
    
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};

export const playMilestoneSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Enhanced milestone sound - triumphant fanfare
    const now = audioContext.currentTime;
    
    const playNote = (frequency: number, startTime: number, duration: number, volume: number = 0.3, type: OscillatorType = 'sawtooth') => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(frequency, startTime);
      osc.type = type;
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    // Triumphant fanfare melody (like Duolingo level complete)
    playNote(523.25, now, 0.15, 0.25); // C5
    playNote(659.25, now + 0.1, 0.15, 0.25); // E5
    playNote(783.99, now + 0.2, 0.15, 0.25); // G5
    playNote(1046.50, now + 0.3, 0.2, 0.3); // C6
    playNote(1318.51, now + 0.5, 0.3, 0.35); // E6
    playNote(1567.98, now + 0.7, 0.4, 0.4); // G6
    
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};

// New sound for banana bonus
export const playBananaBonusSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const playNote = (frequency: number, startTime: number, duration: number, volume: number = 0.3) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(frequency, startTime);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    // Playful banana sound - bouncy melody
    playNote(659.25, now, 0.1, 0.2); // E5
    playNote(783.99, now + 0.08, 0.1, 0.25); // G5
    playNote(987.77, now + 0.16, 0.1, 0.3); // B5
    playNote(1174.66, now + 0.24, 0.15, 0.35); // D6
    playNote(1046.50, now + 0.4, 0.2, 0.4); // C6
    
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};

// New sound for level up/achievement
export const playAchievementSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const playChord = (frequencies: number[], startTime: number, duration: number, volume: number = 0.2) => {
      frequencies.forEach(freq => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(freq, startTime);
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    };
    
    // Achievement chord progression
    playChord([523.25, 659.25, 783.99], now, 0.3, 0.15); // C-E-G major
    playChord([587.33, 739.99, 880.00], now + 0.2, 0.3, 0.15); // D-F#-A major  
    playChord([659.25, 830.61, 987.77], now + 0.4, 0.5, 0.2); // E-G#-B major
    
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};

