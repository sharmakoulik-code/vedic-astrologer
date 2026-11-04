import type { BirthChart, PlanetName, SignName } from '../utils/chart';

const SIGNS: SignName[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

export const SIGN_INTERPRETATIONS: Record<SignName, { lagna: string; moon: string }> = {
  Aries: {
    lagna: 'An Aries Lagna is traditionally associated with initiative and direct engagement; patience may help balance its forward momentum.',
    moon: 'An Aries Moon is often linked with quick emotional responses and a preference for acting on feelings; a pause may help clarify what matters.',
  },
  Taurus: {
    lagna: 'A Taurus Lagna is traditionally associated with steadiness and practical priorities; flexibility may help when circumstances shift.',
    moon: 'A Taurus Moon is often linked with a need for emotional steadiness and familiar comforts; some people find consistency grounding.',
  },
  Gemini: {
    lagna: 'A Gemini Lagna is traditionally associated with curiosity and adaptability; choosing where to focus attention may be useful.',
    moon: 'A Gemini Moon is often linked with processing feelings through words, questions, or varied perspectives.',
  },
  Cancer: {
    lagna: 'A Cancer Lagna is traditionally associated with sensitivity to surroundings and care for personal foundations; clear boundaries may be supportive.',
    moon: 'A Cancer Moon is often linked with emotional responsiveness and attachment to familiar sources of care and belonging.',
  },
  Leo: {
    lagna: 'A Leo Lagna is traditionally associated with expressive presence and creative direction; sharing recognition may support collaboration.',
    moon: 'A Leo Moon is often linked with a warm, expressive emotional style and a wish to feel appreciated.',
  },
  Virgo: {
    lagna: 'A Virgo Lagna is traditionally associated with observation and practical refinement; allowing room for imperfection may ease self-review.',
    moon: 'A Virgo Moon is often linked with sorting feelings through analysis and practical steps; rest from over-editing may be helpful.',
  },
  Libra: {
    lagna: 'A Libra Lagna is traditionally associated with balance and consideration of different viewpoints; direct choices can complement deliberation.',
    moon: 'A Libra Moon is often linked with seeking harmony and thoughtful exchange in close relationships.',
  },
  Scorpio: {
    lagna: 'A Scorpio Lagna is traditionally associated with focus and interest in what lies beneath the surface; measured openness may build trust.',
    moon: 'A Scorpio Moon is often linked with emotional depth and privacy; safe, gradual expression may be useful.',
  },
  Sagittarius: {
    lagna: 'A Sagittarius Lagna is traditionally associated with exploration and broad perspective; checking details may help translate ideas into plans.',
    moon: 'A Sagittarius Moon is often linked with seeking meaning and room to explore when processing emotions.',
  },
  Capricorn: {
    lagna: 'A Capricorn Lagna is traditionally associated with structure and long-range effort; making space for flexibility may help sustain progress.',
    moon: 'A Capricorn Moon is often linked with a measured emotional style and comfort in clear responsibilities or routines.',
  },
  Aquarius: {
    lagna: 'An Aquarius Lagna is traditionally associated with independent ideas and wider social concerns; practical collaboration may help ground them.',
    moon: 'An Aquarius Moon is often linked with observing feelings from a wider perspective and valuing room for individuality.',
  },
  Pisces: {
    lagna: 'A Pisces Lagna is traditionally associated with imagination and receptivity; practical boundaries may help protect time and attention.',
    moon: 'A Pisces Moon is often linked with empathy and a vivid inner life; grounding routines may help create balance.',
  },
};

export const HOUSE_INTERPRETATIONS: Record<number, { name: string; theme: string }> = {
  1: { name: 'self', theme: 'identity, approach, and how a person meets new situations' },
  2: { name: 'resources and speech', theme: 'resources, values, and communication through speech' },
  3: { name: 'effort and communication', theme: 'initiative, practice, and everyday communication' },
  4: { name: 'home', theme: 'home, roots, and a sense of inner grounding' },
  5: { name: 'creativity and romance', theme: 'creative expression, learning, and romance' },
  6: { name: 'routine, work, and health habits', theme: 'daily routines, service, work, and health habits' },
  7: { name: 'partnership', theme: 'partnerships, agreements, and one-to-one exchange' },
  8: { name: 'change', theme: 'change, shared matters, and processes of renewal' },
  9: { name: 'learning and fortune', theme: 'learning, broader outlook, and traditional ideas of fortune' },
  10: { name: 'career', theme: 'work, public roles, and long-term responsibilities' },
  11: { name: 'gains and networks', theme: 'gains, aspirations, and wider networks' },
  12: { name: 'rest, seclusion, and foreign matters', theme: 'rest, seclusion, expenses, and foreign matters' },
};

export const PLANET_INTERPRETATIONS: Record<PlanetName, {
  occupant: string;
  dasha: string;
  action: string;
  day: string;
  colors: string[];
  numbers: number[];
}> = {
  Sun: {
    occupant: 'The Sun is traditionally associated with visibility, purpose, and authority.',
    dasha: 'A Sun period is traditionally associated with questions of purpose, responsibility, and visibility.',
    action: 'The Sun’s traditional themes may invite reflection on purpose, responsibility, and how to share leadership.',
    day: 'Sunday', colors: ['gold', 'saffron'], numbers: [1, 4],
  },
  Moon: {
    occupant: 'The Moon is traditionally associated with feelings, care, and changing rhythms.',
    dasha: 'A Moon period is traditionally associated with care, emotional rhythms, and home themes.',
    action: 'The Moon’s traditional themes may invite attention to care, emotional rhythms, and restorative routines.',
    day: 'Monday', colors: ['white', 'silver'], numbers: [2, 7],
  },
  Mars: {
    occupant: 'Mars is traditionally associated with initiative, effort, and assertive energy.',
    dasha: 'A Mars period is traditionally associated with initiative, effort, and how energy is directed.',
    action: 'Mars’s traditional themes may invite deliberate action and thoughtful ways to channel effort.',
    day: 'Tuesday', colors: ['red', 'coral'], numbers: [9],
  },
  Mercury: {
    occupant: 'Mercury is traditionally associated with learning, analysis, and exchange of ideas.',
    dasha: 'A Mercury period is traditionally associated with learning, communication, and practical decisions.',
    action: 'Mercury’s traditional themes may invite clear communication, curiosity, and careful review of details.',
    day: 'Wednesday', colors: ['green', 'mixed tones'], numbers: [5],
  },
  Jupiter: {
    occupant: 'Jupiter is traditionally associated with learning, counsel, and expanding perspective.',
    dasha: 'A Jupiter period is traditionally associated with learning, counsel, and broader perspective.',
    action: 'Jupiter’s traditional themes may invite study, thoughtful counsel, and generosity with perspective.',
    day: 'Thursday', colors: ['yellow', 'ochre'], numbers: [3],
  },
  Venus: {
    occupant: 'Venus is traditionally associated with connection, aesthetics, and shared values.',
    dasha: 'A Venus period is traditionally associated with relationships, aesthetics, and shared values.',
    action: 'Venus’s traditional themes may invite care for relationships, beauty, and balanced exchange.',
    day: 'Friday', colors: ['white', 'pink'], numbers: [6],
  },
  Saturn: {
    occupant: 'Saturn is traditionally associated with patience, structure, and sustained responsibility.',
    dasha: 'A Saturn period is traditionally associated with patience, structure, and sustained effort.',
    action: 'Saturn’s traditional themes may invite steady routines, realistic limits, and long-range effort.',
    day: 'Saturday', colors: ['navy', 'charcoal'], numbers: [8],
  },
  Rahu: {
    occupant: 'Rahu is traditionally associated with ambition, unfamiliar territory, and strong appetite for experience.',
    dasha: 'A Rahu period is traditionally associated with ambition, unfamiliar territory, and discernment.',
    action: 'Rahu’s traditional themes may invite curiosity about new directions alongside careful discernment.',
    day: 'Saturday', colors: ['smoky gray', 'dark blue'], numbers: [4],
  },
  Ketu: {
    occupant: 'Ketu is traditionally associated with release, inward focus, and simplifying attachments.',
    dasha: 'A Ketu period is traditionally associated with reflection, release, and inward focus.',
    action: 'Ketu’s traditional themes may invite reflection on what can be simplified or released.',
    day: 'Tuesday', colors: ['saffron', 'smoky gray'], numbers: [7],
  },
};

export const SIGN_RULERS: Record<SignName, PlanetName> = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Mars',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',
  Pisces: 'Jupiter',
};

