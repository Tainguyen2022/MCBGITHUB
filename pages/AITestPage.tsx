import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { generateImage, generateText } from '../services/aiService';
import { SparklesIcon, PhotoIcon, PencilIcon, SpeakerWaveIcon, CheckCircleIcon } from '../components/Icons';

// FIX: Add type definitions for the Web Speech API to resolve TypeScript errors
// about properties not existing on `window` and to provide a type for `recognition`.
declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
    interface SpeechRecognition extends EventTarget {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        start(): void;
        stop(): void;
        onresult: ((this: SpeechRecognition, ev: any) => any) | null;
        onerror: ((this: SpeechRecognition, ev: any) => any) | null;
        onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    }
}

// SpeechRecognition API might be prefixed
// FIX: Rename variable to `SpeechRecognitionAPI` to avoid shadowing the type interface.
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition: SpeechRecognition | null = null;
if (SpeechRecognitionAPI) {
    recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
}

const AITestPage: React.FC = () => {
    const { currentUser, updateUser, guestBananaBalance, useGuestBanana } = useAuth();
    const navigate = useNavigate();

    // State for Image Generator
    const [imagePrompt, setImagePrompt] = useState('A photorealistic image of a cat wearing a tiny wizard hat, sitting in a library');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [imageError, setImageError] = useState('');

    // State for Text Generator
    const [textPrompt, setTextPrompt] = useState('Write a short, futuristic story about a friendship between a human and a robot.');
    const [generatedText, setGeneratedText] = useState('');
    const [isGeneratingText, setIsGeneratingText] = useState(false);
    const [textError, setTextError] = useState('');

    // State for Speech-to-Text
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [sttError, setSttError] = useState('');

    // State for Text-to-Speech & Voice Cloning
    const [ttsText, setTtsText] = useState('Hello! This is a test of the text-to-speech functionality. You can change my voice, rate, and pitch below.');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
    const [ttsRate, setTtsRate] = useState(1);
    const [ttsPitch, setTtsPitch] = useState(1);

    // Voice Cloning State
    const [isCloning, setIsCloning] = useState(false);
    const [clonedVoiceName, setClonedVoiceName] = useState<string | null>(null);


    const checkBananaBalance = () => {
        const balance = currentUser ? currentUser.bananaBalance : guestBananaBalance;
        if (balance > 0) return true;

        alert(currentUser ? 'You are out of bananas! 🍌 Please add more to use AI features.' : 'You are out of free bananas for guests. Please log in or register to continue.');
        if (!currentUser) navigate('/login');
        return false;
    };

    const handleAITransaction = (promise: Promise<any>) => {
        promise.then(() => {
            if (currentUser) {
                updateUser({ ...currentUser, bananaBalance: currentUser.bananaBalance - 1 });
            } else {
                useGuestBanana();
            }
        }).catch(console.error);
    };

    const handleGenerateImage = async () => {
        if (!imagePrompt.trim() || !checkBananaBalance()) return;
        setIsGeneratingImage(true);
        setImageError('');
        setGeneratedImage(null);
        const promise = generateImage(imagePrompt);
        handleAITransaction(promise);
        try {
            const imageB64 = await promise;
            setGeneratedImage(imageB64);
        } catch (err: any) {
            setImageError(err.message || 'Failed to generate image.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleGenerateText = async () => {
        if (!textPrompt.trim() || !checkBananaBalance()) return;
        setIsGeneratingText(true);
        setTextError('');
        setGeneratedText('');
        const promise = generateText(textPrompt);
        handleAITransaction(promise);
        try {
            const result = await promise;
            setGeneratedText(result);
        } catch (err: any) {
            setTextError(err.message || 'Failed to generate text.');
        } finally {
            setIsGeneratingText(false);
        }
    };

    const toggleListen = () => {
        if (!recognition) {
            setSttError('Speech Recognition is not supported by your browser.');
            return;
        }
        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            setTranscript('');
            recognition.start();
            setIsListening(true);
        }
    };
    
    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                setTranscript(prev => prev + finalTranscript + '. ');
            }
        };

        recognition.onerror = (event) => {
            setSttError(`Speech recognition error: ${event.error}`);
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        }

        return () => {
            recognition?.stop();
        };
    }, []);

    const populateVoiceList = useCallback(() => {
        if (!('speechSynthesis' in window)) return;
        const availableVoices = window.speechSynthesis.getVoices();
        const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en-'));
        setVoices(englishVoices);
        if (englishVoices.length > 0 && !selectedVoiceURI) {
            const googleVoice = englishVoices.find(voice => voice.name.includes('Google'));
            setSelectedVoiceURI(googleVoice ? googleVoice.voiceURI : englishVoices[0].voiceURI);
        }
    }, [selectedVoiceURI]);

    useEffect(() => {
        populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }
    }, [populateVoiceList]);

    const handleSpeak = () => {
        if (!('speechSynthesis' in window)) {
            alert('Text-to-Speech is not supported by your browser.');
            return;
        }
        if (isSpeaking || !ttsText.trim()) return;

        const utterance = new SpeechSynthesisUtterance(ttsText);
        const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.rate = ttsRate;
        utterance.pitch = ttsPitch;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleCloneVoice = (gender: 'male' | 'female') => {
        setIsCloning(true);
        setClonedVoiceName(null);

        // Simulate cloning process and find best voice
        setTimeout(() => {
            const availableVoices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en-'));
            if (availableVoices.length === 0) {
                setIsCloning(false);
                return;
            }

            const maleKeywords = ['male', 'david', 'mark', 'paul', 'google us'];
            const femaleKeywords = ['female', 'zira', 'hazel', 'susan', 'eva', 'google uk english female'];
            
            const targetKeywords = gender === 'male' ? maleKeywords : femaleKeywords;
            
            const nameMatches = (voice: SpeechSynthesisVoice, keywords: string[]) => 
                keywords.some(kw => voice.name.toLowerCase().includes(kw));
                
            let bestVoice: SpeechSynthesisVoice | undefined;
            
            bestVoice = availableVoices.find(v => !v.localService && nameMatches(v, targetKeywords));
            if (!bestVoice) {
                bestVoice = availableVoices.find(v => nameMatches(v, targetKeywords));
            }
            if (!bestVoice) {
                bestVoice = availableVoices.find(v => !v.localService);
            }
            if (!bestVoice) {
                bestVoice = availableVoices[0];
            }

            if (bestVoice) {
                setSelectedVoiceURI(bestVoice.voiceURI);
                setClonedVoiceName(bestVoice.name);
            }
            
            setIsCloning(false);
        }, 2000);
    };


    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">AI Test Sandbox</h1>
                <p className="mt-4 text-xl text-gray-600">Experiment with various AI capabilities.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Generator */}
                <div className="card-base bg-white border p-6 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4"><PhotoIcon className="w-8 h-8 text-green-500" /> AI Image Generator</h2>
                    <textarea value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} className="form-input flex-grow" rows={4} placeholder="Enter image prompt..."></textarea>
                    {imageError && <p className="text-red-500 text-sm mt-2">{imageError}</p>}
                    <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="btn btn-ai-green w-full mt-4 text-lg py-3">
                        {isGeneratingImage ? <div className="ai-spinner mr-2"></div> : <SparklesIcon className="w-6 h-6 mr-2" />}
                        Generate Image
                    </button>
                    <div className="mt-4 w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center border">
                        {isGeneratingImage && <div className="ai-spinner !w-12 !h-12 text-green-500"></div>}
                        {generatedImage && <img src={`data:image/png;base64,${generatedImage}`} alt="AI Generated" className="w-full h-full object-contain rounded-lg" />}
                        {!isGeneratingImage && !generatedImage && <span className="text-gray-500">Image will appear here</span>}
                    </div>
                </div>

                {/* Text Generator */}
                <div className="card-base bg-white border p-6 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4"><PencilIcon className="w-8 h-8 text-pink-500" /> AI Text Generator</h2>
                    <textarea value={textPrompt} onChange={e => setTextPrompt(e.target.value)} className="form-input flex-grow" rows={4} placeholder="Enter text prompt..."></textarea>
                    {textError && <p className="text-red-500 text-sm mt-2">{textError}</p>}
                    <button onClick={handleGenerateText} disabled={isGeneratingText} className="btn btn-ai-pink w-full mt-4 text-lg py-3">
                        {isGeneratingText ? <div className="ai-spinner mr-2"></div> : <SparklesIcon className="w-6 h-6 mr-2" />}
                        Generate Text
                    </button>
                    <div className="mt-4 w-full p-4 h-full min-h-[200px] bg-gray-100 rounded-lg border overflow-y-auto whitespace-pre-wrap">
                         {isGeneratingText && <div className="ai-spinner text-pink-500"></div>}
                         {generatedText && <p>{generatedText}</p>}
                         {!isGeneratingText && !generatedText && <span className="text-gray-500">Text will appear here</span>}
                    </div>
                </div>

                {/* Speech to Text & Voice Cloning Container */}
                <div className="card-base bg-white border p-6 flex flex-col space-y-6">
                    {/* Speech to Text */}
                    <div>
                         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4"><SpeakerWaveIcon className="w-8 h-8 text-red-500" /> Speech to Text</h2>
                        <button onClick={toggleListen} className={`btn w-full mt-2 text-lg py-3 ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'btn-primary'}`}>
                            {isListening ? 'Stop Listening' : 'Start Listening'}
                        </button>
                        {sttError && <p className="text-red-500 text-sm mt-2">{sttError}</p>}
                        <div className="mt-4 w-full p-4 h-full min-h-[150px] bg-gray-100 rounded-lg border overflow-y-auto">
                            <p>{transcript || <span className="text-gray-500">Transcript will appear here...</span>}</p>
                        </div>
                    </div>
                    {/* Voice Cloning */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2"><SparklesIcon className="w-8 h-8 text-purple-500" /> Voice Cloning (Demo)</h2>
                        <p className="text-sm text-gray-500 mb-4">Simulate cloning by selecting the best available male or female voice from your browser.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => handleCloneVoice('male')} disabled={isCloning} className="btn !py-3 !text-lg !rounded-lg w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                {isCloning ? <div className="ai-spinner mr-2"/> : 'Clone Male Voice'}
                            </button>
                            <button onClick={() => handleCloneVoice('female')} disabled={isCloning} className="btn !py-3 !text-lg !rounded-lg w-full btn-ai-pink">
                                {isCloning ? <div className="ai-spinner mr-2"/> : 'Clone Female Voice'}
                            </button>
                        </div>
                         {clonedVoiceName && (
                            <div className="mt-4 p-2 bg-green-100 text-green-800 text-center rounded-lg font-semibold flex items-center justify-center gap-2">
                                <CheckCircleIcon className="w-5 h-5"/>
                                Cloned Voice Active: {clonedVoiceName}
                            </div>
                        )}
                    </div>
                </div>

                {/* Text to Speech */}
                <div className="card-base bg-white border p-6 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4"><SpeakerWaveIcon className="w-8 h-8 text-blue-500" /> Text to Speech</h2>
                    <textarea value={ttsText} onChange={e => setTtsText(e.target.value)} className="form-input" rows={4} placeholder="Enter text to speak..."></textarea>
                    
                    <div className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700">Voice</label>
                            <select id="voice-select" value={selectedVoiceURI || ''} onChange={e => setSelectedVoiceURI(e.target.value)} disabled={!!clonedVoiceName} className="form-input w-full mt-1 disabled:bg-gray-200">
                                {voices.map(voice => (
                                    <option key={voice.voiceURI} value={voice.voiceURI}>
                                        {voice.name} ({voice.lang}){ !voice.localService ? ' ✨' : ''}
                                    </option>
                                ))}
                                {voices.length === 0 && <option>No English voices found</option>}
                            </select>
                            <p className="text-xs text-gray-500 mt-1 text-center">
                               Note: Voice quality depends on your browser/OS. Voices with ✨ are often higher quality.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate: {ttsRate.toFixed(1)}</label>
                                <input type="range" id="rate" min="0.5" max="2" step="0.1" value={ttsRate} onChange={e => setTtsRate(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div>
                                <label htmlFor="pitch" className="block text-sm font-medium text-gray-700">Pitch: {ttsPitch.toFixed(1)}</label>
                                <input type="range" id="pitch" min="0" max="2" step="0.1" value={ttsPitch} onChange={e => setTtsPitch(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <button onClick={handleSpeak} disabled={isSpeaking} className="btn btn-ai-blue w-full mt-auto pt-3 text-lg py-3">
                        {isSpeaking ? 'Speaking...' : 'Speak'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AITestPage;
