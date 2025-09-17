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

export const generateWritingTemplate = async (exam?: string, task?: string, subType?: string) => {
  // Simulate processing
  await new Promise(r => setTimeout(r, 1200));
  const isIeltsT1 = (exam || '').toUpperCase().includes('IELTS') && (task || '').toLowerCase().includes('task 1');
  const title_vi = `${exam || 'Exam'} - ${subType || task || 'Template'}`;
  const title_en = `${exam || 'Exam'} - ${subType || task || 'Template'}`;

  const introduction = {
    vi: [
      'Mở bài: Diễn giải lại đề bài một cách tự nhiên.',
      'Giới thiệu các xu hướng chính hoặc bối cảnh tổng quát.'
    ],
    en: [
      'Introduction: Paraphrase the task in a natural way.',
      'Introduce the overall context or main trends.'
    ]
  };

  const overview = isIeltsT1 ? {
    vi: [
      'Tổng quan: Nêu 1-2 đặc điểm nổi bật nhất, không đưa ý kiến cá nhân.',
      'So sánh các nhóm lớn hoặc xu hướng tăng/giảm.'
    ],
    en: [
      'Overview: State 1–2 most striking features without opinion.',
      'Compare major groups or rising/falling trends.'
    ]
  } : null;

  const body_paragraphs = [
    {
      vi: [
        'Thân bài 1: Mô tả chi tiết nhóm A (số liệu, giai đoạn, so sánh).',
        'Sử dụng từ vựng so sánh và số liệu minh hoạ.'
      ],
      en: [
        'Body 1: Describe group A with figures, period, and comparisons.',
        'Use comparative language and specific numbers.'
      ]
    },
    {
      vi: [
        'Thân bài 2: Mô tả chi tiết nhóm B (điểm khác biệt chính).',
        'Nhấn mạnh sự tương phản hoặc điểm đáng chú ý.'
      ],
      en: [
        'Body 2: Describe group B focusing on key contrasts.',
        'Highlight noteworthy differences or changes.'
      ]
    }
  ];

  const conclusion = isIeltsT1 ? null : {
    vi: [
      'Kết bài: Tóm tắt lại luận điểm chính, tránh lặp toàn bộ.',
      'Không thêm ý mới.'
    ],
    en: [
      'Conclusion: Summarize the main points without repeating everything.',
      'Do not add new ideas.'
    ]
  };

  return {
    title_vi,
    title_en,
    introduction,
    overview,
    body_paragraphs,
    conclusion
  };
};

export const rewriteText = async (text: string, action: string) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  let rewrittenText = text;
  let improvements: string[] = [];

  switch (action) {
    case 'make it longer':
      rewrittenText = text + " Furthermore, this point can be expanded with additional examples and detailed explanations that provide more context and depth to the argument.";
      improvements = ["Thêm ví dụ cụ thể", "Mở rộng ý tưởng chính", "Cung cấp thêm ngữ cảnh"];
      break;
      
    case 'make it shorter':
      rewrittenText = text.split('. ').slice(0, Math.max(1, Math.floor(text.split('. ').length / 2))).join('. ') + '.';
      improvements = ["Loại bỏ từ ngữ thừa", "Tập trung vào ý chính", "Câu ngắn gọn hơn"];
      break;
      
    case 'make it simpler':
      rewrittenText = text.replace(/furthermore/gi, 'also').replace(/however/gi, 'but').replace(/consequently/gi, 'so');
      improvements = ["Sử dụng từ vựng đơn giản", "Cấu trúc câu rõ ràng", "Dễ hiểu hơn"];
      break;
      
    case 'make it more complex':
      rewrittenText = text.replace(/\band\b/gi, 'furthermore,').replace(/\bbut\b/gi, 'however,').replace(/\bso\b/gi, 'consequently,');
      improvements = ["Từ vựng học thuật", "Cấu trúc câu phức", "Liên từ chuyên nghiệp"];
      break;
      
    case 'rewrite it completely':
      // Simple paraphrasing simulation
      rewrittenText = `Revised version: ${text.replace(/I think/g, 'In my opinion').replace(/good/g, 'beneficial').replace(/bad/g, 'detrimental')}`;
      improvements = ["Paraphrase toàn bộ", "Từ vựng thay thế", "Cách diễn đạt mới"];
      break;
      
    default:
      improvements = ["Cải thiện tổng thể", "Nâng cao chất lượng"];
  }

  return {
    rewritten_text: rewrittenText
  };
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
  return { script: "This is a short sample audio generated for your practice." };
};

// Additional exports needed by other components
export const generateSpeakingTemplate = async () => {
  return { template: "Sample speaking template", structure: [] };
};

export const generateWritingTopic = async () => {
  return { topic: "Sample topic", prompt: "Sample prompt" };
};

