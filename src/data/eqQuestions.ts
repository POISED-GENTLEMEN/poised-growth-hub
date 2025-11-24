export interface EQQuestion {
  id: number;
  dimension: 'self-awareness' | 'self-regulation' | 'motivation' | 'empathy' | 'social-skills';
  question: string;
}

export const eqQuestions: EQQuestion[] = [
  // SELF-AWARENESS (5 questions)
  {
    id: 1,
    dimension: 'self-awareness',
    question: 'I can accurately identify and name my emotions as they arise throughout the day.'
  },
  {
    id: 2,
    dimension: 'self-awareness',
    question: 'I understand what triggers my strongest emotional reactions (both positive and negative).'
  },
  {
    id: 3,
    dimension: 'self-awareness',
    question: 'I can clearly articulate my personal strengths and areas for growth without defensiveness.'
  },
  {
    id: 4,
    dimension: 'self-awareness',
    question: 'I regularly reflect on how my emotions influence my decisions and behaviors.'
  },
  {
    id: 5,
    dimension: 'self-awareness',
    question: 'I recognize when my emotional state might be affecting my judgment or interactions.'
  },
  
  // SELF-REGULATION (5 questions)
  {
    id: 6,
    dimension: 'self-regulation',
    question: 'I maintain composure and think clearly even when facing high-pressure situations.'
  },
  {
    id: 7,
    dimension: 'self-regulation',
    question: 'When frustrated or angry, I pause before responding rather than reacting impulsively.'
  },
  {
    id: 8,
    dimension: 'self-regulation',
    question: 'I adapt my approach when circumstances change, rather than becoming rigid or defensive.'
  },
  {
    id: 9,
    dimension: 'self-regulation',
    question: 'I can redirect my focus and manage stress without letting it compromise my performance.'
  },
  {
    id: 10,
    dimension: 'self-regulation',
    question: 'I choose measured, thoughtful responses over emotional reactions in difficult conversations.'
  },
  
  // MOTIVATION (5 questions)
  {
    id: 11,
    dimension: 'motivation',
    question: 'I pursue meaningful goals with consistent effort, even when progress feels slow.'
  },
  {
    id: 12,
    dimension: 'motivation',
    question: 'When I face setbacks, I view them as opportunities to learn rather than reasons to quit.'
  },
  {
    id: 13,
    dimension: 'motivation',
    question: 'I actively seek opportunities for personal growth and self-improvement.'
  },
  {
    id: 14,
    dimension: 'motivation',
    question: 'I maintain optimism and find purpose even during challenging periods.'
  },
  {
    id: 15,
    dimension: 'motivation',
    question: 'I take initiative to create positive change rather than waiting for circumstances to improve.'
  },
  
  // EMPATHY (5 questions)
  {
    id: 16,
    dimension: 'empathy',
    question: 'I give others my full attention and truly listen to understand their perspective.'
  },
  {
    id: 17,
    dimension: 'empathy',
    question: 'I notice and respond appropriately to non-verbal emotional cues from others.'
  },
  {
    id: 18,
    dimension: 'empathy',
    question: 'I consider how situations might feel from another person\'s viewpoint before forming judgments.'
  },
  {
    id: 19,
    dimension: 'empathy',
    question: 'I show genuine compassion and understanding when others are struggling emotionally.'
  },
  {
    id: 20,
    dimension: 'empathy',
    question: 'I can sense the emotional dynamics in a room and adjust my approach accordingly.'
  },
  
  // SOCIAL SKILLS (5 questions)
  {
    id: 21,
    dimension: 'social-skills',
    question: 'I communicate my thoughts and feelings clearly and effectively in various settings.'
  },
  {
    id: 22,
    dimension: 'social-skills',
    question: 'I navigate disagreements constructively, finding solutions that respect all parties.'
  },
  {
    id: 23,
    dimension: 'social-skills',
    question: 'I build genuine rapport and trust with people from diverse backgrounds.'
  },
  {
    id: 24,
    dimension: 'social-skills',
    question: 'I influence others positively through authentic leadership and emotional intelligence.'
  },
  {
    id: 25,
    dimension: 'social-skills',
    question: 'I collaborate effectively, balancing assertiveness with respect for others\' contributions.'
  }
];

export const dimensionInfo = {
  'self-awareness': {
    title: 'Self-Awareness',
    description: 'The foundation of emotional intelligence - recognizing and understanding your own emotions, triggers, and how they influence your decisions.',
    icon: '👁️'
  },
  'self-regulation': {
    title: 'Self-Regulation',
    description: 'Managing your emotions and impulses with discipline - maintaining composure under pressure and choosing thoughtful responses over reactive behaviors.',
    icon: '⚖️'
  },
  'motivation': {
    title: 'Motivation',
    description: 'Your internal drive toward growth and excellence - pursuing meaningful goals with resilience and channeling adversity into personal development.',
    icon: '🎯'
  },
  'empathy': {
    title: 'Empathy',
    description: 'Understanding and connecting with others\' emotions - the strength to be vulnerable and create authentic relationships through emotional attunement.',
    icon: '🤝'
  },
  'social-skills': {
    title: 'Social Skills',
    description: 'Managing relationships with emotional intelligence - communicating effectively, resolving conflicts, and leading with authenticity and respect.',
    icon: '💬'
  }
};