export const getHouseAvailabilityNote = (chart: BirthChart): string | null => {
  if (chart.needsTimezone) return 'Add a timezone to show Lagna- and house-based themes.';
  if (!chart.exactTime) return 'Add a birth time, location, and timezone to show house-based themes.';
  if (!chart.hasLocation) return 'Add a birth location and timezone to show house-based themes.';
  return null;
};

const getHouseSign = (chart: BirthChart, house: number): SignName | null => {
  if (!chart.lagna) return null;
  const lagnaIndex = SIGNS.indexOf(chart.lagna as SignName);
  return SIGNS[(lagnaIndex + house - 1) % SIGNS.length];
};

const getOccupants = (chart: BirthChart, house: number): string => {
  const occupants = Object.values(chart.planets)
    .filter((planet) => planet.house === house)
    .map((planet) => `${planet.name}: ${PLANET_INTERPRETATIONS[planet.name].occupant}`);
  return occupants.length ? occupants.join(' ') : 'No listed planet occupies this house.';
};

const formatHouse = (chart: BirthChart, house: number): string => {
  const sign = getHouseSign(chart, house);
  const houseInfo = HOUSE_INTERPRETATIONS[house];
  if (!sign) return '';

  const ruler = SIGN_RULERS[sign];
  const rulerHouse = chart.planets[ruler].house;
  const rulerPlacement = rulerHouse
    ? `${ruler} rules ${sign} here and is placed in the ${rulerHouse}th house.`
    : `${ruler} rules ${sign} here; its house placement is not available.`;

  return `The ${house}th house (${houseInfo.name}) is in ${sign}, a sign traditionally associated with ${SIGN_INTERPRETATIONS[sign].lagna.toLowerCase().replace(/^an? [a-z]+ lagna is traditionally associated with /, '').replace(/;.*$/, '')}. This house covers ${houseInfo.theme}. ${rulerPlacement} ${getOccupants(chart, house)}`;
};