export const generateMorePracticeQuestions = async (seed: any, mode: string) => {
  console.log('🔥 generateMorePracticeQuestions called with mode:', mode);
  console.log('🔥 Seed context:', { 
    code: seed?.code, 
    topic: seed?.topic, 
    prompt_vi: seed?.prompt_vi, 
    prompt_vi_short: seed?.prompt_vi_short,
    vocabulary: seed?.vocabulary?.map((v: any) => v.word) || []
  });
  
  // Simulate AI processing delay - 1 second for faster testing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate contextual practice questions based on VSTEP/IELTS/TOEIC content
  const topicContext = seed?.prompt_vi_short || seed?.topic || seed?.name_vi || 'General Practice';
  const vocabulary = seed?.vocabulary || [];
  const sampleAnswer = seed?.sample_answer_en || '';
  const exerciseNumber = Math.floor(Math.random() * 100) + 1;
  
  // Extract key phrases from sample answer for contextual exercises
  const keyPhrases = sampleAnswer ? sampleAnswer.split(/[.!?]/).filter(p => p.trim().length > 10).slice(0, 3) : [];
  const vocabWords = vocabulary.map((v: any) => v.word).filter(Boolean);
  
  // Determine exercise type based on seed content
  const isThankYouLetter = seed?.code?.includes('THX') || topicContext.includes('cảm ơn') || topicContext.includes('thank');
  const isRequestLetter = seed?.code?.includes('REQ') || topicContext.includes('yêu cầu') || topicContext.includes('request');
  const isComplaintLetter = seed?.code?.includes('CMP') || topicContext.includes('khiếu nại') || topicContext.includes('complaint');
  const isInvitationLetter = seed?.code?.includes('INV') || topicContext.includes('mời') || topicContext.includes('invite');
  
  console.log('🔍 Letter type detection:', {
    code: seed?.code,
    topicContext,
    isThankYouLetter,
    isRequestLetter,
    isComplaintLetter,
    isInvitationLetter
  });
  
  // Generate contextual exercises based on letter type for SPECIFIC mode only
  const generateContextualExercises = (letterType: string, targetMode: string) => {
    const exercises: any = {
      reorder: [],
      fill_blank: [],
      find_error: [],
      choose_phrase: [],
      matching: [],
      drag_drop: []
    };

    if (letterType === 'thank_you') {
      exercises.reorder = [
      { 
        words: [
            { en: 'I', vi: 'Mình' }, 
            { en: 'just', vi: 'chỉ' }, 
            { en: 'wanted', vi: 'muốn' }, 
            { en: 'to', vi: 'để' }, 
            { en: 'say', vi: 'nói' }, 
            { en: 'thank', vi: 'cảm ơn' }, 
            { en: 'you.', vi: 'bạn.' }
          ],
          answer: 'I just wanted to say thank you.'
      },
      { 
        words: [
            { en: 'I', vi: 'Mình' }, 
            { en: 'really', vi: 'thực sự' }, 
            { en: 'appreciate', vi: 'trân trọng' }, 
            { en: 'your', vi: 'lòng' }, 
            { en: 'hospitality.', vi: 'hiếu khách.' }
          ],
          answer: 'I really appreciate your hospitality.'
      },
      { 
        words: [
            { en: 'Thank', vi: 'Cảm ơn' }, 
            { en: 'you', vi: 'bạn' }, 
            { en: 'so', vi: 'rất' }, 
            { en: 'much', vi: 'nhiều' }, 
            { en: 'for', vi: 'vì' }, 
            { en: 'everything.', vi: 'tất cả.' }
          ],
          answer: 'Thank you so much for everything.'
      },
      { 
        words: [
            { en: 'I', vi: 'Mình' }, 
            { en: 'had', vi: 'đã có' }, 
            { en: 'a', vi: 'một' }, 
            { en: 'wonderful', vi: 'tuyệt vời' }, 
            { en: 'time', vi: 'khoảng thời gian' }, 
            { en: 'there.', vi: 'ở đó.' }
          ],
          answer: 'I had a wonderful time there.'
      },
      { 
        words: [
            { en: 'Your', vi: 'Sự' }, 
            { en: 'kindness', vi: 'tốt bụng' }, 
            { en: 'means', vi: 'có nghĩa' }, 
            { en: 'so', vi: 'rất' }, 
            { en: 'much', vi: 'nhiều' }, 
            { en: 'to', vi: 'đối với' }, 
            { en: 'me.', vi: 'mình.' }
          ],
          answer: 'Your kindness means so much to me.'
        },
        { 
          words: [
            { en: 'I', vi: 'Mình' }, 
            { en: 'will', vi: 'sẽ' }, 
            { en: 'never', vi: 'không bao giờ' }, 
            { en: 'forget', vi: 'quên' }, 
            { en: 'your', vi: 'sự' }, 
            { en: 'generosity.', vi: 'hào phóng.' }
          ],
          answer: 'I will never forget your generosity.'
        }
      ];
      
      exercises.fill_blank = [
      { 
        sentence: { 
            en: `I just wanted to ____ thank you so much again.`, 
            vi: `Mình chỉ muốn ____ cảm ơn bạn rất nhiều một lần nữa.` 
        }, 
          missing_word: 'say',
          options: ['say', 'tell', 'speak', 'talk']
      },
      { 
        sentence: { 
            en: `I really ____ your hospitality during my stay.`, 
            vi: `Mình thực sự ____ lòng hiếu khách của bạn trong thời gian ở lại.` 
        }, 
          missing_word: 'appreciate',
          options: ['appreciate', 'apply', 'approve', 'approach']
      },
      { 
        sentence: { 
            en: `Thank you for your ____ kindness and support.`, 
            vi: `Cảm ơn bạn vì sự ____ tốt bụng và hỗ trợ.` 
        }, 
          missing_word: 'incredible',
          options: ['incredible', 'amazing', 'wonderful', 'fantastic']
      },
      { 
        sentence: { 
            en: `I ____ grateful for everything you've done.`, 
            vi: `Mình ____ biết ơn vì tất cả những gì bạn đã làm.` 
        }, 
          missing_word: 'am',
          options: ['am', 'was', 'will be', 'have been']
      },
      { 
        sentence: { 
            en: `Your help ____ a huge difference to me.`, 
            vi: `Sự giúp đỡ của bạn ____ tạo ra sự khác biệt lớn đối với mình.` 
          },
          missing_word: 'made',
          options: ['made', 'makes', 'will make', 'has made']
        },
        { 
          sentence: { 
            en: `I ____ forward to seeing you again soon.`, 
            vi: `Mình ____ mong được gặp lại bạn sớm.` 
          },
          missing_word: 'look',
          options: ['look', 'am looking', 'will look', 'have looked']
        }
      ];

      exercises.find_error = [
      { 
        sentence: { 
            en: 'I just wanted to say thank you so much again for letting I stay.', 
            vi: 'Mình chỉ muốn nói lời cảm ơn bạn rất nhiều một lần nữa vì đã cho mình ở lại.' 
        }, 
          error_word: 'I', 
          correct_word: 'me' 
      },
      { 
        sentence: { 
            en: 'I really appreciate you hospitality during my stay.', 
            vi: 'Mình thực sự trân trọng lòng hiếu khách của bạn trong thời gian ở lại.' 
        }, 
          error_word: 'you', 
          correct_word: 'your' 
      },
      { 
        sentence: { 
            en: 'Thank you for you incredible kindness and support.', 
            vi: 'Cảm ơn bạn vì sự tốt bụng và hỗ trợ tuyệt vời.' 
        }, 
          error_word: 'you', 
          correct_word: 'your' 
      },
      { 
        sentence: { 
            en: 'I am grateful for everything you have did for me.', 
            vi: 'Mình biết ơn vì tất cả những gì bạn đã làm cho mình.' 
        }, 
          error_word: 'did', 
          correct_word: 'done' 
      },
      { 
        sentence: { 
            en: 'Your help made a huge different to me.', 
            vi: 'Sự giúp đỡ của bạn tạo ra sự khác biệt lớn đối với mình.' 
          }, 
          error_word: 'different', 
          correct_word: 'difference' 
        },
        { 
          sentence: { 
            en: 'I look forward to see you again soon.', 
            vi: 'Mình mong được gặp lại bạn sớm.' 
          }, 
          error_word: 'see', 
          correct_word: 'seeing' 
        }
      ];

      exercises.choose_phrase = [
        { 
          sentence: { 
            en: 'Complete: I just wanted to ____ thank you so much again.', 
            vi: 'Hoàn thành: Mình chỉ muốn ____ cảm ơn bạn rất nhiều một lần nữa.' 
          }, 
          correct_phrase: 'say',
          options: ['say', 'tell', 'speak', 'talk']
        },
        { 
          sentence: { 
            en: 'Complete: I really ____ your hospitality during my stay.', 
            vi: 'Hoàn thành: Mình thực sự ____ lòng hiếu khách của bạn trong thời gian ở lại.' 
          }, 
          correct_phrase: 'appreciate',
          options: ['appreciate', 'apply', 'approve', 'approach']
        },
        { 
          sentence: { 
            en: 'Complete: Thank you for your ____ kindness and support.', 
            vi: 'Hoàn thành: Cảm ơn bạn vì sự ____ tốt bụng và hỗ trợ.' 
          }, 
          correct_phrase: 'incredible',
          options: ['incredible', 'amazing', 'wonderful', 'fantastic']
        },
        { 
          sentence: { 
            en: 'Complete: I ____ grateful for everything you\'ve done.', 
            vi: 'Hoàn thành: Mình ____ biết ơn vì tất cả những gì bạn đã làm.' 
          }, 
          correct_phrase: 'am',
          options: ['am', 'was', 'will be', 'have been']
        },
        { 
          sentence: { 
            en: 'Complete: Your help ____ a huge difference to me.', 
            vi: 'Hoàn thành: Sự giúp đỡ của bạn ____ tạo ra sự khác biệt lớn đối với mình.' 
          }, 
          correct_phrase: 'made',
          options: ['made', 'makes', 'will make', 'has made']
        },
        { 
          sentence: { 
            en: 'Complete: I ____ forward to seeing you again soon.', 
            vi: 'Hoàn thành: Mình ____ mong được gặp lại bạn sớm.' 
          }, 
          correct_phrase: 'look',
          options: ['look', 'am looking', 'will look', 'have looked']
        }
      ];

      exercises.matching = [
        { 
          col_a: [
            { en: 'hospitality', vi: 'lòng hiếu khách' }, 
            { en: 'appreciate', vi: 'trân trọng' }
          ], 
          col_b: [
            { en: 'lòng hiếu khách', vi: 'hospitality' }, 
            { en: 'trân trọng', vi: 'appreciate' }
          ],
          correct_pairs: [
            { key: 'hospitality', value: 'lòng hiếu khách' },
            { key: 'appreciate', value: 'trân trọng' }
          ]
        },
        { 
          col_a: [
            { en: 'kindness', vi: 'tốt bụng' }, 
            { en: 'generous', vi: 'hào phóng' }
          ], 
          col_b: [
            { en: 'tốt bụng', vi: 'kindness' }, 
            { en: 'hào phóng', vi: 'generous' }
          ],
          correct_pairs: [
            { key: 'kindness', value: 'tốt bụng' },
            { key: 'generous', value: 'hào phóng' }
          ]
        },
        { 
          col_a: [
            { en: 'grateful', vi: 'biết ơn' }, 
            { en: 'support', vi: 'hỗ trợ' }
          ], 
          col_b: [
            { en: 'biết ơn', vi: 'grateful' }, 
            { en: 'hỗ trợ', vi: 'support' }
          ],
          correct_pairs: [
            { key: 'grateful', value: 'biết ơn' },
            { key: 'support', value: 'hỗ trợ' }
          ]
        },
        { 
          col_a: [
            { en: 'wonderful', vi: 'tuyệt vời' }, 
            { en: 'incredible', vi: 'không thể tin được' }
          ], 
          col_b: [
            { en: 'tuyệt vời', vi: 'wonderful' }, 
            { en: 'không thể tin được', vi: 'incredible' }
          ],
          correct_pairs: [
            { key: 'wonderful', value: 'tuyệt vời' },
            { key: 'incredible', value: 'không thể tin được' }
          ]
        },
        { 
          col_a: [
            { en: 'difference', vi: 'sự khác biệt' }, 
            { en: 'forward', vi: 'mong đợi' }
          ], 
          col_b: [
            { en: 'sự khác biệt', vi: 'difference' }, 
            { en: 'mong đợi', vi: 'forward' }
          ],
          correct_pairs: [
            { key: 'difference', value: 'sự khác biệt' },
            { key: 'forward', value: 'mong đợi' }
          ]
        },
        { 
          col_a: [
            { en: 'everything', vi: 'tất cả' }, 
            { en: 'soon', vi: 'sớm' }
          ], 
          col_b: [
            { en: 'tất cả', vi: 'everything' }, 
            { en: 'sớm', vi: 'soon' }
          ],
          correct_pairs: [
            { key: 'everything', value: 'tất cả' },
            { key: 'soon', value: 'sớm' }
          ]
        }
      ];

      exercises.drag_drop = [
        { 
          sentence_parts: [
            { en: 'your hospitality', vi: 'lòng hiếu khách của bạn' }, 
            { en: 'I really appreciate', vi: 'Mình thực sự trân trọng' }, 
            { en: 'so much.', vi: 'rất nhiều.' }
          ], 
          correct_order: ['I really appreciate', 'your hospitality', 'so much.']
        },
        { 
          sentence_parts: [
            { en: 'Thank you', vi: 'Cảm ơn bạn' }, 
            { en: 'so much again', vi: 'rất nhiều một lần nữa' }, 
            { en: 'for everything.', vi: 'vì tất cả.' }
          ], 
          correct_order: ['Thank you', 'so much again', 'for everything.']
        },
        { 
          sentence_parts: [
            { en: 'I had', vi: 'Mình đã có' }, 
            { en: 'a wonderful time', vi: 'một khoảng thời gian tuyệt vời' }, 
            { en: 'exploring the city.', vi: 'khi khám phá thành phố.' }
          ], 
          correct_order: ['I had', 'a wonderful time', 'exploring the city.']
        },
        { 
          sentence_parts: [
            { en: 'Your kindness', vi: 'Sự tốt bụng' }, 
            { en: 'means so much', vi: 'có nghĩa rất nhiều' }, 
            { en: 'to me.', vi: 'đối với mình.' }
          ], 
          correct_order: ['Your kindness', 'means so much', 'to me.']
        },
        { 
          sentence_parts: [
            { en: 'I will never forget', vi: 'Mình sẽ không bao giờ quên' }, 
            { en: 'your generosity', vi: 'sự hào phóng' }, 
            { en: 'and support.', vi: 'và hỗ trợ.' }
          ], 
          correct_order: ['I will never forget', 'your generosity', 'and support.']
        },
        { 
          sentence_parts: [
            { en: 'I look forward', vi: 'Mình mong đợi' }, 
            { en: 'to seeing you', vi: 'được gặp bạn' }, 
            { en: 'again soon.', vi: 'lại sớm.' }
          ], 
          correct_order: ['I look forward', 'to seeing you', 'again soon.']
        }
      ];
    } else if (letterType === 'request') {
      exercises.reorder = [
        { 
          words: [
            { en: 'I', vi: 'Tôi' }, 
            { en: 'am', vi: 'đang' }, 
            { en: 'writing', vi: 'viết' }, 
            { en: 'to', vi: 'để' }, 
            { en: 'request', vi: 'yêu cầu' }, 
            { en: 'a', vi: 'một' }, 
            { en: 'letter.', vi: 'thư.' }
          ], 
          answer: 'I am writing to request a letter.' 
        }
      ];
      
      exercises.fill_blank = [
        { 
          sentence: { 
            en: `I am writing to ____ a letter of recommendation.`, 
            vi: `Tôi viết thư để ____ thư giới thiệu.` 
          }, 
          missing_word: 'request', 
          options: ['request', 'require', 'receive'] 
        }
      ];

      exercises.find_error = [
        { 
          sentence: { 
            en: 'I am writing to request a letter of recommendation for my MBA application.', 
            vi: 'Tôi viết thư để yêu cầu thư giới thiệu cho đơn ứng tuyển MBA.' 
          }, 
          error_word: 'recommendation', 
          correct_word: 'recommendation' 
        }
      ];

      exercises.choose_phrase = [
        { 
          sentence: { 
            en: 'Complete: I am writing to ____ a letter of recommendation.', 
            vi: 'Hoàn thành: Tôi viết thư để ____ thư giới thiệu.' 
          }, 
          correct_phrase: 'request',
          options: ['request', 'require', 'receive']
        }
      ];

      exercises.matching = [
      { 
        col_a: [
            { en: 'recommendation', vi: 'thư giới thiệu' }, 
            { en: 'supervision', vi: 'sự giám sát' }
        ], 
        col_b: [
            { en: 'thư giới thiệu', vi: 'recommendation' }, 
            { en: 'sự giám sát', vi: 'supervision' }
          ],
          correct_pairs: [
            { key: 'recommendation', value: 'thư giới thiệu' },
            { key: 'supervision', value: 'sự giám sát' }
          ]
        }
      ];

      exercises.drag_drop = [
        { 
          sentence_parts: [
            { en: 'I am writing to request', vi: 'Tôi viết thư để yêu cầu' }, 
            { en: 'a letter of recommendation', vi: 'thư giới thiệu' }, 
            { en: 'for my MBA application.', vi: 'cho đơn ứng tuyển MBA.' }
          ], 
          correct_order: ['I am writing to request', 'a letter of recommendation', 'for my MBA application.']
        }
      ];
    } else if (letterType === 'complaint') {
      // Five structured scenarios for complaint letters
      const scenarios = [
        {
          key: 'faulty_product',
          subject: 'a faulty product',
          request: 'a full refund or a replacement',
          details: 'purchased on 12 Aug, order #A1234',
        },
        {
          key: 'delayed_delivery',
          subject: 'a delayed delivery',
          request: 'an expedited delivery and a delivery fee refund',
          details: 'promised by 5 Sep but arrived late',
        },
        {
          key: 'poor_service',
          subject: 'poor customer service',
          request: 'an official apology and staff retraining',
          details: 'store visit on 20 Sep at 5pm',
        },
        {
          key: 'wrong_billing',
          subject: 'incorrect billing',
          request: 'a corrected invoice and refund of overcharges',
          details: 'billed for items I did not purchase',
        },
        {
          key: 'damaged_item',
          subject: 'a damaged item',
          request: 'a replacement at no extra cost',
          details: 'arrived with visible scratches and dents',
        }
      ];

      exercises.reorder = scenarios.map(s => ({
        words: [
          { en: 'I', vi: 'Tôi' },
          { en: 'am', vi: 'đang' },
          { en: 'writing', vi: 'viết' },
          { en: 'to', vi: 'để' },
          { en: 'complain', vi: 'phàn nàn' },
          { en: 'about', vi: 'về' },
          { en: s.subject.replace(/\.$/, ''), vi: '' },
        ],
        answer: `I am writing to complain about ${s.subject}.`
      }));

      exercises.fill_blank = scenarios.map(s => ({
        sentence: {
          en: `I would like to request ____ ${s.request}.`,
          vi: `Tôi muốn yêu cầu ____ ${s.request}.`
        },
        missing_word: 'either',
        options: ['either', 'both', 'neither', 'only']
      }));

      exercises.find_error = scenarios.map(s => ({
        sentence: {
          en: `I am writing to complain for ${s.subject}.`,
          vi: ''
        },
        error_word: 'for',
        correct_word: 'about'
      }));

      exercises.choose_phrase = scenarios.map(s => ({
        sentence: {
          en: `Complete: I am writing to express my ____ with ${s.subject}.`,
          vi: `Hoàn thành: Tôi viết để bày tỏ ____ về ${s.subject}.`
        },
        correct_phrase: 'dissatisfaction',
        options: ['dissatisfaction', 'satisfaction', 'approval', 'agreement']
      }));

      exercises.matching = scenarios.map(() => ({
        col_a: [
          { en: 'refund', vi: 'hoàn tiền' },
          { en: 'replacement', vi: 'thay thế' },
          { en: 'apology', vi: 'lời xin lỗi' }
        ], 
        col_b: [
          { en: 'hoàn tiền', vi: 'refund' },
          { en: 'thay thế', vi: 'replacement' },
          { en: 'lời xin lỗi', vi: 'apology' }
        ],
        correct_pairs: [
          { key: 'refund', value: 'hoàn tiền' },
          { key: 'replacement', value: 'thay thế' },
          { key: 'apology', value: 'lời xin lỗi' }
        ]
      }));

      exercises.drag_drop = scenarios.map(s => ({
        sentence_parts: [
          { en: 'I am writing to express', vi: 'Tôi viết thư để bày tỏ' },
          { en: 'my dissatisfaction', vi: 'sự không hài lòng' },
          { en: `with ${s.subject}.`, vi: `về ${s.subject}.` }
        ],
        correct_order: ['I am writing to express', 'my dissatisfaction', `with ${s.subject}.`]
      }));
    } else if (letterType === 'invitation') {
      exercises.reorder = [
        { 
          words: [
            { en: 'I\'m', vi: 'Mình' }, 
            { en: 'writing', vi: 'đang viết' }, 
            { en: 'to', vi: 'để' }, 
            { en: 'invite', vi: 'mời' }, 
            { en: 'you.', vi: 'bạn.' }
          ], 
          answer: 'I\'m writing to invite you.' 
        }
      ];
      
      exercises.fill_blank = [
        { 
          sentence: { 
            en: `I'm writing to ____ you to my birthday party.`, 
            vi: `Mình viết thư để ____ bạn đến tiệc sinh nhật của mình.` 
          }, 
          missing_word: 'invite', 
          options: ['invite', 'invitation', 'inviting'] 
        }
      ];

      exercises.find_error = [
        { 
          sentence: { 
            en: 'I hope your doing well!', 
            vi: 'Mình hy vọng bạn đang khỏe!' 
          }, 
          error_word: 'your', 
          correct_word: "you're" 
        }
      ];

      exercises.choose_phrase = [
        { 
          sentence: { 
            en: 'Complete: I\'m writing to ____ you to my birthday party.', 
            vi: 'Hoàn thành: Mình viết thư để ____ bạn đến tiệc sinh nhật của mình.' 
          }, 
          correct_phrase: 'invite',
          options: ['invite', 'invitation', 'inviting']
        }
      ];

      exercises.matching = [
      { 
        col_a: [
            { en: 'invite', vi: 'mời' }, 
            { en: 'celebrate', vi: 'ăn mừng' }
        ], 
        col_b: [
            { en: 'mời', vi: 'invite' }, 
            { en: 'ăn mừng', vi: 'celebrate' }
          ],
          correct_pairs: [
            { key: 'invite', value: 'mời' },
            { key: 'celebrate', value: 'ăn mừng' }
          ]
        }
      ];

      exercises.drag_drop = [
        { 
          sentence_parts: [
            { en: 'I\'m writing to', vi: 'Mình viết thư để' }, 
            { en: 'invite you', vi: 'mời bạn' }, 
            { en: 'to my birthday party next Saturday.', vi: 'đến tiệc sinh nhật thứ Bảy tới.' }
          ], 
          correct_order: ['I\'m writing to', 'invite you', 'to my birthday party next Saturday.']
        }
      ];
    }

    return exercises;
  };

  // Generate contextual practice questions - 5 exercises per mode
  const sampleQuestions: any = {
    reorder: [
      // VSTEP Thank you letter HARD CORE exercises
      { 
        words: [
          { en: 'I', vi: 'Mình' }, 
          { en: 'just', vi: 'chỉ' }, 
          { en: 'wanted', vi: 'muốn' }, 
          { en: 'to', vi: 'để' }, 
          { en: 'say', vi: 'nói' }, 
          { en: 'thank', vi: 'cảm ơn' }, 
          { en: 'you.', vi: 'bạn.' }
        ], 
        answer: 'I just wanted to say thank you.' 
      },
      { 
        words: [
          { en: 'I', vi: 'Mình' }, 
          { en: 'really', vi: 'thực sự' }, 
          { en: 'appreciate', vi: 'trân trọng' }, 
          { en: 'your', vi: 'lòng' }, 
          { en: 'hospitality', vi: 'hiếu khách' }, 
          { en: 'so', vi: 'rất' }, 
          { en: 'much.', vi: 'nhiều.' }
        ], 
        answer: 'I really appreciate your hospitality so much.' 
      },
      { 
        words: [
          { en: 'I', vi: 'Mình' }, 
          { en: 'had', vi: 'đã có' }, 
          { en: 'a', vi: 'một' }, 
          { en: 'wonderful', vi: 'tuyệt vời' }, 
          { en: 'time', vi: 'khoảng thời gian' }, 
          { en: 'exploring', vi: 'khi khám phá' }, 
          { en: 'the', vi: 'thành phố' }, 
          { en: 'city.', vi: 'cùng bạn.' }
        ], 
        answer: 'I had a wonderful time exploring the city.' 
      },
      { 
        words: [
          { en: 'Let', vi: 'Hãy' }, 
          { en: 'me', vi: 'cho mình' }, 
          { en: 'know', vi: 'biết' }, 
          { en: 'when', vi: 'khi nào' }, 
          { en: 'you\'re', vi: 'bạn' }, 
          { en: 'planning', vi: 'định' }, 
          { en: 'to', vi: 'đến' }, 
          { en: 'visit.', vi: 'thăm.' }
        ], 
        answer: 'Let me know when you\'re planning to visit.' 
      },
      { 
        words: [
          { en: 'I', vi: 'Mình' }, 
          { en: 'really', vi: 'thực sự' }, 
          { en: 'hope', vi: 'hy vọng' }, 
          { en: 'you', vi: 'bạn' }, 
          { en: 'can', vi: 'có thể' }, 
          { en: 'come', vi: 'đến' }, 
          { en: 'next', vi: 'lần' }, 
          { en: 'time!', vi: 'sau!' }
        ], 
        answer: 'I really hope you can come next time!' 
      }
    ],
    fill_blank: [
      // VSTEP Thank you letter HARD CORE exercises
      { 
        sentence: { 
          en: `I just wanted to ____ thank you so much again.`, 
          vi: `Mình chỉ muốn ____ cảm ơn bạn rất nhiều một lần nữa.` 
        }, 
        missing_word: 'say', 
        options: ['say', 'tell', 'speak', 'talk'] 
      },
      { 
        sentence: { 
          en: `I really ____ your hospitality during my stay.`, 
          vi: `Mình thực sự ____ lòng hiếu khách của bạn trong thời gian ở lại.` 
        }, 
        missing_word: 'appreciate', 
        options: ['appreciate', 'apply', 'approve', 'approach'] 
      },
      { 
        sentence: { 
          en: `I had a ____ time exploring the city with you.`, 
          vi: `Mình đã có một ____ tuyệt vời khi khám phá thành phố cùng bạn.` 
        }, 
        missing_word: 'wonderful', 
        options: ['wonderful', 'terrible', 'boring', 'difficult'] 
      },
      { 
        sentence: { 
          en: `Let me know when you're ____ to visit my city.`, 
          vi: `Hãy cho mình biết khi nào bạn ____ đến thăm thành phố của mình.` 
        }, 
        missing_word: 'planning', 
        options: ['planning', 'planned', 'plans', 'plan'] 
      },
      { 
        sentence: { 
          en: `I really hope you can ____ next time!`, 
          vi: `Mình thực sự hy vọng bạn có thể ____ lần sau!` 
        }, 
        missing_word: 'come', 
        options: ['come', 'coming', 'came', 'comes'] 
      }
    ],
    find_error: [
      // VSTEP Thank you letter HARD CORE exercises
      { 
        sentence: { 
          en: 'I just wanted to say thank you so much again for letting I stay.', 
          vi: 'Mình chỉ muốn nói lời cảm ơn bạn rất nhiều một lần nữa vì đã cho mình ở lại.' 
        }, 
        error_word: 'I', 
        correct_word: 'me' 
      },
      { 
        sentence: { 
          en: 'I really appreciate you hospitality during my stay.', 
          vi: 'Mình thực sự trân trọng lòng hiếu khách của bạn trong thời gian ở lại.' 
        }, 
        error_word: 'you', 
        correct_word: 'your' 
      },
      { 
        sentence: { 
          en: 'I had a wonderful time explore the city with you.', 
          vi: 'Mình đã có một khoảng thời gian tuyệt vời khi khám phá thành phố cùng bạn.' 
        }, 
        error_word: 'explore', 
        correct_word: 'exploring' 
      },
      { 
        sentence: { 
          en: 'Let me know when you planning to visit my city.', 
          vi: 'Hãy cho mình biết khi nào bạn định đến thăm thành phố của mình.' 
        }, 
        error_word: 'planning', 
        correct_word: 'are planning' 
      },
      { 
        sentence: { 
          en: 'I really hope you can comes next time!', 
          vi: 'Mình thực sự hy vọng bạn có thể đến lần sau!' 
        }, 
        error_word: 'comes', 
        correct_word: 'come' 
      }
    ],
    choose_phrase: [
      // VSTEP Thank you letter HARD CORE exercises
      { 
        sentence: { 
          en: 'Complete: I just wanted to ____ thank you so much again.', 
          vi: 'Hoàn thành: Mình chỉ muốn ____ cảm ơn bạn rất nhiều một lần nữa.' 
        }, 
        correct_phrase: 'say',
        options: ['say', 'tell', 'speak', 'talk']
      },
      { 
        sentence: { 
          en: 'Complete: I really ____ your hospitality during my stay.', 
          vi: 'Hoàn thành: Mình thực sự ____ lòng hiếu khách của bạn trong thời gian ở lại.' 
        }, 
        correct_phrase: 'appreciate',
        options: ['appreciate', 'apply', 'approve', 'approach']
      },
      { 
        sentence: { 
          en: 'Complete: I had a ____ time exploring the city with you.', 
          vi: 'Hoàn thành: Mình đã có một ____ tuyệt vời khi khám phá thành phố cùng bạn.' 
        }, 
        correct_phrase: 'wonderful',
        options: ['wonderful', 'terrible', 'boring', 'difficult']
      },
      { 
        sentence: { 
          en: 'Complete: Let me know when you\'re ____ to visit my city.', 
          vi: 'Hoàn thành: Hãy cho mình biết khi nào bạn ____ đến thăm thành phố của mình.' 
        }, 
        correct_phrase: 'planning',
        options: ['planning', 'planned', 'plans', 'plan']
      },
      { 
        sentence: { 
          en: 'Complete: I really hope you can ____ next time!', 
          vi: 'Hoàn thành: Mình thực sự hy vọng bạn có thể ____ lần sau!' 
        }, 
        correct_phrase: 'come',
        options: ['come', 'coming', 'came', 'comes']
      }
    ],
    matching: [
      // VSTEP Thank you letter contextual exercises
      { 
        col_a: [
          { en: 'hospitality', vi: 'lòng hiếu khách' }, 
          { en: 'appreciate', vi: 'trân trọng' }, 
          { en: 'wonderful', vi: 'tuyệt vời' }
        ], 
        col_b: [
          { en: 'lòng hiếu khách', vi: 'hospitality' }, 
          { en: 'trân trọng', vi: 'appreciate' }, 
          { en: 'tuyệt vời', vi: 'wonderful' }
        ],
        correct_pairs: [
          { key: 'hospitality', value: 'lòng hiếu khách' },
          { key: 'appreciate', value: 'trân trọng' },
          { key: 'wonderful', value: 'tuyệt vời' }
        ] 
      },
      { 
        col_a: [
          { en: 'exploring', vi: 'khám phá' }, 
          { en: 'catching up', vi: 'hàn huyên' }, 
          { en: 'host', vi: 'tiếp đãi' }
        ], 
        col_b: [
          { en: 'khám phá', vi: 'exploring' }, 
          { en: 'hàn huyên', vi: 'catching up' }, 
          { en: 'tiếp đãi', vi: 'host' }
        ],
        correct_pairs: [
          { key: 'exploring', value: 'khám phá' },
          { key: 'catching up', value: 'hàn huyên' },
          { key: 'host', value: 'tiếp đãi' }
        ]
      },
    ],
    drag_drop: [
      // VSTEP Thank you letter contextual exercises
      { 
        sentence_parts: [
          { en: 'your hospitality', vi: 'lòng hiếu khách của bạn' }, 
          { en: 'I really appreciate', vi: 'Mình thực sự trân trọng' }, 
          { en: 'so much.', vi: 'rất nhiều.' }
        ], 
        correct_order: ['I really appreciate', 'your hospitality', 'so much.']
      },
      { 
        sentence_parts: [
          { en: 'a wonderful time', vi: 'một khoảng thời gian tuyệt vời' }, 
          { en: 'I had', vi: 'Mình đã có' }, 
          { en: 'exploring the city.', vi: 'khi khám phá thành phố.' }
        ], 
        correct_order: ['I had', 'a wonderful time', 'exploring the city.']
      },
      { 
        sentence_parts: [
          { en: 'you can come', vi: 'bạn có thể đến' }, 
          { en: 'I really hope', vi: 'Mình thực sự hy vọng' }, 
          { en: 'next time!', vi: 'lần sau!' }
        ], 
        correct_order: ['I really hope', 'you can come', 'next time!']
      },
      { 
        sentence_parts: [
          { en: 'when you visit', vi: 'khi bạn đến thăm' }, 
          { en: 'Let me know', vi: 'Hãy cho mình biết' }, 
          { en: 'my city.', vi: 'thành phố của mình.' }
        ], 
        correct_order: ['Let me know', 'when you visit', 'my city.']
      },
      { 
        sentence_parts: [
          { en: 'Thank you', vi: 'Cảm ơn bạn' }, 
          { en: 'so much again', vi: 'rất nhiều một lần nữa' }, 
          { en: 'for everything.', vi: 'vì tất cả.' }
        ], 
        correct_order: ['Thank you', 'so much again', 'for everything.']
      }
    ]
  };
  
  // Determine which exercises to use based on letter type
  let contextualExercises;
  if (isThankYouLetter) {
    contextualExercises = generateContextualExercises('thank_you');
  } else if (isRequestLetter) {
    contextualExercises = generateContextualExercises('request');
  } else if (isComplaintLetter) {
    contextualExercises = generateContextualExercises('complaint');
  } else if (isInvitationLetter) {
    contextualExercises = generateContextualExercises('invitation');
  } else {
    // Fallback to default exercises
    contextualExercises = sampleQuestions;
  }

  console.log('🔍 Contextual exercises generated:', {
    mode,
    hasContextual: !!contextualExercises[mode],
    contextualLength: contextualExercises[mode]?.length || 0,
    hasSample: !!sampleQuestions[mode],
    sampleLength: sampleQuestions[mode]?.length || 0
  });

  // Get exercises for the specific mode - always use sampleQuestions as fallback
  let result = contextualExercises[mode] || sampleQuestions[mode] || [];
  
  // Ensure exactly 6 items for all modes so UI always appends +6
  const ensureSix = (arr: any[], builder: () => any): any[] => {
    const out = (arr || []).filter(Boolean);
    while (out.length < 6) out.push(builder());
    if (out.length > 6) return out.slice(0, 6);
    return out;
  };

  // Ensure reorder returns exactly 6 items so each click appends 6
  if (mode === 'reorder') {
    const dedup = new Set<string>();
    const normalized = (result as any[]).filter(Boolean).map((it: any) => {
      const ans = (it?.answer || '').trim();
      if (ans && !dedup.has(ans)) {
        dedup.add(ans);
        return it;
      }
      return null;
    }).filter(Boolean) as any[];
    const pool: Array<{ en: string; vi: string }> = [
      { en: 'Thank you so much for your support.', vi: 'Cảm ơn bạn rất nhiều vì sự hỗ trợ của bạn.' },
      { en: 'I truly appreciate your kindness today.', vi: 'Mình thực sự trân trọng sự tốt bụng của bạn hôm nay.' },
      { en: 'Your help means a lot to me.', vi: 'Sự giúp đỡ của bạn có ý nghĩa rất nhiều với mình.' },
      { en: 'I am grateful for everything you did.', vi: 'Mình biết ơn vì tất cả những gì bạn đã làm.' },
      { en: 'Thank you for being so thoughtful.', vi: 'Cảm ơn bạn vì đã rất chu đáo.' },
      { en: 'I will never forget your generosity.', vi: 'Mình sẽ không bao giờ quên lòng hào phóng của bạn.' },
      { en: 'Thanks again for your warm hospitality.', vi: 'Cảm ơn một lần nữa vì sự hiếu khách nồng hậu của bạn.' },
      { en: 'I really enjoyed my time with you.', vi: 'Mình thực sự đã có khoảng thời gian tuyệt vời với bạn.' }
    ];
    const makeItem = (en: string, vi: string) => {
      const enParts = en.split(' ');
      const viParts = vi.split(' ');
      const words = enParts.map((w, i) => ({ en: w + (i === enParts.length - 1 ? '' : ''), vi: viParts[i] || w }));
      return { words, answer: en };
    };
    let i = 0;
    while (normalized.length < 6 && i < pool.length) {
      const p = pool[i];
      if (!dedup.has(p.en)) {
        normalized.push(makeItem(p.en, p.vi));
        dedup.add(p.en);
      }
      i++;
    }
    result = ensureSix(normalized, () => normalized[Math.max(0, Math.floor(Math.random()*Math.max(1, normalized.length)))]);
  } else if (mode === 'fill_blank') {
    const words = ['appreciate', 'support', 'kindness', 'help', 'patience', 'understanding'];
    result = ensureSix(result, () => {
      const w = words[Math.floor(Math.random()*words.length)];
      return {
        sentence: { en: `I really ____ your ${w}.`, vi: `Mình thực sự ____ ${w} của bạn.` },
        missing_word: 'appreciate',
        options: ['appreciate', 'like', 'enjoy', 'love']
      };
    });
  } else if (mode === 'find_error') {
    const pairs = [
      { wrong: 'you', right: 'your', en: 'I really appreciate you help.' },
      { wrong: 'mean', right: 'means', en: 'Your help mean a lot to me.' },
      { wrong: 'be', right: 'being', en: 'Thank you for be so helpful.' }
    ];
    result = ensureSix(result, () => {
      const p = pairs[Math.floor(Math.random()*pairs.length)];
      return {
        sentence: { en: p.en, vi: '' },
        error_word: p.wrong,
        correct_word: p.right
      };
    });
  } else if (mode === 'choose_phrase') {
    result = ensureSix(result, () => ({
      sentence: { en: 'Complete: I really ____ your help.', vi: 'Hoàn thành: Mình thực sự ____ sự giúp đỡ của bạn.' },
      correct_phrase: 'appreciate',
      options: ['appreciate', 'like', 'enjoy', 'love']
    }));
  } else if (mode === 'matching') {
    result = ensureSix(result, () => ({
      col_a: [
        { en: 'appreciate', vi: 'trân trọng' },
        { en: 'generosity', vi: 'hào phóng' }
      ],
      col_b: [
        { en: 'trân trọng', vi: 'appreciate' },
        { en: 'hào phóng', vi: 'generosity' }
      ],
      correct_pairs: [
        { key: 'appreciate', value: 'trân trọng' },
        { key: 'generosity', value: 'hào phóng' }
      ]
    }));
  } else if (mode === 'drag_drop') {
    const parts = [
      ['Thank you', 'so much', 'for your help!'],
      ['I really', 'appreciate', 'your kindness.'],
      ['Your help', 'means', 'a lot to me.']
    ];
    result = ensureSix(result, () => {
      const p = parts[Math.floor(Math.random()*parts.length)];
      return {
        sentence_parts: [
          { en: p[0], vi: '' },
          { en: p[1], vi: '' },
          { en: p[2], vi: '' }
        ],
        correct_order: [p[0], p[1], p[2]]
      };
    });
  }
  
  // Ensure we always return valid exercises
  if (!result || result.length === 0) {
    console.log('⚠️ No exercises found, using default fallback');
    
    // Create appropriate fallback based on mode
    if (mode === 'reorder') {
      result = [
        {
          words: [{ en: 'Thank', vi: 'Cảm ơn' }, { en: 'you', vi: 'bạn' }, { en: 'so', vi: 'rất' }, { en: 'much!', vi: 'nhiều!' }],
          answer: 'Thank you so much!'
        }
      ];
    } else if (mode === 'fill_blank') {
      result = [
        {
          sentence: { en: 'I really ____ your help.', vi: 'Mình thực sự ____ sự giúp đỡ của bạn.' },
          missing_word: 'appreciate',
          options: ['appreciate', 'like', 'enjoy', 'love']
        }
      ];
    } else if (mode === 'find_error') {
      result = [
        {
          sentence: { en: 'I really appreciate you help.', vi: 'Mình thực sự trân trọng sự giúp đỡ của bạn.' },
          error_word: 'you',
          correct_word: 'your'
        }
      ];
    } else if (mode === 'choose_phrase') {
      result = [
        {
          sentence: { en: 'Complete: I really ____ your help.', vi: 'Hoàn thành: Mình thực sự ____ sự giúp đỡ của bạn.' },
          correct_phrase: 'appreciate',
          options: ['appreciate', 'like', 'enjoy', 'love']
        }
      ];
    } else if (mode === 'matching') {
      result = [
        {
          col_a: [{ en: 'appreciate', vi: 'trân trọng' }],
          col_b: [{ en: 'trân trọng', vi: 'appreciate' }],
          correct_pairs: [{ key: 'appreciate', value: 'trân trọng' }]
        }
      ];
    } else if (mode === 'drag_drop') {
      result = [
        {
          sentence_parts: [
            { en: 'Thank you', vi: 'Cảm ơn bạn' },
            { en: 'so much', vi: 'rất nhiều' },
            { en: 'for your help!', vi: 'vì sự giúp đỡ!' }
          ],
          correct_order: ['Thank you', 'so much', 'for your help!']
        }
      ];
    } else {
      result = [
        {
          words: [{ en: 'Sample', vi: 'Mẫu' }, { en: 'exercise', vi: 'bài tập' }],
          answer: 'Sample exercise'
        }
      ];
    }
  }
  
  console.log(`🔥 Returning ${result.length} questions for mode: ${mode}`);
  console.log('🔥 Result:', result);
  return result;
};