export interface DimensionScore {
  dimension: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface EQResults {
  totalScore: number;
  maxScore: number;
  level: string;
  levelDescription: string;
  dimensionScores: DimensionScore[];
  strengths: string[];
  developmentAreas: string[];
}

export const calculateResults = (answers: Record<number, number>): EQResults => {
  const dimensionScores: Record<string, number> = {
    'self-awareness': 0,
    'self-regulation': 0,
    'motivation': 0,
    'empathy': 0,
    'social-skills': 0
  };

  eqQuestions.forEach(q => {
    dimensionScores[q.dimension] += answers[q.id] || 0;
  });

  const totalScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0);

  let level = '';
  let levelDescription = '';
  
  if (totalScore <= 50) {
    level = 'Emerging Gentleman';
    levelDescription = 'You\'re beginning your journey of emotional awareness. Every master was once a beginner - your willingness to assess yourself shows the courage required for growth.';
  } else if (totalScore <= 75) {
    level = 'Developing Gentleman';
    levelDescription = 'You\'re building solid emotional competence. You understand the fundamentals and are actively developing your emotional intelligence. Continue this disciplined pursuit.';
  } else if (totalScore <= 100) {
    level = 'Accomplished Gentleman';
    levelDescription = 'You have a strong emotional intelligence foundation. You demonstrate consistent awareness and skill in managing emotions - both your own and others\'. Keep refining your mastery.';
  } else {
    level = 'Poised Gentleman';
    levelDescription = 'You exemplify emotional intelligence mastery. You combine stoic discipline with emotional awareness, leading with authenticity and commanding respect through genuine understanding.';
  }

  const dimensionScoresArray: DimensionScore[] = Object.entries(dimensionScores).map(([dim, score]) => ({
    dimension: dimensionInfo[dim as keyof typeof dimensionInfo].title,
    score,
    maxScore: 25,
    percentage: (score / 25) * 100
  }));

  const strengths = dimensionScoresArray
    .filter(d => d.score >= 20)
    .map(d => d.dimension);

  const developmentAreas = dimensionScoresArray
    .filter(d => d.score < 20)
    .map(d => d.dimension);

  return {
    totalScore,
    maxScore: 125,
    level,
    levelDescription,
    dimensionScores: dimensionScoresArray,
    strengths,
    developmentAreas
  };
};

export const getDevelopmentRecommendations = (dimension: string): string[] => {
  const recommendations: Record<string, string[]> = {
    'Self-Awareness': [
      'Start a daily journaling practice - write about your emotions and what triggered them',
      'Practice mindfulness meditation for 10 minutes each morning',
      'Expand your emotional vocabulary - learn to name subtle emotional states',
      'Consider working with a coach or therapist for deeper self-exploration',
      'Ask trusted friends for honest feedback about your blind spots'
    ],
    'Self-Regulation': [
      'Practice the 90-second rule - pause and breathe before responding in tense moments',
      'Study stoic principles, especially the dichotomy of control',
      'Develop a personal stress management routine (exercise, meditation, nature)',
      'Create response templates for common challenging situations',
      'Build your distress tolerance through gradual exposure to discomfort'
    ],
    'Motivation': [
      'Define your personal mission statement and review it weekly',
      'Set SMART goals and break them into daily actionable steps',
      'Cultivate a growth mindset - reframe failures as learning opportunities',
      'Read "Atomic Habits" by James Clear and implement one new system',
      'Find an accountability partner or mentor for your development journey'
    ],
    'Empathy': [
      'Practice active listening - repeat back what you hear before responding',
      'When someone shares emotions, validate before offering solutions',
      'Read fiction to practice perspective-taking and emotional understanding',
      'Ask "What might they be feeling?" before judging others\' actions',
      'Deepen one relationship by having more vulnerable, authentic conversations'
    ],
    'Social Skills': [
      'Take a communication workshop or join Toastmasters',
      'Learn and practice the "DEAR MAN" framework for assertive communication',
      'Read "How to Win Friends and Influence People" by Dale Carnegie',
      'Seek opportunities to mediate or facilitate difficult conversations',
      'Practice giving and receiving feedback using the SBI model (Situation-Behavior-Impact)'
    ]
  };

  return recommendations[dimension] || [];
};