export const buildPersonalityInterpretation = (chart: BirthChart) => ({
  lagna: !getHouseAvailabilityNote(chart) && chart.lagna
    ? `Lagna in ${chart.lagna}: ${SIGN_INTERPRETATIONS[chart.lagna as SignName].lagna}`
    : null,
  moon: `Moon in ${chart.moonSign}: ${SIGN_INTERPRETATIONS[chart.moonSign].moon}`,
  nakshatra: `The Moon is in ${chart.moonNakshatra}, pada ${chart.moonPada}. In this tradition, the nakshatra is another symbolic lens for reflection rather than a fixed description.`,
});

export const buildCareerInterpretation = (chart: BirthChart) => {
  const note = getHouseAvailabilityNote(chart);
  if (note) return { available: false, note, career: null, finance: null };

  return {
    available: true,
    note: null,
    career: `${formatHouse(chart, 10)} These are traditional themes for reflection, not a prediction of a particular career outcome.`,
    finance: `${formatHouse(chart, 2)} ${formatHouse(chart, 11)} Financial interpretations are symbolic and are not financial advice.`,
  };
};

export const buildRelationshipInterpretation = (chart: BirthChart) => {
  const note = getHouseAvailabilityNote(chart);
  if (note) return { available: false, note, partnership: null, romance: null, healthHabits: null };

  return {
    available: true,
    note: null,
    partnership: formatHouse(chart, 7),
    romance: formatHouse(chart, 5),
    healthHabits: `${formatHouse(chart, 6)} This is a traditional reflection on routines and health habits, not medical guidance.`,
  };
};

export interface DashaPeriodText {
  lord: string;
  start: string;
  end: string;
}

const DASHA_ORDER: PlanetName[] = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS: Record<PlanetName, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};
const addDashaYears = (date: Date, years: number) => new Date(date.getTime() + years * 365.25 * 86400000);
const dateOnly = (date: Date) => date.toISOString().slice(0, 10);

export const buildFutureInterpretation = (chart: BirthChart, now = new Date()) => {
  const periods = chart.dasha.nextMahadasha;
  const currentIndex = periods.findIndex((period) => {
    const start = Date.parse(`${period.start}T00:00:00Z`);
    const end = Date.parse(`${period.end}T00:00:00Z`);
    return now.getTime() >= start && now.getTime() < end;
  });
  if (currentIndex < 0) {
    return { available: false, current: null, antardasha: null, next: [] as DashaPeriodText[] };
  }

  const current = periods[currentIndex];
  const mahaIndex = DASHA_ORDER.indexOf(current.lord as PlanetName);
  const antardasha = DASHA_ORDER.map((_, offset) => DASHA_ORDER[(mahaIndex + offset) % DASHA_ORDER.length]);
  let cursor = new Date(`${current.start}T00:00:00Z`);
  let currentAntardasha: DashaPeriodText | null = null;
  for (const lord of antardasha) {
    const end = addDashaYears(cursor, (current.years * DASHA_YEARS[lord]) / 120);
    if (chart.dasha.currentAntardasha === lord &&
      now.getTime() >= cursor.getTime() && now.getTime() < end.getTime()) {
      currentAntardasha = { lord, start: dateOnly(cursor), end: dateOnly(end) };
      break;
    }
    cursor = end;
  }

  return {
    available: true,
    current: { lord: current.lord, start: current.start, end: current.end },
    antardasha: currentAntardasha,
    next: periods.slice(currentIndex + 1, currentIndex + 3).map(({ lord, start, end }) => ({ lord, start, end })),
  };
};

export const buildSuccessInterpretation = (chart: BirthChart) => {
  const ruler = PLANET_INTERPRETATIONS[chart.dasha.currentMahadasha as PlanetName];
  const note = getHouseAvailabilityNote(chart);
  if (note) return `${note} ${ruler.dasha}`;
  return `${formatHouse(chart, 10)} ${ruler.dasha} These are traditional themes for reflection, not promises of success or recognition.`;
};

export const getLuckyAssociations = (chart: BirthChart) => {
  const ruler = SIGN_RULERS[chart.moonSign];
  return { ruler, ...PLANET_INTERPRETATIONS[ruler] };
};

export const buildActionPlanInterpretation = (chart: BirthChart) => {
  const mahaLord = PLANET_INTERPRETATIONS[chart.dasha.currentMahadasha as PlanetName];
  const lagnaRuler = !getHouseAvailabilityNote(chart) && chart.lagna
    ? SIGN_RULERS[chart.lagna as SignName]
    : null;
  const lagnaRulerCopy = lagnaRuler
    ? PLANET_INTERPRETATIONS[lagnaRuler].action
    : getHouseAvailabilityNote(chart);
  return {
    currentPeriod: mahaLord.action,
    lagnaRuler: lagnaRulerCopy,
    lagnaRulerName: lagnaRuler,
  };
};