export const generateNewPracticeItem = async (subcategory: any, existingPrompts: string[], options: any = {}) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const aiItemNumber = existingPrompts.filter(p => p.includes('AI-')).length + 1;
  
  const newSeed = { 
    topic: `AI Generated Topic ${aiItemNumber}`, 
    prompt_en: `This is an AI-generated practice prompt ${aiItemNumber} for ${subcategory?.subcategory_name_vi || 'practice'}.`, 
    prompt_vi: `Đây là đề bài thực hành được tạo bởi AI số ${aiItemNumber} cho ${subcategory?.subcategory_name_vi || 'thực hành'}.`,
    prompt_vi_short: `AI-${aiItemNumber}: ${subcategory?.subcategory_name_vi || 'Thực hành'}`,
    code: `AI-GEN-${Date.now()}`,
    must_use: ['Furthermore', 'In conclusion'],
    focus: 'AI-generated practice with realistic scenarios',
    imageSeed: options.withImage ? `ai-generated-${Date.now()}` : undefined
  };
  
  return newSeed;
};

export const generateBulkFoundationExercises = async () => {
  return [];
};

export const generateBulkWritingSeeds = async () => {
  return [];
};

export const generateBulkSpeakingTasks = async () => {
  return [];
};

export const generateBulkTips = async () => {
  return [];
};

