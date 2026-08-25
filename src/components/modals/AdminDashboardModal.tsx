import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, RotateCcw, Shield, Check, Users, Calendar, Flame, BookOpen } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';
import type { Player, Match } from '../../types';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    players,
    addPlayer,
    deletePlayer,
    matches,
    addMatch,
    deleteMatch,
    trollMoments,
    deleteTrollMoment,
    articles,
    deleteArticle,
    resetAllData,
  } = useEsports();
  const { playClick, playTick, playChime } = useSound();

  const [activeTab, setActiveTab] = useState<'players' | 'matches' | 'trolls' | 'articles'>('players');
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Form states for new player
  const [newTag, setNewTag] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('DUELIST & FRAGGER');
  const [newGame, setNewGame] = useState('VALORANT');
  const [newCountry, setNewCountry] = useState('Global');
  const [newFlag, setNewFlag] = useState('🌐');
  const [newPhoto, setNewPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85');
  const [newBio, setNewBio] = useState('');
  const [newQuote] = useState('Silence is the ultimate clutch weapon.');

  // Form state for new match
  const [newTeamA] = useState('VANDAL ARCHIVE');
  const [newTeamB, setNewTeamB] = useState('');
  const [newMatchGame, setNewMatchGame] = useState('VALORANT');
  const [newMatchTourney, setNewMatchTourney] = useState('CHAMPIONS WORLD TOUR 2026');

  if (!isAdminOpen) return null;

  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag || !newName) return;

    const num = `0${players.length + 1}`;
    const slug = newTag.toLowerCase().replace(/[^a-z0-9]/g, '');

    const created: Player = {
      id: `p-${Date.now()}`,
      slug,
      number: num,
      gamerTag: newTag.toUpperCase(),
      realName: newName,
      role: newRole,
      country: newCountry,
      flag: newFlag,
      mainGame: newGame,
      team: 'VANDAL ARCHIVE',
      age: 21,
      winRate: 88,
      wins: 120,
      losses: 16,
      kd: 2.2,
      tournamentsWon: 9,
      mvpAwards: 7,
      totalPoints: 8100,
      portraitUrl: newPhoto,
      coverUrl: newPhoto,
      signatureTrollMove: 'Tactical Psychological Disrespect',
      bio: newBio || 'An exceptional tactical operative disciplined in the art of the troll.',
      gear: {
        mouse: 'Ultralight Titanium (40g)',
        keyboard: 'Custom Magnetic Switch',
        headset: 'Studio IEMs',
        dpi: 800,
        sens: 0.3,
      },
      socials: { x: 'https://x.com', twitch: 'https://twitch.tv' },
      achievements: [
        { year: '2026', title: 'World Invitational Champion', event: 'Global Masters', place: '1st Place', mvp: true },
      ],
      quote: newQuote,
      isFeatured: true,
    };

    addPlayer(created);
    playChime();
    setShowAddPlayerForm(false);
    setNewTag('');
    setNewName('');
    setNewBio('');
    setSaveSuccessMsg('Operative added successfully to database!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamB) return;

    const created: Match = {
      id: `m-${Date.now()}`,
      status: 'UPCOMING',
      teamA: newTeamA,
      teamB: newTeamB.toUpperCase(),
      game: newMatchGame,
      tournament: newMatchTourney,
      dateTime: new Date(Date.now() + 86400000 * 3).toISOString(),
      stage: 'MAIN STAGE SHOWDOWN',
      streamUrl: 'https://twitch.tv',
    };

    addMatch(created);
    playChime();
    setNewTeamB('');
    setSaveSuccessMsg('Upcoming match added successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto flex items-start justify-center p-4 md:p-10"
        onClick={() => setIsAdminOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0F0F10] text-[#FAF7F0] border border-white/20 shadow-2xl overflow-hidden min-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-stone-900 border-b border-white/10 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs font-sans tracking-widest text-[#D4AF37] uppercase">
              <Shield className="w-4 h-4" />
              <span>VANDAL ARCHIVE // CONTENT MANAGEMENT SYSTEM</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (confirm('Reset all website roster, matches, and troll data to default factory specs?')) {
                    resetAllData();
                    playChime();
                    setSaveSuccessMsg('All records restored to factory defaults.');
                  }
                }}
                className="flex items-center space-x-1.5 px-3 py-1 text-[10px] font-sans tracking-widest uppercase border border-red-500/40 text-red-400 hover:bg-red-950/40 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>FACTORY RESET</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setIsAdminOpen(false);
                }}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-white/10 px-6 bg-stone-950 text-xs font-sans tracking-widest uppercase overflow-x-auto">
            <button
              onClick={() => setActiveTab('players')}
              className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'players'
                  ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>PLAYERS ({players.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'matches'
                  ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>MATCHES ({matches.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('trolls')}
              className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'trolls'
                  ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>TROLL VAULT ({trollMoments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'articles'
                  ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>JOURNAL ESSAYS ({articles.length})</span>
            </button>
          </div>

          {/* Success Banner */}
          {saveSuccessMsg && (
            <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-2.5 text-xs font-sans tracking-wider text-emerald-300 flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* Tab Content */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            {/* TAB 1: PLAYERS */}
            {activeTab === 'players' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-display text-2xl text-white font-bold">OPERATIVES ROSTER</h3>
                    <p className="text-xs font-sans text-stone-400">Manage pro players, photography, statistics, and hardware configurations.</p>
                  </div>

                  <button
                    onClick={() => setShowAddPlayerForm(!showAddPlayerForm)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#D4AF37] text-black font-sans font-semibold text-xs tracking-widest uppercase hover:bg-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD OPERATIVE</span>
                  </button>
                </div>

                {/* Add Player Form Drawer */}
                {showAddPlayerForm && (
                  <form onSubmit={handleCreatePlayer} className="bg-stone-900 border border-[#D4AF37]/40 p-6 space-y-4 text-xs font-sans">
                    <h4 className="font-display text-xl text-[#D4AF37] font-bold">NEW OPERATIVE DOSSIER</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-stone-400 mb-1">GAMER TAG</label>
                        <input
                          required
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="e.g. VALKYRIE"
                          className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 mb-1">REAL NAME</label>
                        <input
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="e.g. Sarah Connor"
                          className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 mb-1">ROLE</label>
                        <input
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 mb-1">MAIN GAME</label>
                        <input
                          value={newGame}
                          onChange={(e) => setNewGame(e.target.value)}
                          className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-stone-400 mb-1">COUNTRY</label>
                        <input
                          value={newCountry}
                          onChange={(e) => setNewCountry(e.target.value)}
                          className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 mb-1">FLAG EMOJI</label>
                        <input
                          value={newFlag}
                          onChange={(e) => setNewFlag(e.target.value)}
                          className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 mb-1">PHOTO URL (HIGH RES)</label>
                        <input
                          value={newPhoto}
                          onChange={(e) => setNewPhoto(e.target.value)}
                          className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">BIOGRAPHY</label>
                      <textarea
                        rows={2}
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        placeholder="Player lore, composure in overtime, psychological warfare style..."
                        className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddPlayerForm(false)}
                        className="px-4 py-2 border border-white/20 text-stone-400 hover:text-white"
                      >
                        CANCEL
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white"
                      >
                        CONFIRM ADD OPERATIVE
                      </button>
                    </div>
                  </form>
                )}

                {/* Players Table */}
                <div className="divide-y divide-white/10">
                  {players.map((player) => (
                    <div key={player.id} className="py-4 flex items-center justify-between text-xs font-sans">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-800 border border-white/20">
                          <img src={player.portraitUrl} alt={player.gamerTag} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-display text-lg font-bold text-white">
                            {player.number} • {player.gamerTag}
                          </div>
                          <div className="text-stone-400">
                            {player.realName} • {player.role} • {player.mainGame}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right hidden sm:block text-stone-400">
                          <div>{player.winRate}% WIN RATE</div>
                          <div>{player.tournamentsWon} TITLES</div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm(`Remove ${player.gamerTag} from roster?`)) {
                              deletePlayer(player.id);
                              playTick();
                            }
                          }}
                          className="p-2 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500 rounded-sm"
                          title="Delete player"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: MATCHES */}
            {activeTab === 'matches' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-display text-2xl text-white font-bold">MATCHES ARCHIVE</h3>
                    <p className="text-xs font-sans text-stone-400">Schedule upcoming fixtures and record tournament victories.</p>
                  </div>
                </div>

                {/* Add Match Form */}
                <form onSubmit={handleCreateMatch} className="bg-stone-900 border border-white/10 p-6 space-y-4 text-xs font-sans">
                  <h4 className="font-display text-xl text-[#D4AF37] font-bold">SCHEDULE UPCOMING FIXTURE</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-stone-400 mb-1">OPPONENT TEAM</label>
                      <input
                        required
                        value={newTeamB}
                        onChange={(e) => setNewTeamB(e.target.value)}
                        placeholder="e.g. CLOUD9 / PAPER REX"
                        className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">GAME DISCIPLINE</label>
                      <input
                        value={newMatchGame}
                        onChange={(e) => setNewMatchGame(e.target.value)}
                        className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">TOURNAMENT TITLE</label>
                      <input
                        value={newMatchTourney}
                        onChange={(e) => setNewMatchTourney(e.target.value)}
                        className="w-full bg-stone-950 border border-white/20 p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    ADD UPCOMING FIXTURE
                  </button>
                </form>

                {/* Match List */}
                <div className="divide-y divide-white/10">
                  {matches.map((match) => (
                    <div key={match.id} className="py-4 flex items-center justify-between text-xs font-sans">
                      <div>
                        <div className="font-display text-lg font-bold text-white">
                          {match.teamA} VS {match.teamB} {match.scoreA !== undefined ? `(${match.scoreA} — ${match.scoreB})` : ''}
                        </div>
                        <div className="text-stone-400">
                          {match.game} • {match.tournament} • {match.status}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Delete this match record?')) {
                            deleteMatch(match.id);
                            playTick();
                          }
                        }}
                        className="p-2 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500 rounded-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: TROLLS */}
            {activeTab === 'trolls' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl text-white font-bold">THE TROLL VAULT ARCHIVES</h3>
                  <p className="text-xs font-sans text-stone-400">Archived broadcast moments of psychological warfare and clutch performances.</p>
                </div>

                <div className="divide-y divide-white/10">
                  {trollMoments.map((moment) => (
                    <div key={moment.id} className="py-4 flex items-center justify-between text-xs font-sans">
                      <div>
                        <div className="font-display text-lg font-bold text-white">
                          {moment.title} ({moment.clutchHp})
                        </div>
                        <div className="text-stone-400">
                          {moment.player} • {moment.game} • {moment.views}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Delete this troll moment?')) {
                            deleteTrollMoment(moment.id);
                            playTick();
                          }
                        }}
                        className="p-2 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500 rounded-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: ARTICLES */}
            {activeTab === 'articles' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl text-white font-bold">JOURNAL ESSAYS & INTERVIEWS</h3>
                  <p className="text-xs font-sans text-stone-400">Editorial articles published in the quarterly VANDAL Journal.</p>
                </div>

                <div className="divide-y divide-white/10">
                  {articles.map((article) => (
                    <div key={article.id} className="py-4 flex items-center justify-between text-xs font-sans">
                      <div>
                        <div className="font-display text-lg font-bold text-white">
                          {article.title}
                        </div>
                        <div className="text-stone-400">
                          {article.author} • {article.category} • {article.date}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Delete this article?')) {
                            deleteArticle(article.id);
                            playTick();
                          }
                        }}
                        className="p-2 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500 rounded-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
