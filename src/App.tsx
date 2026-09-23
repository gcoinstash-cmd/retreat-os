import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RETREAT_DATA } from './data';
import { Retreat, RetreatApplication } from './types';

// Importing Custom Visual Components
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import AboutHost from './components/AboutHost';
import RetreatDetail from './components/RetreatDetail';
import ApplicationPortal from './components/ApplicationPortal';
import HostPreview from './components/HostPreview';
import HostAdminDashboard from './components/HostAdminDashboard';
import { Lock, X, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('portfolio');
  const [selectedRetreat, setSelectedRetreat] = useState<Retreat>(RETREAT_DATA[0]);
  const [selectedLodgingId, setSelectedLodgingId] = useState<string>(RETREAT_DATA[0].accommodations[0].id);
  const [applications, setApplications] = useState<RetreatApplication[]>([
    {
      id: 'APP-9021',
      retreatId: 'soma-silence',
      retreatTitle: 'FOCUS & DECOMPRESSION (Ubud)',
      tierId: 'forest-suite',
      tierName: 'Forest Villa Suite',
      fullName: 'Dr. Evelyn St. Claire',
      email: 'evelyn@stclaire-health.com',
      phone: '+1 (415) 890-4421',
      instagram: '@dr.evelyn.stclaire',
      callingText: 'Seeking focused spatial reset to prepare new neurological recovery curriculum without digital device fatigue.',
      experienceText: '10 years somatic movement instruction and executive coaching.',
      dietaryRestrictions: 'Plant-forward organic, zero seed oils, gluten-free.',
      submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      status: 'accepted'
    },
    {
      id: 'APP-9022',
      retreatId: 'kairou-clay',
      retreatTitle: 'WOOD KILN CERAMICS (Kyoto)',
      tierId: 'machiya-room',
      tierName: 'Machiya Ryokan Room',
      fullName: 'Marcus Vance',
      email: 'marcus@vancedesign.org',
      phone: '+1 (212) 554-0918',
      instagram: '@marcus.vance.arch',
      callingText: 'Exploring ancient wood-fire glaze chemistry and kiln structural geometry.',
      experienceText: 'Architectural ceramicist for commercial brutalist buildings.',
      dietaryRestrictions: 'None.',
      submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      status: 'reviewed'
    },
    {
      id: 'APP-9023',
      retreatId: 'prana-surf',
      retreatTitle: 'COLD IMMERSION & SURF (Nosara)',
      tierId: 'ocean-bungalow',
      tierName: 'Ocean Ridge Bungalow',
      fullName: 'Aria Thorne',
      email: 'aria@thornecapital.io',
      phone: '+1 (310) 774-2910',
      instagram: '@ariathorne',
      callingText: 'Intense metabolic physical training and wave alignment retreat before launch of fund IV.',
      experienceText: 'Intermediate point-break surfer and daily cold-tub practitioner.',
      dietaryRestrictions: 'Pescatarian.',
      submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'pending'
    }
  ]);
  const [isHostDashboardOpen, setIsHostDashboardOpen] = useState(false);

  // Admin Control Room State (1-Click Cheat Code Bypass)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminPassModalOpen, setIsAdminPassModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // URL /admin bypass check on boot
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('admin') || hash.includes('admin') || search.includes('admin')) {
      setIsAdminMode(true);
      setTimeout(() => triggerToast("⚡ Host Bypass: Expedition Command Room Unlocked"), 300);
    }
  }, []);

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput.trim() === 'retreat2026') {
      setIsAdminMode(true);
      setIsAdminPassModalOpen(false);
      setAdminPassInput('');
      triggerToast("⚡ Host Command Access Granted (Cheat Code Verified)");
    } else {
      triggerToast("❌ Invalid Passkey. Use demo passcode: retreat2026");
    }
  };

  // Load submissions from localStorage on initial build
  useEffect(() => {
    try {
      const stored = localStorage.getItem('retreat_os_intakes');
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse stored local application data', e);
    }
  }, []);

  const handleSelectRetreat = (retreat: Retreat) => {
    setSelectedRetreat(retreat);
    // Pre-select first lodging option for that retreat
    if (retreat.accommodations && retreat.accommodations.length > 0) {
      setSelectedLodgingId(retreat.accommodations[0].id);
    }
  };

  const handleSelectLodging = (tierId: string) => {
    setSelectedLodgingId(tierId);
  };

  const handleAddApplication = (newApp: RetreatApplication) => {
    const updated = [newApp, ...applications];
    setApplications(updated);
    try {
      localStorage.setItem('retreat_os_intakes', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save application to localStorage', err);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'reviewed' | 'accepted') => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    localStorage.setItem('retreat_os_intakes', JSON.stringify(updated));
  };

  const handleDeleteApplication = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    localStorage.setItem('retreat_os_intakes', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setApplications([]);
    localStorage.removeItem('retreat_os_intakes');
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'portfolio':
        return (
          <Portfolio
            retreats={RETREAT_DATA}
            onSelectRetreat={handleSelectRetreat}
            setCurrentTab={setCurrentTab}
          />
        );
      case 'details':
        return (
          <RetreatDetail
            currentRetreat={selectedRetreat}
            allRetreats={RETREAT_DATA}
            onSelectRetreat={handleSelectRetreat}
            onSelectLodging={handleSelectLodging}
            setCurrentTab={setCurrentTab}
          />
        );
      case 'host':
        return (
          <AboutHost
            currentRetreat={selectedRetreat}
            allRetreats={RETREAT_DATA}
            onSelectRetreat={handleSelectRetreat}
            setCurrentTab={setCurrentTab}
          />
        );
      case 'apply':
        return (
          <ApplicationPortal
            retreats={RETREAT_DATA}
            selectedRetreat={selectedRetreat}
            selectedLodgingId={selectedLodgingId}
            onSelectRetreat={handleSelectRetreat}
            onSelectLodging={handleSelectLodging}
            onAddApplication={handleAddApplication}
            setCurrentTab={setCurrentTab}
          />
        );
      default:
        return null;
    }
  };

  if (isAdminMode) {
    return (
      <HostAdminDashboard
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
        onDeleteApplication={handleDeleteApplication}
        onClearAll={handleClearAll}
        onExit={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-alabaster text-ink font-sans selection:bg-ochre/30 flex flex-col justify-between transition-colors duration-300">
      <div>
        {/* Editorial Top Navigation Header */}
        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          appCount={applications.length}
          openHostDashboard={() => setIsHostDashboardOpen(true)}
          onOpenAdminPass={() => setIsAdminPassModalOpen(true)}
        />

        {/* Dynamic page contents wrapped in smooth motion fades */}
        <main className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab + '_' + selectedRetreat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {renderCurrentTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Premium print-inspired layout frame footer */}
      <footer className="border-t border-ink/10 bg-white/40 py-12 px-6 mt-16 pb-16">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">
          
          {/* Expanded Buyer-Facing Feature Specifications Sheet */}
          <div className="w-full bg-[#FBF9F6] border border-ink/10 rounded-sm shadow-3xs p-8 text-left my-8">
            <div className="border-b border-ink/10 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#5A6455] font-bold uppercase block mb-1">
                  // COMMERCIAL DESIGN SYSTEM BUILD
                </span>
                <h3 className="font-serif text-2xl font-light text-ink">
                  Retreat OS <span className="italic">Template Specifications</span>
                </h3>
              </div>
              <div className="text-[10px] font-mono text-ochre font-bold uppercase bg-[#C4A482]/5 border border-[#C4A482]/25 px-3 py-1 bg-white/50">
                Setup & Support Included
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#5A6455] block">// CORE FEATURE 01</span>
                <h4 className="font-serif text-lg font-light text-ink">Dynamic Room & Capacity Metrics</h4>
                <p className="text-xs text-ink/70 leading-relaxed font-sans">
                  Prevents double-occupancy overcrowding. Built-in real-time reservation tickers link instantly to intake logic, mapping true room capacities dynamically to avoid manual overbooking.
                </p>
              </div>

              <div className="space-y-3 border-t md:border-t-0 md:border-l border-ink/10 pt-6 md:pt-0 md:pl-8">
                <span className="text-[10px] font-mono font-bold text-[#C4A482] block">// CORE FEATURE 02</span>
                <h4 className="font-serif text-lg font-light text-ink">Centralized Local Data Hub</h4>
                <p className="text-xs text-ink/70 leading-relaxed font-sans">
                  Change text in one single structural file to immediately update times, prices, image sources, list amenities, and packing schedules across the entire public application seamlessly.
                </p>
              </div>

              <div className="space-y-3 border-t md:border-t-0 md:border-l border-ink/10 pt-6 md:pt-0 md:pl-8">
                <span className="text-[10px] font-mono font-bold text-[#5A6455] block">// CORE FEATURE 03</span>
                <h4 className="font-serif text-lg font-light text-ink">Fluid Interactive Architecture</h4>
                <p className="text-xs text-ink/70 leading-relaxed font-sans">
                  Modern micro-animations powered by <code>motion</code>, elegant responsive cards, grayscale-to-color hover imagery, and fluid mobile transitions engineered like a premium printed layout.
                </p>
              </div>
            </div>

            {/* Subtle Setup & Support Note */}
            <div className="mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px]">
              <div className="text-ink/60 font-sans tracking-wide">
                <span className="font-bold text-ink">Setup & Support Guarantee:</span> High-fidelity documentation, editable variables, and direct deployment guides included with purchase.
              </div>
              <div className="text-[#5A6455] font-mono font-bold text-right self-stretch sm:self-auto">
                [ COMPILED WORKSPACE STABLE V1.4.2 ]
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:text-left pt-2">
            {/* Logo stamp */}
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-ink">
                RETREAT <span className="font-light italic text-ochre">OS</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#5A6455] font-semibold mt-1">
                Architecture for high-end gatherings
              </span>
            </div>

            <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-ink/40 space-y-1">
              <p>© 2026 Retreat OS Retreat Details. All rights reserved.</p>
              <p>Designed for premium wellness and movement educators.</p>
            </div>

            {/* Subtly integrate facilitation inspector for host checkups */}
            <div className="flex items-center space-x-3 text-[10px] font-mono tracking-wider">
              <button
                onClick={() => setIsHostDashboardOpen(true)}
                className="text-[#5A6455] hover:text-ink font-bold bg-[#5A6455]/5 hover:bg-[#5A6455]/10 border border-[#5A6455]/25 px-3 py-1.5 transition cursor-pointer"
              >
                [ OPEN HOST DASHBOARD Preview ]
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Host Preview / Demo application inspector drawer */}
      <HostPreview
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
        onDeleteApplication={handleDeleteApplication}
        onClearAll={handleClearAll}
        isOpen={isHostDashboardOpen}
        onClose={() => setIsHostDashboardOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161B14] border border-[#C4A482]/40 text-stone-200 px-4 py-3 rounded shadow-2xl font-mono text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#C4A482]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Pass Modal (1-Click Cheat Code Bypass) */}
      {isAdminPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in font-mono">
          <div className="bg-[#161B14] border border-[#C4A482]/30 rounded-sm w-full max-w-md p-6 relative shadow-2xl text-stone-200">
            <button
              onClick={() => setIsAdminPassModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-[#C4A482]/10 border border-[#C4A482]/30 flex items-center justify-center text-[#C4A482]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base">EXPEDITION HOST COMMAND</h3>
                <p className="text-xs text-stone-400 font-mono">Retreat Director & Cohort Ledger</p>
              </div>
            </div>

            <form onSubmit={handleAdminUnlock} className="space-y-4">
              <div>
                <label className="block text-[11px] text-stone-300 uppercase tracking-wider mb-2">
                  Enter Host Access Passkey
                </label>
                <input
                  type="password"
                  placeholder="Enter passkey (e.g. retreat2026)"
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  className="w-full bg-black/70 border border-stone-700 rounded-sm px-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-[#C4A482]"
                  autoFocus
                />
              </div>

              <div className="p-3 bg-black/40 rounded border border-stone-800 text-[11px]">
                <div className="text-stone-400 mb-1 flex items-center justify-between">
                  <span>DEMO CHEAT CODE:</span>
                  <span className="text-stone-500">(1-Click Fill)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminPassInput('retreat2026')}
                  className="w-full py-1.5 px-2 bg-[#C4A482]/10 hover:bg-[#C4A482]/20 border border-[#C4A482]/30 rounded text-[#C4A482] font-bold text-left flex items-center justify-between cursor-pointer"
                >
                  <span>retreat2026</span>
                  <span className="text-[10px] uppercase underline">AUTO-FILL</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#C4A482] hover:bg-[#B39371] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Authorize Session
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminPassModalOpen(false)}
                  className="py-2.5 px-4 bg-stone-900 border border-stone-800 text-stone-400 hover:text-white text-xs uppercase rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