export const generateBulkCambridgeTasks = async () => {
  return [];
};

export const generateCambridgeImage = async () => {
  return "data:image/png;base64,sample";
};

export const generateImage = async () => {
  return "data:image/png;base64,sample";
};

export const generateText = async () => {
  return "Sample generated text";
};

export const checkGrammar = async (text: string, seed?: any) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock grammar errors with realistic examples
  const mockErrors = [
    {
      original: "I have been study English",
      corrected: "I have been studying English",
      position: { start: 12, end: 17 },
      error_type: "verb_form",
      explanation: "Use the gerund form 'studying' after 'have been'"
    },
    {
      original: "There is many students",
      corrected: "There are many students", 
      position: { start: 6, end: 8 },
      error_type: "subject_verb_agreement",
      explanation: "Use 'are' with plural subject 'students'"
    }
  ];

  // Find actual errors in the text
  const foundErrors: any[] = [];
  if (text.includes("have been study")) {
    foundErrors.push({
      original: "have been study",
      corrected: "have been studying",
      position: { start: text.indexOf("have been study"), end: text.indexOf("have been study") + 15 },
      error_type: "verb_form",
      explanation: "Use the gerund form 'studying' after 'have been'"
    });
  }
  
  if (text.includes("There is many")) {
    foundErrors.push({
      original: "There is many",
      corrected: "There are many",
      position: { start: text.indexOf("There is many"), end: text.indexOf("There is many") + 13 },
      error_type: "subject_verb_agreement", 
      explanation: "Use 'are' with plural subjects"
    });
  }

  // Create corrected text
  let correctedText = text;
  foundErrors.forEach(error => {
    correctedText = correctedText.replace(error.original, error.corrected);
  });

  return {
    errors: foundErrors,
    corrected_full_text: correctedText,
    general_feedback_vi: foundErrors.length > 0 
      ? `Tìm thấy ${foundErrors.length} lỗi ngữ pháp. Hãy xem các gợi ý sửa lỗi được đánh dấu.`
      : "Bài viết của bạn không có lỗi ngữ pháp rõ ràng. Tốt lắm!"
  };
};

