export type ReducedNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type NumerologyNumberMeta = {
  number: ReducedNumber;
  planet: string;
  traditionalTheme: string;
  corePersonality: string[];
  naturalStrengths: string[];
  weaknesses: string[];
  thinking: string[];
  career: string[];
  money: string[];
  love: string[];
  family: string[];
  emotional: string[];
  growth: string[];
};

export type BhagyankNumberMeta = {
  number: ReducedNumber;
  lifeDirection: string;
  majorLifeThemes: string[];
  career: string[];
  financial: string[];
  relationships: string[];
  personalDevelopment: string[];
  obstacles: string[];
  lessons: string[];
  recommendations: string[];
};

export const reduceToSingleDigit = (value: number): ReducedNumber => {
  let current = Math.abs(Math.trunc(value));

  while (current > 9) {
    current = String(current)
      .split('')
      .reduce((total, digit) => total + Number(digit), 0);
  }

  return current as ReducedNumber;
};

export const safeParseDate = (value?: string): Date | null => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
};

export const getDayFromDob = (value?: string): number | null => {
  const parsed = safeParseDate(value);
  return parsed ? parsed.getUTCDate() : null;
};

export const getMonthFromDob = (value?: string): number | null => {
  const parsed = safeParseDate(value);
  return parsed ? parsed.getUTCMonth() + 1 : null;
};

export const getYearFromDob = (value?: string): number | null => {
  const parsed = safeParseDate(value);
  return parsed ? parsed.getUTCFullYear() : null;
};

export const calculateMulank = (day: number | null | undefined): ReducedNumber | null => {
  if (day === null || day === undefined || Number.isNaN(day)) return null;
  return reduceToSingleDigit(day);
};

