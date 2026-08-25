import React from 'react';
import { EsportsProvider } from './context/EsportsContext';
import { SoundProvider } from './context/SoundContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { Header } from './components/layout/Header';
import { FullscreenMenu } from './components/layout/FullscreenMenu';
import { Footer } from './components/layout/Footer';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { IntroSection } from './components/sections/IntroSection';
import { RosterSection } from './components/sections/RosterSection';
import { LegacySection } from './components/sections/LegacySection';
import { TrophyShowcase } from './components/sections/TrophyShowcase';
import { StatsSection } from './components/sections/StatsSection';
import { TrollSection } from './components/sections/TrollSection';
import { SquadSection } from './components/sections/SquadSection';
import { MatchesSection } from './components/sections/MatchesSection';
import { RankingsSection } from './components/sections/RankingsSection';
import { GallerySection } from './components/sections/GallerySection';
import { JournalSection } from './components/sections/JournalSection';
import { SocialSection } from './components/sections/SocialSection';

// Modals
import { PlayerProfileModal } from './components/modals/PlayerProfileModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { TrollPlayerModal } from './components/modals/TrollPlayerModal';
import { AdminDashboardModal } from './components/modals/AdminDashboardModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#161616] relative selection:bg-[#D4AF37]/30 selection:text-black">
      {/* Custom Precision Editorial Cursor */}
      <CustomCursor />

      {/* Sticky Luxury Header */}
      <Header />

      {/* Magazine-style Fullscreen Menu Drawer */}
      <FullscreenMenu />

      {/* Main Homepage Flow as specified in Design Brief */}
      <main>
        {/* 01: Hero Section ("THE ART OF THE TROLL") */}
        <HeroSection />

        {/* 02: Editorial Statement / Philosophy */}
        <IntroSection />

        {/* 03: The Roster (Featured Players & Asymmetric Cards) */}
        <RosterSection />

        {/* 04: The Legacy (Championship Timeline) */}
        <LegacySection />

        {/* 05: Trophies & Global Silverware */}
        <TrophyShowcase />

        {/* 06: Player Statistics & Quantifiable Metrics */}
        <StatsSection />

        {/* 07: The Troll Edition (Legendary 1 HP Clutches Vault) */}
        <TrollSection />

        {/* 08: The Squad (Complete Team Tactical Matrix) */}
        <SquadSection />

        {/* 09: Matches & Broadcast Schedule */}
        <MatchesSection />

        {/* 10: The Ranking Leaderboard */}
        <RankingsSection />

        {/* 11: Moments That Matter Photo Gallery */}
        <GallerySection />

        {/* 12: Notes From The Server (Editorial Magazine) */}
        <JournalSection />

        {/* 13: Direct Dispatch Socials */}
        <SocialSection />
      </main>

      {/* Large Luxury Editorial Footer ("PLAY LOUD. LIVE QUIET.") */}
      <Footer />

      {/* Modals for deep engagement */}
      <PlayerProfileModal />
      <ArticleModal />
      <TrollPlayerModal />
      <AdminDashboardModal />
    </div>
  );
};

export function App() {
  return (
    <SoundProvider>
      <EsportsProvider>
        <AppContent />
      </EsportsProvider>
    </SoundProvider>
  );
}

export default App;