export const getWritingFeedback = async () => {
  return { is_correct: true, feedback_vi: "Sample feedback", corrected_sentence_en: "Sample" };
};

export const suggestImprovements = async (text: string, seed?: any) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const suggestions = [
    {
      suggestion_type: 'Vocabulary' as const,
      original_text: text.substring(0, 50) + "...",
      suggested_text: "Use more varied vocabulary instead of repetition",
      explanation_vi: "Sử dụng từ vựng đa dạng hơn thay vì lặp lại cùng một từ. Thêm các từ nối để liên kết ý tưởng tốt hơn (however, furthermore, in addition)."
    },
    {
      suggestion_type: 'Structure' as const,
      original_text: "Simple sentence structure",
      suggested_text: "Complex sentence with subordinate clauses",
      explanation_vi: "Kết hợp câu đơn và câu phức để tạo nhịp điệu. Sử dụng cấu trúc câu đảo ngữ để nhấn mạnh, tránh viết câu quá dài gây khó hiểu."
    },
    {
      suggestion_type: 'Coherence' as const,
      original_text: "Disconnected ideas",
      suggested_text: "Well-connected paragraphs with transition words",
      explanation_vi: "Phát triển ý tưởng với ví dụ cụ thể. Thêm dẫn chứng hoặc số liệu để hỗ trợ quan điểm, đảm bảo các đoạn văn có tính logic và liên kết."
    },
    {
      suggestion_type: 'Clarity' as const,
      original_text: "Unclear argument structure",
      suggested_text: "Clear introduction, body, and conclusion",
      explanation_vi: "Kiểm tra lại cấu trúc bài viết (mở bài - thân bài - kết bài). Đảm bảo trả lời đầy đủ yêu cầu của đề bài, viết kết bài tóm tắt và khẳng định lại quan điểm."
    }
  ];

  const overallScore = Math.floor(Math.random() * 3) + 6; // Score between 6-8
  
  return {
    suggestions,
    general_feedback_vi: `Điểm ước tính: ${overallScore}/9. Bài viết của bạn có ${text.split(' ').length} từ. Hãy xem các gợi ý cải thiện bên dưới để nâng cao chất lượng bài viết.`
  };
};