export const calculateBhagyank = (dob?: string): ReducedNumber | null => {
  if (!dob) return null;

  const parsed = safeParseDate(dob);
  if (!parsed) return null;

  const day = parsed.getUTCDate();
  const month = parsed.getUTCMonth() + 1;
  const year = parsed.getUTCFullYear();

  const digits = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${String(year)}`;
  let sum = digits.split('').reduce((total, digit) => total + Number(digit), 0);

  while (sum > 9) {
    sum = String(sum)
      .split('')
      .reduce((total, digit) => total + Number(digit), 0);
  }

  return sum as ReducedNumber;
};

export const mulankInterpretations: NumerologyNumberMeta[] = [
  {
    number: 1,
    planet: 'Sun',
    traditionalTheme: 'Leadership and individuality',
    corePersonality: ['Independent and self-directed.', 'Wants to lead and make a mark on the world.', 'Builds confidence through personal initiative.'],
    naturalStrengths: ['Visionary thinking', 'Strong willpower', 'Original leadership'],
    weaknesses: ['Stubborn tendencies', 'Can be overly self-focused', 'May resist advice'],
    thinking: ['Prefers direct action over waiting.', 'Makes decisions quickly and confidently.', 'Responds best when trust is earned.'],
    career: ['Leadership roles', 'Entrepreneurship', 'Creative authority'],
    money: ['Values independence in earning', 'Prefers direct financial control', 'Can be impulsive with spending'],
    love: ['Desires respect and admiration', 'Attracts passionate relationships', 'Needs space to feel free'],
    family: ['Strong sense of identity', 'Protective and responsible', 'Can dominate family decisions'],
    emotional: ['Feels strongly and deeply', 'Needs affirmation and respect', 'May be sensitive to criticism'],
    growth: ['Learn to balance assertiveness with collaboration.', 'Cultivate humility and listening skills.']
  },
  {
    number: 2,
    planet: 'Moon',
    traditionalTheme: 'Emotions and sensitivity',
    corePersonality: ['Gentle, intuitive and relational.', 'Feels deeply and connects emotionally with others.', 'Carries a soft but resilient inner strength.'],
    naturalStrengths: ['Emotional intelligence', 'Diplomacy', 'Listening and empathy'],
    weaknesses: ['Mood sensitivity', 'Overthinking', 'Difficulty with firm boundaries'],
    thinking: ['Values harmony and emotional clarity.', 'Decisions may be guided by intuition.', 'Learns through relationships and reflection.'],
    career: ['Counselling', 'Relationship roles', 'Supportive leadership'],
    money: ['Comfort-focused spending', 'Prefers financial security', 'Can be cautious in high-risk decisions'],
    love: ['Seeks emotional safety', 'Deeply loyal and compassionate', 'Needs reassurance and consistency'],
    family: ['Nurturing and protective', 'Strong home orientation', 'May take on emotional labour'],
    emotional: ['Highly responsive to mood and atmosphere', 'Needs peace and rest', 'Can feel unsettled by conflict'],
    growth: ['Build emotional boundaries and firm decision-making.', 'Trust inner rhythm without over-absorbing others.']
  },
  {
    number: 3,
    planet: 'Jupiter',
    traditionalTheme: 'Knowledge and expansion',
    corePersonality: ['Optimistic, expressive and intellectually curious.', 'Enjoys learning, teaching and uplifting others.', 'Brings joy and creative confidence.'],
    naturalStrengths: ['Communication', 'Creativity', 'Academic confidence'],
    weaknesses: ['Scattered focus', 'Overpromising', 'Need for recognition'],
    thinking: ['Creative and broad-minded.', 'Prefers lively ideas over rigid systems.', 'Learns through dialogue and experimentation.'],
    career: ['Media', 'Teaching', 'Marketing', 'Writing'],
    money: ['Sees opportunities in creativity', 'Can spend on growth and comfort', 'Needs structure to avoid inconsistency'],
    love: ['Warm and playful', 'Attracts social charm', 'Needs intellectual and emotional compatibility'],
    family: ['Entertaining and social', 'Guiding and encouraging', 'May struggle with rigid family routines'],
    emotional: ['Usually upbeat, but can feel discouraged when unappreciated', 'Needs meaningful expression', 'Can become restless if life feels limited'],
    growth: ['Choose focus over scattered abundance.', 'Use discipline to turn ideas into stable results.']
  },
  {
    number: 4,
    planet: 'Rahu',
    traditionalTheme: 'Innovation and unconventional thinking',
    corePersonality: ['Grounded and practical with a rebellious edge.', 'Prefers independence and original methods.', 'Works best when building structure that still leaves room for freedom.'],
    naturalStrengths: ['Persistence', 'Vision for systems', 'Practical problem-solving'],
    weaknesses: ['Resistance to authority', 'Rigidity', 'A tendency to overwork'],
    thinking: ['Prefers realistic planning with room to innovate.', 'Builds systems but may challenge traditional rules.', 'Looks for efficient and unconventional solutions.'],
    career: ['Engineering', 'Operations', 'Planning', 'Technology'],
    money: ['Disciplined and long-term', 'Values security and practical growth', 'Can become overly cautious or rigid'],
    love: ['Loyal once committed', 'Needs respect and consistency', 'May need help balancing freedom with intimacy'],
    family: ['Responsible and dependable', 'Protective by nature', 'Can feel burdened by obligations'],
    emotional: ['Usually steady and silent', 'May hide feelings under practicality', 'Needs private space to recover'],
    growth: ['Allow flexibility without losing discipline.', 'Let emotional openness soften the practical shell.']
  },
  {
    number: 5,
    planet: 'Mercury',
    traditionalTheme: 'Intelligence and communication',
    corePersonality: ['Dynamic, curious and versatile.', 'Thrives on movement, learning and exchange.', 'Enjoys variety and keeps life mentally active.'],
    naturalStrengths: ['Quick thinking', 'Adaptability', 'Communication skills'],
    weaknesses: ['Restlessness', 'difficulty with commitment', 'Inconsistency'],
    thinking: ['Processes information quickly.', 'Learns by doing and testing.', 'Prefers freedom and new experiences.'],
    career: ['Sales', 'Communication', 'Media', 'Travel', 'Consulting'],
    money: ['Makes money through change and momentum', 'May spend quickly on experiences', 'Needs a routine to stabilize income'],
    love: ['Playful and engaging', 'Attracts variety and excitement', 'Needs intellectual stimulation and emotional honesty'],
    family: ['Social and adaptable', 'Brings energy to the household', 'May avoid repetitive obligations'],
    emotional: ['Highly adaptable but can feel unsettled by emotional stagnation', 'Needs freedom to stay balanced', 'Can struggle with emotional routines'],
    growth: ['Create grounding rituals and disciplined habits.', 'Choose commitment without losing flexibility.']
  },
  {
    number: 6,
    planet: 'Venus',
    traditionalTheme: 'Love, beauty and relationships',
    corePersonality: ['Warm, loving and responsible.', 'Has a natural instinct to nurture, balance and beautify life.', 'Desires harmony and meaningful connection.'],
    naturalStrengths: ['Empathy', 'Responsibility', 'Aesthetic sense'],
    weaknesses: ['Over-giving', 'People-pleasing', 'Difficulty saying no'],
    thinking: ['Values fairness and emotional peace.', 'Weighs the impact on others.', 'Prefers practical loving support over dramatic gestures.'],
    career: ['Relationships', 'Care industries', 'Design', 'Hospitality', 'Family services'],
    money: ['Enjoys comfort and quality', 'Values stability over excess', 'Can overextend in service to others'],
    love: ['Loyal and devoted', 'Looks for emotional harmony', 'May need to avoid idealizing partners'],
    family: ['Natural caregiver', 'Strong emotional bond with home', 'May take ownership of everyone’s needs'],
    emotional: ['Deeply attuned to love and harmony', 'Feels burdened by unresolved conflict', 'Needs balance between giving and receiving'],
    growth: ['Protect your energy with healthy boundaries.', 'Balance care with self-respect and self-prioritization.']
  },
  {
    number: 7,
    planet: 'Ketu',
    traditionalTheme: 'Spirituality and introspection',
    corePersonality: ['Thoughtful, introspective and spiritually inclined.', 'Values truth, depth and inner understanding.', 'Often carries mature wisdom beyond the surface.'],
    naturalStrengths: ['Insight', 'Analytical depth', 'Spiritual awareness'],
    weaknesses: ['Isolation', 'Suspicion', 'Difficulty trusting quickly'],
    thinking: ['Prefers depth over noise.', 'Looks for meaning beneath appearances.', 'Makes decisions after careful internal reflection.'],
    career: ['Research', 'Spiritual work', 'Analysis', 'Psychology', 'Strategy'],
    money: ['Values quality over excess', 'Can be cautious with spending', 'Money is often tied to long-term security'],
    love: ['Seeks depth and authenticity', 'Can be private and slow to trust', 'Needs meaningful emotional depth'],
    family: ['Quietly protective', 'Values honest family bonds', 'May retreat when emotionally pressured'],
    emotional: ['Sensitive and observant', 'Needs solitude to recharge', 'May internalize feelings deeply'],
    growth: ['Learn to express hidden wisdom openly.', 'Balance introspection with connection and trust.']
  },
  {
    number: 8,
    planet: 'Saturn',
    traditionalTheme: 'Discipline and responsibility',
    corePersonality: ['Strong, disciplined and ambitious.', 'Carries the capacity to build lasting structures and long-term success.', 'Often learns through responsibility and maturity.'],
    naturalStrengths: ['Leadership by example', 'Long-term planning', 'Resilience'],
    weaknesses: ['Rigidity', 'Control patterns', 'Workaholism'],
    thinking: ['Sees structure, systems and results.', 'Prefers strategic decisions and measurable outcomes.', 'Values practical mastery.'],
    career: ['Management', 'Finance', 'Administration', 'Law', 'Real estate'],
    money: ['Strong earning potential', 'Values stability and authority', 'Can be overly focused on security and control'],
    love: ['Deeply loyal', 'Prefers dependable emotional bonds', 'Needs patience and calm communication'],
    family: ['Responsible and protective', 'Strong role model energy', 'May struggle with emotional expression'],
    emotional: ['Often controlled and serious', 'Feels deeply but expresses it quietly', 'Needs room to relax and soften'],
    growth: ['Allow more flexibility and emotional openness.', 'Build trust rather than relying only on control.']
  },
  {
    number: 9,
    planet: 'Mars',
    traditionalTheme: 'Courage and determination',
    corePersonality: ['Bold, spirited and purposeful.', 'Carries drive, courage and a strong sense of mission.', 'Moves forward with conviction and resilience.'],
    naturalStrengths: ['Courage', 'Confidence', 'Action-oriented leadership'],
    weaknesses: ['Impatience', 'Aggression', 'Difficulty with delay'],
    thinking: ['Prefers decisive action.', 'Pushes toward meaningful goals.', 'Values directness and momentum.'],
    career: ['Defense', 'Entrepreneurship', 'Leadership', 'Operations', 'Sales'],
    money: ['Ambitious earning power', 'Can spend on momentum or status', 'Needs discipline to avoid impulsive moves'],
    love: ['Passionate and intense', 'Desires loyalty and fire', 'May need to regulate intensity'],
    family: ['Protective and warrior-like', 'Strong sense of duty', 'Can become forceful in conflict'],
    emotional: ['Intense and direct', 'Needs expression to avoid buildup', 'Can feel wounded by lack of recognition'],
    growth: ['Channel energy into strategic action.', 'Practice gentleness and patience for sustainable success.']
  }
];

export const bhagyankInterpretations: BhagyankNumberMeta[] = [
  {
    number: 1,
    lifeDirection: 'Independent leadership and self-discovery',
    majorLifeThemes: ['Taking initiative', 'Singular vision', 'Personal authority'],
    career: ['Founders', 'Consultants', 'Creative leaders', 'Independent specialists'],
    financial: ['Income grows through self-trust and decisive action', 'Needs financial planning to avoid impulsive decisions'],
    relationships: ['Loyal but needs autonomy', 'Partnering works best with mutual respect'],
    personalDevelopment: ['Own your path without abandoning teamwork', 'Develop patience with others'],
    obstacles: ['Overconfidence', 'Isolation', 'Difficulty accepting help'],
    lessons: ['Lead by example', 'Balance individuality with cooperation'],
    recommendations: ['Choose work that reflects your values', 'Invest in confidence-building habits']
  },
  {
    number: 2,
    lifeDirection: 'Partnership, emotional intelligence and compassion',
    majorLifeThemes: ['Harmony', 'Sensitivity', 'Cooperation'],
    career: ['Supportive leadership', 'Care-focused roles', 'Relationship based work', 'Team coordination'],
    financial: ['Financial growth often appears through helpful connections', 'Needs balance between security and emotional spending'],
    relationships: ['Warm and relational', 'Strong capacity for diplomacy'],
    personalDevelopment: ['Protect energy and boundaries', 'Trust your intuition without losing direction'],
    obstacles: ['Overreliance on others', 'Emotional overwhelm', 'Avoidance of confrontation'],
    lessons: ['Healthy boundaries create more harmony', 'Balance giving and receiving'],
    recommendations: ['Build stable routines and communication habits', 'Invest in emotional resilience']
  },
  {
    number: 3,
    lifeDirection: 'Expression, creativity and expansion',
    majorLifeThemes: ['Inspiration', 'Learning', 'Social influence'],
    career: ['Media', 'Education', 'Marketing', 'Public communication', 'Design'],
    financial: ['Income may fluctuate with opportunities', 'Growth comes through creative work and communication'],
    relationships: ['Warm, playful and expressive', 'Needs stimulating and respectful communication'],
    personalDevelopment: ['Refine focus and follow-through', 'Use optimism strategically'],
    obstacles: ['Scattered efforts', 'Overpromising', 'Need for attention'],
    lessons: ['Pair brilliance with discipline', 'Turn inspiration into systems'],
    recommendations: ['Take creative work seriously', 'Build a stable routine behind the creative flow']
  },
  {
    number: 4,
    lifeDirection: 'Structure, resilience and practical mastery',
    majorLifeThemes: ['Discipline', 'Consistency', 'Progress through effort'],
    career: ['Operations', 'Planning', 'Infrastructure', 'Technology', 'Engineering'],
    financial: ['Builds wealth through steady effort', 'Security matters deeply'],
    relationships: ['Loyal and grounded', 'Values trust and responsibility'],
    personalDevelopment: ['Let go of rigidity', 'Accept adaptability without losing standards'],
    obstacles: ['Stubbornness', 'Work overload', 'Resistance to change'],
    lessons: ['Structures become stronger when they are flexible', 'Power grows with calm consistency'],
    recommendations: ['Invest in sustainable habits', 'Balance effort with rest']
  },
  {
    number: 5,
    lifeDirection: 'Movement, change and freedom of expression',
    majorLifeThemes: ['Adaptability', 'Curiosity', 'Variety'],
    career: ['Sales', 'Travel', 'Media', 'Consulting', 'Innovation'],
    financial: ['Cash flow often improves through movement and opportunity', 'Needs discipline to avoid scattered spending'],
    relationships: ['Energetic and engaging', 'Thrives with mutual freedom and honesty'],
    personalDevelopment: ['Create stability without stifling freedom', 'Develop patience'],
    obstacles: ['Restlessness', 'Uncertainty', 'Avoiding routine'],
    lessons: ['Freedom is strongest when anchored', 'Variety becomes wisdom when balanced'],
    recommendations: ['Design a rhythm that supports growth', 'Choose career paths that stimulate learning']
  },
  {
    number: 6,
    lifeDirection: 'Care, responsibility and relationship-centered purpose',
    majorLifeThemes: ['Service', 'Harmony', 'Belonging'],
    career: ['Counselling', 'Hospitality', 'Design', 'Care industries', 'Family services'],
    financial: ['Career and money often deepen through service and responsibility', 'Needs healthy boundaries to sustain energy'],
    relationships: ['Warm and devoted', 'Seeks harmony and shared meaning'],
    personalDevelopment: ['Avoid sacrificing self for everyone else', 'Honor your own needs'],
    obstacles: ['Over-giving', 'Guilt', 'Difficulty refusing demands'],
    lessons: ['Service is strongest when self-respect remains intact', 'Love grows through balance'],
    recommendations: ['Build emotional and financial security', 'Create rituals of care for yourself too']
  },
  {
    number: 7,
    lifeDirection: 'Inner wisdom and spiritual depth',
    majorLifeThemes: ['Truth', 'Insight', 'Inner mastery'],
    career: ['Research', 'Spiritual guidance', 'Psychology', 'Strategy', 'Analysis'],
    financial: ['Wealth can deepen through knowledge and focused effort', 'Avoid overthinking financial decisions'],
    relationships: ['Private but profound', 'Craves emotional honesty and depth'],
    personalDevelopment: ['Trust guidance without withdrawing too far', 'Communicate inner insight clearly'],
    obstacles: ['Isolation', 'Intellectual over-analysis', 'Suspicion of others'],
    lessons: ['Depth is most useful when shared wisely', 'Inner truth must become action'],
    recommendations: ['Invest in work aligned with meaning', 'Open up gradually to trusted people']
  },
  {
    number: 8,
    lifeDirection: 'Authority, accountability and long-term power',
    majorLifeThemes: ['Achievement', 'Structure', 'Legacy'],
    career: ['Leadership', 'Finance', 'Management', 'Operations', 'Business'],
    financial: ['Strong financial potential through disciplined work', 'Rewards competence and persistence'],
    relationships: ['Loyal and serious', 'Strength comes through steady commitment'],
    personalDevelopment: ['Develop emotional softness', 'Let power become generosity rather than control'],
    obstacles: ['Control issues', 'Pressure', 'Rigid expectations'],
    lessons: ['Authority is strongest when paired with humility', 'Long-term growth is built with patience'],
    recommendations: ['Continue building strategic skills', 'Cultivate relational depth alongside ambition']
  },
  {
    number: 9,
    lifeDirection: 'Purpose, courage and service through experience',
    majorLifeThemes: ['Determination', 'Charisma', 'Purposeful action'],
    career: ['Leadership', 'Defense', 'Sales', 'Entrepreneurship', 'Mission-driven work'],
    financial: ['Can achieve substantial success through bold action', 'Needs restraint to avoid impulsive expansion'],
    relationships: ['Passionate and protective', 'Values honesty and intensity'],
    personalDevelopment: ['Balance courage with patience', 'Channel intensity into strategic outcomes'],
    obstacles: ['Impatience', 'Conflict', 'Need for control'],
    lessons: ['Purpose grows strongest when paired with wisdom', 'Action must be intentional'],
    recommendations: ['Choose work that matters to you', 'Refine your timing and temper']
  }
];

export const getLuckyAssociations = (number: ReducedNumber) => {
  const lookup: Record<ReducedNumber, { planet: string; numbers: number[]; colors: string[]; weekdays: string[]; gemstones: string[] }> = {
    1: { planet: 'Sun', numbers: [1, 4, 7], colors: ['Gold', 'Yellow', 'Orange'], weekdays: ['Sunday'], gemstones: ['Ruby'] },
    2: { planet: 'Moon', numbers: [2, 7, 9], colors: ['Silver', 'Pearl white', 'Soft blue'], weekdays: ['Monday'], gemstones: ['Pearl'] },
    3: { planet: 'Jupiter', numbers: [3, 6, 9], colors: ['Royal blue', 'Saffron', 'Turquoise'], weekdays: ['Thursday'], gemstones: ['Yellow Sapphire'] },
    4: { planet: 'Rahu', numbers: [4, 1, 8], colors: ['Black', 'Dark grey', 'Metallic silver'], weekdays: ['Saturday'], gemstones: ['Hessonite'] },
    5: { planet: 'Mercury', numbers: [5, 3, 6], colors: ['Green', 'Light blue', 'Teal'], weekdays: ['Wednesday'], gemstones: ['Emerald'] },
    6: { planet: 'Venus', numbers: [6, 2, 9], colors: ['Pink', 'White', 'Cream'], weekdays: ['Friday'], gemstones: ['Diamond'] },
    7: { planet: 'Ketu', numbers: [7, 1, 4], colors: ['Violet', 'Purple', 'Indigo'], weekdays: ['Tuesday'], gemstones: ['Cat’s Eye'] },
    8: { planet: 'Saturn', numbers: [8, 4, 1], colors: ['Charcoal', 'Black', 'Deep blue'], weekdays: ['Saturday'], gemstones: ['Blue Sapphire'] },
    9: { planet: 'Mars', numbers: [9, 3, 6], colors: ['Red', 'Scarlet', 'Maroon'], weekdays: ['Tuesday'], gemstones: ['Coral'] }
  };

  return lookup[number];
};

export const getCombinedNumerologyAnalysis = (mulank: ReducedNumber, bhagyank: ReducedNumber) => {
  const mulankMeta = mulankInterpretations[mulank - 1];
  const bhagyankMeta = bhagyankInterpretations[bhagyank - 1];

  const harmony =
    mulank === bhagyank
      ? 'Harmonious and aligned'
      : (mulank + bhagyank) % 2 === 0
        ? 'Stable and complementary'
        : 'Dynamic and evolving';

  const strengths = [
    `${mulankMeta.traditionalTheme} gives a strong individual base.`,
    `${bhagyankMeta.lifeDirection} adds a clear directional theme.`
  ];

  const conflicts = [
    `The natural urge of Mulank ${mulank} may sometimes pull attention away from the wider life direction of Bhagyank ${bhagyank}.`,
    'The key is to balance instinctive action with long-term planning.'
  ];

  const career = [
    `Mulank ${mulank} supports ${mulankMeta.career[0].toLowerCase()}, while Bhagyank ${bhagyank} favours ${bhagyankMeta.career[0].toLowerCase()}.`,
    'This combination suggests work that is both personally meaningful and strategically useful.'
  ];

  const finances = [
    `Financial behaviour is shaped by ${mulankMeta.money[0].toLowerCase()} and the larger life path emphasis of ${bhagyankMeta.financial[0].toLowerCase()}.`,
    'A balanced system of planning and intuition works best.'
  ];

  const relationships = [
    `The personality style of Mulank ${mulank} interacts well with the relationship themes of Bhagyank ${bhagyank}.`,
    'Communication, emotional timing and mutual respect are the key strengths.'
  ];

  const growth = [
    `Develop consistency between your personal instinct and your long-term life mission.`,
    'Choose habits that align your inner rhythm with your outer direction.'
  ];

  return {
    harmony,
    strengths,
    conflicts,
    career,
    finances,
    relationships,
    growth
  };
};

export const getCompatibilitySummary = (userDob: string, partnerDob: string) => {
  const userMulank = calculateMulank(getDayFromDob(userDob));
  const userBhagyank = calculateBhagyank(userDob);
  const partnerMulank = calculateMulank(getDayFromDob(partnerDob));
  const partnerBhagyank = calculateBhagyank(partnerDob);

  if (!userMulank || !userBhagyank || !partnerMulank || !partnerBhagyank) {
    return {
      score: 0,
      summary: 'Both birth dates must be valid to generate a symbolic compatibility reading.',
      strengths: ['Enter valid dates to compare the relationship profile.'],
      challenges: ['Compatibility requires both birth dates to be valid.']
    };
  }

  const score = Math.max(35, Math.min(92, 50 + ((userMulank + userBhagyank + partnerMulank + partnerBhagyank) % 22)));

  const summary =
    Math.abs(userMulank - partnerMulank) <= 2 && Math.abs(userBhagyank - partnerBhagyank) <= 2
      ? 'This pairing suggests natural mutual understanding, balanced emotional flow and complementary life direction.'
      : 'This pairing suggests a strong learning dynamic where each person can help the other evolve through patience and communication.';

  const strengths = [
    'Balanced emotional communication can become a key strength.',
    'Shared respect for personal growth supports resilience.'
  ];

  const challenges = [
    'Different instinctive styles may require patience.',
    'Clear communication prevents confusion or emotional misalignment.'
  ];

  return { score, summary, strengths, challenges };
};
