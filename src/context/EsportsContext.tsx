import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Player,
  Achievement,
  Trophy,
  TrollMoment,
  Match,
  Article,
  GalleryItem,
  OverallStats,
} from '../types';
import {
  initialPlayers,
  initialAchievements,
  initialTrophies,
  initialTrollMoments,
  initialMatches,
  initialArticles,
  initialGallery,
  initialStats,
} from '../data/initialData';

interface EsportsContextType {
  players: Player[];
  achievements: Achievement[];
  trophies: Trophy[];
  trollMoments: TrollMoment[];
  matches: Match[];
  articles: Article[];
  gallery: GalleryItem[];
  stats: OverallStats;

  selectedGameFilter: string;
  setSelectedGameFilter: (filter: string) => void;

  selectedPlayer: Player | null;
  openPlayerModal: (player: Player) => void;
  closePlayerModal: () => void;

  selectedArticle: Article | null;
  openArticleModal: (article: Article) => void;
  closeArticleModal: () => void;

  selectedTroll: TrollMoment | null;
  openTrollModal: (troll: TrollMoment) => void;
  closeTrollModal: () => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  isFullscreenMenuOpen: boolean;
  setIsFullscreenMenuOpen: (open: boolean) => void;

  cursorLabel: string;
  setCursorLabel: (label: string) => void;

  // CRUD Actions for Admin
  addPlayer: (player: Player) => void;
  updatePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;

  addMatch: (match: Match) => void;
  updateMatch: (match: Match) => void;
  deleteMatch: (id: string) => void;

  addTrollMoment: (moment: TrollMoment) => void;
  updateTrollMoment: (moment: TrollMoment) => void;
  deleteTrollMoment: (id: string) => void;

  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;

  resetAllData: () => void;
}

const EsportsContext = createContext<EsportsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PLAYERS: 'vandal_players_v3',
  ACHIEVEMENTS: 'vandal_achievements_v3',
  TROPHIES: 'vandal_trophies_v3',
  TROLLS: 'vandal_trolls_v3',
  MATCHES: 'vandal_matches_v3',
  ARTICLES: 'vandal_articles_v3',
  GALLERY: 'vandal_gallery_v3',
  STATS: 'vandal_stats_v3',
};

export const EsportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLAYERS);
    return saved ? JSON.parse(saved) : initialPlayers;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [trophies, setTrophies] = useState<Trophy[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TROPHIES);
    return saved ? JSON.parse(saved) : initialTrophies;
  });

  const [trollMoments, setTrollMoments] = useState<TrollMoment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TROLLS);
    return saved ? JSON.parse(saved) : initialTrollMoments;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATCHES);
    return saved ? JSON.parse(saved) : initialMatches;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [stats, setStats] = useState<OverallStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : initialStats;
  });

  // UI state
  const [selectedGameFilter, setSelectedGameFilter] = useState<string>('ALL GAMES');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTroll, setSelectedTroll] = useState<TrollMoment | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState<boolean>(false);
  const [cursorLabel, setCursorLabel] = useState<string>('');

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TROPHIES, JSON.stringify(trophies));
  }, [trophies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TROLLS, JSON.stringify(trollMoments));
  }, [trollMoments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  // Handle URL hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#player/')) {
        const slug = hash.replace('#player/', '');
        const found = players.find((p) => p.slug === slug || p.gamerTag.toLowerCase() === slug.toLowerCase());
        if (found) setSelectedPlayer(found);
      } else if (hash.startsWith('#article/')) {
        const slug = hash.replace('#article/', '');
        const found = articles.find((a) => a.slug === slug);
        if (found) setSelectedArticle(found);
      } else if (hash.startsWith('#troll/')) {
        const id = hash.replace('#troll/', '');
        const found = trollMoments.find((t) => t.id === id);
        if (found) setSelectedTroll(found);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [players, articles, trollMoments]);

  const openPlayerModal = (player: Player) => {
    setSelectedPlayer(player);
    window.location.hash = `player/${player.slug}`;
  };

  const closePlayerModal = () => {
    setSelectedPlayer(null);
    if (window.location.hash.startsWith('#player/')) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const openArticleModal = (article: Article) => {
    setSelectedArticle(article);
    window.location.hash = `article/${article.slug}`;
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
    if (window.location.hash.startsWith('#article/')) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const openTrollModal = (troll: TrollMoment) => {
    setSelectedTroll(troll);
    window.location.hash = `troll/${troll.id}`;
  };

  const closeTrollModal = () => {
    setSelectedTroll(null);
    if (window.location.hash.startsWith('#troll/')) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  // CRUD handlers
  const addPlayer = (player: Player) => {
    setPlayers((prev) => [player, ...prev]);
  };

  const updatePlayer = (updated: Player) => {
    setPlayers((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedPlayer && selectedPlayer.id === updated.id) {
      setSelectedPlayer(updated);
    }
  };

  const deletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    if (selectedPlayer && selectedPlayer.id === id) {
      closePlayerModal();
    }
  };

  const addMatch = (match: Match) => {
    setMatches((prev) => [match, ...prev]);
  };

  const updateMatch = (updated: Match) => {
    setMatches((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const deleteMatch = (id: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  const addTrollMoment = (moment: TrollMoment) => {
    setTrollMoments((prev) => [moment, ...prev]);
  };

  const updateTrollMoment = (updated: TrollMoment) => {
    setTrollMoments((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTrollMoment = (id: string) => {
    setTrollMoments((prev) => prev.filter((t) => t.id !== id));
  };

  const addArticle = (article: Article) => {
    setArticles((prev) => [article, ...prev]);
  };

  const updateArticle = (updated: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const resetAllData = () => {
    setPlayers(initialPlayers);
    setAchievements(initialAchievements);
    setTrophies(initialTrophies);
    setTrollMoments(initialTrollMoments);
    setMatches(initialMatches);
    setArticles(initialArticles);
    setGallery(initialGallery);
    setStats(initialStats);
    localStorage.clear();
  };

  return (
    <EsportsContext.Provider
      value={{
        players,
        achievements,
        trophies,
        trollMoments,
        matches,
        articles,
        gallery,
        stats,
        selectedGameFilter,
        setSelectedGameFilter,
        selectedPlayer,
        openPlayerModal,
        closePlayerModal,
        selectedArticle,
        openArticleModal,
        closeArticleModal,
        selectedTroll,
        openTrollModal,
        closeTrollModal,
        isAdminOpen,
        setIsAdminOpen,
        isFullscreenMenuOpen,
        setIsFullscreenMenuOpen,
        cursorLabel,
        setCursorLabel,
        addPlayer,
        updatePlayer,
        deletePlayer,
        addMatch,
        updateMatch,
        deleteMatch,
        addTrollMoment,
        updateTrollMoment,
        deleteTrollMoment,
        addArticle,
        updateArticle,
        deleteArticle,
        resetAllData,
      }}
    >
      {children}
    </EsportsContext.Provider>
  );
};

export const useEsports = () => {
  const context = useContext(EsportsContext);
  if (!context) {
    throw new Error('useEsports must be used within an EsportsProvider');
  }
  return context;
};