export const generateVstepSampleAnswer = async () => {
  return { sample_answer_en: "Sample answer", sample_answer_vi: "Câu trả lời mẫu" };
};

// ==============================
// ENHANCED AI INTEGRATION
// ==============================

// Generate New Seed/Item - 2s simulation as requested
export const generateNewSeed = async (category: string, taskType?: string, withImage?: boolean) => {
  console.log('🔥 generateNewSeed called for:', category, taskType, withImage ? 'with image' : 'no image');
  
  // Simulate AI processing delay - 2 seconds as requested
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const timestamp = Date.now();
  const seedId = `AI-GEN-${timestamp}`;
  
  // Generate contextual seed based on category
  const seedTemplates: Record<string, any> = {
    'IELTS-T1': {
      code: seedId,
      topic: 'AI Generated Chart',
      prompt_en: 'The chart below shows the changes in AI usage across different industries from 2020 to 2025.',
      prompt_vi: 'Biểu đồ dưới đây cho thấy sự thay đổi trong việc sử dụng AI qua các ngành công nghiệp từ 2020 đến 2025.',
      prompt_vi_short: `AI-${timestamp}: Sử dụng AI theo ngành`,
      must_use: ['Overall, it is clear that', 'experienced a significant increase', 'in contrast'],
      focus: 'Describing trends and making comparisons',
      imageSeed: withImage ? `ai-generated-chart-${timestamp}` : undefined
    },
    'IELTS-T2': {
      code: seedId,
      topic: 'AI Generated Essay',
      prompt_en: 'Some people believe that artificial intelligence will replace human workers in most jobs. To what extent do you agree or disagree?',
      prompt_vi: 'Một số người tin rằng trí tuệ nhân tạo sẽ thay thế lao động con người trong hầu hết các công việc. Bạn đồng ý hay không đồng ý đến mức nào?',
      prompt_vi_short: `AI-${timestamp}: AI thay thế con người`,
      must_use: ['In my opinion', 'On the other hand', 'In conclusion'],
      focus: 'Opinion essay with balanced argument'
    },
    'Foundation': {
      id: `FT-AI-${timestamp}`,
      name_vi: 'Câu AI tạo mới',
      name_en: 'AI Generated Sentence',
      level: 'medium',
      category: 'Cấu trúc câu',
      sentence: 'The AI system has successfully generated a new practice exercise.',
      practice: {
        reorder: [
          { 
            words: [
              { en: 'The AI system', vi: 'Hệ thống AI' }, 
              { en: 'has successfully generated', vi: 'đã tạo thành công' }, 
              { en: 'a new exercise.', vi: 'một bài tập mới.' }
            ], 
            answer: 'The AI system has successfully generated a new exercise.' 
          }
        ],
        fill_blank: [
          { 
            sentence: { en: 'AI ____ help students learn more effectively.', vi: 'AI ____ giúp học sinh học hiệu quả hơn.' }, 
            missing_word: 'can', 
            options: ['can', 'must', 'should', 'will'] 
          }
        ]
      }
    }
  };
  
  const template = seedTemplates[category] || seedTemplates['Foundation'];
  
  return {
    ...template,
    generated_at: new Date().toISOString(),
    generated_by: 'AI_SIMULATION'
  };
};

