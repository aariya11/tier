export interface PlayerGear {
  mouse: string;
  keyboard: string;
  headset: string;
  dpi: number;
  sens: number;
}

export interface PlayerSocials {
  x?: string;
  instagram?: string;
  twitch?: string;
  youtube?: string;
  discord?: string;
}

export interface PlayerAchievement {
  year: string;
  title: string;
  event: string;
  place: string;
  mvp?: boolean;
}

export interface Player {
  id: string;
  slug: string;
  number: string;
  gamerTag: string;
  realName: string;
  role: string;
  country: string;
  flag: string;
  mainGame: string;
  secondaryGame?: string;
  team: string;
  age: number;
  winRate: number;
  wins: number;
  losses: number;
  kd: number;
  tournamentsWon: number;
  mvpAwards: number;
  totalPoints: number;
  portraitUrl: string;
  coverUrl: string;
  signatureTrollMove: string;
  bio: string;
  gear: PlayerGear;
  socials: PlayerSocials;
  achievements: PlayerAchievement[];
  quote: string;
  isFeatured: boolean;
}

export interface Achievement {
  id: string;
  year: string;
  tournament: string;
  result: string;
  player: string;
  prize: string;
  tier: 'GLOBAL S-TIER' | 'MAJOR INVITATIONAL' | 'REGIONAL CROWN' | 'WORLDS';
  highlight: string;
}

export interface Trophy {
  id: string;
  title: string;
  year: string;
  league: string;
  location: string;
  image: string;
  description: string;
  edition: string;
}

export interface ChatReaction {
  user: string;
  msg: string;
  time: string;
  isMod?: boolean;
}

export interface TrollMoment {
  id: string;
  title: string;
  subtitle: string;
  player: string;
  playerRole: string;
  match: string;
  game: string;
  date: string;
  duration: string;
  description: string;
  views: string;
  clutchHp: string;
  thumbnailUrl: string;
  videoMockType: 'clutch_knife' | 'smoke_ninja' | 'c4_disarm' | 'fake_dc' | 'rage_bait';
  soundEffect: string;
  chatReactions: ChatReaction[];
}

export interface Match {
  id: string;
  status: 'UPCOMING' | 'COMPLETED' | 'LIVE';
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  game: string;
  tournament: string;
  dateTime: string;
  stage: string;
  streamUrl: string;
  mvp?: string;
  resultSummary?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  excerpt: string;
  content: string[];
  pullQuote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  caption: string;
  aspectRatio: 'tall' | 'wide' | 'square';
}

export interface OverallStats {
  tournamentsWon: number;
  championships: number;
  winRate: number;
  matchesPlayed: number;
  oneHpClutches: number;
  prizeMoney: string;
}
