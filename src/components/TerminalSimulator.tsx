import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  RotateCcw,
  Trash2,
  Play,
  CheckCircle2,
  Circle,
  BookOpen,
  ChevronRight,
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';
import {
  SimulatorState,
  TerminalOutputLine,
  createInitialSimulatorState,
  executeSimulatedCommand,
  formatPrompt
} from '../utils/terminalSimulator';
import { GUIDED_EXERCISES } from '../data/courseData';

interface TerminalSimulatorProps {
  externalCommandQueue: { id: number; cmd: string } | null;
  activeExerciseId: number;
  setActiveExerciseId: (id: number) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  externalCommandQueue,
  activeExerciseId,
  setActiveExerciseId,
  isExpanded = false,
  onToggleExpand
}) => {
  const [simState, setSimState] = useState<SimulatorState>(() => createInitialSimulatorState());
  const [history, setHistory] = useState<TerminalOutputLine[]>([
    {
      id: 'welcome-1',
      type: 'info',
      text: '🐧 Bienvenue dans le terminal interactif (Polytech Lille — IEV)'
    },
    {
      id: 'welcome-2',
      type: 'stdout',
      text: "Tapez 'help' pour afficher les commandes disponibles, cliquez sur « Tester » dans le cours, ou ouvrez l'onglet « Mini-TPs » en haut du terminal."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [showExercises, setShowExercises] = useState<boolean>(false);

  const outputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll only inside the internal terminal container, never moving the whole web page
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (trimmed === 'reset') {
      const fresh = createInitialSimulatorState();
      setSimState(fresh);
      setHistory([
        {
          id: `reset-${Date.now()}`,
          type: 'info',
          text: '🔄 Session et système de fichiers réinitialisés.'
        }
      ]);
      setInputVal('');
      return;
    }

    const currentPrompt = formatPrompt(simState);
    const { newState, outputs } = executeSimulatedCommand(trimmed, simState);

    const newLines: TerminalOutputLine[] = [
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        type: 'command',
        prompt: currentPrompt,
        text: trimmed
      },
      ...outputs.map((o, idx) => ({
        id: `out-${Date.now()}-${idx}-${Math.random()}`,
        ...o
      }))
    ];

    setSimState(newState);
    setHistory(prev => [...prev, ...newLines]);
    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);
    setInputVal('');
  };

  // Listen for commands sent from the Cheatsheet cards
  useEffect(() => {
    if (externalCommandQueue && externalCommandQueue.cmd) {
      runCommand(externalCommandQueue.cmd);
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [externalCommandQueue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const currentExercise = GUIDED_EXERCISES.find(ex => ex.id === activeExerciseId) || GUIDED_EXERCISES[0];
  const currentPrompt = formatPrompt(simState);

  return (
    <div className="bg-[#141417] text-zinc-100 rounded-2xl border border-[#2C2C35] shadow-xl overflow-hidden flex flex-col xl:h-[calc(100vh-8.75rem)] h-[540px]">
      {/* Top Window Bar (shrink-0) */}
      <div className="bg-[#1C1C21] px-3.5 py-2.5 border-b border-[#2C2C35] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-200 ml-1 truncate">
            <TerminalIcon className="w-3.5 h-3.5 text-[#E95420] shrink-0" />
            <span className="truncate">{simState.cwd}</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-800 text-amber-400 border border-zinc-700 shrink-0">
              SHLVL={simState.shellStack.length}
            </span>
            {simState.activeEnv && (
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-emerald-950 text-emerald-300 border border-emerald-700 shrink-0">
                ({simState.activeEnv})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowExercises(!showExercises)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
              showExercises
                ? 'bg-[#E95420] text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
            }`}
            title="Afficher ou masquer les exercices guidés des TPs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mini-TPs ({simState.completedChecks.length}/21)</span>
          </button>

          <button
            onClick={() => setHistory([])}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md text-xs"
            title="Effacer l'écran (clear)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => runCommand('reset')}
            className="px-2 py-1 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md text-xs flex items-center gap-1"
            title="Réinitialiser l'environnement à zéro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="hidden xl:inline-flex p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md text-xs"
              title={isExpanded ? 'Largeur standard' : 'Élargir le terminal'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Guided Exercise Drawer (collapsible, max-h with internal scroll so it never crushes the terminal) */}
      {showExercises && (
        <div className="bg-[#1C1C21]/95 border-b border-[#2C2C35] p-3 text-xs shrink-0 max-h-[210px] overflow-y-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 border-b border-zinc-800">
            {GUIDED_EXERCISES.map(ex => {
              const doneCount = ex.steps.filter(s => simState.completedChecks.includes(s.checkId)).length;
              const isAllDone = doneCount === ex.steps.length;
              const isSelected = ex.id === activeExerciseId;
              return (
                <button
                  key={ex.id}
                  onClick={() => setActiveExerciseId(ex.id)}
                  className={`px-2 py-1 rounded font-medium shrink-0 flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-[#E95420] text-white shadow'
                      : isAllDone
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/70'
                      : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {isAllDone ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  )}
                  <span>TP {ex.id}</span>
                  <span className="text-[10px] opacity-80">
                    ({doneCount}/{ex.steps.length})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-bold text-zinc-100 text-xs">{currentExercise.title}</div>
              <button
                onClick={() => runCommand(`cd ${currentExercise.folder}`)}
                className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-0.5"
              >
                cd {currentExercise.folder} <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-zinc-400 text-[11px] leading-snug">{currentExercise.scenario}</p>

            <div className="grid grid-cols-1 gap-1 pt-1">
              {currentExercise.steps.map((step, sIdx) => {
                const isDone = simState.completedChecks.includes(step.checkId);
                return (
                  <div
                    key={step.checkId}
                    className={`p-1.5 rounded border flex flex-wrap items-center justify-between gap-2 ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                        : 'bg-zinc-900/90 border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <div className="flex items-start gap-1.5 flex-1 min-w-[180px]">
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                      )}
                      <div className="text-[11px]">
                        <span className="font-medium">
                          {sIdx + 1}. {step.instruction}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => runCommand(step.hintCommand)}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-[#E95420] text-amber-300 hover:text-white font-mono text-[10.5px] flex items-center gap-1 border border-zinc-700 transition-colors shrink-0"
                    >
                      <Play className="w-2.5 h-2.5" />
                      <span>{step.hintCommand}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Terminal Output Scroll Area (flex-1 min-h-0 overflow-y-auto keeps command line pinned at bottom!) */}
      <div
        ref={outputContainerRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="flex-1 min-h-0 p-4 font-mono text-xs overflow-y-auto space-y-2 cursor-text"
      >
        {history.map(line => {
          if (line.type === 'command') {
            return (
              <div key={line.id} className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-[#E95420] font-bold select-none">{line.prompt}</span>
                <span className="text-zinc-100 font-semibold">{line.text}</span>
              </div>
            );
          }
          if (line.type === 'stderr') {
            return (
              <pre
                key={line.id}
                className="whitespace-pre-wrap text-rose-400 bg-rose-950/30 border-l-2 border-rose-500 pl-3 py-1 rounded-r leading-relaxed"
              >
                {line.text}
              </pre>
            );
          }
          if (line.type === 'info') {
            return (
              <pre
                key={line.id}
                className="whitespace-pre-wrap text-amber-300/95 bg-amber-950/20 border-l-2 border-amber-500 pl-3 py-1 rounded-r leading-relaxed"
              >
                {line.text}
              </pre>
            );
          }
          if (line.type === 'rainbow') {
            return (
              <pre
                key={line.id}
                className="whitespace-pre-wrap lolcat-rainbow font-bold leading-snug py-1"
              >
                {line.text}
              </pre>
            );
          }
          return (
            <pre key={line.id} className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
              {line.text}
            </pre>
          );
        })}
      </div>

      {/* Quick Command Chips + Pinned Input Bar (shrink-0) */}
      <div className="bg-[#1C1C21] border-t border-[#2C2C35] p-2.5 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1.5 text-[11px] font-mono">
          <span className="text-zinc-400 font-sans text-[11px] shrink-0">Exemples :</span>
          {[
            'help',
            'pwd',
            'echo $PATH',
            'pip --version',
            'python3 -m venv mon_env',
            'source mon_env/bin/activate',
            'pip install cowsay lolcat',
            'cowsay -t "Bonjour !" | lolcat',
            'poetry install',
            'conda env list'
          ].map(quickCmd => (
            <button
              key={quickCmd}
              onClick={() => runCommand(quickCmd)}
              className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-amber-300 border border-zinc-700 shrink-0 transition-colors"
            >
              {quickCmd}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-[#141417] border border-zinc-700 focus-within:border-[#E95420] rounded-lg px-3 py-2">
          <span className="font-mono text-xs font-bold text-[#E95420] shrink-0 select-none">
            {currentPrompt}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tapez une commande (ex: man pwd, python3 -m venv mon_env, pip freeze...)"
            className="w-full bg-transparent text-zinc-100 font-mono text-xs focus:outline-none placeholder:text-zinc-600"
            aria-label="Entrée de commande du terminal"
          />
          <button
            onClick={() => runCommand(inputVal)}
            className="px-3 py-1 bg-[#E95420] hover:bg-[#d94612] text-white text-xs font-semibold rounded transition-colors shrink-0"
          >
            Exécuter
          </button>
        </div>
      </div>
    </div>
  );
};
