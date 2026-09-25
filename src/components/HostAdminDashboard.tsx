import React, { useState } from 'react';
import { RetreatApplication } from '../types';
import { 
  Sparkles, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  LogOut, 
  MapPin, 
  Layers,
  Search,
  Key,
  Compass,
  FileText,
  Mail,
  Check,
  XCircle,
  Trash2
} from 'lucide-react';

interface HostAdminDashboardProps {
  applications: RetreatApplication[];
  onUpdateStatus: (id: string, newStatus: 'pending' | 'reviewed' | 'accepted') => void;
  onDeleteApplication: (id: string) => void;
  onClearAll: () => void;
  onExit: () => void;
}

export default function HostAdminDashboard({
  applications,
  onUpdateStatus,
  onDeleteApplication,
  onClearAll,
  onExit
}: HostAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'applications' | 'occupancy' | 'financials'>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(
    applications.length > 0 ? applications[0].id : null
  );

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.retreatTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const currentApp = applications.find(a => a.id === selectedAppId) || filteredApplications[0] || applications[0];

  // Financial calculations
  const totalSpotsBooked = applications.filter(a => a.status === 'accepted').length;
  const estimatedRevenue = totalSpotsBooked * 4200; // Average retreat ticket $4,200

  return (
    <div className="min-h-screen bg-[#0E100D] text-stone-200 font-sans selection:bg-[#C4A482]/30 selection:text-[#C4A482]">
      {/* Top Telemetry HUD */}
      <header className="sticky top-0 z-50 bg-[#141813]/95 backdrop-blur-md border-b border-[#C4A482]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#C4A482]/10 border border-[#C4A482]/30 flex items-center justify-center text-[#C4A482]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-[0.2em] uppercase font-serif text-white">AURA RETREAT OS</h1>
                <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded bg-[#C4A482]/20 text-[#C4A482] border border-[#C4A482]/30 font-bold">
                  EXPEDITION DIRECTOR & HOST COMMAND
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">Boutique Sanctuary Intakes & Cohort Ledger OS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-black/60 border border-stone-800 text-xs font-mono text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>PASSCODE: <strong className="text-[#C4A482]">retreat2026</strong></span>
            </div>
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-sm border border-stone-700 bg-stone-900/60 hover:bg-[#C4A482] hover:text-black hover:border-[#C4A482] text-base font-semibold min-h-[44px] font-mono tracking-wider transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>RETURN TO GUEST STOREFRONT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-sm bg-[#161B14] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Accepted Guest Revenue</span>
              <DollarSign className="w-4 h-4 text-[#C4A482]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">${estimatedRevenue.toLocaleString()}</div>
            <div className="text-xs font-semibold font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{totalSpotsBooked} confirmed deposits</span>
            </div>
          </div>

          <div className="p-5 rounded-sm bg-[#161B14] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Cohort Applications</span>
              <Users className="w-4 h-4 text-[#C4A482]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#C4A482]">{applications.length} Profiles</div>
            <div className="text-xs font-semibold font-mono text-stone-400 mt-1">{applications.filter(a => a.status === 'pending').length} awaiting review</div>
          </div>

          <div className="p-5 rounded-sm bg-[#161B14] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Active Sanctuaries</span>
              <MapPin className="w-4 h-4 text-[#C4A482]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">3 Destinations</div>
            <div className="text-xs font-semibold font-mono text-stone-400 mt-1">Ubud · Kyoto · Nosara</div>
          </div>

          <div className="p-5 rounded-sm bg-[#161B14] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Turnkey Database</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">ACTIVE</div>
            <div className="text-xs font-semibold font-mono text-stone-400 mt-1">RLS Protected · Supabase 2.4</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-stone-800 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'applications'
                ? 'border-[#C4A482] text-[#C4A482]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            APPLICATIONS MANIFEST ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('occupancy')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'occupancy'
                ? 'border-[#C4A482] text-[#C4A482]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            SANCTUARY OCCUPANCY & TIERS
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'financials'
                ? 'border-[#C4A482] text-[#C4A482]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            EXPEDITION REVENUE ARCHITECTURE
          </button>
        </div>

        {/* Tab 1: Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161B14] p-4 rounded-sm border border-stone-800 font-mono text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search guest, email, retreat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-black/60 border border-stone-700 rounded-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#C4A482]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-stone-500 uppercase">Status:</span>
                {['All', 'pending', 'reviewed', 'accepted'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold border cursor-pointer uppercase ${
                      filterStatus === s
                        ? 'border-[#C4A482] bg-[#C4A482]/10 text-[#C4A482]'
                        : 'border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: List of Applications (5 Cols) */}
              <div className="lg:col-span-5 border border-stone-800 rounded-sm bg-[#161B14] p-3 space-y-2 overflow-y-auto max-h-[600px]">
                {filteredApplications.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 font-mono text-xs">
                    No applications matching current filters.
                  </div>
                ) : (
                  filteredApplications.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all ${
                        selectedAppId === app.id
                          ? 'border-[#C4A482] bg-[#C4A482]/10 text-white'
                          : 'border-stone-800/80 bg-black/40 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm">{app.fullName}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold tracking-wider font-mono uppercase font-bold ${
                          app.status === 'accepted' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' :
                          app.status === 'reviewed' ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50' :
                          'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#C4A482] font-mono mb-1">{app.retreatTitle}</div>
                      <div className="text-xs font-semibold text-stone-400 font-mono flex items-center justify-between">
                        <span>Tier: {app.tierName}</span>
                        <span>{new Date(app.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Right Column: Detailed Application Inspection (7 Cols) */}
              <div className="lg:col-span-7 border border-stone-800 rounded-sm bg-[#161B14] p-6 flex flex-col justify-between">
                {currentApp ? (
                  <div className="space-y-6 font-mono text-xs">
                    <div className="flex items-start justify-between border-b border-stone-800 pb-4">
                      <div>
                        <span className="text-xs font-semibold tracking-wider text-[#C4A482] uppercase tracking-wider font-bold">
                          [ APPLICATION #{currentApp.id.slice(-6)} ]
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-white mt-1">{currentApp.fullName}</h2>
                        <div className="text-xs text-stone-400 mt-1">
                          {currentApp.email} · {currentApp.phone || 'No phone provided'}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                          currentApp.status === 'accepted' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' :
                          currentApp.status === 'reviewed' ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50' :
                          'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                        }`}>
                          {currentApp.status}
                        </span>
                        <div className="text-xs font-semibold tracking-wider text-stone-500 mt-1">
                          Applied: {new Date(currentApp.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 rounded bg-black/50 border border-stone-800/80">
                      <div>
                        <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase block mb-0.5">Program Selected</span>
                        <strong className="text-white text-xs">{currentApp.retreatTitle}</strong>
                      </div>
                      <div>
                        <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase block mb-0.5">Accommodation Tier</span>
                        <strong className="text-[#C4A482] text-xs">{currentApp.tierName}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2 font-bold">
                        Statement of Intent & Motivation:
                      </span>
                      <div className="p-4 rounded bg-black/60 border border-stone-800 text-stone-200 leading-relaxed font-sans text-xs">
                        "{currentApp.callingText || currentApp.experienceText || 'No custom statement entered.'}"
                      </div>
                    </div>

                    {currentApp.dietaryRestrictions && (
                      <div>
                        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1 font-bold">
                          Dietary & Health Profile:
                        </span>
                        <div className="p-3 rounded bg-black/40 border border-stone-800/80 text-stone-300">
                          {currentApp.dietaryRestrictions}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onUpdateStatus(currentApp.id, 'reviewed')}
                          disabled={currentApp.status === 'reviewed'}
                          className="px-3 py-1.5 rounded-sm bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/50 text-blue-300 font-bold uppercase text-xs font-semibold tracking-wider cursor-pointer"
                        >
                          Mark Reviewed
                        </button>
                        <button
                          onClick={() => onUpdateStatus(currentApp.id, 'accepted')}
                          disabled={currentApp.status === 'accepted'}
                          className="px-3 py-1.5 rounded-sm bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 font-bold uppercase text-xs font-semibold tracking-wider cursor-pointer"
                        >
                          Accept to Cohort
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Delete this applicant profile?')) {
                            onDeleteApplication(currentApp.id);
                          }
                        }}
                        className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-xs font-semibold tracking-wider uppercase font-bold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Record</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-8 font-mono text-stone-500">
                    Select an application from the manifest to review.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Occupancy & Tiers */}
        {activeTab === 'occupancy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 rounded-sm bg-[#161B14] border border-stone-800">
              <span className="text-xs font-semibold tracking-wider text-[#C4A482] uppercase tracking-wider font-bold">SANCTUARY 01</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">Focus & Decompression (Ubud)</h3>
              <p className="text-stone-400 text-xs font-semibold mb-4">October 12 – 18, 2026 · 7-Day Protocol</p>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 rounded border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Forest Villa Suite</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Private pool & outdoor shower</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C4A482] font-bold">$4,800</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">1 Spot Left</div>
                  </div>
                </div>
                <div className="p-3 bg-black/50 rounded border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Canopy Loft</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Ergonomic deep workspace</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C4A482] font-bold">$3,900</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-400">3 Spots Left</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#161B14] border border-stone-800">
              <span className="text-xs font-semibold tracking-wider text-[#C4A482] uppercase tracking-wider font-bold">SANCTUARY 02</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">Wood Kiln Ceramics (Kyoto)</h3>
              <p className="text-stone-400 text-xs font-semibold mb-4">November 04 – 11, 2026 · 8-Day Apprenticeship</p>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 rounded border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Machiya Ryokan Room</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Traditional tatami & cedar onsen</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C4A482] font-bold">$5,400</div>
                    <div className="text-xs font-semibold tracking-wider text-rose-400 font-bold">Sold Out</div>
                  </div>
                </div>
                <div className="p-3 bg-black/50 rounded border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Atelier Courtyard Loft</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Adjacent to pottery wheels</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C4A482] font-bold">$4,500</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">2 Spots Left</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#161B14] border border-stone-800">
              <span className="text-xs font-semibold tracking-wider text-[#C4A482] uppercase tracking-wider font-bold">SANCTUARY 03</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">Cold Immersion & Surf (Nosara)</h3>
              <p className="text-stone-400 text-xs font-semibold mb-4">January 15 – 21, 2027 · 7-Day Alignment</p>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 rounded border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Ocean Ridge Bungalow</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Direct beach access & ice plunge</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C4A482] font-bold">$4,200</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">4 Spots Left</div>
                  </div>
                </div>
                <div className="p-3 bg-black/50 rounded border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Garden Pavilion Room</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Shared pool & courtyard</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C4A482] font-bold">$3,400</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">2 Spots Left</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Financials */}
        {activeTab === 'financials' && (
          <div className="space-y-6">
            <div className="p-6 rounded-sm bg-[#161B14] border border-stone-800 font-mono">
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C4A482]" />
                <span>Annual Sanctuary Cohort Yield Architecture</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-black/60 rounded border border-stone-800">
                  <div className="text-stone-500 mb-1">Gross Expedition Revenue</div>
                  <div className="text-2xl font-bold text-white">$148,500</div>
                  <div className="text-stone-400 text-xs font-semibold mt-1">3 cohorts @ 92% capacity</div>
                </div>
                <div className="p-4 bg-black/60 rounded border border-stone-800">
                  <div className="text-stone-500 mb-1">Average Deposit Commitment</div>
                  <div className="text-2xl font-bold text-[#C4A482]">$4,350</div>
                  <div className="text-stone-400 text-xs font-semibold mt-1">Tier 1 & Tier 2 lodging</div>
                </div>
                <div className="p-4 bg-black/60 rounded border border-stone-800">
                  <div className="text-stone-500 mb-1">Net Host Margin</div>
                  <div className="text-2xl font-bold text-emerald-400">62.4%</div>
                  <div className="text-stone-400 text-xs font-semibold mt-1">Zero third-party marketplace fees</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#161B14] border border-[#C4A482]/20 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#C4A482] font-bold text-sm uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Turnkey Commercial Acquisition Note</span>
              </div>
              <p className="text-stone-300 leading-relaxed">
                Aura Retreat OS is engineered for independent retreat hosts, wellness educators, and boutique expedition operators. Eliminates platform commission fees (typically 15%–25% on RetreatGuru/Eventbrite) by providing a proprietary booking, application evaluation, and payment schedule engine.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
