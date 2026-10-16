# Cheatsheet Interactive & Simulateur de Terminal — Initiation aux Environnements Virtuels Python (IEV)

**Cours :** *Plongée dans les environnements virtuels Python* (IEV — ISIA 2026–2027, Polytech Lille)  
**Enseignants :** Juliette Achddou & Bastien Cazaux  

Ce projet propose deux livrables complémentaires partageant la même identité visuelle (inspirée de Linux : *Charcoal `#141417`, Orange `#E95420`, Warm White `#FAF8F5`*), la même rigueur technique et une couverture à 100 % du support de cours (59 slides et 13 activités pratiques *« À vous de jouer »*) :

1. **Un site web interactif de révision et d'entraînement** comprenant une référence cherchable et filtrable par outil (`bash`, `pip`, `venv`, `virtualenv`, `poetry`, `conda`), des schémas interactifs, des quiz d'auto-évaluation, un guide de décision et un **simulateur de terminal sécurisé**.
2. **Une cheatsheet PDF standalone de 2 pages A4 (`public/cheatsheet_environnements_virtuels.pdf`)** conçue pour un ratio maximal *« informations / arbres trucidés »* (Slide 59), intégrant en première page un lien et un QR code dynamiques vers le site web.

---

## 🚀 1. Installation et lancement en local

### Prérequis
- **Node.js** (version 18+ ou 20+ recommandée) et **npm**.

### Commandes de démarrage
```bash
# 1. Se placer dans le dossier du projet
cd "/Users/lunaticrime/projet IEV"

# 2. Installer les dépendances (si ce n'est pas déjà fait)
npm install

# 3. Lancer le serveur de développement local
npm run dev
```
Ouvrez ensuite l'URL affichée dans le terminal (par défaut `http://localhost:5173`).

### Compiler pour la production
```bash
npm run build
npm run preview
```

---

## 🖥️ 2. Fonctionnalités du Simulateur de Terminal & Limitations

Le simulateur de terminal (`src/utils/terminalSimulator.ts`) est **sécurisé par conception (*safe-by-design*)** :
- **Aucune exécution réelle sur votre machine :** Toutes les commandes sont analysées par un parseur contrôlé à liste blanche (*allowlist*) qui manipule un système de fichiers virtuel en mémoire (`/home/etudiant/TPs/01_miniTP_aide`, `02_miniTP_path`, `04_miniTP_dependance/dist`, `11_miniTP_pyproject`, `12_miniTP_poetry`, `13_miniTP_conda`, etc.).
- **Parcours guidé des 13 Mini-TPs du cours :** Un panneau intégré au terminal valide en temps réel chacune des étapes des exercices du cours (TP 1 à TP 13).
- **Intégration directe avec la Cheatsheet :** Chaque carte de commande du cours dispose d'un bouton **« Tester dans le terminal »** qui injecte et exécute immédiatement l'exemple dans le simulateur.

### Commandes prises en charge dans le simulateur
| Catégorie | Commandes et options simulées |
| :--- | :--- |
| **Navigation & Aide** | `pwd`, `pwd --version`, `pwd --help`, `man pwd`, `man ls`, `ls`, `ls -a`, `ls --help`, `cd <chemin>`, `cat <fichier>`, `which <cmd>`, `help`, `clear`, `reset` |
| **Variables & Configuration Shell** | `printenv`, `env`, `echo $<VAR>`, `export VAR=VAL`, `export PATH="$PATH:/chemin"`, `source ~/.bashrc` |
| **Inception de Shells Bash** | `bash`, `bash --norc`, `echo $SHLVL`, `ps -f --forest`, `exit`, personnalisation de `PS1="[\A] > "` |
| **Gestionnaire `pip` & Graphe** | `pip --version`, `pip help`, `pip list`, `pip freeze`, `pip freeze > requirements.txt`, `pip install <pkg>`, `pip install -r requirements.txt`, `pip install dist/myapp-0.1.0-py3-none-any.whl` (tri topologique), `pip install dist/myappconf-0.1.0-py3-none-any.whl` (conflit en diamant) |
| **`venv` & `virtualenv`** | `python3 -m venv <nom>`, `source <nom>/bin/activate`, `deactivate`, `virtualenv -p python3.11 <nom>` |
| **Applications CLI de TP** | `sl` (après ajout de `/home/etudiant/TPs/02_miniTP_path/bin` au `PATH`), `cowsay -t "texte" [-c tux\|dragon\|kitty]`, `cowsay -h`, pipe vers `lolcat` (`cowsay -t "Bonjour !" \| lolcat`) |
| **Gestionnaire `Poetry`** | `poetry new <nom>`, `poetry init`, `poetry add <pkg>`, `poetry lock`, `poetry install`, `poetry update`, `poetry shell`, `poetry run python -m <module>`, `poetry build`, `poetry publish` |
| **Gestionnaire `Conda`** | `/usr/localTP/anaconda3/bin/conda init`, `conda env list`, `conda create -n <nom> python=3.12`, `conda activate <nom>`, `conda install <pkg>`, `conda deactivate`, `conda remove -n <nom> --all` |

### Limitations connues du simulateur
- Le simulateur ne lance pas de véritable interpréteur Python ni de téléchargement réseau PyPI/Anaconda : il simule de manière fidèle et déterministe les sorties, les états d'environnement (`PATH`, `SHLVL`, `PS1`, `VIRTUAL_ENV`) et les erreurs pédagogiques du cours (ex: interdiction d'utiliser `pip install` globalement sur la session de l'école tant qu'un environnement virtuel n'est pas activé).
- Les commandes Linux arbitraires hors du périmètre du cours (`vim`, `top`, `ssh`, `apt`, `rm -rf`, etc.) affichent un message explicatif invitant à taper `help`.

---

## 📄 3. Génération reproductible du PDF & Mise à jour du QR Code

Le fichier PDF standalone se trouve dans :
- `public/cheatsheet_environnements_virtuels.pdf` (accessible aussi depuis l'interface web via le bouton **« Cheatsheet PDF (A4) »**).

### Mettre à jour l'URL finale et régénérer le PDF après déploiement
Une fois le site déployé (sur Vercel, Netlify ou GitHub Pages) :
1. **Depuis l'interface Web :** Cliquez sur l'onglet **« Cheatsheet PDF (A4) »**, cliquez sur **« Modifier l'URL du QR Code »**, saisissez votre URL finale (le QR code se met à jour instantanément), puis cliquez sur **« Imprimer / Exporter PDF »**.
2. **Ou en ligne de commande via le script reproductible :**
   ```bash
   CHEATSHEET_URL="https://votre-url-finale.vercel.app" node scripts/generate-pdf.mjs
   ```

---

## 🌐 4. Déploiement public (Vercel / Netlify / GitHub Pages)

Le projet étant une application statique pure (React + TypeScript + Vite) sans backend ni base de données, il se déploie gratuitement en quelques secondes :
- **Vercel / Netlify :** Importez le dépôt Git ou glissez-déposez le dossier `dist/` généré par `npm run build`.
- **GitHub Pages :** Exécutez `npm run build` et publiez le contenu du dossier `dist/` (la configuration `base: './'` dans `vite.config.ts` permet un fonctionnement sur n'importe quel sous-chemin).
