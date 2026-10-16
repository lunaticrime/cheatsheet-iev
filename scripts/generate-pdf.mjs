import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import QRCode from 'qrcode';

const TARGET_URL = process.env.CHEATSHEET_URL || 'https://lunaticrime.github.io/cheatsheet-iev/';
const IS_PLACEHOLDER = false;

async function generate() {
  const qrDataUri = await QRCode.toDataURL(TARGET_URL, {
    width: 140,
    margin: 1,
    color: { dark: '#141417', light: '#FFFFFF' }
  });

  const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Cheatsheet — Plongée dans les environnements virtuels Python (Polytech Lille)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 5.5mm 7mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 7.8pt;
      line-height: 1.24;
      color: #141417;
      background: #FFFFFF;
    }

    code, pre, .mono, .cmd-text {
      font-family: 'JetBrains Mono', Menlo, Consolas, monospace;
      font-size: 7.1pt;
      font-variant-ligatures: none;
      font-feature-settings: "liga" 0, "calt" 0;
    }

    .page {
      width: 100%;
      height: 285mm;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page:last-child {
      page-break-after: auto;
    }

    .page-content {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    /* Header Banner */
    .banner {
      border: 1.5px solid #141417;
      border-radius: 7px;
      overflow: hidden;
    }

    .banner-top {
      background: #141417;
      color: #FFFFFF;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .badge-orange {
      background: #E95420;
      color: #FFFFFF;
      font-family: 'JetBrains Mono', monospace;
      font-size: 6.4pt;
      font-weight: 700;
      padding: 1.5px 5px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .banner-title {
      font-size: 12pt;
      font-weight: 800;
      margin-top: 2px;
      letter-spacing: -0.02em;
    }

    .banner-sub {
      font-size: 7pt;
      color: #D4D4D8;
      margin-top: 1px;
    }

    .qr-box {
      background: #FFFFFF;
      color: #141417;
      border-radius: 5px;
      padding: 4px 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid #E4E4E7;
      width: 225px;
      flex-shrink: 0;
    }

    .qr-box img {
      width: 46px;
      height: 46px;
      border: 1px solid #E4E4E7;
      border-radius: 3px;
      flex-shrink: 0;
    }

    .qr-label {
      font-size: 6.4pt;
      font-weight: 800;
      color: #E95420;
      text-transform: uppercase;
    }

    .qr-desc {
      font-size: 6.3pt;
      color: #3F3F46;
      line-height: 1.15;
      margin-top: 1px;
    }

    .qr-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 6pt;
      font-weight: 700;
      background: #FFF7ED;
      border: 1px solid #FDBA74;
      color: #9A3412;
      padding: 1px 3px;
      border-radius: 3px;
      margin-top: 2px;
      word-break: break-all;
    }

    .toc-bar {
      background: #FAF8F5;
      border-top: 1px solid #E4E4E7;
      padding: 3px 9px;
      font-size: 6.8pt;
      color: #3F3F46;
      display: flex;
      justify-content: space-between;
      gap: 6px;
    }

    /* Section Card */
    .section-card {
      border: 1px solid #D4D4D8;
      border-radius: 6px;
      overflow: hidden;
    }

    .section-header {
      background: #141417;
      color: #FFFFFF;
      padding: 3.5px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 7.6pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .section-header .dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #E95420;
      margin-right: 5px;
    }

    .section-header .meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 6.5pt;
      color: #A1A1AA;
      font-weight: 400;
      text-transform: none;
    }

    .section-body {
      padding: 5.5px 8px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 57% 41.6%;
      gap: 1.4%;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 32.4% 32.4% 32.4%;
      gap: 1.4%;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.1pt;
    }

    th {
      background: #F4F4F5;
      color: #18181B;
      text-align: left;
      padding: 2.5px 4px;
      border-bottom: 1px solid #D4D4D8;
      font-weight: 700;
    }

    td {
      padding: 2.3px 4px;
      border-bottom: 1px solid #E4E4E7;
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .cmd-text {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #C2410C;
      font-size: 6.9pt;
    }

    .callout {
      background: #FAF8F5;
      border: 1px solid #E4E4E7;
      border-radius: 4px;
      padding: 4px 6px;
      margin-bottom: 4px;
    }

    .callout-warn {
      background: #FFF7ED;
      border: 1px solid #FDBA74;
      border-left: 3px solid #E95420;
      border-radius: 4px;
      padding: 4px 6px;
      color: #7C2D12;
      font-size: 6.9pt;
    }

    .callout-green {
      background: #ECFDF5;
      border: 1px solid #6EE7B7;
      border-radius: 4px;
      padding: 4px 6px;
      color: #064E3B;
      font-size: 7pt;
    }

    .callout-blue {
      background: #F0F9FF;
      border: 1px solid #7DD3FC;
      border-radius: 4px;
      padding: 4px 6px;
      color: #0C4A6E;
      font-size: 7pt;
    }

    .callout-rose {
      background: #FFF1F2;
      border: 1px solid #FDA4AF;
      border-radius: 4px;
      padding: 4px 6px;
      color: #881337;
      font-size: 7pt;
    }

    .dark-code {
      background: #141417;
      color: #E4E4E7;
      border-radius: 4px;
      padding: 4.5px 7px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 6.6pt;
      line-height: 1.25;
    }

    .page-footer {
      padding-top: 3px;
      border-top: 1px solid #D4D4D8;
      display: flex;
      justify-content: space-between;
      font-size: 6.5pt;
      color: #71717A;
      font-family: 'JetBrains Mono', monospace;
    }

    .ok { color: #059669; font-weight: 800; text-align: center; }
    .ko { color: #E11D48; font-weight: 700; text-align: center; }
  </style>
</head>
<body>

  <!-- ======================= PAGE 1 ======================= -->
  <div class="page">
    <div class="page-content">
      <div class="banner">
        <div class="banner-top">
          <div>
            <div>
              <span class="badge-orange">CHEATSHEET DE RÉVISION</span>
              <span class="mono" style="font-size:6.6pt; color:#A1A1AA; margin-left:6px;">IEV - ISIA • Polytech Lille</span>
            </div>
            <div class="banner-title">Plongée dans les environnements virtuels Python</div>
            <div class="banner-sub">Cours : Juliette Achddou &amp; Bastien Cazaux • Shell CLI, PATH, pip, SemVer, venv, virtualenv, pyproject.toml, Poetry, uv, Conda, Docker &amp; VMs</div>
          </div>
          <div class="qr-box">
            <img src="${qrDataUri}" alt="QR Code" />
            <div>
              <div class="qr-label">▶ Site Web &amp; Simulateur CLI</div>
              <div class="qr-desc">Pratiquez toutes les commandes dans le terminal interactif :</div>
              <div class="qr-url">${IS_PLACEHOLDER ? '[URL À REMPLACER : ' + TARGET_URL + ']' : TARGET_URL}</div>
            </div>
          </div>
        </div>
        <div class="toc-bar">
          <span><strong>Sommaire :</strong></span>
          <span><strong>Page 1 :</strong> Ch.1 Shell CLI, Arborescence, PATH &amp; Inception • Ch.2 Packages, PyPI, pip, Graphe DAG, SemVer &amp; Conflits</span>
          <span><strong>Page 2 :</strong> Ch.3 venv, requirements.txt, virtualenv • Ch.4 pyproject.toml, lock, Poetry &amp; uv • Ch.5 Conda, Containers, VMs &amp; Décision</span>
        </div>
      </div>

      <!-- CHAPITRE 1 -->
      <div class="section-card">
        <div class="section-header">
          <div><span class="dot"></span>Chapitre 1 — Rappels sur les Shells CLI, Système de fichiers, Variables &amp; PATH</div>
          <span class="meta">Bash / Zsh • Racine /</span>
        </div>
        <div class="section-body grid-2">
          <div>
            <div class="callout">
              <strong>Shell vs Terminal vs Console :</strong> Le <strong>shell</strong> (<code>bash</code>, <code>zsh</code>) est le programme qui traite les commandes et renvoie un résultat (interface de l'OS). Le <strong>terminal</strong> est le programme d'interface qui exécute un shell. La <strong>console</strong> est un type particulier de terminal.
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width:37%;">Commande / Syntaxe</th>
                  <th>Effet, Options &amp; Détails du cours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cmd-text">man ls &nbsp;|&nbsp; ls --help</td>
                  <td>Manuel d'aide <strong>hors-ligne</strong> (disponible pendant les examens déconnectés !).</td>
                </tr>
                <tr>
                  <td class="cmd-text">pwd &nbsp;|&nbsp; pwd --version</td>
                  <td><em>Print Working Directory</em> : affiche le dossier courant (auteur : <strong>Jim Meyering</strong>, GNU coreutils).</td>
                </tr>
                <tr>
                  <td class="cmd-text">
                    cd /home/bcazaux/mes-secrets<br/>
                    cd ~/Documents/mes-examens/<br/>
                    cd ../../bcazaux/mes-secrets
                  </td>
                  <td>
                    • <strong>Chemin de la racine (absolu) :</strong> part de <code>/</code> (slash sous Linux).<br/>
                    • <strong>Chemin partant du home :</strong> part de <code>~</code> (<code>/home/user</code>).<br/>
                    • <strong>Chemin relatif :</strong> part du dossier courant (<code>..</code> remonte au dossier parent).
                  </td>
                </tr>
                <tr>
                  <td class="cmd-text">printenv &nbsp;|&nbsp; env</td>
                  <td>Affiche toutes les variables d'environnement définies dans la session courante.</td>
                </tr>
                <tr>
                  <td class="cmd-text">echo $PATH</td>
                  <td>Affiche une variable d'environnement (utiliser obligatoirement le préfixe <code>$</code>).</td>
                </tr>
                <tr>
                  <td class="cmd-text">export PATH="CH1:CH2:CH3"</td>
                  <td>Définit/modifie une variable pour la session. <code>PATH</code> est une liste de dossiers séparés par <code>:</code> parcourus dans l'ordre par le shell pour trouver les applications (<code>cowsay</code>, <code>sl</code>).</td>
                </tr>
                <tr>
                  <td class="cmd-text">source ~/.bashrc</td>
                  <td>Recharge immédiatement le fichier <code>~/.bashrc</code> dans la session courante sans rouvrir de terminal.</td>
                </tr>
                <tr>
                  <td class="cmd-text">
                    bash &nbsp;|&nbsp; bash --norc<br/>
                    echo $SHLVL &nbsp;|&nbsp; exit<br/>
                    ps -f --forest
                  </td>
                  <td>
                    <strong>Inception of Bash :</strong> <code>bash</code> ouvre un sous-shell ; <code>exit</code> le ferme. <code>$SHLVL</code> donne la profondeur d'imbrication ; <code>ps -f --forest</code> affiche l'arbre d'imbrication des shells.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:4px;">
            <div class="callout" style="margin-bottom:0;">
              <div style="font-weight:700; margin-bottom:2px;">Portée temporelle d'une modification du <code>PATH</code> :</div>
              <table>
                <thead>
                  <tr>
                    <th>Action réalisée</th>
                    <th style="text-align:center;">Passé<br/><span style="font-weight:400;font-size:6pt;">(Déjà ouvert)</span></th>
                    <th style="text-align:center;">Présent<br/><span style="font-weight:400;font-size:6pt;">(En cours)</span></th>
                    <th style="text-align:center;">Futur<br/><span style="font-weight:400;font-size:6pt;">(Nouveau)</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1. <code>export PATH=...</code> dans le terminal</td>
                    <td class="ko">✗</td>
                    <td class="ok">✓</td>
                    <td class="ko">✗</td>
                  </tr>
                  <tr>
                    <td>2. <code>export PATH=...</code> dans <code>.bashrc</code></td>
                    <td class="ko">✗</td>
                    <td class="ko">✗</td>
                    <td class="ok">✓</td>
                  </tr>
                  <tr style="background:#FFF7ED; font-weight:600;">
                    <td>3. Dans <code>.bashrc</code> + <code>source ~/.bashrc</code></td>
                    <td class="ko">✗</td>
                    <td class="ok">✓</td>
                    <td class="ok">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="dark-code">
              <div style="color:#F97316; font-weight:700; margin-bottom:1px;"># Pourquoi bash --norc conserve le prompt PS1 ?</div>
              <div>pseudo$ export PS1="[\A] &gt; "</div>
              <div>[14:32] &gt; bash &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#A1A1AA;"># Lit ~/.bashrc -&gt; réinitialise PS1 (pseudo$)</span></div>
              <div>pseudo$ exit</div>
              <div>[14:32] &gt; bash --norc <span style="color:#34D399;"># Ignore ~/.bashrc -&gt; garde [14:32] &gt;</span></div>
            </div>

            <div class="callout-warn">
              <strong>⚠️ 2 Pièges fréquents :</strong><br/>
              1. Toujours écrire <code>export PATH="$PATH:/mon/dossier"</code> (sans <code>$PATH:</code>, vous écrasez les chemins système et perdez <code>ls</code>, <code>python3</code>...).<br/>
              2. Sous Linux, respectez la casse : écrivez toujours <strong><code>python3</code></strong> en minuscules (jamais <code>Python3</code>).
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPITRE 2 -->
      <div class="section-card">
        <div class="section-header">
          <div><span class="dot"></span>Chapitre 2 — Packages Python, PyPI, pip, Graphe des dépendances, SemVer &amp; Conflits</div>
          <span class="meta">PyPI • sdist vs wheel • Tri topologique</span>
        </div>
        <div class="section-body grid-2">
          <div>
            <div class="callout">
              <strong>PyPI (Python Package Index) :</strong> Plateforme en ligne hébergeant les bibliothèques Python :<br/>
              • <strong>Paquets <code>sdist</code> (<code>*.tar.gz</code>) :</strong> code source compressé nécessitant une compilation locale.<br/>
              • <strong>Paquets <code>wheel</code> (<code>*.whl</code>) :</strong> fichier binaire prêt à l'emploi (installation rapide sans compilation).
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width:37%;">Commande pip</th>
                  <th>Rôle &amp; Distinction à connaître</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cmd-text">pip install black<br/>python3 -m pip install black</td>
                  <td>Installe un paquet et ses dépendances. <em>Note :</em> Sur le système de l'école, vous n'avez pas les droits admin pour installer globalement avec <code>pip</code> !</td>
                </tr>
                <tr>
                  <td class="cmd-text">pip --version &nbsp;|&nbsp; pip help</td>
                  <td>Affiche la version de <code>pip</code>, son chemin de stockage exact et la version de Python associée.</td>
                </tr>
                <tr>
                  <td class="cmd-text">pip list &nbsp;vs&nbsp; pip freeze</td>
                  <td>
                    • <strong><code>pip list</code> :</strong> tableau formaté pour la lecture humaine.<br/>
                    • <strong><code>pip freeze</code> :</strong> format strict <code>paquet==version</code> destiné à <code>requirements.txt</code>.
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="callout" style="margin-top:4px; margin-bottom:0;">
              <strong>Graphe des dépendances (DAG sans cycle) &amp; Tri topologique :</strong><br/>
              Un package A dépend de B si A a besoin de B. Ce graphe <strong>ne peut pas contenir de cycle</strong>. Pour trouver l'ordre d'installation, <code>pip</code> réalise un <strong>tri topologique</strong> :<br/>
              <span class="cmd-text">pkg_e ──► pkg_f ──► pkg_b ──► pkg_a ──► pkg_c ──► pkg_d ──► myapp</span><br/>
              <strong>Conflit en diamant &amp; Enfer des dépendances :</strong> <code>myappconf</code> dépend de <code>pkg_a</code> (qui exige <code>pkg_c &lt; 2</code>) ET de <code>pkg_b</code> (qui exige <code>pkg_c &gt;= 2</code>) ──► installation impossible !
            </div>
          </div>

          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:4px;">
            <div class="dark-code">
              <div style="color:#F97316; font-weight:700;">Semantic Versioning (SemVer) : MAJEUR.MINEUR.CORRECTIF</div>
              <div>• <span style="color:#34D399;font-weight:700;">CORRECTIF (1.10.7 ──► 1.10.8)</span> : Corrections d'anomalies rétrocompatibles</div>
              <div>• <span style="color:#FBBF24;font-weight:700;">MINEUR &nbsp;&nbsp;&nbsp;(1.10.8 ──► 1.11.0)</span> : Ajouts de fonctionnalités rétrocompatibles</div>
              <div>• <span style="color:#FB7185;font-weight:700;">MAJEUR &nbsp;&nbsp;&nbsp;(1.11.0 ──► 2.0.0)</span> &nbsp;: Changements NON rétrocompatibles</div>
            </div>

            <div class="callout" style="margin-bottom:0;">
              <div style="font-weight:700; margin-bottom:2px;">Délimitation des versions des dépendances :</div>
              <table class="mono" style="font-size:6.3pt;">
                <thead>
                  <tr>
                    <th>Version</th>
                    <th style="text-align:center;">==1.3.1</th>
                    <th style="text-align:center;">!=1.2.1</th>
                    <th style="text-align:center;">&gt;1.2.4</th>
                    <th style="text-align:center;">&lt;=1.2</th>
                    <th style="text-align:center;">~=1.2</th>
                    <th style="text-align:center;">~=1.1.1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>numpy 1.1.0</td><td class="ko">■</td><td class="ok">●</td><td class="ko">■</td><td class="ok">●</td><td class="ko">■</td><td class="ko">■</td></tr>
                  <tr><td>numpy 1.1.1 / 1.1.2</td><td class="ko">■</td><td class="ok">●</td><td class="ko">■</td><td class="ok">●</td><td class="ko">■</td><td class="ok">●</td></tr>
                  <tr><td>numpy 1.2.1</td><td class="ko">■</td><td class="ko">■</td><td class="ko">■</td><td class="ok">●</td><td class="ok">●</td><td class="ko">■</td></tr>
                  <tr><td>numpy 1.2.4</td><td class="ko">■</td><td class="ok">●</td><td class="ko">■</td><td class="ok">●</td><td class="ok">●</td><td class="ko">■</td></tr>
                  <tr><td>numpy 1.3.1</td><td class="ok">●</td><td class="ok">●</td><td class="ok">●</td><td class="ko">■</td><td class="ok">●</td><td class="ko">■</td></tr>
                  <tr><td>numpy 2.0.3 / 2.1.x / 3.1.0</td><td class="ko">■</td><td class="ok">●</td><td class="ok">●</td><td class="ko">■</td><td class="ko">■</td><td class="ko">■</td></tr>
                </tbody>
              </table>
              <div style="font-size:6.4pt; margin-top:2px; color:#3F3F46;">
                <strong>Opérateur compatible <code>~=</code> :</strong> <code>~=1.2</code> équivaut à <code>&gt;=1.2, &lt;2.0</code> &nbsp;|&nbsp; <code>~=1.1.1</code> équivaut à <code>&gt;=1.1.1, &lt;1.2.0</code>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Initiation aux Environnements Virtuels Python (IEV - Polytech Lille)</span>
      <span>Ratio Informations / Arbres Trucidés Maximisé • Page 1 / 2</span>
    </div>
  </div>

  <!-- ======================= PAGE 2 ======================= -->
  <div class="page">
    <div class="page-content">
      <!-- CHAPITRE 3 -->
      <div class="section-card">
        <div class="section-header">
          <div><span class="dot"></span>Chapitre 3 — Environnements Virtuels Classiques : venv, requirements.txt &amp; virtualenv</div>
          <span class="meta">Isolation par projet • Analogie : « La Lunch Box »</span>
        </div>
        <div class="section-body grid-2">
          <div>
            <div class="callout">
              <strong>Définition :</strong> Distribution Python <strong>isolée et autonome</strong> contenant une copie de Python + un dossier <code>site-packages</code> dédié. Permet d'installer des paquets avec <code>pip</code> sur les sessions de l'école et d'éviter les conflits entre projets (<code>env1</code> avec <code>numpy 1.0.0</code>, <code>env2</code> avec <code>numpy 2.3.3</code>).
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width:42%;">Commande</th>
                  <th>Rôle &amp; Pratique</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cmd-text">python3 -m venv mon_env</td>
                  <td>Crée un environnement virtuel avec <code>venv</code> (module standard inclus depuis Python 3.3, même version Python que celle appelée).</td>
                </tr>
                <tr>
                  <td class="cmd-text">source mon_env/bin/activate</td>
                  <td>Active l'environnement dans le shell courant. Pour le désactiver : <strong class="cmd-text">deactivate</strong>.</td>
                </tr>
                <tr>
                  <td class="cmd-text">pip freeze &gt; requirements.txt<br/>pip install -r requirements.txt</td>
                  <td>Exporte les dépendances à la racine du projet, puis les réinstalle en une seule fois dans un nouvel environnement (ex: pour <code>pokestat.py</code>).</td>
                </tr>
                <tr>
                  <td class="cmd-text">virtualenv -p python3.11 myenv</td>
                  <td>Crée un environnement avec <strong>n'importe quelle version de Python</strong> (2.x, 3.11...) + <strong>seeder ultra-rapide</strong> depuis un cache local (<code>pip</code>, <code>setuptools</code>, <code>wheel</code>).</td>
                </tr>
                <tr>
                  <td class="cmd-text">cowsay -t "Bonjour !" -c tux | lolcat -a</td>
                  <td>Chaîne la sortie de <code>cowsay</code> (personnages disponibles via <code>cowsay -h</code>) dans <code>lolcat</code> grâce au pipe <code>|</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:4px;">
            <div class="callout" style="margin-bottom:0;">
              <strong style="display:block; margin-bottom:2px;">Les 11 propriétés d'une « bonne Lunch Box » :</strong>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5px 6px; font-size:6.8pt;">
                <div>1. <strong>Isolation</strong> des dépendances</div>
                <div>2. <strong>Bonne pratique</strong> pro</div>
                <div>3. <strong>Flexibilité</strong> des modèles</div>
                <div>4. <strong>Portabilité</strong> du projet</div>
                <div>5. <strong>Simplicité</strong> de gestion</div>
                <div>6. <strong>Frugalité</strong> (léger : ~150 Mo)</div>
                <div>7. <strong>Compatibilité</strong> multi-versions</div>
                <div>8. <strong>Reproductibilité</strong> (recette)</div>
                <div>9. <strong>Facilité CI/CD</strong> (standardisé)</div>
                <div>10. <strong>Sécurité</strong> (test sans risque)</div>
                <div style="grid-column: span 2;">11. <strong>Nettoyage facile</strong> (jetable/remplaçable sans perdre son frigo)</div>
              </div>
            </div>

            <div class="callout" style="margin-bottom:0; font-size:6.9pt;">
              <strong>Écosystème <code>virtualenv</code> :</strong><br/>
              • <strong>Extensible :</strong> dépôt PyPI privé, préinstallation automatique (<code>pytest</code>, <code>black</code>).<br/>
              • <strong><code>virtualenvwrapper</code> :</strong> centralise les environnements (<code>mkvirtualenv</code>, <code>workon</code>).<br/>
              • <strong><code>tox</code> :</strong> crée plusieurs environnements et lance automatiquement les tests.
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPITRE 4 -->
      <div class="section-card">
        <div class="section-header">
          <div><span class="dot"></span>Chapitre 4 — Gestion Moderne : pyproject.toml, lock, Poetry (= Cheffe de cuisine) &amp; uv</div>
          <span class="meta">TOML • Résolution SAT • uv (Rust)</span>
        </div>
        <div class="section-body" style="display:flex; flex-direction:column; gap:4px;">
          <div class="grid-3">
            <div class="callout-rose">
              <strong>Pourquoi <code>requirements.txt</code> ne suffit pas ?</strong><br/>
              1. Pour <code>matplotlib</code> sans version, laquelle mon collègue a-t-il utilisée ?<br/>
              2. Faut-il figer <code>numpy==1.26.4</code> si d'autres versions sortent ?<br/>
              3. Quelle version de <strong>Python</strong> est utilisée ?<br/>
              4. Quelle est la version / auteur du projet ?
            </div>
            <div class="callout-green">
              <strong>1. <code>pyproject.toml</code> = LE SOUHAIT</strong><br/>
              Format <strong>TOML</strong> (<em>Tom's Obvious, Minimal Language</em>). Décrit nos envies et contraintes : <code>[build-system]</code>, <code>[project]</code> (<code>name</code>, <code>version</code>, <code>authors</code>, <code>requires-python = "&gt;=3.9"</code>, <code>dependencies</code>), <code>[project.optional-dependencies]</code> (<code>dev</code>, <code>docs</code>), <code>[tool.*]</code>.
            </div>
            <div class="callout-blue">
              <strong>2. <code>poetry.lock</code> = LA RÉALITÉ FIGÉE</strong><br/>
              Résout et fige une version précise et compatible de tous les paquets. Garantit la reproductibilité (CI, déploiement) : <em>la photo exacte de ce qui marche</em>.<br/>
              <strong>3. Env. Virtuel = L'EXÉCUTION</strong> concrète du lock.
            </div>
          </div>

          <div class="grid-2">
            <table>
              <thead>
                <tr>
                  <th style="width:25%;">Étape du cycle</th>
                  <th style="width:40%;">Commandes Poetry</th>
                  <th>Effet dans le flux Poetry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Démarrer</strong></td>
                  <td class="cmd-text">poetry new mon_projet &nbsp;|&nbsp; poetry init</td>
                  <td>Crée ou initialise <code>pyproject.toml</code></td>
                </tr>
                <tr>
                  <td><strong>2. Dépendances</strong></td>
                  <td class="cmd-text">poetry add requests</td>
                  <td>Ajoute à <code>pyproject.toml</code>, résout le lock et installe</td>
                </tr>
                <tr>
                  <td><strong>3. Verrouillage</strong></td>
                  <td class="cmd-text">poetry lock &nbsp;|&nbsp; install &nbsp;|&nbsp; update</td>
                  <td><code>lock</code> résout ; <code>install</code> installe le lock ; <code>update</code> met à jour</td>
                </tr>
                <tr>
                  <td><strong>4. Dev &amp; Run</strong></td>
                  <td class="cmd-text">poetry shell &nbsp;|&nbsp; poetry run python -m ...</td>
                  <td>Active le venv ou exécute une commande dedans</td>
                </tr>
                <tr>
                  <td><strong>5 &amp; 6. Dist/Pub</strong></td>
                  <td class="cmd-text">poetry build &nbsp;|&nbsp; poetry publish -u ... -p ...</td>
                  <td>Construit <code>dist/</code> (<code>sdist</code> / <code>wheel</code>) et publie sur PyPI</td>
                </tr>
              </tbody>
            </table>

            <div class="callout" style="margin-bottom:0;">
              <strong style="display:block; margin-bottom:2px;">Les concurrents de Poetry &amp; la révolution <code>uv</code> :</strong>
              <table style="font-size:6.3pt;">
                <thead>
                  <tr>
                    <th>Outil</th>
                    <th style="text-align:center;">Py</th>
                    <th style="text-align:center;">Pkgs</th>
                    <th style="text-align:center;">Build</th>
                    <th style="text-align:center;">Upload</th>
                    <th style="text-align:center;">Venv</th>
                    <th style="text-align:center;">Lock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="mono">venv / virtualenv</td><td class="ko">no</td><td class="ko">no</td><td class="ko">no</td><td class="ko">no</td><td class="ok">yes</td><td class="ko">no</td></tr>
                  <tr><td class="mono">pip</td><td class="ko">no</td><td class="ok">yes</td><td class="ok">yes</td><td class="ko">no</td><td class="ko">no</td><td class="ok">yes</td></tr>
                  <tr><td class="mono">Pipenv</td><td class="ko">no</td><td class="ok">yes</td><td class="ko">no</td><td class="ko">no</td><td class="ok">yes</td><td class="ok">yes</td></tr>
                  <tr style="background:#FFF7ED;font-weight:700;"><td class="mono">Poetry / PDM / Flit</td><td class="ko">no</td><td class="ok">yes</td><td class="ok">yes</td><td class="ok">yes</td><td class="ok">yes</td><td class="ok">yes</td></tr>
                  <tr><td class="mono">pyenv</td><td class="ok">yes</td><td class="ko">no</td><td class="ko">no</td><td class="ko">no</td><td class="ko">no</td><td class="ko">no</td></tr>
                  <tr style="background:#ECFDF5;font-weight:800;"><td class="mono" style="color:#E95420;">uv (Rust) / Pyflow</td><td class="ok">yes</td><td class="ok">yes</td><td class="ok">yes</td><td class="ok">yes</td><td class="ok">yes</td><td class="ok">yes</td></tr>
                </tbody>
              </table>
              <div style="font-size:6.3pt; margin-top:2px; color:#3F3F46;">
                ⚡ <strong>Benchmark (cache chaud) :</strong> <code>uv</code> (<strong>0.06s</strong>) vs <code>Poetry</code> (0.99s) vs <code>PDM</code> (1.90s) vs <code>pip-sync</code> (4.63s).
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAPITRE 5 -->
      <div class="section-card">
        <div class="section-header">
          <div><span class="dot"></span>Chapitre 5 — Au-delà de Python : Conda (= Cheffe à domicile), Containers, VMs &amp; Isolation</div>
          <span class="meta">Binaires système • Docker vs VM • Pyramide</span>
        </div>
        <div class="section-body grid-2">
          <div>
            <div class="callout-warn" style="margin-bottom:3px;">
              <strong>5 Limites des venvs classiques &amp; Poetry :</strong> 1. Pas de gestion des <strong>dépendances système</strong> (ex: <code>libgdal</code>, <code>proj</code>) • 2. Poetry reste centré sur Python • 3. Erreurs de compilation (compilateur/entêtes C absents lors du <code>pip install</code>) • 4. Pas de contrôle natif sur l'installation de Python • 5. Portabilité inter-machines limitée.
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width:45%;">Commandes Conda</th>
                  <th>Fonctionnement &amp; Rôle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cmd-text">/usr/localTP/anaconda3/bin/conda init</td>
                  <td>Initialise Conda dans le shell (à faire une première fois).</td>
                </tr>
                <tr>
                  <td class="cmd-text">A. conda env list</td>
                  <td>Liste tous les environnements Conda installés (ex: <code>base</code>, <code>mongoenv</code>).</td>
                </tr>
                <tr>
                  <td class="cmd-text">B. conda create -n myenv python=3.12</td>
                  <td>Télécharge Python 3.12 + paquets <strong>binaires précompilés</strong> depuis <code>anaconda.org</code> selon <code>OS + arch + contraintes</code> (<code>linux-64</code>, <code>osx-64</code>, <code>win-64</code>).</td>
                </tr>
                <tr>
                  <td class="cmd-text">C. conda activate myenv<br/>D. conda install manim</td>
                  <td>Active l'environnement et installe un paquet avec ses dépendances système natives (C/C++/FFmpeg/Cairo).</td>
                </tr>
                <tr>
                  <td class="cmd-text">E. conda deactivate &nbsp;|&nbsp; F. conda remove -n myenv --all</td>
                  <td>Désactive l'environnement courant (E) ou le supprime totalement (F).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:3px;">
            <div class="callout" style="margin-bottom:0;">
              <strong style="display:block; margin-bottom:2px;">Pyramide de l'isolation &amp; Poids mesuré (Python 3.9 + matplotlib) :</strong>
              <table style="font-size:6.5pt;">
                <thead>
                  <tr>
                    <th>Niveau &amp; Outils</th>
                    <th>Type d'isolation</th>
                    <th style="text-align:right;">Taille mesurée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>1. Virtual Envs</strong> (<code>venv</code>, <code>Poetry</code>)</td>
                    <td><strong>Logique</strong> (dépendances Python)</td>
                    <td class="mono" style="text-align:right;color:#059669;font-weight:700;">144 à 178 Mo</td>
                  </tr>
                  <tr>
                    <td><strong>2. Conda Envs</strong> (<code>Conda</code>, <code>Mamba</code>)</td>
                    <td><strong>Logicielle</strong> (dépendances + binaires)</td>
                    <td class="mono" style="text-align:right;color:#E11D48;font-weight:700;">370 à 1900 Mo</td>
                  </tr>
                  <tr>
                    <td><strong>3. Docker Containers</strong> (<code>Docker</code>, <code>Podman</code>)</td>
                    <td><strong>Système</strong> (noyau OS partagé)</td>
                    <td class="mono" style="text-align:right;color:#D97706;font-weight:700;">215 à 1134 Mo</td>
                  </tr>
                  <tr>
                    <td><strong>4. Virtual Machines</strong> (<code>VirtualBox</code>, <code>Vagrant</code>)</td>
                    <td><strong>OS &amp; ressources virtuelles</strong> (Guest OS)</td>
                    <td class="mono" style="text-align:right;">Plusieurs Go</td>
                  </tr>
                  <tr>
                    <td><strong>5. Bare Metal</strong> (Machine distincte)</td>
                    <td><strong>Physique</strong> (aucun partage matériel)</td>
                    <td class="mono" style="text-align:right;">Machine dédiée</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="dark-code" style="font-size:6.4pt;">
              <span style="color:#F97316;font-weight:700;">Containers vs VMs :</span><br/>
              • <strong>Containers :</strong> Infra ──► Host OS ──► <strong>Container Engine</strong> ──► [Bin/Lib + App] (Noyau partagé)<br/>
              • <strong>VMs :</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Infra ──► <strong>Hypervisor</strong> ──► [<strong>Guest OS complet</strong> + Bin/Lib + App]
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Initiation aux Environnements Virtuels Python (IEV - Polytech Lille)</span>
      <span>Ratio Informations / Arbres Trucidés Maximisé • Page 2 / 2</span>
    </div>
  </div>

</body>
</html>`;

  const outHtmlPath = path.resolve(process.cwd(), 'cheatsheet_print.html');
  const outPdfPath = path.resolve(process.cwd(), 'public/cheatsheet_environnements_virtuels.pdf');

  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });
  fs.writeFileSync(outHtmlPath, html, 'utf-8');

  const edgeBin = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
  try {
    execFileSync(edgeBin, [
      '--headless',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${outPdfPath}`,
      `file://${outHtmlPath}`
    ]);
    console.log('Successfully generated 2-page PDF:', outPdfPath);
  } catch (e) {
    console.log('Generated cheatsheet_print.html (Edge headless skipped):', outHtmlPath);
  }
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
