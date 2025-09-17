// Frontend API stubs for iSpeak

export async function asrTranscribe(audioBlob: Blob): Promise<{ transcript: string; wpm?: number; fillers?: number }>{
  const fd = new FormData();
  fd.append('audio', audioBlob, 'speech.webm');
  const r = await fetch('/api/sp/asr', { method: 'POST', body: fd });
  if (!r.ok) throw new Error('ASR failed');
  return r.json();
}

export async function aiCheckSpeaking(payload: { userId: string; itemId: string; mode: string; exam: string; transcript: string; audioMs: number; consumeCredit?: number }){
  const r = await fetch('/api/sp/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, consumeCredit: payload.consumeCredit ?? 1 })
  });
  return r.json();
}


