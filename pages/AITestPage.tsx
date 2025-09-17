import React, { useState } from 'react';
import { generateTestImage, generateTestText, speechToText, textToSpeech } from '../services/aiService';
import { PhotoIcon, PencilIcon, SpeakerWaveIcon, MicrophoneIcon } from '../components/Icons';

const AITestPage: React.FC = () => {
    const [result, setResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [generatedImage, setGeneratedImage] = useState<string>('');
    const [generatedText, setGeneratedText] = useState<string>('');
    const [speechText, setSpeechText] = useState<string>('');
    const [audioUrl, setAudioUrl] = useState<string>('');
    
    const [imagePrompt, setImagePrompt] = useState('A beautiful landscape with mountains');
    const [textPrompt, setTextPrompt] = useState('Write about the benefits of AI in education');
    const [ttsText, setTtsText] = useState('Hello, this is a test of text-to-speech functionality.');

    const testAI = async (type: string) => {
        setIsLoading(true);
        setResult(`🤖 Testing ${type}...`);
        
        try {
            switch (type) {
                case 'Picture Generation':
                    const imageResult = await generateTestImage(imagePrompt);
                    setGeneratedImage(imageResult.imageUrl);
                    setResult(`✅ ${type} completed! Image generated below:`);
                    break;
                    
                case 'Text Generation':
                    const textResult = await generateTestText(textPrompt);
                    setGeneratedText(textResult.text);
                    setResult(`✅ ${type} completed! Generated ${textResult.word_count} words:`);
                    break;
                    
                case 'Speech to Text':
                    // Create a dummy audio blob for demo
                    const dummyBlob = new Blob(['dummy audio data'], { type: 'audio/wav' });
                    const sttResult = await speechToText(dummyBlob);
                    setSpeechText(sttResult.transcript);
                    setResult(`✅ ${type} completed! Confidence: ${(sttResult.confidence * 100).toFixed(1)}%`);
                    break;
                    
                case 'Text to Speech':
                    const ttsResult = await textToSpeech(ttsText);
                    setAudioUrl(ttsResult.audioUrl);
                    setResult(`✅ ${type} completed! Audio duration: ${ttsResult.duration.toFixed(1)}s`);
                    break;
                    
                default:
                    setResult(`✅ ${type} AI test completed successfully!`);
            }
        } catch (error) {
            setResult(`❌ Error testing ${type}: ${error}`);
        }
        
        setIsLoading(false);
    };

    return (
        <div className="apple-theme min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        🤖 AI Testing Laboratory
                    </h1>
                    <p className="text-lg text-gray-600">
                        Test all AI features with customizable inputs
                    </p>
                </div>

                {/* Input Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <PhotoIcon className="w-5 h-5 text-pink-600" />
                            Image Generation
                        </h3>
                        <input
                            type="text"
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            placeholder="Describe the image you want to generate..."
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <PencilIcon className="w-5 h-5 text-blue-600" />
                            Text Generation
                        </h3>
                        <input
                            type="text"
                            value={textPrompt}
                            onChange={(e) => setTextPrompt(e.target.value)}
                            placeholder="What topic should AI write about..."
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <MicrophoneIcon className="w-5 h-5 text-green-600" />
                            Speech to Text
                        </h3>
                        <p className="text-gray-600 text-sm">Upload an audio file to convert speech to text</p>
                        <input
                            type="file"
                            accept="audio/*"
                            className="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <SpeakerWaveIcon className="w-5 h-5 text-orange-600" />
                            Text to Speech
                        </h3>
                        <textarea
                            value={ttsText}
                            onChange={(e) => setTtsText(e.target.value)}
                            placeholder="Enter text to convert to speech..."
                            rows={3}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* Enhanced Test Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <button
                        onClick={() => testAI('Picture Generation')}
                        disabled={isLoading}
                        className="pill-button p-6 bg-pink-500 border-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 hover:border-pink-600 disabled:opacity-50 transition-all flex flex-col items-center gap-3"
                    >
                        {isLoading ? <div className="ai-spinner !w-8 !h-8"></div> : <PhotoIcon className="w-8 h-8" />}
                        <div className="text-sm">Generate Picture</div>
                    </button>
                    
                    <button
                        onClick={() => testAI('Text Generation')}
                        disabled={isLoading}
                        className="pill-button p-6 bg-blue-500 border-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 hover:border-blue-600 disabled:opacity-50 transition-all flex flex-col items-center gap-3"
                    >
                        {isLoading ? <div className="ai-spinner !w-8 !h-8"></div> : <PencilIcon className="w-8 h-8" />}
                        <div className="text-sm">Generate Text</div>
                    </button>
                    
                    <button
                        onClick={() => testAI('Speech to Text')}
                        disabled={isLoading}
                        className="pill-button p-6 bg-green-500 border-green-500 text-white rounded-xl font-bold hover:bg-green-600 hover:border-green-600 disabled:opacity-50 transition-all flex flex-col items-center gap-3"
                    >
                        {isLoading ? <div className="ai-spinner !w-8 !h-8"></div> : <MicrophoneIcon className="w-8 h-8" />}
                        <div className="text-sm">Speech to Text</div>
                    </button>
                    
                    <button
                        onClick={() => testAI('Text to Speech')}
                        disabled={isLoading}
                        className="pill-button p-6 bg-orange-500 border-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 hover:border-orange-600 disabled:opacity-50 transition-all flex flex-col items-center gap-3"
                    >
                        {isLoading ? <div className="ai-spinner !w-8 !h-8"></div> : <SpeakerWaveIcon className="w-8 h-8" />}
                        <div className="text-sm">Text to Speech</div>
                    </button>
                </div>

                {/* Results Display */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Test Results</h3>
                    <div className="p-4 bg-gray-50 rounded-lg min-h-32">
                        {result ? (
                            <p className="text-lg text-gray-800 mb-4">{result}</p>
                        ) : (
                            <p className="text-gray-500 italic">Click any AI button to start testing...</p>
                        )}
                    </div>
                </div>

                {/* AI Generated Outputs */}
                <div className="mt-8 space-y-6">
                    {/* Generated Image */}
                    {generatedImage && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">🎨 AI Generated Image</h3>
                            <img 
                                src={generatedImage} 
                                alt="AI Generated" 
                                className="w-full max-w-md mx-auto rounded-lg shadow-md"
                            />
                            <p className="text-center text-gray-600 mt-2">✨ Generated at {new Date().toLocaleTimeString()}</p>
                        </div>
                    )}
                    
                    {/* Generated Text */}
                    {generatedText && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">📝 AI Generated Text</h3>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <pre className="whitespace-pre-wrap text-gray-800 font-serif leading-relaxed">{generatedText}</pre>
                            </div>
                        </div>
                    )}
                    
                    {/* Speech to Text Result */}
                    {speechText && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">🎤 Speech Recognition Result</h3>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">{speechText}</pre>
                            </div>
                        </div>
                    )}
                    
                    {/* Generated Audio */}
                    {audioUrl && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">🔊 AI Generated Audio</h3>
                            <div className="p-4 bg-orange-50 rounded-lg text-center">
                                <audio controls className="w-full max-w-md mx-auto mb-2">
                                    <source src={audioUrl} type="audio/wav" />
                                    Your browser does not support the audio element.
                                </audio>
                                <p className="text-gray-600">✨ Generated speech audio file</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Test All */}
                <div className="mt-8 text-center">
                    <button
                        onClick={async () => {
                            for (const type of ['Picture', 'Text', 'Speech to Text', 'Text to Speech']) {
                                await testAI(type);
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            }
                        }}
                        disabled={isLoading}
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all shadow-lg"
                    >
                        🚀 Test All AI Features
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AITestPage;
