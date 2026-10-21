import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  COURSE_METADATA,
  SEMVERS_MATRIX,
  TOOLS_COMPARISON_TABLE
} from '../data/courseData';
import { Printer, ExternalLink, Terminal, AlertTriangle, Check, X } from 'lucide-react';

export const PrintableCheatsheet: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const websiteUrl = COURSE_METADATA.defaultWebsiteUrl;

  useEffect(() => {
    QRCode.toDataURL(websiteUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: '#141417',
        light: '#FFFFFF'
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(() => setQrDataUrl(''));
  }, [websiteUrl]);

  return (
    <div className="max-w-[210mm] mx-auto bg-white text-zinc-900 shadow-lg border border-zinc-200 rounded-xl print:shadow-none print:border-none print:rounded-none p-6 print:p-0 space-y-5">
      {/* Interactive Toolbar (hidden when printing) */}
      <div className="no-print bg-[#141417] text-white p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 border border-zinc-800">
        <div>
          <div className="text-sm font-bold flex items-center gap-2">
            <Printer className="w-4 h-4 text-[#E95420]" />
            <span>Cheatsheet PDF (Format A4)</span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Synthèse complète prête pour l'impression ou la consultation hors-ligne.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="./cheatsheet_environnements_virtuels.pdf"
            download="Cheatsheet_Environnements_Virtuels_Python_IEV.pdf"
            className="px-3.5 py-1.5 bg-[#E95420] hover:bg-[#d94612] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Télécharger le PDF</span>
          </a>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg text-xs font-bold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer</span>
          </button>
        </div>
      </div>

      {/* ================= PAGE 1 ================= */}
      <div className="space-y-3">
        {/* Page 1 Header Banner + Website Link & QR Code */}
        <div className="border-2 border-[#141417] rounded-xl overflow-hidden">
          <div className="bg-[#141417] text-white px-4 py-3 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E95420] text-white rounded">
                  CHEATSHEET DE RÉVISION
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  {COURSE_METADATA.code} • {COURSE_METADATA.institution} • Par {COURSE_METADATA.students}
                </span>
              </div>
              <h1 className="text-lg font-extrabold tracking-tight mt-1">
                Plongée dans les environnements virtuels Python
              </h1>
              <p className="text-[11px] text-zinc-300">
                Par <strong>{COURSE_METADATA.students}</strong> • Cours : {COURSE_METADATA.authors} (Polytech Lille)
              </p>
            </div>

            {/* Website Link & QR Code Box on First Page */}
            <div className="bg-white text-zinc-900 rounded-lg p-2 flex items-center gap-2.5 shrink-0 border border-zinc-300">
              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt="QR Code vers la plateforme interactive"
                  className="w-16 h-16 object-contain border border-zinc-200 rounded"
                />
              )}
              <div className="max-w-[165px]">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#E95420] flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> Version Interactive
                </div>
                <div className="text-[10px] text-zinc-700 leading-tight mt-0.5">
                  Simulateur de terminal &amp; exercices pratiques en ligne :
                </div>
                <div className="font-mono text-[9px] font-bold text-zinc-900 break-all mt-1 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                  {websiteUrl}
                </div>
              </div>
            </div>
          </div>

          {/* Compact Table of Contents Bar */}
          <div className="bg-[#FAF8F5] px-4 py-1.5 border-t border-zinc-200 flex flex-wrap items-center justify-between text-[10px] font-medium text-zinc-700">
            <span><strong>Sommaire :</strong></span>
            <span><strong>1.</strong> Shell CLI, Arborescence, PATH &amp; Inception</span>
            <span><strong>2.</strong> Packages, PyPI, pip, Graphe DAG &amp; SemVer</span>
            <span><strong>3.</strong> venv, requirements.txt &amp; virtualenv</span>
            <span><strong>4.</strong> pyproject.toml, lock, Poetry &amp; uv</span>
            <span><strong>5.</strong> Conda, Containers, VMs &amp; Décision</span>
          </div>
        </div>

        {/* SECTION 1 : SHELL, ARBORESCENCE & PATH */}
        <div className="border border-zinc-300 rounded-lg overflow-hidden avoid-break">
          <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E95420]" />
              1. Rappels Shell CLI, Arborescence, Variables d'environnement &amp; PATH
            </h2>
            <span className="text-[10px] font-mono text-zinc-300">Slides 6 à 18 • Bash / Zsh</span>
          </div>

          <div className="p-3 grid grid-cols-12 gap-3 text-[11px]">
            {/* Left 7 cols: Commands & Concepts */}
            <div className="col-span-7 space-y-2">
              <div className="grid grid-cols-3 gap-1.5 bg-[#FAF8F5] p-2 rounded border border-zinc-200">
                <div>
                  <strong className="text-zinc-900">Shell :</strong> interpréteur de commandes (<code className="font-mono">bash</code>, <code className="font-mono">zsh</code>).
                </div>
                <div>
                  <strong className="text-zinc-900">Terminal :</strong> programme d'interface exécutant un shell.
                </div>
                <div>
                  <strong className="text-zinc-900">Aide hors-ligne :</strong> <code className="font-mono text-[#E95420]">man ls</code> ou <code className="font-mono text-[#E95420]">ls --help</code> (utile en examen !).
                </div>
              </div>

              <table className="w-full border-collapse text-[10.5px]">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-800 border-b border-zinc-300">
                    <th className="p-1.5 text-left">Commande / Syntaxe</th>
                    <th className="p-1.5 text-left">Effet &amp; Points clés à retenir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">pwd / pwd --version</td>
                    <td className="p-1.5">Affiche le répertoire courant (<em>Print Working Directory</em>, écrit par Jim Meyering, GNU coreutils).</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">
                      cd /home/bcazaux/...<br />
                      cd ~/Documents/...<br />
                      cd ../../bcazaux/...
                    </td>
                    <td className="p-1.5">
                      • <strong>Chemin de la racine (absolu) :</strong> commence par <code className="font-mono">/</code>.<br />
                      • <strong>Chemin du home :</strong> commence par <code className="font-mono">~</code> (<code className="font-mono">/home/user</code>).<br />
                      • <strong>Chemin relatif :</strong> part du dossier courant (<code className="font-mono">..</code> remonte d'un cran).
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">printenv / env</td>
                    <td className="p-1.5">Affiche toutes les variables d'environnement définies dans la session.</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">echo $PATH</td>
                    <td className="p-1.5">Affiche la variable <code className="font-mono">PATH</code> (préfixe <code className="font-mono">$</code> obligatoire pour lire une variable).</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">export PATH="$PATH:/dir"</td>
                    <td className="p-1.5">Ajoute <code className="font-mono">/dir</code> au <code className="font-mono">PATH</code> (dossiers séparés par <code className="font-mono">:</code> sous Unix, parcourus dans l'ordre).</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">source ~/.bashrc</td>
                    <td className="p-1.5">Recharge immédiatement le fichier de config <code className="font-mono">~/.bashrc</code> dans le shell courant.</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">
                      bash / bash --norc<br />
                      echo $SHLVL / exit<br />
                      ps -f --forest
                    </td>
                    <td className="p-1.5">
                      <strong>Inception :</strong> <code className="font-mono">bash</code> ouvre un sous-shell (et exécute <code className="font-mono">.bashrc</code>, écrasant <code className="font-mono">PS1</code>). <code className="font-mono">bash --norc</code> ouvre un sous-shell <strong>sans lire <code className="font-mono">.bashrc</code></strong> (conserve <code className="font-mono">PS1="[\A] &gt; "</code>). <code className="font-mono">$SHLVL</code> donne la profondeur, <code className="font-mono">ps -f --forest</code> l'arbre des processus.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right 5 cols: Temporal Matrix & PATH warning */}
            <div className="col-span-5 flex flex-col justify-between space-y-2">
              <div className="border border-zinc-300 rounded p-2 bg-zinc-50">
                <div className="font-bold text-zinc-900 text-[10.5px] mb-1">
                  Portée temporelle d'un changement du <code className="font-mono text-[#E95420]">PATH</code> (TP <code className="font-mono">sl</code>) :
                </div>
                <table className="w-full text-[10px] border-collapse bg-white">
                  <thead>
                    <tr className="bg-zinc-800 text-white">
                      <th className="p-1 text-left">Action</th>
                      <th className="p-1 text-center">Passé<br /><span className="font-normal text-[8.5px]">(Déjà ouvert)</span></th>
                      <th className="p-1 text-center">Présent<br /><span className="font-normal text-[8.5px]">(Actuel)</span></th>
                      <th className="p-1 text-center">Futur<br /><span className="font-normal text-[8.5px]">(Nouveau)</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 border border-zinc-200">
                    <tr>
                      <td className="p-1 font-mono">export dans terminal</td>
                      <td className="p-1 text-center text-rose-600 font-bold">✗</td>
                      <td className="p-1 text-center text-emerald-600 font-bold">✓</td>
                      <td className="p-1 text-center text-rose-600 font-bold">✗</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-mono">export dans .bashrc</td>
                      <td className="p-1 text-center text-rose-600 font-bold">✗</td>
                      <td className="p-1 text-center text-rose-600 font-bold">✗</td>
                      <td className="p-1 text-center text-emerald-600 font-bold">✓</td>
                    </tr>
                    <tr className="bg-orange-50 font-semibold">
                      <td className="p-1 font-mono">.bashrc + source ~/.bashrc</td>
                      <td className="p-1 text-center text-rose-600 font-bold">✗</td>
                      <td className="p-1 text-center text-emerald-600 font-bold">✓</td>
                      <td className="p-1 text-center text-emerald-600 font-bold">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2 rounded bg-amber-50 border border-amber-300 text-[10px] text-amber-950">
                <strong className="flex items-center gap-1 text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#E95420]" /> Pièges fréquents à éviter :
                </strong>
                <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                  <li>Ne jamais écrire <code className="font-mono">export PATH=/mon/chemin</code> sans <code className="font-mono">$PATH:</code> (sinon <code className="font-mono">ls</code>, <code className="font-mono">python3</code> ne sont plus trouvés).</li>
                  <li>Attention à la casse Linux : toujours écrire <code className="font-mono font-bold">python3</code> en minuscules.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 : PACKAGES, PIP, SEMVER & CONFLITS */}
        <div className="border border-zinc-300 rounded-lg overflow-hidden avoid-break">
          <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E95420]" />
              2. Packages Python, PyPI, pip, Graphe des dépendances &amp; SemVer
            </h2>
            <span className="text-[10px] font-mono text-zinc-300">Slides 18 à 29 • PyPI &amp; SemVer</span>
          </div>

          <div className="p-3 grid grid-cols-12 gap-3 text-[11px]">
            <div className="col-span-6 space-y-2">
              <div className="bg-[#FAF8F5] p-2 rounded border border-zinc-200 space-y-1">
                <div>
                  <strong>PyPI (Python Package Index) :</strong> dépôt communautaire hébergeant :
                </div>
                <div className="pl-2">
                  • <strong>sdist (<code className="font-mono">*.tar.gz</code>) :</strong> code source compressé nécessitant une compilation locale.<br />
                  • <strong>wheel (<code className="font-mono">*.whl</code>) :</strong> paquet binaire précompilé prêt à l'emploi (rapide, sans compilateur).
                </div>
              </div>

              <table className="w-full border-collapse text-[10.5px]">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-800 border-b border-zinc-300">
                    <th className="p-1.5 text-left">Commande pip</th>
                    <th className="p-1.5 text-left">Rôle &amp; Distinction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">
                      pip install &lt;pkg&gt;<br />
                      python3 -m pip install &lt;pkg&gt;
                    </td>
                    <td className="p-1.5">Télécharge et installe un paquet et ses dépendances. (Sur les PC de l'école : bloqué hors d'un venv faute de droits admin).</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">pip --version / pip help</td>
                    <td className="p-1.5">Affiche la version, le chemin exact où est stocké <code className="font-mono">pip</code> et la version de Python liée.</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-mono font-bold text-[#E95420]">pip list vs pip freeze</td>
                    <td className="p-1.5">
                      • <code className="font-mono font-bold">pip list</code> : tableau formaté pour lecture humaine.<br />
                      • <code className="font-mono font-bold">pip freeze</code> : format strict <code className="font-mono">paquet==version</code> pour <code className="font-mono">requirements.txt</code>.
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="p-2 rounded bg-zinc-50 border border-zinc-200 text-[10px]">
                <strong>Graphe des dépendances (DAG sans cycle) &amp; Tri topologique :</strong><br />
                Pour installer <code className="font-mono">myapp</code>, <code className="font-mono">pip</code> ordonne les nœuds des feuilles vers la racine :<br />
                <code className="font-mono text-[#E95420] font-bold">pkg_e ──► pkg_f ──► pkg_b ──► pkg_a ──► pkg_c ──► pkg_d ──► myapp</code>.<br />
                <strong>Conflit en diamant :</strong> Si <code className="font-mono">myappconf</code> dépend de <code className="font-mono">pkg_a</code> (<code className="font-mono">pkg_c &lt; 2</code>) et <code className="font-mono">pkg_b</code> (<code className="font-mono">pkg_c &gt;= 2</code>) ──► <em>Enfer des dépendances</em> (installation impossible).
              </div>
            </div>

            <div className="col-span-6 space-y-2">
              <div className="bg-zinc-900 text-white p-2 rounded text-[10px] flex items-center justify-between">
                <span><strong>SemVer :</strong> <code className="text-rose-400">MAJEUR</code>.<code className="text-amber-300">MINEUR</code>.<code className="text-emerald-400">CORRECTIF</code></span>
                <span><code className="text-rose-400">2.0.0</code> (Cassant) • <code className="text-amber-300">1.11.0</code> (Ajout rétro.) • <code className="text-emerald-400">1.10.8</code> (Bugfix)</span>
              </div>

              {/* SemVer Table */}
              <table className="w-full text-[9.5px] border-collapse font-mono border border-zinc-300">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-900 border-b border-zinc-300">
                    <th className="p-1 text-left">Version</th>
                    {SEMVERS_MATRIX.constraints.map(c => (
                      <th key={c.expr} className="p-1 text-center">{c.expr}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {SEMVERS_MATRIX.versions.map((v, vIdx) => (
                    <tr key={v}>
                      <td className="p-0.5 px-1.5 font-bold bg-zinc-50">{v}</td>
                      {SEMVERS_MATRIX.constraints.map(c => (
                        <td key={c.expr} className="p-0.5 text-center">
                          {c.matches[vIdx] ? (
                            <span className="text-emerald-600 font-bold">●</span>
                          ) : (
                            <span className="text-rose-400">■</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-[9.5px] text-zinc-600">
                <strong>Règle de <code className="font-mono text-[#E95420]">~=</code> (compatible release) :</strong> <code className="font-mono">~=1.2</code> signifie <code className="font-mono">&gt;=1.2, &lt;2.0</code> ; <code className="font-mono">~=1.1.1</code> signifie <code className="font-mono">&gt;=1.1.1, &lt;1.2.0</code>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="page-break-before space-y-3 pt-2">
        {/* SECTION 3 : VENV, REQUIREMENTS.TXT & VIRTUALENV */}
        <div className="border border-zinc-300 rounded-lg overflow-hidden avoid-break">
          <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E95420]" />
              3. Environnements Virtuels Classiques : venv, requirements.txt &amp; virtualenv
            </h2>
            <span className="text-[10px] font-mono text-zinc-300">Slides 30 à 39 • Analogie : « La Lunch Box »</span>
          </div>

          <div className="p-3 grid grid-cols-12 gap-3 text-[11px]">
            <div className="col-span-7 space-y-2">
              <p className="text-[10.5px] text-zinc-700">
                <strong>Définition :</strong> Distribution Python <strong>isolée et autonome</strong> contenant une copie de Python et un dossier <code className="font-mono">site-packages</code> dédié. Permet d'installer des paquets sans droits admin et d'éviter les conflits entre projets (<code className="font-mono">numpy 1.0.0</code> vs <code className="font-mono">2.3.3</code>).
              </p>

              <table className="w-full border-collapse text-[10.5px]">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-800 border-b border-zinc-300">
                    <th className="p-1.5 text-left">Action</th>
                    <th className="p-1.5 text-left">Commande exacte &amp; Effet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-1.5 font-semibold">Créer un venv</td>
                    <td className="p-1.5 font-mono text-[#E95420] font-bold">python3 -m venv mon_env</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-semibold">Activer (Linux/macOS)</td>
                    <td className="p-1.5 font-mono text-[#E95420] font-bold">source mon_env/bin/activate</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-semibold">Désactiver</td>
                    <td className="p-1.5 font-mono text-[#E95420] font-bold">deactivate</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-semibold">Exporter les paquets</td>
                    <td className="p-1.5 font-mono text-[#E95420] font-bold">pip freeze &gt; requirements.txt</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-semibold">Installer requirements</td>
                    <td className="p-1.5 font-mono text-[#E95420] font-bold">pip install -r requirements.txt</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-semibold">Créer avec virtualenv</td>
                    <td className="p-1.5">
                      <code className="font-mono text-[#E95420] font-bold">virtualenv -p python3.11 myenv</code><br />
                      <span className="text-[10px] text-zinc-600">Permet de choisir n'importe quelle version de Python installée + seeder rapide en cache local.</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-semibold">Chaîner (Pipe)</td>
                    <td className="p-1.5 font-mono text-[#E95420] font-bold">cowsay -t "Bonjour !" -c tux | lolcat -a</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-span-5 space-y-2">
              <div className="bg-[#FAF8F5] p-2 rounded border border-zinc-200 text-[10px]">
                <strong className="text-zinc-900 block mb-1">Les 11 propriétés d'une « bonne Lunch Box » :</strong>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-zinc-700">
                  <span>1. Isolation des dépendances</span>
                  <span>2. Bonne pratique pro</span>
                  <span>3. Flexibilité</span>
                  <span>4. Portabilité</span>
                  <span>5. Simplicité de gestion</span>
                  <span>6. Frugalité (léger)</span>
                  <span>7. Compatibilité multi-versions</span>
                  <span>8. Reproductibilité</span>
                  <span>9. Facilité CI/CD</span>
                  <span>10. Sécurité (bac à sable)</span>
                  <span className="col-span-2">11. Nettoyage facile (supprimer et recréer)</span>
                </div>
              </div>

              <div className="bg-zinc-50 p-2 rounded border border-zinc-200 text-[10px]">
                <strong className="text-zinc-900">Pourquoi <code className="font-mono">virtualenv</code> vs <code className="font-mono">venv</code> ?</strong>
                <ul className="list-disc list-inside mt-0.5 text-zinc-700 space-y-0.5">
                  <li><strong>Seeder + cache local :</strong> installe <code className="font-mono">pip</code>, <code className="font-mono">setuptools</code>, <code className="font-mono">wheel</code> beaucoup plus vite.</li>
                  <li><strong>Multi-Python :</strong> option <code className="font-mono">-p python3.11</code>.</li>
                  <li><strong>Extensible &amp; Écosystème :</strong> <code className="font-mono">virtualenvwrapper</code> (<code className="font-mono">mkvirtualenv</code>, <code className="font-mono">workon</code>) centralise les envs ; <code className="font-mono">tox</code> automatise les tests multi-environnements.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4 : PYPROJECT.TOML, LOCK, POETRY & UV */}
        <div className="border border-zinc-300 rounded-lg overflow-hidden avoid-break">
          <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E95420]" />
              4. Gestion Moderne : pyproject.toml, lock, Poetry (= Cheffe de cuisine) &amp; uv
            </h2>
            <span className="text-[10px] font-mono text-zinc-300">Slides 40 à 51 • TOML • Souhait vs Réalité</span>
          </div>

          <div className="p-3 space-y-2.5 text-[11px]">
            {/* Top row: Limites requirements.txt + Triptyque */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-5 bg-rose-50/70 border border-rose-200 rounded p-2 text-[10px]">
                <strong className="text-rose-950 block mb-1">4 Limites de <code className="font-mono">requirements.txt</code> :</strong>
                <ol className="list-decimal list-inside space-y-0.5 text-rose-900">
                  <li>Si <code className="font-mono">matplotlib</code> n'a pas de version, laquelle mon collègue a-t-il utilisée ?</li>
                  <li>Faut-il vraiment bloquer <code className="font-mono">numpy==1.26.4</code> à la main si des correctifs sortent ?</li>
                  <li>Quelle est la version de <strong>Python</strong> requise par le projet ?</li>
                  <li>Quelles sont la version et les métadonnées du projet ?</li>
                </ol>
              </div>

              <div className="col-span-7 grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-emerald-50 border border-emerald-300">
                  <div className="font-mono font-bold text-emerald-950">1. pyproject.toml</div>
                  <div className="font-bold text-emerald-800 text-[9px] uppercase">« Ce qu'on voudrait »</div>
                  <p className="mt-1 text-emerald-900">Décrit nos envies, contraintes souples, métadonnées, <code className="font-mono">requires-python</code>. Vision idéale.</p>
                </div>
                <div className="p-2 rounded bg-sky-50 border border-sky-300">
                  <div className="font-mono font-bold text-sky-950">2. poetry.lock</div>
                  <div className="font-bold text-sky-800 text-[9px] uppercase">« Ce qui marche »</div>
                  <p className="mt-1 text-sky-900">Résout et fige les versions exactes de tous les paquets installés. Garantit la reproductibilité CI.</p>
                </div>
                <div className="p-2 rounded bg-rose-50 border border-rose-300">
                  <div className="font-mono font-bold text-rose-950">3. Env. Virtuel</div>
                  <div className="font-bold text-rose-800 text-[9px] uppercase">« L'exécution »</div>
                  <p className="mt-1 text-rose-900">Installe concrètement les binaires et paquets aux versions exactes du fichier <code className="font-mono">lock</code>.</p>
                </div>
              </div>
            </div>

            {/* Middle row: Structure pyproject.toml + Cycle de vie Poetry */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-5 bg-[#141417] text-zinc-200 p-2.5 rounded font-mono text-[9.5px] leading-snug">
                <div className="text-zinc-400"># Exemple pyproject.toml</div>
                <div className="text-amber-400">[build-system]</div>
                <div>requires = ["flit_core &gt;=3.2,&lt;4"]</div>
                <div className="text-amber-400 mt-1">[project]</div>
                <div>name = "notre-projet"</div>
                <div>version = "2.8.2"</div>
                <div>requires-python = "&gt;=3.9"</div>
                <div>dependencies = ["numpy==1.26.4", "matplotlib"]</div>
                <div className="text-amber-400 mt-1">[project.optional-dependencies]</div>
                <div>dev = ["pytest", "flake8", "mypy"]</div>
                <div>docs = ["sphinx&lt;6.0.0"]</div>
              </div>

              <div className="col-span-7">
                <table className="w-full border-collapse text-[10px]">
                  <thead>
                    <tr className="bg-zinc-100 text-zinc-900 border-b border-zinc-300">
                      <th className="p-1 text-left">Étape</th>
                      <th className="p-1 text-left">Commandes Poetry</th>
                      <th className="p-1 text-left">Action sur les fichiers / artefacts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-1 font-semibold">1. Démarrer</td>
                      <td className="p-1 font-mono font-bold text-[#E95420]">poetry new &lt;proj&gt; / poetry init</td>
                      <td className="p-1">Crée ou initialise <code className="font-mono">pyproject.toml</code></td>
                    </tr>
                    <tr>
                      <td className="p-1 font-semibold">2. Dépendances</td>
                      <td className="p-1 font-mono font-bold text-[#E95420]">poetry add requests</td>
                      <td className="p-1">Ajoute à <code className="font-mono">pyproject.toml</code> + met à jour <code className="font-mono">poetry.lock</code> + installe</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-semibold">3. Verrouillage</td>
                      <td className="p-1 font-mono font-bold text-[#E95420]">poetry lock / install / update</td>
                      <td className="p-1"><code className="font-mono">lock</code> résout ; <code className="font-mono">install</code> installe le lock ; <code className="font-mono">update</code> met à jour le lock</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-semibold">4. Développement</td>
                      <td className="p-1 font-mono font-bold text-[#E95420]">poetry shell / poetry run python -m ...</td>
                      <td className="p-1">Active le venv ou exécute une commande dedans</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-semibold">5 &amp; 6. Dist &amp; Pub</td>
                      <td className="p-1 font-mono font-bold text-[#E95420]">poetry build / poetry publish</td>
                      <td className="p-1">Construit <code className="font-mono">dist/</code> (<code className="font-mono">sdist</code> / <code className="font-mono">wheel</code>) et publie sur PyPI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PAGE 3 ================= */}
      <div className="page-break-before space-y-3 pt-2">
        {/* SECTION 5 : CONDA, CONTAINERS VS VMS & PYRAMIDE D'ISOLATION */}
        <div className="border border-zinc-300 rounded-lg overflow-hidden avoid-break">
          <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E95420]" />
              5. Au-delà de Python : Conda (= Cheffe à domicile), Containers &amp; Machines Virtuelles
            </h2>
            <span className="text-[10px] font-mono text-zinc-300">Slides 52 à 58 • Binaires système &amp; Isolation</span>
          </div>

          <div className="p-3 grid grid-cols-12 gap-3 text-[11px]">
            <div className="col-span-6 space-y-2">
              <div className="bg-amber-50/70 border border-amber-200 rounded p-2 text-[10px]">
                <strong className="text-amber-950 block mb-0.5">Pourquoi venv / Poetry ne suffisent pas toujours ?</strong>
                <ul className="list-disc list-inside text-amber-900 space-y-0.5">
                  <li><strong>Pas de dépendances système :</strong> n'installent pas les libs C/C++ externes (<code className="font-mono">libgdal</code>, <code className="font-mono">proj</code>, <code className="font-mono">ffmpeg</code>).</li>
                  <li><strong>Erreurs de compilation :</strong> échec de <code className="font-mono">pip install</code> si compilateur ou entêtes système absents.</li>
                  <li><strong>Solution Conda :</strong> résout selon <code className="font-mono">OS + arch + contraintes</code> (<code className="font-mono">linux-64</code>, <code className="font-mono">osx-64</code>, <code className="font-mono">win-64</code>) et télécharge des <strong>paquets binaires précompilés</strong> (Python + libs C) depuis <code className="font-mono">anaconda.org</code>.</li>
                </ul>
              </div>

              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-900 border-b border-zinc-300">
                    <th className="p-1 text-left">Étape</th>
                    <th className="p-1 text-left">Commande Conda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-1 font-semibold">Init. (.bashrc)</td>
                    <td className="p-1 font-mono text-[#E95420] font-bold">/usr/localTP/anaconda3/bin/conda init</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold">A. Lister envs</td>
                    <td className="p-1 font-mono text-[#E95420] font-bold">conda env list</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold">B. Créer env</td>
                    <td className="p-1 font-mono text-[#E95420] font-bold">conda create -n myenv python=3.12</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold">C. Activer</td>
                    <td className="p-1 font-mono text-[#E95420] font-bold">conda activate myenv</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold">D. Installer</td>
                    <td className="p-1 font-mono text-[#E95420] font-bold">conda install manim</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold">E. Désactiver</td>
                    <td className="p-1 font-mono text-[#E95420] font-bold">conda deactivate</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold">F. Supprimer</td>
                    <td className="p-1 font-mono text-[#E95420] font-bold">conda remove -n myenv --all</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-span-6 space-y-2">
              <div className="border border-zinc-300 rounded p-2 bg-zinc-50 text-[10px]">
                <strong className="text-zinc-900 block mb-1">Pyramide de l'isolation &amp; Poids mesuré (Python 3.9 + matplotlib) :</strong>
                <table className="w-full border-collapse bg-white text-[9.5px]">
                  <thead>
                    <tr className="bg-zinc-800 text-white">
                      <th className="p-1 text-left">Niveau &amp; Outils</th>
                      <th className="p-1 text-left">Type d'isolation</th>
                      <th className="p-1 text-right">Taille (Mo)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-1 font-bold">1. Virtual Envs (venv, Poetry)</td>
                      <td className="p-1">Logique (dépendances Python)</td>
                      <td className="p-1 text-right font-mono font-bold text-emerald-700">144 – 178 Mo</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">2. Conda Envs (Conda, Mamba)</td>
                      <td className="p-1">Logicielle (dépendances + binaires)</td>
                      <td className="p-1 text-right font-mono font-bold text-rose-700">370 – 1900 Mo</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">3. Containers (Docker, Podman)</td>
                      <td className="p-1">Système (noyau OS partagé)</td>
                      <td className="p-1 text-right font-mono font-bold text-amber-700">215 – 1134 Mo</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">4. Virtual Machines (VirtualBox, Vagrant)</td>
                      <td className="p-1">OS &amp; ressources virtuelles (Guest OS)</td>
                      <td className="p-1 text-right font-mono text-zinc-500">Plusieurs Go</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">5. Bare Metal (Machine distincte)</td>
                      <td className="p-1">Physique (aucun partage matériel)</td>
                      <td className="p-1 text-right font-mono text-zinc-500">Machine dédiée</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2 rounded bg-[#FAF8F5] border border-zinc-200 text-[10px]">
                <strong>Containers vs Machines Virtuelles :</strong><br />
                • <strong>Containers :</strong> <code className="font-mono">Infrastructure</code> ──► <code className="font-mono">Operating System</code> ──► <code className="font-mono">Container Engine</code> ──► <code className="font-mono">[Bin/Lib + App]</code>.<br />
                • <strong>VMs :</strong> <code className="font-mono">Infrastructure</code> ──► <code className="font-mono">Hypervisor</code> ──► <code className="font-mono">[Guest OS complet + Bin/Lib + App]</code>.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6 : COMPARATIF DES OUTILS & GUIDE DE DÉCISION */}
        <div className="border border-zinc-300 rounded-lg overflow-hidden avoid-break">
          <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E95420]" />
              6. Tableau Comparatif des Outils &amp; Guide de Décision Rapide
            </h2>
            <span className="text-[10px] font-mono text-zinc-300">Quel outil choisir selon votre besoin ?</span>
          </div>

          <div className="p-3 grid grid-cols-12 gap-3 text-[10px]">
            <div className="col-span-7">
              <table className="w-full border-collapse text-[9.5px] border border-zinc-200">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-900">
                    <th className="p-1 text-left">Outil</th>
                    <th className="p-1 text-center">Install Py</th>
                    <th className="p-1 text-center">Packages</th>
                    <th className="p-1 text-center">Build</th>
                    <th className="p-1 text-center">Upload</th>
                    <th className="p-1 text-center">Venvs</th>
                    <th className="p-1 text-center">Lockfile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {TOOLS_COMPARISON_TABLE.map(r => (
                    <tr key={r.tool} className={r.tool === 'uv' || r.tool === 'Poetry' ? 'bg-orange-50/60 font-bold' : ''}>
                      <td className="p-1 font-mono">{r.tool}</td>
                      {[r.installPy, r.installPkg, r.buildDist, r.uploadDist, r.manageVenv, r.lockFiles].map((b, i) => (
                        <td key={i} className="p-1 text-center">
                          {b ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 inline" />
                          ) : (
                            <X className="w-3 h-3 text-zinc-300 inline" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-span-5 flex flex-col justify-between bg-[#FAF8F5] p-2.5 rounded border border-zinc-200 space-y-1.5">
              <div className="font-bold text-zinc-900 text-[10.5px] border-b border-zinc-200 pb-1">
                🧭 Arbre de décision : Quel outil utiliser ?
              </div>
              <div>
                <strong className="text-[#E95420]">1. Petit script / TP rapide sans rien installer :</strong><br />
                ──► <code className="font-mono font-bold">python3 -m venv mon_env</code> + <code className="font-mono">requirements.txt</code>.
              </div>
              <div>
                <strong className="text-[#E95420]">2. Besoin de créer des venvs très vite ou choisir Python 3.11 :</strong><br />
                ──► <code className="font-mono font-bold">virtualenv -p python3.11 myenv</code> (ou <code className="font-mono font-bold">uv</code>).
              </div>
              <div>
                <strong className="text-[#E95420]">3. Projet logiciel structuré en équipe / package à publier :</strong><br />
                ──► <code className="font-mono font-bold">Poetry</code> (ou <code className="font-mono font-bold">uv</code>) avec <code className="font-mono">pyproject.toml</code> + <code className="font-mono">poetry.lock</code>.
              </div>
              <div>
                <strong className="text-[#E95420]">4. Data Science / Dépendances C/C++ lourdes (GDAL, Manim) :</strong><br />
                ──► <code className="font-mono font-bold">Conda</code> (<code className="font-mono">conda create -n myenv python=3.12</code>).
              </div>
              <div>
                <strong className="text-[#E95420]">5. Déploiement serveur / Isolation système multi-services :</strong><br />
                ──► <code className="font-mono font-bold">Docker Containers</code> (ou VM si noyau OS différent).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