// ==============================
// AI TEST LAB FUNCTIONS
// ==============================

export const generateTestImage = async (prompt: string) => {
  console.log('🔥 AI Test Lab - Generate Image:', prompt);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return {
    imageUrl: `https://via.placeholder.com/512x384/0A84FF/FFFFFF?text=AI+Generated+Image`,
    imageSeed: `test-image-${Date.now()}`,
    prompt: prompt,
    generated_at: new Date().toISOString(),
    status: 'success'
  };
};

export const generateTestText = async (prompt: string) => {
  console.log('🔥 AI Test Lab - Generate Text:', prompt);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    text: `This is an AI-generated text response based on your prompt: "${prompt}". The system has analyzed your request and generated this contextual content to demonstrate text generation capabilities. This includes proper formatting, relevant information, and contextual understanding of the input prompt.`,
    prompt: prompt,
    generated_at: new Date().toISOString(),
    word_count: 45,
    status: 'success'
  };
};

export const speechToText = async (audioBlob: Blob) => {
  console.log('🔥 AI Test Lab - Speech to Text');
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  return {
    transcript: "This is a simulated speech-to-text transcript. In a real implementation, this would contain the actual transcription of the uploaded audio file. The system would process the audio and convert spoken words into written text.",
    confidence: 0.95,
    language: 'en-US',
    duration: 5.2,
    generated_at: new Date().toISOString(),
    status: 'success'
  };
};

export const textToSpeech = async (text: string, voice?: string) => {
  console.log('🔥 AI Test Lab - Text to Speech:', text);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    audioUrl: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGYfCEOX4+ykUQwKUKjd8bVpIAU+ltryxnkpBSl+zO/eizEIHWq+8+OZURE`,
    voice: voice || 'en-US-Neural',
    text: text,
    duration: text.length * 0.1, // Rough estimate
    generated_at: new Date().toISOString(),
    status: 'success'
  };
};
