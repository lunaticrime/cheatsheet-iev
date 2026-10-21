import React, { useState, useMemo } from 'react';
import {
  Terminal,
  BookOpen,
  Search,
  Copy,
  Check,
  Play,
  FileText,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Compass,
  ExternalLink,
  Filter
} from 'lucide-react';
import {
  COURSE_METADATA,
  COURSE_MODULES,
  CommandCardData,
  CourseModule
} from './data/courseData';
import { TerminalSimulator } from './components/TerminalSimulator';
import {
  Module1Diagrams,
  Module2Diagrams,
  Module3Diagrams,
  Module4Diagrams,
  Module5Diagrams
} from './components/InteractiveDiagrams';
import { PrintableCheatsheet } from './components/PrintableCheatsheet';

type ViewMode = 'cheatsheet' | 'pdf-preview';
type ToolFilter = 'all' | 'bash' | 'pip' | 'venv' | 'virtualenv' | 'poetry' | 'conda';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('cheatsheet');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<ToolFilter>('all');
  const [activeModuleId, setActiveModuleId] = useState<string>('module-1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [externalCmd, setExternalCmd] = useState<{ id: number; cmd: string } | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<number>(1);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState<boolean>(false);

  // Quiz state: key = `${moduleId}-${qIdx}` -> selectedOptionIndex
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleSendToTerminal = (cmd: string) => {
    setExternalCmd({ id: Date.now(), cmd });
  };

  const toggleCardExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered modules based on search query and tool tag
  const filteredModules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COURSE_MODULES.map(mod => {
      const matchingCommands = mod.commands.filter(cmd => {
        const matchesTool = selectedTool === 'all' || cmd.tool === selectedTool;
        if (!matchesTool) return false;
        if (!q) return true;
        return (
          cmd.command.toLowerCase().includes(q) ||
          cmd.title.toLowerCase().includes(q) ||
          cmd.description.toLowerCase().includes(q) ||
          cmd.exampleCommand.toLowerCase().includes(q) ||
          (cmd.pitfall && cmd.pitfall.toLowerCase().includes(q))
        );
      });

      const matchingConcepts = mod.concepts.filter(c => {
        if (selectedTool !== 'all') return true;
        if (!q) return true;
        return (
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.keyPoints.some(
            kp => kp.label.toLowerCase().includes(q) || kp.detail.toLowerCase().includes(q)
          )
        );
      });

      return {
        ...mod,
        commands: matchingCommands,
        concepts: matchingConcepts,
        hasMatches: matchingCommands.length > 0 || (selectedTool === 'all' && matchingConcepts.length > 0)
      };
    }).filter(m => m.hasMatches);
  }, [searchQuery, selectedTool]);

  const toolBadgeStyle = (tool: CommandCardData['tool']) => {
    switch (tool) {
      case 'bash':
        return 'bg-zinc-800 text-amber-300 border-zinc-700';
      case 'pip':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'venv':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'virtualenv':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      case 'poetry':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'conda':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-300';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-zinc-900">
      {/* Top Navigation Header — Fixed Single-Row Height so it never wraps or jumps between tabs */}
      <header className="no-print sticky top-0 z-40 bg-[#141417] text-white border-b border-[#2C2C35] shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Brand Title */}
          <div className="flex items-center gap-2.5 min-w-0 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#E95420] flex items-center justify-center shadow-inner shrink-0">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  IEV Cheatsheet &amp; Lab
                </span>
                <span className="hidden lg:inline-block text-[10px] font-mono bg-zinc-800 text-[#F97316] px-2 py-0.5 rounded border border-zinc-700">
                  {COURSE_METADATA.institution}
                </span>
                <span className="hidden xl:inline-block text-[10px] font-mono text-zinc-300">
                  {COURSE_METADATA.students}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden md:block truncate">
                {COURSE_METADATA.title} • Par {COURSE_METADATA.students}
              </p>
            </div>
          </div>

          {/* Search & View Switcher — Single-line non-wrapping layout */}
          <div className="flex items-center gap-2 shrink-0">
            {viewMode === 'cheatsheet' && (
              <div className="relative w-44 sm:w-64 lg:w-72">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher (PATH, ~=, lock, conda...)"
                  className="w-full pl-8 pr-6 py-1.5 bg-[#1C1C21] border border-zinc-700 focus:border-[#E95420] rounded-lg text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center bg-[#1C1C21] p-0.5 rounded-lg border border-zinc-700 shrink-0">
              <button
                onClick={() => setViewMode('cheatsheet')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  viewMode === 'cheatsheet'
                    ? 'bg-[#E95420] text-white shadow'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Cours &amp; Terminal</span>
              </button>

              <button
                onClick={() => setViewMode('pdf-preview')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  viewMode === 'pdf-preview'
                    ? 'bg-[#E95420] text-white shadow'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Aperçu PDF</span>
              </button>
            </div>

            <a
              href="./cheatsheet_environnements_virtuels.pdf"
              download="Cheatsheet_Environnements_Virtuels_Python_IEV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold border border-zinc-700 transition-colors whitespace-nowrap shrink-0"
              title="Télécharger directement le PDF"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E95420]" />
              <span>PDF</span>
            </a>
          </div>
        </div>

        {/* Sub-bar: Chapter Navigation & Tool Filter Pills — Compact single line */}
        {viewMode === 'cheatsheet' && (
          <div className="bg-[#1C1C21] border-t border-[#2C2C35] px-4 sm:px-6 h-10 flex items-center">
            <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
              {/* Module Quick Jump */}
              <nav className="flex items-center gap-1 shrink-0" aria-label="Navigation par chapitre">
                {COURSE_MODULES.map(mod => (
                  <a
                    key={mod.id}
                    href={`#${mod.id}`}
                    onClick={() => setActiveModuleId(mod.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-colors whitespace-nowrap ${
                      activeModuleId === mod.id
                        ? 'bg-[#E95420]/20 text-[#F97316] border border-[#E95420]/50 font-semibold'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {mod.number}. {mod.shortTitle}
                  </a>
                ))}
                <a
                  href="#guide-decision"
                  className="px-2.5 py-1 rounded-md text-xs font-medium shrink-0 text-emerald-300 hover:bg-zinc-800 flex items-center gap-1 whitespace-nowrap"
                >
                  <Compass className="w-3.5 h-3.5" /> Guide de choix
                </a>
              </nav>

              {/* Tool Filter Buttons */}
              <div className="hidden lg:flex items-center gap-1 text-[11px] shrink-0">
                <span className="text-zinc-400 flex items-center gap-1 mr-1">
                  <Filter className="w-3 h-3" /> Outil :
                </span>
                {(['all', 'bash', 'pip', 'venv', 'virtualenv', 'poetry', 'conda'] as ToolFilter[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTool(t)}
                    className={`px-2 py-0.5 rounded font-mono uppercase transition-colors ${
                      selectedTool === t
                        ? 'bg-[#E95420] text-white font-bold'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t === 'all' ? 'Tous' : t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      {viewMode === 'pdf-preview' ? (
        <main className="flex-1 py-6 px-4">
          <PrintableCheatsheet />
        </main>
      ) : (
        <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5">
          {/* Clean, Concise Intro Bar */}
          <div className="bg-gradient-to-r from-[#141417] via-[#1C1C21] to-[#27272A] text-white rounded-2xl p-4 sm:p-5 mb-6 border border-[#2C2C35] shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E95420] text-white rounded">
                  IEV ISIA • Polytech Lille
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  Par <strong>{COURSE_METADATA.students}</strong>
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Initiation aux Environnements Virtuels Python — Cheatsheet &amp; Terminal Interactif
              </h1>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Cours de {COURSE_METADATA.authors} • Retrouvez l'essentiel (Shell CLI, <code className="font-mono text-amber-300">PATH</code>, <code className="font-mono text-amber-300">pip</code>, SemVer, <code className="font-mono text-emerald-300">venv</code>, <code className="font-mono text-purple-300">Poetry</code>, <code className="font-mono text-sky-300">Conda</code>, Docker &amp; VMs) et cliquez sur <strong>« Tester dans le terminal »</strong> sur n'importe quelle commande pour pratiquer en direct.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() =>
                  handleSendToTerminal(
                    'python3 -m venv mon_env && source mon_env/bin/activate && pip install cowsay lolcat && cowsay -t "Bonjour Polytech !" | lolcat'
                  )
                }
                className="px-3.5 py-2 bg-[#E95420] hover:bg-[#d94612] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 transition-transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Démo : venv + cowsay | lolcat</span>
              </button>
              <button
                onClick={() => setViewMode('pdf-preview')}
                className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold rounded-xl border border-zinc-600 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Cheatsheet PDF</span>
              </button>
            </div>
          </div>

          {/* Responsive Split Layout: Left = Course Reference | Right = Sticky Interactive Terminal */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Course Reference Modules */}
            <div className={`${isTerminalExpanded ? 'xl:col-span-5' : 'xl:col-span-7'} space-y-7`}>
              {filteredModules.length === 0 ? (
                <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center space-y-3">
                  <Search className="w-8 h-8 text-zinc-400 mx-auto" />
                  <h3 className="font-bold text-base text-zinc-800">
                    Aucun résultat pour « {searchQuery} » (filtre : {selectedTool})
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Essayez un autre mot-clé (ex: <code className="font-mono">PATH</code>, <code className="font-mono">bashrc</code>, <code className="font-mono">freeze</code>, <code className="font-mono">lock</code>, <code className="font-mono">conda</code>) ou réinitialisez les filtres.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTool('all');
                    }}
                    className="px-4 py-1.5 bg-[#E95420] text-white rounded-lg text-xs font-semibold"
                  >
                    Réinitialiser la recherche
                  </button>
                </div>
              ) : (
                filteredModules.map((mod: CourseModule) => (
                  <section
                    key={mod.id}
                    id={mod.id}
                    className="scroll-mt-28 bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden"
                  >
                    {/* Module Header */}
                    <div className="bg-[#141417] text-white px-5 py-3.5 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#E95420] text-white rounded">
                            Chapitre {mod.number}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">{mod.slideRange}</span>
                        </div>
                        <h2 className="text-base sm:text-lg font-extrabold mt-1">{mod.title}</h2>
                        <p className="text-xs text-zinc-300 mt-0.5">{mod.subtitle}</p>
                      </div>
                    </div>

                    <div className="p-5 space-y-6">
                      {/* Concept Synthesis Cards */}
                      {mod.concepts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mod.concepts.map(concept => (
                            <div
                              key={concept.id}
                              className="rounded-xl border border-zinc-200 bg-[#FAF8F5] p-4 flex flex-col justify-between"
                            >
                              <div>
                                <div className="mb-1.5">
                                  <h3 className="font-bold text-sm text-zinc-900">{concept.title}</h3>
                                </div>
                                <p className="text-xs text-zinc-700 leading-relaxed mb-2.5">
                                  {concept.summary}
                                </p>

                                <div className="bg-orange-50/80 border-l-2 border-[#E95420] px-2.5 py-1.5 rounded-r text-[11px] text-zinc-800 mb-3">
                                  <strong className="text-[#E95420]">Pourquoi c'est essentiel :</strong>{' '}
                                  {concept.whyItMatters}
                                </div>

                                <ul className="space-y-1.5 text-xs">
                                  {concept.keyPoints.map(kp => (
                                    <li key={kp.label} className="leading-snug text-zinc-700">
                                      <span className="font-bold text-zinc-900">• {kp.label} :</span>{' '}
                                      {kp.detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {concept.distinctions && (
                                <div className="mt-3 pt-3 border-t border-zinc-200 grid grid-cols-2 gap-2 text-[11px]">
                                  <div className="bg-white p-2 rounded border border-zinc-200">
                                    <div className="font-mono font-bold text-[#E95420]">
                                      {concept.distinctions.leftTitle}
                                    </div>
                                    <div className="text-zinc-600 mt-0.5">
                                      {concept.distinctions.leftDesc}
                                    </div>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-zinc-200">
                                    <div className="font-mono font-bold text-emerald-700">
                                      {concept.distinctions.rightTitle}
                                    </div>
                                    <div className="text-zinc-600 mt-0.5">
                                      {concept.distinctions.rightDesc}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Module Visual Diagrams */}
                      {!searchQuery && selectedTool === 'all' && (
                        <>
                          {mod.id === 'module-1' && (
                            <Module1Diagrams onSendCommand={handleSendToTerminal} />
                          )}
                          {mod.id === 'module-2' && (
                            <Module2Diagrams onSendCommand={handleSendToTerminal} />
                          )}
                          {mod.id === 'module-3' && <Module3Diagrams />}
                          {mod.id === 'module-4' && (
                            <Module4Diagrams onSendCommand={handleSendToTerminal} />
                          )}
                          {mod.id === 'module-5' && <Module5Diagrams />}
                        </>
                      )}

                      {/* Command Cards */}
                      {mod.commands.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                            <Terminal className="w-4 h-4 text-[#E95420]" />
                            <span>Commandes &amp; Syntaxes à mémoriser</span>
                          </h3>

                          <div className="grid grid-cols-1 gap-3.5">
                            {mod.commands.map(cmd => {
                              const isExpanded = expandedCards[cmd.id] ?? true;
                              return (
                                <div
                                  key={cmd.id}
                                  className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:border-zinc-300 transition-all"
                                >
                                  {/* Command Header Bar */}
                                  <div className="bg-zinc-900 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${toolBadgeStyle(
                                          cmd.tool
                                        )}`}
                                      >
                                        {cmd.tool}
                                      </span>
                                      <span className="font-bold text-xs sm:text-sm text-white">
                                        {cmd.title}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={() => handleCopy(cmd.id, cmd.exampleCommand)}
                                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1 border border-zinc-700 transition-colors"
                                        title="Copier la commande"
                                      >
                                        {copiedId === cmd.id ? (
                                          <>
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                            <span className="text-emerald-400">Copié</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copier</span>
                                          </>
                                        )}
                                      </button>

                                      <button
                                        onClick={() => handleSendToTerminal(cmd.exampleCommand)}
                                        className="px-2.5 py-1 rounded bg-[#E95420] hover:bg-[#d94612] text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                                        title="Envoyer et exécuter dans le terminal"
                                      >
                                        <Play className="w-3.5 h-3.5" />
                                        <span>Tester dans le terminal</span>
                                      </button>

                                      <button
                                        onClick={() => toggleCardExpand(cmd.id)}
                                        className="p-1 text-zinc-400 hover:text-white"
                                        aria-label="Afficher ou masquer les détails"
                                      >
                                        {isExpanded ? (
                                          <ChevronUp className="w-4 h-4" />
                                        ) : (
                                          <ChevronDown className="w-4 h-4" />
                                        )}
                                      </button>
                                    </div>
                                  </div>

                                  {/* Command Body */}
                                  <div className="p-4 space-y-3 text-xs">
                                    <p className="text-zinc-700 leading-relaxed">{cmd.description}</p>

                                    {/* Code Block + Expected Output */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 font-mono">
                                      <div className="bg-[#141417] text-zinc-100 p-3 rounded-lg border border-zinc-800">
                                        <div className="text-[10px] text-zinc-400 uppercase mb-1 flex items-center justify-between">
                                          <span>Exemple concret :</span>
                                          {cmd.syntax && (
                                            <span className="text-amber-400/90">{cmd.syntax}</span>
                                          )}
                                        </div>
                                        <div className="text-amber-300 font-bold break-all">
                                          $ {cmd.exampleCommand}
                                        </div>
                                      </div>

                                      <div className="bg-zinc-900 text-zinc-300 p-3 rounded-lg border border-zinc-800">
                                        <div className="text-[10px] text-zinc-400 uppercase mb-1">
                                          Résultat / Effet attendu :
                                        </div>
                                        <pre className="whitespace-pre-wrap text-[11px] text-emerald-300 leading-snug">
                                          {cmd.expectedOutput}
                                        </pre>
                                      </div>
                                    </div>

                                    {isExpanded && (
                                      <>
                                        {cmd.options && cmd.options.length > 0 && (
                                          <div className="bg-[#FAF8F5] rounded-lg p-3 border border-zinc-200">
                                            <div className="font-bold text-zinc-800 mb-1.5 text-[11px]">
                                              Variantes, Options &amp; Arguments utiles :
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                              {cmd.options.map(opt => (
                                                <div
                                                  key={opt.flag}
                                                  className="flex items-baseline justify-between gap-2 bg-white p-1.5 rounded border border-zinc-200/80"
                                                >
                                                  <div className="min-w-0">
                                                    <code className="font-mono font-bold text-[#E95420] text-[11px]">
                                                      {opt.flag}
                                                    </code>
                                                    <span className="text-zinc-600 block text-[11px]">
                                                      {opt.meaning}
                                                    </span>
                                                  </div>
                                                  <button
                                                    onClick={() => handleSendToTerminal(opt.flag.split(' / ')[0])}
                                                    className="text-[10px] font-mono text-zinc-500 hover:text-[#E95420] shrink-0 px-1.5 py-0.5 rounded bg-zinc-100 hover:bg-orange-50"
                                                    title="Tester cette variante"
                                                  >
                                                    ▶
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {(cmd.pitfall || cmd.osNote) && (
                                          <div className="flex flex-col sm:flex-row gap-2">
                                            {cmd.pitfall && (
                                              <div className="flex-1 bg-rose-50 border border-rose-200 text-rose-950 p-2.5 rounded-lg flex items-start gap-2">
                                                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                                <div>
                                                  <strong className="font-bold">Piège fréquent / Dépannage :</strong>{' '}
                                                  {cmd.pitfall}
                                                </div>
                                              </div>
                                            )}
                                            {cmd.osNote && (
                                              <div className="flex-1 bg-sky-50 border border-sky-200 text-sky-950 p-2.5 rounded-lg">
                                                <strong className="font-bold">Spécificité OS / Shell :</strong>{' '}
                                                {cmd.osNote}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Quick Check for Understanding (Quiz per module) */}
                      {!searchQuery && selectedTool === 'all' && mod.quiz.length > 0 && (
                        <div className="bg-[#FAF8F5] rounded-xl p-4 border border-zinc-200 space-y-3">
                          <div className="flex items-center gap-2 font-bold text-xs text-zinc-900">
                            <HelpCircle className="w-4 h-4 text-[#E95420]" />
                            <span>Auto-évaluation rapide — Chapitre {mod.number}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mod.quiz.map((q, qIdx) => {
                              const key = `${mod.id}-${qIdx}`;
                              const selected = quizAnswers[key];
                              const hasAnswered = selected !== undefined;
                              const isCorrect = selected === q.correctIndex;

                              return (
                                <div
                                  key={key}
                                  className="bg-white p-3.5 rounded-lg border border-zinc-200 flex flex-col justify-between space-y-2.5 text-xs"
                                >
                                  <div className="font-semibold text-zinc-900 leading-snug">
                                    {qIdx + 1}. {q.question}
                                  </div>
                                  <div className="space-y-1.5">
                                    {q.options.map((opt, oIdx) => {
                                      let btnClass =
                                        'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800';
                                      if (hasAnswered) {
                                        if (oIdx === q.correctIndex) {
                                          btnClass =
                                            'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                                        } else if (oIdx === selected) {
                                          btnClass =
                                            'border-rose-400 bg-rose-50 text-rose-900';
                                        }
                                      }
                                      return (
                                        <button
                                          key={oIdx}
                                          onClick={() =>
                                            setQuizAnswers(prev => ({ ...prev, [key]: oIdx }))
                                          }
                                          className={`w-full text-left p-2 rounded border text-[11px] transition-colors flex items-center justify-between gap-2 ${btnClass}`}
                                        >
                                          <span>{opt}</span>
                                          {hasAnswered && oIdx === q.correctIndex && (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                          )}
                                          {hasAnswered &&
                                            oIdx === selected &&
                                            oIdx !== q.correctIndex && (
                                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                            )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  {hasAnswered && (
                                    <div
                                      className={`p-2 rounded text-[11px] ${
                                        isCorrect
                                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                          : 'bg-amber-50 text-amber-950 border border-amber-200'
                                      }`}
                                    >
                                      <strong>{isCorrect ? 'Exact ! ' : 'Explication : '}</strong>
                                      {q.explanation}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                ))
              )}

              {/* Decision Guide Section */}
              <section
                id="guide-decision"
                className="scroll-mt-28 bg-[#141417] text-white rounded-2xl p-6 border border-[#2C2C35] shadow-md"
              >
                <div className="flex items-center gap-2 text-[#F97316] font-mono text-xs uppercase font-bold mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Synthèse transversale</span>
                </div>
                <h2 className="text-lg font-extrabold mb-3">
                  Guide de décision : Quel gestionnaire d'environnement choisir ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                  <div className="bg-[#1C1C21] p-4 rounded-xl border border-zinc-800">
                    <div className="font-mono font-bold text-emerald-400 text-sm mb-1">
                      1. venv + requirements.txt
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong>Quand l'utiliser :</strong> TP rapide, petit script mono-fichier, machine où seul Python 3 standard est installé (sessions de l'école).
                    </p>
                    <div className="mt-2 font-mono text-[11px] text-zinc-400">
                      Taille : ~144–178 Mo • Isolation logique
                    </div>
                  </div>

                  <div className="bg-[#1C1C21] p-4 rounded-xl border border-zinc-800">
                    <div className="font-mono font-bold text-teal-400 text-sm mb-1">
                      2. virtualenv (+ tox)
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong>Quand l'utiliser :</strong> Création ultra-rapide hors-ligne grâce au <em>seeder</em> en cache local, ou besoin de cibler une version précise (<code className="font-mono">-p python3.11</code>).
                    </p>
                    <div className="mt-2 font-mono text-[11px] text-zinc-400">
                      Outils liés : virtualenvwrapper, tox
                    </div>
                  </div>

                  <div className="bg-[#1C1C21] p-4 rounded-xl border border-zinc-800">
                    <div className="font-mono font-bold text-purple-400 text-sm mb-1">
                      3. Poetry (= Cheffe de cuisine)
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong>Quand l'utiliser :</strong> Projet Python structuré en équipe, besoin d'un verrouillage strict (<code className="font-mono">poetry.lock</code>), séparation <code className="font-mono">dev</code>/<code className="font-mono">docs</code> et build/publication sur PyPI.
                    </p>
                    <div className="mt-2 font-mono text-[11px] text-zinc-400">
                      Fichiers : pyproject.toml + poetry.lock
                    </div>
                  </div>

                  <div className="bg-[#1C1C21] p-4 rounded-xl border border-zinc-800">
                    <div className="font-mono font-bold text-[#F97316] text-sm mb-1">
                      4. uv (L'alternative Rust ultra-rapide)
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong>Quand l'utiliser :</strong> Remplace à la fois <code className="font-mono">pyenv</code>, <code className="font-mono">pip</code>, <code className="font-mono">venv</code> et <code className="font-mono">Poetry</code> avec une vitesse 15x à 80x supérieure (0.06s sur cache chaud).
                    </p>
                    <div className="mt-2 font-mono text-[11px] text-zinc-400">
                      Tout-en-un : Python + packages + lock + build
                    </div>
                  </div>

                  <div className="bg-[#1C1C21] p-4 rounded-xl border border-zinc-800">
                    <div className="font-mono font-bold text-sky-400 text-sm mb-1">
                      5. Conda (= Cheffe à domicile)
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong>Quand l'utiliser :</strong> Data Science, Machine Learning, Géomatique (<code className="font-mono">libgdal</code>, <code className="font-mono">proj</code>) ou <code className="font-mono">manim</code> nécessitant des binaires C/C++/Fortran précompilés.
                    </p>
                    <div className="mt-2 font-mono text-[11px] text-zinc-400">
                      Taille : ~370–1900 Mo • Isolation logicielle
                    </div>
                  </div>

                  <div className="bg-[#1C1C21] p-4 rounded-xl border border-zinc-800">
                    <div className="font-mono font-bold text-amber-400 text-sm mb-1">
                      6. Docker Containers &amp; VMs
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong>Quand l'utiliser :</strong> Mise en production, reproductibilité système complète entre serveurs Linux/macOS/Windows (<code className="font-mono">Docker</code> = noyau partagé ; <code className="font-mono">VM</code> = Guest OS complet).
                    </p>
                    <div className="mt-2 font-mono text-[11px] text-zinc-400">
                      Taille Docker : ~215–1134 Mo • Isolation système
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Sticky Interactive Terminal Simulator (xl:top-[6.75rem] clears the 6rem sticky header cleanly!) */}
            <div
              className={`${
                isTerminalExpanded ? 'xl:col-span-7' : 'xl:col-span-5'
              } xl:sticky xl:top-[6.75rem]`}
            >
              <TerminalSimulator
                externalCommandQueue={externalCmd}
                activeExerciseId={activeExerciseId}
                setActiveExerciseId={setActiveExerciseId}
                isExpanded={isTerminalExpanded}
                onToggleExpand={() => setIsTerminalExpanded(!isTerminalExpanded)}
              />
            </div>
          </div>
        </main>
      )}

      {/* Clean Footer */}
      <footer className="no-print bg-[#141417] text-zinc-400 border-t border-[#2C2C35] py-4 px-6 text-xs mt-10">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white">Plongée dans les environnements virtuels Python</span>{' '}
            • Polytech Lille — Réalisé par <strong className="text-zinc-200">{COURSE_METADATA.students}</strong>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('pdf-preview')}
              className="text-[#F97316] hover:underline font-semibold"
            >
              Consulter la Cheatsheet PDF →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
