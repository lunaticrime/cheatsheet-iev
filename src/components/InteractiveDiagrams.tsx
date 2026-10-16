import React, { useState } from 'react';
import {
  FolderTree,
  Clock,
  GitBranch,
  AlertTriangle,
  Package,
  Layers,
  Server,
  Box,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Cpu,
  HardDrive,
  FileCode,
  Lock,
  Play
} from 'lucide-react';
import {
  SEMVERS_MATRIX,
  LUNCHBOX_PROPERTIES,
  TOOLS_COMPARISON_TABLE,
  ISOLATION_PYRAMID
} from '../data/courseData';

interface DiagramProps {
  onSendCommand: (cmd: string) => void;
}

export const Module1Diagrams: React.FC<DiagramProps> = ({ onSendCommand }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
      {/* 1. Arborescence & Petit chemin vs Grand chemin (Slides 8-9) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-[#E95420]" />
            <h4 className="font-bold text-zinc-900 text-sm">
              Arborescence Linux & Types de chemins (Slides 8–9)
            </h4>
          </div>
          <span className="text-xs font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
            Racine : /
          </span>
        </div>

        <div className="bg-[#141417] text-zinc-200 rounded-lg p-3.5 font-mono text-xs leading-relaxed mb-4 overflow-x-auto">
          <div className="text-[#F97316] font-bold">/ (racine)</div>
          <div className="pl-3 border-l border-zinc-700 ml-1.5 space-y-1">
            <div className="text-zinc-400">├── boot/ &nbsp; bin/ &nbsp; etc/ &nbsp; lib/ &nbsp; usr/</div>
            <div>
              <span className="text-cyan-400 font-semibold">└── home/</span>
              <div className="pl-4 border-l border-zinc-700 ml-2 space-y-1 mt-1">
                <div>
                  <span className="text-emerald-400">├── jachddou/</span> (ou <span className="text-emerald-400">etudiant/</span> = <code className="bg-zinc-800 px-1 rounded">~</code>)
                  <div className="pl-4 text-zinc-300">
                    └── Documents/ ──► <span className="text-amber-300">mes-examens/</span> &amp; <span className="text-zinc-400">mon_script.sh</span>
                  </div>
                </div>
                <div>
                  <span className="text-purple-400">└── bcazaux/</span>
                  <div className="pl-4 text-zinc-300">
                    └── <span className="text-rose-300">mes-secrets/</span> ──► <span className="text-zinc-400">black_list.csv</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200">
            <div>
              <span className="font-bold text-emerald-900">1. Chemin partant du home (~) :</span>
              <code className="block font-mono text-emerald-800 mt-0.5">cd ~/Documents/mes-examens/</code>
            </div>
            <button
              onClick={() => onSendCommand('cd ~/Documents && pwd')}
              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium flex items-center gap-1 shrink-0"
              title="Tester dans le simulateur"
            >
              <Play className="w-3 h-3" /> Tester
            </button>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-rose-50 border border-rose-200">
            <div>
              <span className="font-bold text-rose-900">2. Chemin relatif (depuis Documents) :</span>
              <code className="block font-mono text-rose-800 mt-0.5">cd ../../bcazaux/mes-secrets</code>
            </div>
            <button
              onClick={() => onSendCommand('cd /home/jachddou/Documents && cd ../../bcazaux/mes-secrets && pwd')}
              className="px-2.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded font-medium flex items-center gap-1 shrink-0"
            >
              <Play className="w-3 h-3" /> Tester
            </button>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50 border border-sky-200">
            <div>
              <span className="font-bold text-sky-900">3. Chemin absolu (depuis la racine /) :</span>
              <code className="block font-mono text-sky-800 mt-0.5">cd /home/bcazaux/mes-secrets</code>
            </div>
            <button
              onClick={() => onSendCommand('cd /home/bcazaux/mes-secrets && ls')}
              className="px-2.5 py-1 bg-sky-700 hover:bg-sky-800 text-white rounded font-medium flex items-center gap-1 shrink-0"
            >
              <Play className="w-3 h-3" /> Tester
            </button>
          </div>
        </div>
      </div>

      {/* 2. Matrice temporelle Passé / Présent / Futur (.bashrc vs export - Slide 14) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#E95420]" />
              <h4 className="font-bold text-zinc-900 text-sm">
                Portée temporelle d'une modification du <code className="font-mono text-[#E95420]">PATH</code> (Slide 14)
              </h4>
            </div>
            <span className="text-xs bg-orange-50 text-[#E95420] font-semibold px-2 py-0.5 rounded border border-orange-200">
              Question d'examen classique
            </span>
          </div>

          <p className="text-xs text-zinc-600 mb-3">
            Quand peut-on utiliser l'application <code className="font-mono bg-zinc-100 px-1 rounded">sl</code> après avoir modifié la variable <code className="font-mono bg-zinc-100 px-1 rounded">PATH</code> ?
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="p-2.5 text-left rounded-tl-lg">Action réalisée</th>
                  <th className="p-2.5 text-center">
                    <div>Passé</div>
                    <div className="text-[10px] font-normal text-zinc-300">Autre terminal déjà ouvert</div>
                  </th>
                  <th className="p-2.5 text-center">
                    <div>Présent</div>
                    <div className="text-[10px] font-normal text-zinc-300">Terminal en cours</div>
                  </th>
                  <th className="p-2.5 text-center rounded-tr-lg">
                    <div>Futur</div>
                    <div className="text-[10px] font-normal text-zinc-300">Nouveau terminal</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 border border-zinc-200">
                <tr className="hover:bg-zinc-50">
                  <td className="p-2.5 font-medium text-zinc-800">
                    1. <code className="font-mono text-[#E95420]">export PATH=...</code> directement dans le terminal
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold">✗</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold">✗</span>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-2.5 font-medium text-zinc-800">
                    2. <code className="font-mono text-[#E95420]">export PATH=...</code> écrit dans <code className="font-mono">.bashrc</code> (sans <code className="font-mono">source</code>)
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold">✗</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold">✗</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓</span>
                  </td>
                </tr>
                <tr className="bg-orange-50/40 hover:bg-orange-50">
                  <td className="p-2.5 font-semibold text-zinc-900">
                    3. <code className="font-mono text-[#E95420]">export PATH=...</code> dans <code className="font-mono">.bashrc</code> <strong>ET</strong> <code className="font-mono text-emerald-700">source ~/.bashrc</code>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold">✗</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-zinc-900 text-zinc-200 text-xs flex items-center justify-between gap-3">
          <div>
            <span className="text-[#F97316] font-bold">Inception de Bash (Slide 17) :</span>{' '}
            <code className="font-mono text-emerald-300">bash</code> relit <code className="font-mono">.bashrc</code> (écrase <code className="font-mono">PS1</code>), tandis que <code className="font-mono text-cyan-300">bash --norc</code> ignore <code className="font-mono">.bashrc</code> !
          </div>
          <button
            onClick={() => onSendCommand('export PS1="[\\A] > " && bash --norc')}
            className="px-2.5 py-1.5 bg-[#E95420] hover:bg-[#d94612] text-white rounded font-medium shrink-0 flex items-center gap-1"
          >
            <Play className="w-3 h-3" /> Simuler
          </button>
        </div>
      </div>
    </div>
  );
};

export const Module2Diagrams: React.FC<DiagramProps> = ({ onSendCommand }) => {
  const [selectedConstraint, setSelectedConstraint] = useState<number>(4); // ~=1.2 by default

  return (
    <div className="space-y-5 my-5">
      {/* Row 1: Graphe des dépendances & Tri Topologique (Slide 24) + Conflit en diamant (Slide 27) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* DAG & Topological Sort */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-[#E95420]" />
              <h4 className="font-bold text-zinc-900 text-sm">
                Graphe des dépendances & Tri topologique (Slide 24)
              </h4>
            </div>
            <button
              onClick={() => onSendCommand('pip install dist/myapp-0.1.0-py3-none-any.whl')}
              className="text-xs px-2.5 py-1 bg-[#E95420] text-white rounded hover:bg-[#d94612] flex items-center gap-1 font-medium"
            >
              <Play className="w-3 h-3" /> Simuler l'installation
            </button>
          </div>

          <p className="text-xs text-zinc-600 mb-3">
            Un graphe de dépendances valide est un <strong>graphe orienté sans cycle (DAG)</strong>. Pour installer <code className="font-mono">myapp</code>, <code className="font-mono">pip</code> effectue un <strong>tri topologique</strong> afin d'installer chaque dépendance avant le paquet qui l'utilise :
          </p>

          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3 mb-3 text-xs">
            <div className="font-semibold text-amber-950 mb-1.5">Relations de dépendance (A ──► B signifie « A dépend de B ») :</div>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] text-amber-900">
              <div>• myapp ──► pkg_d</div>
              <div>• pkg_d ──► pkg_a, pkg_c</div>
              <div>• pkg_c ──► pkg_a, pkg_b, pkg_f</div>
              <div>• pkg_a ──► pkg_b</div>
              <div>• pkg_b ──► pkg_e, pkg_f</div>
              <div>• pkg_f ──► pkg_e (feuille : 0 dép.)</div>
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-3 rounded-lg">
            <div className="text-[11px] text-zinc-400 mb-1.5 uppercase tracking-wider font-semibold">
              Ordre d'installation valide (Tri topologique — de gauche à droite) :
            </div>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {['pkg_e', 'pkg_f', 'pkg_b', 'pkg_a', 'pkg_c', 'pkg_d', 'myapp'].map((pkg, i) => (
                <React.Fragment key={pkg}>
                  <span className={`px-2 py-1 rounded font-bold ${pkg === 'myapp' ? 'bg-[#E95420] text-white' : 'bg-zinc-800 text-amber-300 border border-zinc-700'}`}>
                    {i + 1}. {pkg}
                  </span>
                  {i < 6 && <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Conflit en diamant (Slide 27) & Isolement par venv (Slide 29) */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-zinc-900 text-sm">
                  Conflit en diamant & Enfer des dépendances (Slides 27–29)
                </h4>
              </div>
              <button
                onClick={() => onSendCommand('pip install dist/myappconf-0.1.0-py3-none-any.whl')}
                className="text-xs px-2.5 py-1 bg-rose-600 text-white rounded hover:bg-rose-700 flex items-center gap-1 font-medium"
              >
                <Play className="w-3 h-3" /> Tester le conflit
              </button>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3.5 mb-3">
              <div className="text-xs font-bold text-rose-950 mb-2 text-center">
                Cas 1 : Conflit interne insoluble (<code className="font-mono">myappconf</code> — TP 6)
              </div>
              <div className="flex flex-col items-center font-mono text-xs space-y-1.5">
                <div className="px-3 py-1 bg-amber-100 border border-amber-400 text-amber-950 rounded font-bold">
                  myappconf
                </div>
                <div className="flex items-center gap-12 text-zinc-500 text-[11px]">
                  <span>↙ dépend</span>
                  <span>dépend ↘</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="px-3 py-1 bg-amber-100 border border-amber-400 text-amber-950 rounded font-bold">
                    pkg_a
                  </div>
                  <div className="px-3 py-1 bg-amber-100 border border-amber-400 text-amber-950 rounded font-bold">
                    pkg_b
                  </div>
                </div>
                <div className="flex items-center gap-8 font-bold text-rose-700">
                  <span>↘ exige &lt; 2</span>
                  <span>exige &gt;= 2 ↙</span>
                </div>
                <div className="px-4 py-1 bg-rose-600 text-white rounded-md font-bold shadow-sm">
                  ⚡ pkg_c (IMPOSSIBLE : &lt; 2 ET &gt;= 2)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-950">
            <span className="font-bold">Cas 2 : Conflit entre projets distincts (Slide 29 — Chez Alice, Bob, Chloé, David) :</span>
            <p className="mt-1 text-emerald-800">
              Si <code className="font-mono">myappA</code> exige <code className="font-mono">lib1 &lt; 2</code> et <code className="font-mono">myappB</code> exige <code className="font-mono">lib1 &gt;= 2.4</code>, les environnements virtuels (<code className="font-mono">env1</code>, <code className="font-mono">env2</code>, <code className="font-mono">env3</code>) résolvent le problème en isolant chaque projet dans sa propre boîte !
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Interactive SemVer & Version Delimitation Table (Slides 25-26) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
              <Package className="w-5 h-5 text-[#E95420]" />
              Semantic Versioning (SemVer) & Délimitation interactive des versions (Slides 25–26)
            </h4>
            <p className="text-xs text-zinc-600 mt-0.5">
              Format <code className="font-mono font-bold text-rose-600">MAJEUR</code>.<code className="font-mono font-bold text-amber-600">MINEUR</code>.<code className="font-mono font-bold text-emerald-600">CORRECTIF</code> — Cliquez sur une contrainte ci-dessous pour mettre en évidence les versions de <code className="font-mono">numpy</code> acceptées :
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SEMVERS_MATRIX.constraints.map((c, idx) => (
              <button
                key={c.expr}
                onClick={() => setSelectedConstraint(idx)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  selectedConstraint === idx
                    ? 'bg-[#E95420] text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {c.expr}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white font-mono">
                <th className="p-2 text-left rounded-tl-lg">Version</th>
                {SEMVERS_MATRIX.constraints.map((c, idx) => (
                  <th
                    key={c.expr}
                    onClick={() => setSelectedConstraint(idx)}
                    className={`p-2 text-center cursor-pointer transition-colors ${
                      selectedConstraint === idx ? 'bg-[#E95420] text-white' : 'hover:bg-zinc-800'
                    } ${idx === SEMVERS_MATRIX.constraints.length - 1 ? 'rounded-tr-lg' : ''}`}
                  >
                    <div>{c.expr}</div>
                    <div className="text-[10px] font-sans font-normal opacity-80">{c.desc}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 border border-zinc-200 font-mono">
              {SEMVERS_MATRIX.versions.map((ver, vIdx) => (
                <tr key={ver} className="hover:bg-zinc-50">
                  <td className="p-2 font-bold text-zinc-800 bg-zinc-50/70">{ver}</td>
                  {SEMVERS_MATRIX.constraints.map((c, cIdx) => {
                    const ok = c.matches[vIdx];
                    const isHighlighted = selectedConstraint === cIdx;
                    return (
                      <td
                        key={c.expr}
                        className={`p-2 text-center transition-colors ${
                          isHighlighted ? (ok ? 'bg-emerald-50/90' : 'bg-rose-50/50') : ''
                        }`}
                      >
                        {ok ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                            ●
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-rose-600 text-white text-[10px] font-bold">
                            ■
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const Module3Diagrams: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm my-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-[#E95420]" />
          <h4 className="font-bold text-zinc-900 text-sm">
            Les 11 propriétés d'une « bonne Lunch Box » (Environnement Virtuel — Slide 31/59)
          </h4>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded font-medium">
          Analogie centrale du cours
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LUNCHBOX_PROPERTIES.map((prop, idx) => (
          <div
            key={prop.title}
            className="p-3 rounded-lg border border-zinc-200 bg-[#FAF8F5] hover:border-[#E95420]/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-zinc-900">
                {idx + 1}. {prop.title}
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-200/70 text-zinc-700">
                {prop.category}
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">{prop.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module4Diagrams: React.FC<DiagramProps> = ({ onSendCommand }) => {
  return (
    <div className="space-y-5 my-5">
      {/* Triptyque Souhait vs Réalité vs Exécution (Slide 46) & Flux Poetry (Slide 47) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-2 mb-3">
          <FileCode className="w-5 h-5 text-[#E95420]" />
          Différence entre Souhait et Réalité (Slide 46) & Flux des commandes Poetry (Slide 47)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. pyproject.toml */}
          <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50/60 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-emerald-950 bg-emerald-200/80 px-2 py-0.5 rounded">
                  1. pyproject.toml
                </span>
                <span className="text-xs font-bold text-emerald-800">LE SOUHAIT</span>
              </div>
              <p className="text-xs font-semibold text-emerald-900 mb-2">
                « On décrit ce qu'on voudrait » — C'est la vision idéale du projet.
              </p>
              <ul className="text-xs text-emerald-950 space-y-1 list-disc list-inside">
                <li>Dépendances principales et optionnelles (<code className="font-mono">dev</code>, <code className="font-mono">docs</code>)</li>
                <li>Versions minimales ou bornées (<code className="font-mono">&gt;=2.2</code>, <code className="font-mono">~=1.5</code>)</li>
                <li>Métadonnées, <code className="font-mono">requires-python</code>, scripts</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200 flex flex-wrap gap-1.5">
              <button
                onClick={() => onSendCommand('poetry init')}
                className="text-[11px] font-mono bg-emerald-800 text-white px-2 py-1 rounded hover:bg-emerald-900"
              >
                poetry init / new
              </button>
              <button
                onClick={() => onSendCommand('poetry add requests')}
                className="text-[11px] font-mono bg-emerald-700 text-white px-2 py-1 rounded hover:bg-emerald-800"
              >
                poetry add
              </button>
            </div>
          </div>

          {/* 2. poetry.lock */}
          <div className="rounded-xl border-2 border-sky-400 bg-sky-50/60 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-sky-950 bg-sky-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> 2. poetry.lock
                </span>
                <span className="text-xs font-bold text-sky-800">LA RÉALITÉ FIGÉE</span>
              </div>
              <p className="text-xs font-semibold text-sky-900 mb-2">
                « On fixe exactement ce qui marche » — La photo exacte de ce qui marche.
              </p>
              <ul className="text-xs text-sky-950 space-y-1 list-disc list-inside">
                <li>Résout une version précise et compatible de chaque paquet</li>
                <li>Liste complète et figée (dépendances + sous-dépendances)</li>
                <li>Garantit la reproductibilité (CI/CD, déploiement)</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-sky-200 flex flex-wrap gap-1.5">
              <button
                onClick={() => onSendCommand('poetry lock')}
                className="text-[11px] font-mono bg-sky-800 text-white px-2 py-1 rounded hover:bg-sky-900"
              >
                poetry lock
              </button>
              <button
                onClick={() => onSendCommand('poetry update')}
                className="text-[11px] font-mono bg-sky-700 text-white px-2 py-1 rounded hover:bg-sky-800"
              >
                poetry update
              </button>
            </div>
          </div>

          {/* 3. Environnement virtuel + dist */}
          <div className="rounded-xl border-2 border-rose-400 bg-rose-50/60 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-rose-950 bg-rose-200/80 px-2 py-0.5 rounded">
                  3. Environnement virtuel
                </span>
                <span className="text-xs font-bold text-rose-800">L'EXÉCUTION</span>
              </div>
              <p className="text-xs font-semibold text-rose-900 mb-2">
                « On l'exécute dans un environnement » — L'exécution concrète du projet.
              </p>
              <ul className="text-xs text-rose-950 space-y-1 list-disc list-inside">
                <li>Installe exactement les versions du fichier <code className="font-mono">lock</code></li>
                <li>Isolement du système global</li>
                <li>Construit ensuite <code className="font-mono">dist/</code> (<code className="font-mono">sdist</code> ou <code className="font-mono">wheel</code>)</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-rose-200 flex flex-wrap gap-1.5">
              <button
                onClick={() => onSendCommand('poetry install')}
                className="text-[11px] font-mono bg-rose-800 text-white px-2 py-1 rounded hover:bg-rose-900"
              >
                poetry install
              </button>
              <button
                onClick={() => onSendCommand('poetry run python -m show_ade 4YMHMH-120')}
                className="text-[11px] font-mono bg-rose-700 text-white px-2 py-1 rounded hover:bg-rose-800"
              >
                poetry run / shell
              </button>
              <button
                onClick={() => onSendCommand('poetry build')}
                className="text-[11px] font-mono bg-zinc-800 text-white px-2 py-1 rounded hover:bg-zinc-900"
              >
                poetry build
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau comparatif des concurrents de Poetry & Focus uv (Slide 50) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="font-bold text-zinc-900 text-sm">
              Comparatif des outils de l'écosystème Python & Focus sur <code className="font-mono text-[#E95420]">uv</code> (Slide 50/59)
            </h4>
            <p className="text-xs text-zinc-600">
              Synthèse des 6 capacités clés évaluées dans le cours (source : <code className="font-mono">astral-sh/uv</code>) :
            </p>
          </div>
          <span className="text-xs font-mono bg-orange-100 text-[#E95420] px-2.5 py-1 rounded font-bold">
            ⚡ Benchmark (cache chaud) : uv (0.06s) vs Poetry (0.99s) vs PDM (1.90s) vs pip-sync (4.63s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white">
                <th className="p-2 text-left rounded-tl-lg">Outil</th>
                <th className="p-2 text-center">Install Python</th>
                <th className="p-2 text-center">Install packages</th>
                <th className="p-2 text-center">Build dist.</th>
                <th className="p-2 text-center">Upload dist.</th>
                <th className="p-2 text-center">Manage venvs</th>
                <th className="p-2 text-center">Lock files</th>
                <th className="p-2 text-left rounded-tr-lg">Positionnement & Rôle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 border border-zinc-200">
              {TOOLS_COMPARISON_TABLE.map(row => {
                const isHighlighted = row.tool === 'Poetry' || row.tool === 'uv' || row.tool === 'conda';
                return (
                  <tr
                    key={row.tool}
                    className={isHighlighted ? 'bg-orange-50/50 font-medium' : 'hover:bg-zinc-50'}
                  >
                    <td className="p-2 font-mono font-bold text-zinc-900">{row.tool}</td>
                    {[row.installPy, row.installPkg, row.buildDist, row.uploadDist, row.manageVenv, row.lockFiles].map(
                      (val, idx) => (
                        <td key={idx} className="p-2 text-center">
                          {val ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                          ) : (
                            <XCircle className="w-4 h-4 text-zinc-300 inline" />
                          )}
                        </td>
                      )
                    )}
                    <td className="p-2 text-zinc-700">
                      <span className="font-semibold text-zinc-900">{row.highlight}</span> — {row.note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const Module5Diagrams: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
      {/* 1. Containers vs Machines Virtuelles (Slide 57) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-5 h-5 text-[#E95420]" />
          <h4 className="font-bold text-zinc-900 text-sm">
            Architecture : Containers vs Machines Virtuelles (Slide 57/59)
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          {/* Containers */}
          <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-300 flex flex-col justify-end">
            <div className="text-center font-bold text-zinc-900 mb-2">Containers (Docker / Podman)</div>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {['sky', 'orange', 'emerald'].map((c, i) => (
                <div key={i} className="bg-zinc-900 p-1.5 rounded-lg text-white text-center space-y-1">
                  <div className={`py-1.5 rounded font-bold text-[10px] ${c === 'sky' ? 'bg-sky-500' : c === 'orange' ? 'bg-orange-500' : 'bg-emerald-600'}`}>
                    App {i + 1}
                  </div>
                  <div className={`py-1.5 rounded font-bold text-[10px] ${c === 'sky' ? 'bg-sky-600' : c === 'orange' ? 'bg-orange-600' : 'bg-emerald-700'}`}>
                    Bin / Lib
                  </div>
                  <div className="text-[9px] text-zinc-300 font-mono">Container</div>
                </div>
              ))}
            </div>
            <div className="bg-indigo-900 text-white text-center py-2 rounded-lg font-semibold mb-1.5">
              Container Engine (Docker)
            </div>
            <div className="bg-indigo-950 text-white text-center py-2 rounded-lg font-semibold mb-1.5">
              Operating System (Noyau partagé)
            </div>
            <div className="bg-zinc-800 text-white text-center py-2 rounded-lg font-semibold">
              Infrastructure (Matériel)
            </div>
          </div>

          {/* Virtual Machines */}
          <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-300 flex flex-col justify-end">
            <div className="text-center font-bold text-zinc-900 mb-2">Machines Virtuelles (VMs)</div>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {['sky', 'orange', 'emerald'].map((c, i) => (
                <div key={i} className="bg-zinc-900 p-1.5 rounded-lg text-white text-center space-y-1">
                  <div className={`py-1 rounded font-bold text-[10px] ${c === 'sky' ? 'bg-sky-500' : c === 'orange' ? 'bg-orange-500' : 'bg-emerald-600'}`}>
                    App {i + 1}
                  </div>
                  <div className={`py-1 rounded font-bold text-[10px] ${c === 'sky' ? 'bg-sky-600' : c === 'orange' ? 'bg-orange-600' : 'bg-emerald-700'}`}>
                    Bin / Lib
                  </div>
                  <div className="py-1 rounded font-bold text-[10px] bg-rose-600 text-white">
                    Guest OS
                  </div>
                  <div className="text-[9px] text-zinc-300 font-mono">VM</div>
                </div>
              ))}
            </div>
            <div className="bg-indigo-900 text-white text-center py-2.5 rounded-lg font-semibold mb-1.5">
              Hypervisor (VirtualBox / KVM)
            </div>
            <div className="bg-zinc-800 text-white text-center py-2.5 rounded-lg font-semibold">
              Infrastructure (Matériel)
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-600 mt-3">
          <strong>Distinction clé :</strong> Les containers partagent le noyau de l'OS hôte (pas de <em>Guest OS</em> dupliqué), ce qui les rend beaucoup plus légers et rapides à démarrer que des VMs.
        </p>
      </div>

      {/* 2. Pyramide de l'isolation & Tailles mesurées (Slide 58) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#E95420]" />
            <h4 className="font-bold text-zinc-900 text-sm">
              Pyramide de l'isolation & Taille disque (Slide 58/59)
            </h4>
          </div>
          <span className="text-[11px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
            Mesure : Python 3.9 + matplotlib
          </span>
        </div>

        <div className="space-y-2">
          {ISOLATION_PYRAMID.map((item, idx) => {
            const widths = ['w-full', 'w-full', 'w-full', 'w-full', 'w-full'];
            return (
              <div
                key={item.name}
                className={`p-3 rounded-lg border-l-4 ${item.color} ${widths[idx]} transition-all`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-bold text-xs">
                    {item.level}. {item.name}{' '}
                    <span className="font-mono font-normal opacity-80">({item.tools})</span>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white/80 rounded border border-black/10">
                    <HardDrive className="w-3 h-3 inline mr-1" />
                    {item.sizeRange}
                  </span>
                </div>
                <div className="text-xs mt-1 flex flex-wrap justify-between gap-2">
                  <span>
                    <strong>Isolation :</strong> {item.isolationType}
                  </span>
                  <span className="opacity-85 italic">{item.whenToUse}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
