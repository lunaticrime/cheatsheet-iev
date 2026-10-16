export interface CommandCardData {
  id: string;
  tool: 'bash' | 'pip' | 'venv' | 'virtualenv' | 'poetry' | 'conda' | 'pyproject';
  command: string;
  syntax?: string;
  title: string;
  description: string;
  exampleCommand: string;
  expectedOutput: string;
  options?: { flag: string; meaning: string }[];
  pitfall?: string;
  osNote?: string;
  slideRef: string;
}

export interface ConceptBlock {
  id: string;
  title: string;
  subtitle: string;
  slideRef: string;
  summary: string;
  whyItMatters: string;
  keyPoints: { label: string; detail: string }[];
  distinctions?: { leftTitle: string; leftDesc: string; rightTitle: string; rightDesc: string };
}

export interface CourseModule {
  id: string;
  number: number;
  shortTitle: string;
  title: string;
  subtitle: string;
  slideRange: string;
  badgeColor: string;
  concepts: ConceptBlock[];
  commands: CommandCardData[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface GuidedExercise {
  id: number;
  title: string;
  slideRef: string;
  module: string;
  folder: string;
  scenario: string;
  steps: {
    instruction: string;
    hintCommand: string;
    explanation: string;
    checkId: string;
  }[];
}

export const COURSE_METADATA = {
  title: "Plongée dans les environnements virtuels Python",
  code: "IEV — ISIA",
  institution: "Polytech Lille",
  authors: "Juliette Achddou & Bastien Cazaux",
  purpose: "Cheatsheet interactive de révision & simulateur de terminal couvrant les environnements virtuels Python (Shell CLI, PATH, pip, SemVer, venv, virtualenv, pyproject.toml, Poetry, Conda, Containers & VMs).",
  defaultWebsiteUrl: "https://lunaticrime.github.io/cheatsheet-iev/"
};

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "module-1",
    number: 1,
    shortTitle: "Shell, Arborescence & PATH",
    title: "Module 1 — Rappels sur les Shells CLI, Système de fichiers & PATH",
    subtitle: "Comprendre comment le système d'exploitation interprète vos commandes, résout les chemins et trouve les exécutables.",
    slideRange: "Slides 6 à 18 (Pages 9–26)",
    badgeColor: "orange",
    concepts: [
      {
        id: "m1-c1",
        title: "Shell, Terminal et Console",
        subtitle: "L'interface en ligne de commande (CLI) du système d'exploitation",
        slideRef: "Slide 7/59",
        summary: "Chaque système d'exploitation (Linux, macOS, Windows) dispose d'un interpréteur capable de lire et d'exécuter des lignes de commande.",
        whyItMatters: "Activer un environnement virtuel modifie l'état de la session shell courante. Confondre le shell et le terminal empêche de comprendre pourquoi un environnement activé dans un onglet n'est pas actif dans un autre.",
        keyPoints: [
          { label: "Shell", detail: "Programme qui traite les commandes et renvoie un résultat (ex: Bash — Bourne Again Shell, zsh — Z Shell). Il fournit l'interface utilisateur du système d'exploitation." },
          { label: "Terminal", detail: "Programme d'interface (graphique ou texte) qui héberge et exécute un shell." },
          { label: "Console", detail: "Type particulier de terminal (historiquement relié directement au système)." },
          { label: "Aide hors-ligne", detail: "Les commandes `man <cmd>` et `<cmd> --help` sont disponibles sans connexion Internet (indispensables lors des examens déconnectés !)." }
        ]
      },
      {
        id: "m1-c2",
        title: "Système de fichiers (Filesystem) & Navigation",
        subtitle: "Arborescence depuis la racine `/` et types de chemins",
        slideRef: "Slides 8–9/59",
        summary: "Les fichiers et répertoires forment une arborescence appelée système de fichiers (filesystem), dont le point de départ sous Linux est la racine notée `/` (slash).",
        whyItMatters: "Pour activer un environnement (`source mon_env/bin/activate`) ou cibler un fichier (`requirements.txt`), il faut maîtriser la différence entre chemin absolu, relatif et depuis le dossier personnel (`~`).",
        keyPoints: [
          { label: "Chemin depuis la racine (absolu)", detail: "Part de `/` : ex. `cd /home/bcazaux/mes-secrets`. Fonctionne quel que soit le répertoire courant." },
          { label: "Chemin partant du home (`~`)", detail: "Utilise l'alias `~` du dossier personnel (`/home/<user>`) : ex. `cd ~/Documents/mes-examens/`." },
          { label: "Chemin relatif", detail: "Part du dossier courant (`pwd`) en utilisant `..` (parent) et `.` (courant) : ex. `cd ../../bcazaux/mes-secrets`." }
        ]
      },
      {
        id: "m1-c3",
        title: "Variables d'environnement, `PATH` et `.bashrc`",
        subtitle: "Comment le shell trouve vos programmes et comment rendre une configuration permanente",
        slideRef: "Slides 12–15/59",
        summary: "Une variable d'environnement est une valeur nommée dynamiquement qui influence l'exécution des processus en cours. La variable `PATH` contient la liste ordonnée des dossiers (séparés par `:` sous Unix) que le shell parcourt pour trouver les exécutables.",
        whyItMatters: "C'est exactement ainsi que fonctionnent `venv`, `Poetry` et `Conda` : activer un environnement virtuel place son dossier `bin/` en tête de la variable `PATH` !",
        keyPoints: [
          { label: "Variable `PATH`", detail: "Liste de chemins séparés par `:` sur Unix (`export PATH=PREMIER_CHEMIN:DEUXIEME_CHEMIN:DERNIER_CHEMIN`). Le premier dossier contenant l'exécutable l'emporte." },
          { label: "Portée d'un `export` direct", detail: "Valable uniquement pour la session courante (Présent). Perdu dès qu'on ferme le terminal ou dans un autre terminal." },
          { label: "Fichier `~/.bashrc`", detail: "Fichier de configuration de Bash exécuté automatiquement à chaque ouverture d'un nouveau shell interactif (Futur). Peut contenir variables d'environnement, alias et fonctions." },
          { label: "Commande `source ~/.bashrc`", detail: "Recharge immédiatement `.bashrc` dans le terminal en cours sans avoir à le fermer (Présent + Futur). N'affecte jamais les autres terminaux déjà ouverts (Passé)." }
        ]
      },
      {
        id: "m1-c4",
        title: "Inception de Shells (`bash`, `$SHLVL`, `--norc`)",
        subtitle: "Imbrication de sous-shells et héritage de l'environnement",
        slideRef: "Slides 16–17/59",
        summary: "Taper `bash` ouvre un shell enfant à l'intérieur du terminal actuel (`$SHLVL` augmente de 1). Taper `exit` ferme le shell en cours et revient au shell parent.",
        whyItMatters: "Certains outils comme `poetry shell` ouvrent un sous-shell. En outre, lancer `bash` normalement exécute `.bashrc` (qui peut écraser votre prompt `PS1`), tandis que `bash --norc` ignore `.bashrc`.",
        keyPoints: [
          { label: "`echo $SHLVL`", detail: "Affiche la profondeur d'imbrication du shell courant (1 = initial, 2 = premier sous-shell, etc.)." },
          { label: "`ps -f --forest`", detail: "Affiche l'arbre hiérarchique des processus et des shells imbriqués." },
          { label: "`bash` vs `bash --norc`", detail: "Si vous modifiez `export PS1=\"[\\A] > \"` puis lancez `bash`, `.bashrc` réinitialise `PS1` (`pseudo$`). Avec `bash --norc`, `.bashrc` n'est pas lu et le prompt `[14:32] >` est conservé !" }
        ]
      }
    ],
    commands: [
      {
        id: "cmd-cd-pwd",
        tool: "bash",
        command: "cd / pwd",
        syntax: "cd <chemin> | pwd",
        title: "Se déplacer et afficher le répertoire courant",
        description: "`pwd` (Print Working Directory) affiche le chemin absolu du répertoire courant. `cd` (Change Directory) permet de naviguer dans l'arborescence.",
        exampleCommand: "pwd && cd ~/TPs/01_miniTP_aide && pwd",
        expectedOutput: "/home/etudiant\n/home/etudiant/TPs/01_miniTP_aide",
        options: [
          { flag: "cd ~", meaning: "Retourne à la racine du dossier personnel (/home/etudiant)" },
          { flag: "cd ..", meaning: "Remonte au répertoire parent" },
          { flag: "pwd --version", meaning: "Affiche la version (GNU coreutils) et l'auteur (Jim Meyering)" }
        ],
        slideRef: "Slides 9–10/59"
      },
      {
        id: "cmd-man-help",
        tool: "bash",
        command: "man / --help",
        syntax: "man <commande> | <commande> --help",
        title: "Consulter le manuel hors-ligne d'une commande",
        description: "Affiche la documentation complète d'une commande directement dans le terminal, sans nécessiter d'accès Internet.",
        exampleCommand: "man pwd",
        expectedOutput: "PWD(1) — User Commands\nNAME: pwd - print name of current/working directory\nAUTHOR: Written by Jim Meyering.\nVERSION: pwd (GNU coreutils) 9.4",
        options: [
          { flag: "man <cmd>", meaning: "Ouvre les pages de manuel complètes (navigation avec flèches, quitter avec q)" },
          { flag: "<cmd> --help", meaning: "Affiche un résumé rapide des options directement dans la sortie standard" }
        ],
        pitfall: "Sur certaines commandes courtes (comme `cowsay`), l'option d'aide est `-h` au lieu de `--help`.",
        slideRef: "Slide 10/59"
      },
      {
        id: "cmd-env-export",
        tool: "bash",
        command: "printenv / env / echo / export",
        syntax: "printenv | echo $<VAR> | export <VAR>=<VALEUR>",
        title: "Lire et définir des variables d'environnement",
        description: "Permet d'inspecter toutes les variables (`printenv`/`env`), d'afficher une variable avec le préfixe `$`, ou de la définir/modifier pour la session courante et ses processus enfants (`export`).",
        exampleCommand: "echo $PATH",
        expectedOutput: "/usr/local/bin:/usr/bin:/bin",
        options: [
          { flag: "printenv / env", meaning: "Liste toutes les variables d'environnement actives" },
          { flag: "echo $VAR", meaning: "Affiche la valeur de la variable VAR (ne pas oublier le préfixe $)" },
          { flag: "export PATH=\"$PATH:/nouveau/dossier\"", meaning: "Ajoute un dossier à la fin du PATH sans écraser les chemins existants" }
        ],
        pitfall: "Faire `export PATH=/mon/dossier` sans inclure `$PATH:` écrase tout le PATH système : les commandes de base (`ls`, `cat`, `python3`) deviennent introuvables !",
        slideRef: "Slides 12–13/59"
      },
      {
        id: "cmd-source-bashrc",
        tool: "bash",
        command: "source ~/.bashrc",
        syntax: "source <fichier_config>",
        title: "Recharger la configuration du shell dans la session courante",
        description: "Exécute les commandes contenues dans `.bashrc` au sein du shell actuel afin d'appliquer immédiatement les nouvelles variables (`PATH`, alias) sans rouvrir de terminal.",
        exampleCommand: "source ~/.bashrc",
        expectedOutput: "[Configuration ~/.bashrc rechargée dans la session courante]",
        pitfall: "Modifier `.bashrc` sans faire `source ~/.bashrc` n'aura d'effet que dans les futurs terminaux ouverts, pas dans le terminal actuel.",
        slideRef: "Slides 14–15/59"
      },
      {
        id: "cmd-bash-inception",
        tool: "bash",
        command: "bash / bash --norc / exit",
        syntax: "bash [--norc] | echo $SHLVL | ps -f --forest | exit",
        title: "Gérer les shells imbriqués (Inception)",
        description: "Ouvre un sous-shell enfant (`bash`), vérifie la profondeur d'imbrication (`$SHLVL` ou `ps -f --forest`), ou ferme le sous-shell courant (`exit`).",
        exampleCommand: "echo $SHLVL && ps -f --forest",
        expectedOutput: "1\nUID   PID  PPID CMD\n1000 4102  4100 -bash\n1000 4189  4102  \\_ ps -f --forest",
        options: [
          { flag: "bash", meaning: "Lance un sous-shell interactif en exécutant ~/.bashrc" },
          { flag: "bash --norc", meaning: "Lance un sous-shell sans lire ~/.bashrc (préserve le prompt PS1 modifié)" },
          { flag: "exit", meaning: "Ferme le shell courant et remonte au shell parent" }
        ],
        pitfall: "Sur le slide 17, la commande est écrite `bash -norc` (un seul tiret), mais l'option standard GNU Bash (slide 16) est bien `bash --norc` (deux tirets).",
        slideRef: "Slides 16–17/59"
      }
    ],
    quiz: [
      {
        question: "Vous ajoutez `export PATH=\"$PATH:~/TPs/02_miniTP_path\"` dans votre fichier `.bashrc`, mais vous ne tapez pas `source ~/.bashrc`. Où la commande `sl` sera-t-elle utilisable ?",
        options: [
          "Uniquement dans les nouveaux terminaux ouverts dans le futur",
          "Dans le terminal actuel et dans les futurs terminaux",
          "Dans tous les terminaux déjà ouverts (passé, présent, futur)",
          "Nulle part car `.bashrc` n'est jamais lu automatiquement"
        ],
        correctIndex: 0,
        explanation: "Le fichier `.bashrc` est lu automatiquement à l'ouverture d'un nouveau shell interactif (Futur). Pour l'appliquer au terminal actuel (Présent), il faut exécuter `source ~/.bashrc`."
      },
      {
        question: "Pourquoi `export PS1=\"[\\A] > \"` suivi de `bash` réinitialise-t-il l'invite de commande, alors que `bash --norc` conserve `[14:32] > ` ?",
        options: [
          "Parce que `bash` exécute `.bashrc` qui redéfinit `PS1`, tandis que `--norc` empêche la lecture de `.bashrc`",
          "Parce que `PS1` ne peut jamais être exporté avec `export`",
          "Parce que `--norc` ouvre un terminal administrateur root",
          "Parce que `$SHLVL` est remis à zéro par `--norc`"
        ],
        correctIndex: 0,
        explanation: "Lorsqu'un shell interactif `bash` démarre normalement, il exécute `~/.bashrc` (qui contient souvent une définition par défaut de `PS1`). L'option `--norc` ignore `~/.bashrc`."
      }
    ]
  },
  {
    id: "module-2",
    number: 2,
    shortTitle: "Packages, pip, SemVer & Conflits",
    title: "Module 2 — Packages Python, PyPI, `pip`, SemVer & Enfer des dépendances",
    subtitle: "Installer des bibliothèques, comprendre le graphe des dépendances (tri topologique), le versionnage sémantique et les conflits.",
    slideRange: "Slides 18 à 29 (Pages 27–47)",
    badgeColor: "amber",
    concepts: [
      {
        id: "m2-c1",
        title: "PyPI (`sdist` vs `wheel`) et le gestionnaire `pip`",
        subtitle: "Où sont hébergés les paquets Python et comment les récupérer",
        slideRef: "Slides 20–22/59",
        summary: "PyPI (Python Package Index) est la plateforme officielle hébergeant les bibliothèques de la communauté. `pip` ('Pip Installs Packages') est l'outil officiel fourni avec Python 3 pour installer, mettre à jour et désinstaller ces paquets.",
        whyItMatters: "Comprendre la différence entre une archive source (`sdist`) et un binaire précompilé (`wheel`) explique pourquoi certaines installations `pip` échouent si un compilateur C est absent sur la machine.",
        keyPoints: [
          { label: "Paquet `sdist` (`*.tar.gz`)", detail: "Source Distribution : code source compressé qui nécessite souvent une étape de compilation locale lors de l'installation." },
          { label: "Paquet `wheel` (`*.whl`)", detail: "Fichier binaire précompilé prêt à l'emploi (ou presque), rapide à installer sans compilation." },
          { label: "Droits système à l'école", detail: "Sur les machines partagées de l'école, vous n'avez pas les droits administrateur pour installer des paquets globalement avec `pip` — d'où la nécessité d'un environnement virtuel !" }
        ],
        distinctions: {
          leftTitle: "pip list",
          leftDesc: "Affichage tabulaire pensé pour l'humain (colonnes Package / Version).",
          rightTitle: "pip freeze",
          rightDesc: "Affichage strict `package==version` prêt à être redirigé vers un fichier `requirements.txt`."
        }
      },
      {
        id: "m2-c2",
        title: "Graphe des dépendances & Tri topologique",
        subtitle: "Dans quel ordre `pip` installe-t-il les paquets ?",
        slideRef: "Slides 23–24/59",
        summary: "Un paquet A dépend d'un paquet B si A a besoin de B pour fonctionner (ex. `pandas` dépend de `numpy`, `python-dateutil`). Ces relations forment un graphe orienté sans cycle (DAG).",
        whyItMatters: "Pour installer `myapp`, `pip` doit d'abord installer les paquets feuilles dont tout le monde dépend. Il effectue un tri topologique sur le graphe des dépendances.",
        keyPoints: [
          { label: "Absence de cycle", detail: "Un graphe de dépendances valide ne peut pas contenir de cycle (A dépend de B qui dépend de A)." },
          { label: "Tri topologique (Exemple du cours)", detail: "Dans le TP 5 (`myapp` → `pkg_d` → `pkg_a`, `pkg_c`...), l'ordre d'installation valide obtenu par tri topologique est : `pkg_e` → `pkg_f` → `pkg_b` → `pkg_a` → `pkg_c` → `pkg_d` → `myapp`." }
        ]
      },
      {
        id: "m2-c3",
        title: "Semantic Versioning (SemVer) & Opérateurs de version",
        subtitle: "Convention `MAJEUR.MINEUR.CORRECTIF` et bornage des dépendances",
        slideRef: "Slides 25–26/59",
        summary: "Les paquets évoluent (corrections de bugs, nouvelles fonctionnalités, refontes). La convention SemVer structure chaque version sous la forme `MAJEUR.MINEUR.CORRECTIF` (ex. `numpy 1.10.7`).",
        whyItMatters: "Une mise à jour majeure peut casser votre projet. Délimiter les versions avec les bons opérateurs (`==`, `>=`, `<`, `~=`) protège contre les incompatibilités tout en acceptant les correctifs.",
        keyPoints: [
          { label: "CORRECTIF (Patch : `1.10.7` → `1.10.8`)", detail: "Corrections d'anomalies (bugs) strictement rétrocompatibles." },
          { label: "MINEUR (Minor : `1.10.8` → `1.11.0`)", detail: "Ajouts de fonctionnalités rétrocompatibles." },
          { label: "MAJEUR (Major : `1.11.0` → `2.0.0`)", detail: "Changements non rétrocompatibles (breaking changes)." },
          { label: "Opérateur de compatibilité `~=`", detail: "Autorise les mises à jour du dernier segment spécifié sans changer le segment supérieur : `~=1.2` équivaut à `>=1.2, <2.0` ; `~=1.1.1` équivaut à `>=1.1.1, <1.2.0`." }
        ]
      },
      {
        id: "m2-c4",
        title: "Conflits & L'Enfer des dépendances (Dependency Hell)",
        subtitle: "Quand les contraintes de versions deviennent mutuellement incompatibles",
        slideRef: "Slides 27–29/59",
        summary: "Lorsque deux paquets d'un même environnement exigent des versions incompatibles d'une même bibliothèque tierce, l'installation échoue : c'est l'enfer des dépendances (Tom Preston-Werner).",
        whyItMatters: "Sans environnement virtuel, installer tous ses projets (`myappA`, `myappB`, `myappC`, `myappD`) sur le Python global crée inévitablement des conflits insolubles sur `lib1` et `lib6`.",
        keyPoints: [
          { label: "Conflit en diamant (TP 6 — `myappconf`)", detail: "`myappconf` dépend de `pkg_a` (qui exige `pkg_c < 2`) ET de `pkg_b` (qui exige `pkg_c >= 2`). Aucune version de `pkg_c` ne peut satisfaire les deux simultanément : `myappconf` est impossible à installer !" },
          { label: "Conflit inter-projets (Slide 29)", detail: "Si `myappA` veut `lib1 < 2` et `myappB` veut `lib1 >= 2.4`, on ne peut pas les installer ensemble globalement, mais on peut les isoler dans `env1` et `env2`." }
        ]
      }
    ],
    commands: [
      {
        id: "cmd-pip-install",
        tool: "pip",
        command: "pip install",
        syntax: "pip install <package> | python3 -m pip install <package>",
        title: "Installer un paquet Python depuis PyPI ou une archive locale",
        description: "Télécharge et installe une bibliothèque et toutes ses dépendances en résolvant l'ordre topologique.",
        exampleCommand: "python3 -m pip install black",
        expectedOutput: "Collecting black\n  Downloading black-24.10.0-py3-none-any.whl\nInstalling collected packages: click, mypy-extensions, packaging, pathspec, platformdirs, black\nSuccessfully installed black-24.10.0",
        options: [
          { flag: "python3 -m pip install <pkg>", meaning: "Exécute le module pip rattaché explicitement à l'interpréteur python3 appelé (recommandé)" },
          { flag: "pip install -r requirements.txt", meaning: "Installe toutes les dépendances listées dans un fichier requirements.txt" },
          { flag: "pip install dist/myapp-0.1.0-py3-none-any.whl", meaning: "Installe un paquet wheel local" }
        ],
        pitfall: "Attention à la casse dans les slides : tapez toujours `python3 -m pip ...` en minuscules (et non `Python -m pip`).",
        slideRef: "Slide 21/59"
      },
      {
        id: "cmd-pip-inspect",
        tool: "pip",
        command: "pip --version / pip list / pip freeze",
        syntax: "pip --version | pip list | pip freeze",
        title: "Inspecter `pip` et lister les paquets installés",
        description: "Permet de vérifier quel `pip` est utilisé (son chemin révèle s'il appartient au système ou à un venv) et de lister les paquets présents.",
        exampleCommand: "pip --version && pip freeze",
        expectedOutput: "pip 24.0 from /usr/lib/python3/dist-packages/pip (python 3.12)\nnumpy==1.26.4\npandas==2.2.2",
        options: [
          { flag: "pip --version", meaning: "Affiche la version de pip, son dossier d'installation et la version de Python associée" },
          { flag: "pip help", meaning: "Affiche la liste des sous-commandes de pip (install, uninstall, list, freeze, show...)" },
          { flag: "pip list", meaning: "Tableau formaté pour la lecture humaine" },
          { flag: "pip freeze", meaning: "Sortie au format `paquet==version` (idéal pour générer `requirements.txt`)" }
        ],
        slideRef: "Slide 22/59"
      }
    ],
    quiz: [
      {
        question: "Selon la table de délimitation des versions du cours (Slide 26), quelles versions parmi `[1.1.0, 1.1.1, 1.1.2, 1.2.1, 1.3.1, 2.0.3]` sont autorisées par la contrainte `numpy~=1.1.1` ?",
        options: [
          "Uniquement 1.1.1 et 1.1.2 (soit >= 1.1.1 et < 1.2.0)",
          "1.1.1, 1.1.2, 1.2.1 et 1.3.1 (toute la branche 1.x)",
          "Toutes les versions supérieures ou égales à 1.1.1 (y compris 2.0.3)",
          "Uniquement la version 1.1.1"
        ],
        correctIndex: 0,
        explanation: "L'opérateur de version compatible `~=1.1.1` fixe le majeur et le mineur (`1.1.x`) tout en autorisant les correctifs `>= 1.1.1`. En revanche, `~=1.2` autorise `1.2.1`, `1.2.4` et `1.3.1` (`>= 1.2, < 2.0`)."
      },
      {
        question: "Pourquoi le paquet `myappconf` du TP 6 ne peut-il pas être installé ?",
        options: [
          "Ses dépendances `pkg_a` et `pkg_b` imposent des contraintes contradictoires sur `pkg_c` (`< 2` et `>= 2`)",
          "Le fichier `.whl` nécessite un compilateur C absent",
          "Le graphe contient un cycle entre `pkg_a` et `pkg_b`",
          "Il manque un fichier `.bashrc`"
        ],
        correctIndex: 0,
        explanation: "Dans un même environnement Python, une seule version de `pkg_c` peut être installée à la fois. Il est mathématiquement impossible de satisfaire `pkg_c < 2` et `pkg_c >= 2` simultanément."
      }
    ]
  },
  {
    id: "module-3",
    number: 3,
    shortTitle: "venv, requirements.txt & virtualenv",
    title: "Module 3 — Environnements Virtuels Classiques (`venv` & `virtualenv`)",
    subtitle: "Isoler ses projets Python dans des « lunch boxes » autonomes et partager ses dépendances avec `requirements.txt`.",
    slideRange: "Slides 30 à 39 (Pages 48–78)",
    badgeColor: "emerald",
    concepts: [
      {
        id: "m3-c1",
        title: "Qu'est-ce qu'un environnement virtuel ? (L'analogie de la Lunch Box)",
        subtitle: "Une distribution Python isolée et autonome par projet",
        slideRef: "Slides 30–31/59",
        summary: "Un environnement virtuel Python est une boîte isolée contenant une copie (ou un lien) de l'interpréteur Python ainsi qu'un dossier `site-packages` dédié où `pip` installe les bibliothèques sans affecter le système global.",
        whyItMatters: "Sur les sessions de l'école (sans droits root), créer un environnement virtuel vous donne immédiatement le droit d'installer n'importe quel paquet avec `pip` dans votre propre espace disque !",
        keyPoints: [
          { label: "1. Isolation des dépendances", detail: "Les paquets d'un projet ne se mélangent pas avec ceux des autres projets." },
          { label: "2. Compatibilité multi-versions", detail: "Un projet peut utiliser `numpy 1.0.0` et un autre `numpy 2.3.3` sur la même machine." },
          { label: "3. Frugalité & Nettoyage facile", detail: "Léger (pas besoin d'emporter tout le frigo) ; si l'environnement est cassé, on supprime le dossier et on le recrée." },
          { label: "4. Reproductibilité, Portabilité, Sécurité & CI/CD", detail: "Tester un paquet sans contaminer le système, partager une recette exacte et standardiser l'intégration continue." }
        ]
      },
      {
        id: "m3-c2",
        title: "Le module standard `venv` et `requirements.txt`",
        subtitle: "L'outil intégré à Python >= 3.3 et la liste des dépendances",
        slideRef: "Slides 32–34/59",
        summary: "Inclus par défaut depuis Python 3.3, `venv` crée un environnement utilisant la même version de Python que celle qui l'a généré. Associé à un fichier `requirements.txt` à la racine du projet, il permet de réinstaller toutes les dépendances en une commande.",
        whyItMatters: "Fournir un script `pokestat.py` seul oblige l'utilisateur à deviner les paquets manquants au fil des `ModuleNotFoundError`. Fournir `requirements.txt` automatise l'installation via `pip install -r requirements.txt`.",
        keyPoints: [
          { label: "Création", detail: "`python3 -m venv mon_env` crée le dossier `mon_env/` (contenant `bin/`, `lib/python3.x/site-packages/`, `pyvenv.cfg`)." },
          { label: "Activation & Désactivation", detail: "`source mon_env/bin/activate` préfixe le prompt par `(mon_env)` et pointe `python`/`pip` vers `mon_env/bin/`. `deactivate` restaure l'état initial." },
          { label: "Export & Réinstallation", detail: "`pip freeze > requirements.txt` sauvegarde l'état ; `pip install -r requirements.txt` le restaure dans un nouvel environnement." }
        ]
      },
      {
        id: "m3-c3",
        title: "`virtualenv` et son écosystème (`virtualenvwrapper`, `tox`)",
        subtitle: "Plus ancien, plus rapide (seeder + cache local) et multi-versions de Python",
        slideRef: "Slides 35–36/59",
        summary: "Contrairement à `venv` qui est lié à une version fixe de Python, l'outil CLI `virtualenv` est plus complet, plus rapide et permet de cibler n'importe quelle version de Python installée sur la machine (`-p python3.11`).",
        whyItMatters: "Indispensable lorsqu'on maintient des projets sur différentes versions de Python (ex. tester un code sous Python 3.9, 3.11 et 3.12) ou qu'on veut créer des environnements très rapidement hors-ligne grâce au cache local.",
        keyPoints: [
          { label: "Installation rapide (Seeder)", detail: "`virtualenv` utilise un *seeder* qui installe `pip`, `setuptools` et `wheel` depuis un cache local sans retélécharger." },
          { label: "Extensibilité", detail: "Peut être préconfiguré pour ajouter un dépôt PyPI privé ou préinstaller des outils communs (`pytest`, `black`)." },
          { label: "`virtualenvwrapper`", detail: "Centralise tous les environnements dans un dossier unique et fournit des commandes rapides (`mkvirtualenv`, `workon`)." },
          { label: "`tox`", detail: "Crée automatiquement plusieurs environnements virtuels pour lancer la suite de tests sur différentes versions de Python." }
        ],
        distinctions: {
          leftTitle: "venv (Module standard)",
          leftDesc: "Inclus dans Python >= 3.3, aucune installation requise, mais limité à la version de Python appelée et plus lent (pas de seeder en cache).",
          rightTitle: "virtualenv (Outil tiers)",
          rightDesc: "Choisit la version de Python (`-p`), très rapide grâce au seeder/cache local, extensible et intégré avec `virtualenvwrapper` / `tox`."
        }
      }
    ],
    commands: [
      {
        id: "cmd-venv-lifecycle",
        tool: "venv",
        command: "python3 -m venv / source activate / deactivate",
        syntax: "python3 -m venv <nom_env> && source <nom_env>/bin/activate",
        title: "Créer, activer et désactiver un environnement `venv`",
        description: "Cycle de vie complet d'un environnement virtuel standard sous Linux/macOS.",
        exampleCommand: "python3 -m venv mon_env && source mon_env/bin/activate",
        expectedOutput: "(mon_env) etudiant@polytech:~ $ which python\n/home/etudiant/mon_env/bin/python",
        options: [
          { flag: "python3 -m venv mon_env", meaning: "Crée le dossier mon_env avec une copie isolée de Python et site-packages" },
          { flag: "source mon_env/bin/activate", meaning: "Active l'environnement dans le shell Bash/Zsh courant" },
          { flag: "deactivate", meaning: "Quitte l'environnement virtuel et revient au Python système" }
        ],
        osNote: "Sous Linux/macOS : `source mon_env/bin/activate`. (Sous Windows CMD : `mon_env\\Scripts\\activate.bat`, PowerShell : `mon_env\\Scripts\\Activate.ps1`).",
        pitfall: "Ne commitez jamais le dossier `mon_env/` dans Git ! Ajoutez-le au `.gitignore` et ne partagez que `requirements.txt` ou `pyproject.toml`.",
        slideRef: "Slides 32, 37, 39/59"
      },
      {
        id: "cmd-requirements",
        tool: "pip",
        command: "pip freeze > requirements.txt / pip install -r",
        syntax: "pip freeze > requirements.txt | pip install -r requirements.txt",
        title: "Sauvegarder et réinstaller les dépendances d'un projet",
        description: "Exporte la liste exacte des paquets installés dans `requirements.txt` ou installe tous les paquets listés en une seule commande.",
        exampleCommand: "pip install -r requirements.txt",
        expectedOutput: "Collecting requests==2.31.0 (from -r requirements.txt (line 1))\nCollecting pandas==2.2.2 (from -r requirements.txt (line 2))\nSuccessfully installed requests-2.31.0 pandas-2.2.2",
        slideRef: "Slides 33–34/59"
      },
      {
        id: "cmd-virtualenv",
        tool: "virtualenv",
        command: "virtualenv -p",
        syntax: "virtualenv -p <version_python> <nom_env>",
        title: "Créer un environnement avec une version spécifique de Python",
        description: "Utilise `virtualenv` et son seeder rapide pour créer un environnement ciblant un interpréteur Python précis.",
        exampleCommand: "virtualenv -p python3.11 myenv",
        expectedOutput: "created virtual environment CPython3.11.9.final.0-64 in 142ms\n  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy)",
        options: [
          { flag: "-p python3.11", meaning: "Spécifie l'exécutable ou la version de Python à utiliser dans l'environnement" }
        ],
        slideRef: "Slides 35–36/59"
      },
      {
        id: "cmd-cowsay-lolcat",
        tool: "venv",
        command: "cowsay -t ... | lolcat",
        syntax: "cowsay -t \"<texte>\" [-c <personnage>] | lolcat [-a]",
        title: "Tester des paquets CLI installés dans un `venv` (TP 9 & 10)",
        description: "Démonstration pratique du cours : installer `cowsay` et `lolcat` dans un `venv`, puis rediriger la sortie de `cowsay` dans `lolcat` avec l'opérateur pipe `|`.",
        exampleCommand: "cowsay -t \"Bonjour !\" | lolcat",
        expectedOutput: "  _________\n| Bonjour ! |\n  =========\n         \\\n          \\\n            ^__^\n            (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||",
        options: [
          { flag: "cowsay -t \"texte\"", meaning: "Texte à faire dire au personnage" },
          { flag: "cowsay -h", meaning: "Affiche l'aide et la liste des personnages disponibles (daemon, dragon, kitty, tux, stegosaurus...)" },
          { flag: "cowsay -c tux -t \"...\"", meaning: "Change le personnage ASCII (ex: tux, dragon, kitty)" },
          { flag: "lolcat -a", meaning: "Active l'animation arc-en-ciel dans le terminal" }
        ],
        slideRef: "Slides 37–39/59"
      }
    ],
    quiz: [
      {
        question: "Quelle est la différence majeure entre `venv` et `virtualenv` soulignée dans le cours ?",
        options: [
          "`virtualenv` est plus rapide (seeder avec cache local), extensible et permet de choisir la version de Python (`-p`), tandis que `venv` est inclus dans la bibliothèque standard depuis Python 3.3",
          "`venv` gère les bibliothèques C/C++ système alors que `virtualenv` ne gère que Python",
          "`virtualenv` remplace `pyproject.toml` par un fichier `.bashrc`",
          "`venv` ne permet pas d'utiliser `pip install`"
        ],
        correctIndex: 0,
        explanation: "`venv` est intégré nativement à Python >= 3.3 mais dépend de l'installation Python qui l'appelle. `virtualenv` utilise un seeder en cache, est extensible et accepte `-p python3.x`."
      }
    ]
  },
  {
    id: "module-4",
    number: 4,
    shortTitle: "pyproject.toml, lock & Poetry",
    title: "Module 4 — Gestion Moderne : `pyproject.toml`, `poetry.lock`, `Poetry` & `uv`",
    subtitle: "Dépasser les limites de `requirements.txt` grâce au standard TOML, au verrouillage déterministe et aux gestionnaires de projets tout-en-un.",
    slideRange: "Slides 40 à 51 (Pages 79–111)",
    badgeColor: "purple",
    concepts: [
      {
        id: "m4-c1",
        title: "Les 4 limites majeures du fichier `requirements.txt`",
        subtitle: "Pourquoi `requirements.txt` ne suffit pas pour relancer un projet à l'identique (Slides 41–42)",
        slideRef: "Slides 41–42/59",
        summary: "Comme l'illustre le poème d'ouverture du cours (« Et nul ne comprend plus qui dépendra de quoi ! »), un simple fichier `requirements.txt` laisse planer des ambiguïtés critiques.",
        whyItMatters: "Sur le slide 42 (`numpy==1.26.4`, `pandas>=2.2.0`, `matplotlib`, `scikit-learn~=1.5.0`, `requests<3.0`), impossible de garantir que deux collègues auront le même environnement.",
        keyPoints: [
          { label: "1. Versions non précisées", detail: "Pour `matplotlib` (sans contrainte), quelle version exacte votre collègue a-t-il utilisée ?" },
          { label: "2. Rigidité vs mises à jour", detail: "Veut-on vraiment figer `numpy==1.26.4` à la main dans nos souhaits si des correctifs sortent, ou mélanger dépendances directes et sous-dépendances issues de `pip freeze` ?" },
          { label: "3. Version de Python inconnue", detail: "`requirements.txt` n'indique nulle part quelle version de Python (`3.9` ? `3.12` ?) est requise." },
          { label: "4. Absence de métadonnées projet", detail: "Aucune information sur le nom, la version du projet, les auteurs, ou la séparation entre dépendances de production, de `dev` (`pytest`, `flake8`) et de `docs` (`sphinx`)." }
        ]
      },
      {
        id: "m4-c2",
        title: "Le fichier `pyproject.toml` (Standard TOML)",
        subtitle: "Tom's Obvious, Minimal Language — un fichier unique pour tout configurer",
        slideRef: "Slides 43–45/59",
        summary: "Créé par Tom Preston-Werner (le même co-fondateur de GitHub qui a théorisé l'enfer des dépendances !), TOML est un format de configuration lisible par les humains et les machines. `pyproject.toml` centralise les métadonnées, les contraintes de dépendances et la configuration des outils.",
        whyItMatters: "Plus besoin de multiplier les fichiers (`requirements.txt`, `setup.py`, `pytest.ini`, `.flake8`). Tout est déclaré proprement dans `pyproject.toml`.",
        keyPoints: [
          { label: "`[build-system]`", detail: "Définit l'outil de construction du paquet (ex. `flit_core`, `poetry-core`, `setuptools`)." },
          { label: "`[project]`", detail: "Métadonnées : `name`, `version`, `description`, `authors`, `readme`, `requires-python = \">=3.9\"`, et `dependencies = [...]`." },
          { label: "`[project.optional-dependencies]`", detail: "Groupes optionnels : `stats` (`scipy`), `dev` (`pytest`, `flake8`, `mypy`), `docs` (`sphinx`)." },
          { label: "`[tool.<outil>]`", detail: "Configuration spécifique aux outils (ex. `[tool.poetry]`, `[tool.pytest.ini_options]`, `[tool.flit.sdist]`)." }
        ]
      },
      {
        id: "m4-c3",
        title: "Le Triptyque : Souhait (`pyproject.toml`) vs Réalité (`poetry.lock`) vs Exécution (`venv`)",
        subtitle: "On décrit ce qu'on voudrait, on fixe exactement ce qui marche, on l'exécute dans un environnement",
        slideRef: "Slide 46/59",
        summary: "Même avec `pyproject.toml`, si une dépendance est déclarée sans borne stricte (`matplotlib`), il faut un second fichier généré automatiquement pour garantir la reproductibilité absolue : le fichier `lock`.",
        whyItMatters: "C'est la distinction fondamentale du cours (Slide 46) : `pyproject.toml` exprime vos contraintes souples, `poetry.lock` fige la résolution exacte, et l'environnement virtuel l'exécute.",
        keyPoints: [
          { label: "1. `pyproject.toml` (Le Souhait)", detail: "Décrit nos envies et contraintes (versions minimales ou bornées, métadonnées). C'est la vision idéale du projet." },
          { label: "2. `poetry.lock` (La Réalité figée)", detail: "Résout et fige une version précise et compatible de chaque paquet et sous-paquet. Garantit la reproductibilité (CI, collègues). C'est la photo exacte de ce qui marche." },
          { label: "3. Environnement virtuel (L'Exécution)", detail: "Installe concrètement les binaires Python et les paquets aux versions exactes dictées par le fichier `lock`." }
        ]
      },
      {
        id: "m4-c4",
        title: "Poetry (= une cheffe de cuisine) & ses concurrents (`uv`, `PDM`, `Pipenv`...)",
        subtitle: "Cycle de vie complet d'un projet Python moderne et essor de `uv`",
        slideRef: "Slides 47–51/59",
        summary: "Comme une cheffe de cuisine qui prépare ses recettes (`pyproject.toml` / `poetry.lock`) dans des lunch boxes séparées (environnements virtuels), Poetry orchestre tout le cycle de vie du projet : initialisation, ajout de paquets, résolution, exécution, build (`sdist`/`wheel`) et publication sur PyPI.",
        whyItMatters: "Poetry remplace à lui seul `venv` + `pip` + `pip-tools` + `build` + `twine`. Et dans l'écosystème récent (Slide 50), **`uv`** (écrit en Rust par Astral) coche absolument toutes les cases (y compris l'installation de Python lui-même !) en étant 10 à 80x plus rapide.",
        keyPoints: [
          { label: "Flux des artefacts Poetry (Slide 47)", detail: "`pyproject.toml` —(résout)→ `poetry.lock` —(installe)→ `Environnement virtuel` —(construit)→ `dist (sdist ou wheel)`." },
          { label: "Poetry vs `uv` vs `Pyflow`", detail: "Sur le tableau comparatif de 18 outils (Slide 50), `Poetry`, `Flit` et `PDM` gèrent tout sauf l'installation de Python (`Install Python = no`). Seuls **`uv`** et `Pyflow` cochent **yes** aux 6 colonnes !" }
        ]
      }
    ],
    commands: [
      {
        id: "cmd-poetry-init-add",
        tool: "poetry",
        command: "poetry new / poetry init / poetry add",
        syntax: "poetry new <projet> | poetry init | poetry add <paquet>",
        title: "1 & 2. Démarrer un projet Poetry et ajouter des dépendances",
        description: "Crée un nouveau projet complet (`new`), initialise un `pyproject.toml` dans un dossier existant (`init`), ou ajoute une dépendance (`add`) en mettant à jour `pyproject.toml`, `poetry.lock` et l'environnement virtuel.",
        exampleCommand: "poetry add requests",
        expectedOutput: "Using version ^2.32.3 for requests\nUpdating dependencies\nResolving dependencies... (0.4s)\nWriting lock file\nPackage operations: 5 installs, 0 updates, 0 removals\n  - Installing certifi (2024.8.30)\n  - Installing urllib3 (2.2.3)\n  - Installing requests (2.32.3)",
        options: [
          { flag: "poetry new mon_projet", meaning: "Crée l'arborescence complète d'un nouveau projet avec pyproject.toml" },
          { flag: "poetry init", meaning: "Initialise interactivement un fichier pyproject.toml dans le dossier existant" },
          { flag: "poetry add <pkg>", meaning: "Ajoute un paquet dans pyproject.toml, résout poetry.lock et l'installe" }
        ],
        slideRef: "Slides 47–48/59"
      },
      {
        id: "cmd-poetry-lock-install",
        tool: "poetry",
        command: "poetry lock / poetry install / poetry update",
        syntax: "poetry lock | poetry install | poetry update",
        title: "3. Résoudre, verrouiller et installer l'environnement",
        description: "Synchronise le fichier de verrouillage `poetry.lock` et l'environnement virtuel du projet.",
        exampleCommand: "poetry install",
        expectedOutput: "Installing dependencies from lock file\nPackage operations: 3 installs, 0 updates, 0 removals\n  - Installing numpy (1.26.4)\n  - Installing pandas (2.2.2)\n  - Installing matplotlib (3.9.2)\nInstalling the current project: notre-projet (2.8.2)",
        options: [
          { flag: "poetry lock", meaning: "Résout les dépendances de pyproject.toml et génère/met à jour poetry.lock sans les installer" },
          { flag: "poetry install", meaning: "Lit poetry.lock (ou le crée s'il n'existe pas) et installe les versions exactes dans le venv" },
          { flag: "poetry update", meaning: "Recalcule les dernières versions autorisées par pyproject.toml, met à jour poetry.lock et installe" }
        ],
        slideRef: "Slide 47/59"
      },
      {
        id: "cmd-poetry-run-shell",
        tool: "poetry",
        command: "poetry shell / poetry run",
        syntax: "poetry shell | poetry run python -m <module> [args]",
        title: "4, 5 & 6. Exécuter du code, construire (`build`) et publier (`publish`)",
        description: "Exécute une commande dans l'environnement isolé de Poetry sans avoir à chercher le chemin du `venv`, ou génère les archives `.tar.gz` / `.whl`.",
        exampleCommand: "poetry run python -m show_ade 4YMHMH-120",
        expectedOutput: "[Exécution dans l'environnement Poetry show-ade-py3.12]\nRécupération de l'emploi du temps ADE pour la ressource 4YMHMH-120...\n✓ 4 créneaux trouvés (Machine Learning, IEV, NoSQL, ANO).",
        options: [
          { flag: "poetry shell", meaning: "Active un sous-shell interactif dans l'environnement virtuel géré par Poetry" },
          { flag: "poetry run <cmd>", meaning: "Exécute ponctuellement une commande (ex: python, pytest) dans l'environnement virtuel" },
          { flag: "poetry build", meaning: "Construit les distributions sdist (.tar.gz) et wheel (.whl) dans le dossier dist/" },
          { flag: "poetry publish -u <user> -p <pass>", meaning: "Publie les archives construites sur PyPI" }
        ],
        slideRef: "Slides 47–48/59"
      }
    ],
    quiz: [
      {
        question: "Dans l'architecture Poetry (Slides 46–47), quel fichier garantit que toute l'équipe et le serveur CI/CD installent exactement la même version de `matplotlib` même si `pyproject.toml` contient seulement `\"matplotlib\"` ?",
        options: [
          "Le fichier `poetry.lock`",
          "Le fichier `.bashrc`",
          "Le dossier `dist/`",
          "La section `[build-system]` de `pyproject.toml`"
        ],
        correctIndex: 0,
        explanation: "`pyproject.toml` décrit le souhait (les contraintes souples), tandis que `poetry.lock` fige la photo exacte de toutes les versions résolues. `poetry install` lit `poetry.lock` en priorité."
      },
      {
        question: "Parmi les outils comparés au Slide 50, quel gestionnaire écrit en Rust se distingue par sa vitesse extrême (0.06s contre 0.99s pour Poetry) et sa capacité à installer Python lui-même en plus des paquets, des environnements virtuels et des lockfiles ?",
        options: [
          "uv",
          "pip-tools",
          "twine",
          "virtualenvwrapper"
        ],
        correctIndex: 0,
        explanation: "`uv` (développé par Astral en Rust) coche les 6 fonctionnalités du tableau comparatif (Install Python, Install packages, Build, Upload, Manage virtual environments, Lock files) avec des performances ~15x à 80x supérieures."
      }
    ]
  },
  {
    id: "module-5",
    number: 5,
    shortTitle: "Conda, Containers & Isolation",
    title: "Module 5 — Au-delà de Python : `Conda`, Containers Docker & Machines Virtuelles",
    subtitle: "Gérer les bibliothèques système non-Python (C/C++/CUDA/GDAL) et situer les environnements virtuels dans la pyramide de l'isolation.",
    slideRange: "Slides 52 à 59 (Pages 112–126)",
    badgeColor: "cyan",
    concepts: [
      {
        id: "m5-c1",
        title: "Les 5 limites des environnements virtuels classiques (`venv`, `virtualenv`, `Poetry`)",
        subtitle: "Pourquoi un environnement purement Python ne suffit pas toujours en Data Science",
        slideRef: "Slide 52/59",
        summary: "Les outils classiques (`venv`, `virtualenv`, `Poetry`) n'isolent que les paquets Python. Dès qu'un module Python s'appuie sur des bibliothèques système natives (C, C++, Fortran), leurs limites apparaissent :",
        whyItMatters: "En Machine Learning, Géomatique ou Animation scientifique (`manim`, `gdal`, `proj`, `numba`), installer avec `pip` échoue souvent si les bibliothèques C système ne sont pas déjà installées sur l'OS.",
        keyPoints: [
          { label: "1. Pas de gestion des dépendances système", detail: "`venv` et `virtualenv` n'installent pas les bibliothèques externes non-Python (ex. `libgdal`, `proj`, `ffmpeg`)." },
          { label: "2. Poetry reste centré sur Python", detail: "Il résout parfaitement les versions Python, mais ne règle pas les problèmes d'environnement natif." },
          { label: "3. Problèmes de compilation", detail: "Certains paquets (`sdist`) nécessitent un compilateur C/C++ et des fichiers d'entêtes système (`.h`) absents lors du `pip install`." },
          { label: "4. Pas de contrôle fin natif sur l'installation de Python", detail: "Avec `venv`/`Poetry`, il faut installer manuellement Python 3.9, 3.10, 3.11 sur sa machine avant de pouvoir les utiliser." },
          { label: "5. Reproductibilité inter-OS limitée", detail: "Même avec `requirements.txt` ou `poetry.lock`, une différence de bibliothèque système entre deux machines peut briser la portabilité." }
        ]
      },
      {
        id: "m5-c2",
        title: "`Conda` (= une cheffe à domicile)",
        subtitle: "Gestionnaire d'environnements et de paquets binaires multi-langages",
        slideRef: "Slides 52–56/59",
        summary: "Comme une cheffe à domicile qui vient avec ses propres instruments (Python, compilateurs, libs C) et ingrédients (paquets), Conda installe un environnement complet et précompilé pour chaque projet.",
        whyItMatters: "Contrairement à `pip` qui installe des paquets Python dans un Python existant, `conda create -n mon_env python=3.12` télécharge l'interpréteur Python 3.12 ET les binaires précompilés (`gdal`, `numba`, `manim`) adaptés à votre OS et votre architecture (`linux-64`, `osx-64`, `win-64`) depuis `anaconda.org`.",
        keyPoints: [
          { label: "1. Création isolée + version de Python", detail: "Télécharge directement la version demandée de Python sans qu'elle soit préinstallée sur l'OS." },
          { label: "2. Résolution OS + Architecture", detail: "Conda choisit les versions compatibles selon `OS + arch + contraintes` (`linux-64`, `osx-64`, `win-64`)." },
          { label: "3. Paquets binaires précompilés", detail: "Aucune compilation locale requise : les binaires C/C++ (`libgdal`, `cairo`, `ffmpeg`) et les métadonnées sont copiés directement dans `myenv/`." }
        ]
      },
      {
        id: "m5-c3",
        title: "Containers (Docker) vs Machines Virtuelles & Pyramide de l'isolation",
        subtitle: "De l'isolation logique légère (144 Mo) à l'isolation physique Bare Metal",
        slideRef: "Slides 57–58/59",
        summary: "Pour aller encore plus loin dans la reproductibilité (isoler le système d'exploitation lui-même), on utilise des Containers (Docker, Podman) ou des Machines Virtuelles (VirtualBox, Vagrant).",
        whyItMatters: "Choisir le bon niveau d'isolation est un compromis entre **garantie de reproductibilité** et **frugalité (poids disque / RAM)** — le fameux ratio efficacité du cours !",
        keyPoints: [
          { label: "Containers (Docker, Podman)", detail: "Isolation **Système (noyau partagé)** : `Infrastructure` → `Operating System` → `Container Engine` → chaque container embarque uniquement `Bin/Lib` + `App`. Poids mesuré (Python 3.9 + matplotlib) : **215 Mo à 1134 Mo**." },
          { label: "Machines Virtuelles (VirtualBox, Vagrant)", detail: "Isolation **OS & ressources virtuelles** : `Infrastructure` → `Hypervisor` → chaque VM embarque un **`Guest OS` complet** + `Bin/Lib` + `App`. Très lourd (plusieurs Go)." },
          { label: "Comparaison des tailles (Python 3.9 + matplotlib)", detail: "• **Virtual Environments (`venv`, `Poetry`)** : Isolation *Logique* (dépendances Python) — **144 à 178 Mo**.\n• **Conda (`conda`, `mamba`)** : Isolation *Logicielle* (dépendances + binaires) — **370 à 1900 Mo**.\n• **Docker Containers** : Isolation *Système* (noyau partagé) — **215 à 1134 Mo**." }
        ],
        distinctions: {
          leftTitle: "Containers (Docker / Podman)",
          leftDesc: "Partagent le noyau de l'OS hôte via un Container Engine. Légers, démarrage en quelques millisecondes, pas de Guest OS.",
          rightTitle: "Machines Virtuelles (VMs)",
          rightDesc: "Virtualisent le matériel via un Hyperviseur. Chaque VM exécute son propre Guest OS complet (noyau séparé). Isolation maximale mais coûteuse."
        }
      }
    ],
    commands: [
      {
        id: "cmd-conda-lifecycle",
        tool: "conda",
        command: "conda init / env list / create / activate / install / remove",
        syntax: "conda create -n <nom_env> python=<version>",
        title: "Cycle complet de gestion d'un environnement `conda`",
        description: "Toutes les commandes essentielles de Conda (Slides 53–55) pour lister, créer avec une version de Python précise, activer, installer des paquets scientifiques, désactiver et supprimer un environnement.",
        exampleCommand: "conda env list",
        expectedOutput: "# conda environments:\n#\nbase                  *  /usr/localTP/anaconda3\nmongoenv                 /usr/localTP/anaconda3/envs/mongoenv",
        options: [
          { flag: "/usr/localTP/anaconda3/bin/conda init", meaning: "Initialise Conda dans votre fichier ~/.bashrc (à faire une première fois)" },
          { flag: "conda env list", meaning: "(A) Liste tous les environnements Conda disponibles sur la machine" },
          { flag: "conda create -n myenv python=3.12", meaning: "(B) Crée un environnement isolé nommé myenv avec Python 3.12" },
          { flag: "conda activate myenv", meaning: "(C) Active l'environnement myenv" },
          { flag: "conda install manim", meaning: "(D) Installe un paquet (et ses dépendances binaires C/système) dans l'environnement actif" },
          { flag: "conda deactivate", meaning: "(E) Désactive l'environnement Conda courant" },
          { flag: "conda remove -n myenv --all", meaning: "(F) Supprime complètement l'environnement myenv et tous ses paquets" }
        ],
        pitfall: "Dans `conda create -n myenv python=3.12`, écrivez bien `python=3.12` en minuscules (le slide 53 affiche `Python=3.12` à cause d'une majuscule automatique).",
        slideRef: "Slides 53–55/59"
      }
    ],
    quiz: [
      {
        question: "Pourquoi un environnement `conda` (370 à 1900 Mo) est-il plus volumineux qu'un environnement `venv` (144 à 178 Mo) pour installer Python 3.9 + matplotlib ?",
        options: [
          "Parce que Conda réalise une isolation logicielle complète en embarquant l'interpréteur Python et toutes les bibliothèques binaires système précompilées (C/C++), là où `venv` réalise une isolation logique des seuls paquets Python",
          "Parce que Conda installe un Guest OS Linux complet via un hyperviseur",
          "Parce que Conda télécharge systématiquement tout le catalogue PyPI hors-ligne",
          "Parce que `venv` compresse les fichiers `.py` au format `.tar.gz`"
        ],
        correctIndex: 0,
        explanation: "Comme le montre la pyramide du Slide 58, `venv` n'isole que logiquement les paquets Python, tandis que `conda` isole logiciellement les dépendances Python ET les binaires natifs précompilés."
      },
      {
        question: "Quelle couche architecturale est présente dans une Machine Virtuelle (VM) mais absente dans un Container Docker (Slide 57) ?",
        options: [
          "L'Hyperviseur (Hypervisor) et un système d'exploitation invité complet (Guest OS) dans chaque instance",
          "La couche Bin/Lib et l'Application (App)",
          "L'Infrastructure matérielle",
          "Le système d'exploitation hôte"
        ],
        correctIndex: 0,
        explanation: "Les containers s'exécutent sur un Container Engine qui partage le noyau de l'Operating System hôte, tandis que les VMs reposent sur un Hypervisor et embarquent chacune leur propre Guest OS."
      }
    ]
  }
];

export const GUIDED_EXERCISES: GuidedExercise[] = [
  {
    id: 1,
    title: "TP 1 — L'aide hors-ligne (`man` & `--help`)",
    slideRef: "Slide 10/59",
    module: "Module 1",
    folder: "~/TPs/01_miniTP_aide",
    scenario: "Vous êtes en examen déconnecté sans Internet. Utilisez le manuel intégré au shell pour répondre aux 3 questions du cours sur `pwd` : Que fait `pwd` ? Qui en est l'auteur ? Quelle est sa version ?",
    steps: [
      {
        instruction: "Consultez la page de manuel de `pwd` pour découvrir son rôle et son auteur.",
        hintCommand: "man pwd",
        explanation: "`man pwd` révèle que `pwd` affiche le nom du répertoire de travail courant (Print Working Directory) et a été écrit par **Jim Meyering**.",
        checkId: "tp1_man"
      },
      {
        instruction: "Affichez la version exacte de `pwd` installée sur le système.",
        hintCommand: "pwd --version",
        explanation: "`pwd --version` affiche la version de GNU coreutils (ex: `pwd (GNU coreutils) 9.4`) ainsi que le nom de l'auteur.",
        checkId: "tp1_version"
      }
    ]
  },
  {
    id: 2,
    title: "TP 2 — Au fait, c'est `ls` ou `sl` ? (`PATH` & `.bashrc`)",
    slideRef: "Slides 14–15/59",
    module: "Module 1",
    folder: "~/TPs/02_miniTP_path",
    scenario: "Une application `sl` (Steam Locomotive) se trouve dans `/home/etudiant/TPs/02_miniTP_path/bin`. Ajoutez ce dossier à votre variable `PATH` pour pouvoir lancer `sl` depuis n'importe où !",
    steps: [
      {
        instruction: "Testez d'abord `sl` pour constater que le shell ne le trouve pas encore dans le `PATH`.",
        hintCommand: "sl",
        explanation: "Le shell parcourt les dossiers de `$PATH` et renvoie `command not found` car `/home/etudiant/TPs/02_miniTP_path/bin` n'y figure pas.",
        checkId: "tp2_try_sl"
      },
      {
        instruction: "Ajoutez `/home/etudiant/TPs/02_miniTP_path/bin` à la variable `PATH` avec `export`.",
        hintCommand: "export PATH=\"$PATH:/home/etudiant/TPs/02_miniTP_path/bin\"",
        explanation: "`export PATH=\"$PATH:...\"` ajoute le dossier à la session courante (Présent).",
        checkId: "tp2_export"
      },
      {
        instruction: "Exécutez maintenant `sl` depuis n'importe quel répertoire !",
        hintCommand: "sl",
        explanation: "Tchou tchou ! Le shell trouve désormais l'exécutable `sl` grâce au nouveau chemin dans `PATH`.",
        checkId: "tp2_run_sl"
      }
    ]
  },
  {
    id: 3,
    title: "TP 3 — Inception of Bash (`$SHLVL`, `PS1`, `bash --norc`)",
    slideRef: "Slides 16–17/59",
    module: "Module 1",
    folder: "~",
    scenario: "Explorez l'imbrication des shells Bash et comprenez pourquoi `.bashrc` écrase certaines personnalisations temporaires du prompt `PS1`.",
    steps: [
      {
        instruction: "Ouvrez un nouveau sous-shell `bash` et vérifiez la profondeur avec `echo $SHLVL`.",
        hintCommand: "bash",
        explanation: "Le niveau d'imbrication `$SHLVL` passe de 1 à 2.",
        checkId: "tp3_bash"
      },
      {
        instruction: "Personnalisez le prompt avec `export PS1=\"[\\A] > \"`. Observez le changement d'invite.",
        hintCommand: "export PS1=\"[\\A] > \"",
        explanation: "L'invite de commande affiche désormais l'heure `[HH:MM] > `.",
        checkId: "tp3_ps1"
      },
      {
        instruction: "Lancez un sous-shell sans lire `.bashrc` grâce à `bash --norc` pour conserver votre prompt personnalisé.",
        hintCommand: "bash --norc",
        explanation: "Contrairement à un `bash` normal (qui relit `.bashrc` et remet le prompt par défaut), `bash --norc` conserve `[HH:MM] > ` !",
        checkId: "tp3_norc"
      }
    ]
  },
  {
    id: 4,
    title: "TP 4 — Exploration de `pip` (`--version`, `list` vs `freeze`)",
    slideRef: "Slide 22/59",
    module: "Module 2",
    folder: "~/TPs/03_miniTP_pip",
    scenario: "Vérifiez la présence et l'emplacement de `pip`, puis comparez les sorties de `pip list` et `pip freeze`.",
    steps: [
      {
        instruction: "Affichez la version de `pip` et le chemin où il est stocké.",
        hintCommand: "pip --version",
        explanation: "Indique la version de `pip`, le dossier système ou virtuel d'où il est exécuté, et la version de Python associée.",
        checkId: "tp4_version"
      },
      {
        instruction: "Comparez les paquets installés avec `pip list` puis `pip freeze`.",
        hintCommand: "pip freeze",
        explanation: "`pip list` affiche un tableau lisible, tandis que `pip freeze` formate chaque ligne en `paquet==version` pour `requirements.txt`.",
        checkId: "tp4_freeze"
      }
    ]
  },
  {
    id: 5,
    title: "TP 5 & 6 — Graphe des dépendances, Tri topologique & Conflits",
    slideRef: "Slides 23–27/59",
    module: "Module 2",
    folder: "~/TPs/04_miniTP_dependance",
    scenario: "Inspectez les paquets `.whl` du dossier `dist/` pour observer le tri topologique de `myapp` et le conflit en diamant de `myappconf`.",
    steps: [
      {
        instruction: "Listez les fichiers `.whl` présents dans `~/TPs/04_miniTP_dependance/dist`.",
        hintCommand: "ls ~/TPs/04_miniTP_dependance/dist",
        explanation: "On retrouve `myapp` et les paquets `pkg_a` à `pkg_f`, ainsi que `myappconf`.",
        checkId: "tp5_ls"
      },
      {
        instruction: "Simulez l'analyse et l'installation topologique de `myapp`.",
        hintCommand: "pip install dist/myapp-0.1.0-py3-none-any.whl",
        explanation: "`pip` effectue un tri topologique et installe dans l'ordre : `pkg_e` → `pkg_f` → `pkg_b` → `pkg_a` → `pkg_c` → `pkg_d` → `myapp`.",
        checkId: "tp5_myapp"
      },
      {
        instruction: "Tentez d'installer `myappconf` pour observer l'erreur de conflit de versions.",
        hintCommand: "pip install dist/myappconf-0.1.0-py3-none-any.whl",
        explanation: "`ResolutionImpossible` : `pkg_a` requiert `pkg_c<2` alors que `pkg_b` requiert `pkg_c>=2` !",
        checkId: "tp6_conflict"
      }
    ]
  },
  {
    id: 6,
    title: "TP 7, 8, 9 & 10 — `venv`, `requirements.txt`, `cowsay` & `lolcat`",
    slideRef: "Slides 32–39/59",
    module: "Module 3",
    folder: "~",
    scenario: "Créez et activez un environnement virtuel `mon_env` avec `venv`, installez `cowsay` et `lolcat`, et chaînez-les avec un pipe `|` !",
    steps: [
      {
        instruction: "Créez un environnement virtuel nommé `mon_env` avec le module `venv`.",
        hintCommand: "python3 -m venv mon_env",
        explanation: "Crée le dossier isolé `mon_env/` contenant une copie de Python et un dossier `site-packages` vierge.",
        checkId: "tp7_create_venv"
      },
      {
        instruction: "Activez l'environnement `mon_env`.",
        hintCommand: "source mon_env/bin/activate",
        explanation: "Le prompt affiche désormais `(mon_env)` et vous avez les droits pour installer des paquets avec `pip`.",
        checkId: "tp7_activate_venv"
      },
      {
        instruction: "Installez les paquets `cowsay` et `lolcat` dans votre environnement actif.",
        hintCommand: "pip install cowsay lolcat",
        explanation: "Les deux paquets sont installés dans `mon_env/lib/python3.12/site-packages`.",
        checkId: "tp9_install_cowsay"
      },
      {
        instruction: "Faites parler la vache en arc-en-ciel avec un pipe : `cowsay -t \"Bonjour !\" | lolcat`.",
        hintCommand: "cowsay -t \"Bonjour !\" | lolcat",
        explanation: "La sortie texte de `cowsay` est transmise en entrée standard à `lolcat`, qui la colore en arc-en-ciel !",
        checkId: "tp10_pipe_lolcat"
      }
    ]
  },
  {
    id: 7,
    title: "TP 11 & 12 — `pyproject.toml` et Projet `Poetry`",
    slideRef: "Slides 43–48/59",
    module: "Module 4",
    folder: "~/TPs/12_miniTP_poetry",
    scenario: "Inspectez un fichier `pyproject.toml`, puis initialisez et exécutez le projet `show_ade_source` avec `Poetry`.",
    steps: [
      {
        instruction: "Affichez le contenu de `~/TPs/11_miniTP_pyproject/pyproject.toml`.",
        hintCommand: "cat ~/TPs/11_miniTP_pyproject/pyproject.toml",
        explanation: "Vous y voyez `version = \"2.8.2\"`, `authors = [{name = \"Emmanuel Macron\"...}]`, `requires-python = \">=3.9\"` et `matplotlib` sans version fixée.",
        checkId: "tp11_cat_toml"
      },
      {
        instruction: "Initialisez Poetry et installez les dépendances dans l'environnement virtuel géré par Poetry.",
        hintCommand: "poetry install",
        explanation: "Poetry résout les dépendances, génère/vérifie `poetry.lock` et les installe dans son environnement virtuel isolé.",
        checkId: "tp12_poetry_install"
      },
      {
        instruction: "Exécutez le module du projet via `poetry run python -m show_ade 4YMHMH-120`.",
        hintCommand: "poetry run python -m show_ade 4YMHMH-120",
        explanation: "`poetry run` exécute la commande directement au sein de l'environnement virtuel du projet.",
        checkId: "tp12_poetry_run"
      }
    ]
  },
  {
    id: 8,
    title: "TP 13 — Environnements scientifiques avec `conda`",
    slideRef: "Slides 53–55/59",
    module: "Module 5",
    folder: "~/TPs/13_miniTP_conda",
    scenario: "Vérifiez les environnements Conda installés, activez `mongoenv` pour tester `plot_restaurants.py`, ou créez un environnement avec `manim`.",
    steps: [
      {
        instruction: "Listez les environnements Conda installés sur la machine.",
        hintCommand: "conda env list",
        explanation: "Affiche les environnements `base` et `mongoenv` situés dans `/usr/localTP/anaconda3`.",
        checkId: "tp13_conda_list"
      },
      {
        instruction: "Activez l'environnement `mongoenv`.",
        hintCommand: "conda activate mongoenv",
        explanation: "Le prompt passe à `(mongoenv)` et charge les binaires précompilés de cet environnement.",
        checkId: "tp13_conda_activate"
      },
      {
        instruction: "Exécutez le script d'analyse : `python plot_restaurants.py restaurants.json`.",
        hintCommand: "python plot_restaurants.py restaurants.json",
        explanation: "Le script s'exécute avec succès grâce aux bibliothèques préinstallées dans `mongoenv`.",
        checkId: "tp13_conda_run"
      }
    ]
  }
];

export const SEMVERS_MATRIX = {
  versions: [
    "numpy 1.1.0",
    "numpy 1.1.1",
    "numpy 1.1.2",
    "numpy 1.2.1",
    "numpy 1.2.4",
    "numpy 1.3.1",
    "numpy 2.0.3",
    "numpy 2.1.2",
    "numpy 2.1.3",
    "numpy 3.1.0"
  ],
  constraints: [
    { expr: "==1.3.1", desc: "Exactement 1.3.1", matches: [false, false, false, false, false, true, false, false, false, false] },
    { expr: "!=1.2.1", desc: "Tout sauf 1.2.1", matches: [true, true, true, false, true, true, true, true, true, true] },
    { expr: ">1.2.4", desc: "Strictement supérieur à 1.2.4", matches: [false, false, false, false, false, true, true, true, true, true] },
    { expr: "<=1.2", desc: "Inférieur ou égal à 1.2.0", matches: [true, true, true, false, false, false, false, false, false, false] },
    { expr: "~=1.2", desc: "Compatible 1.x (>=1.2, <2.0)", matches: [false, false, false, true, true, true, false, false, false, false] },
    { expr: "~=1.1.1", desc: "Compatible 1.1.x (>=1.1.1, <1.2.0)", matches: [false, true, true, false, false, false, false, false, false, false] }
  ]
};

export const LUNCHBOX_PROPERTIES = [
  { title: "Isolation des dépendances", desc: "Les aliments (paquets Python) d'un projet ne se mélangent pas avec ceux des autres boîtes (autres projets).", category: "Isolation" },
  { title: "Bonne pratique professionnelle", desc: "Tout le monde dans une cuisine partagée comprend comment ranger : chaque plat a sa boîte, pas de bazar dans le frigo collectif.", category: "Standard" },
  { title: "Flexibilité", desc: "Il existe plein de tailles et modèles de boîtes selon les besoins : de même pour les gestionnaires d'environnements (venv, Poetry, Conda...).", category: "Usage" },
  { title: "Portabilité", desc: "Tu peux prêter ou transporter ta boîte (ou sa recette) sans avoir à vider ton frigo entier.", category: "Partage" },
  { title: "Simplicité de gestion", desc: "Tout est bien rangé dans la boîte, facile à nettoyer et à retrouver.", category: "Usage" },
  { title: "Frugalité", desc: "Pas besoin d'emmener tout son frigo (VM complète) pour manger le midi (144 à 178 Mo pour un venv).", category: "Performance" },
  { title: "Compatibilité multi-versions", desc: "Une boîte pour les pâtes (numpy 1.0), une pour le riz (numpy 2.3) : chacune garde son contenu sans conflit.", category: "Isolation" },
  { title: "Reproductibilité", desc: "Avec une recette précise (requirements.txt / poetry.lock), n'importe qui obtient exactement le même plat.", category: "Partage" },
  { title: "Facilité d'intégration continue (CI/CD)", desc: "Des boîtes standardisées qui passent dans le lave-vaisselle et le micro-ondes : prêtes pour les pipelines automatisés.", category: "Standard" },
  { title: "Sécurité", desc: "Tu peux tester une nouvelle épice (paquet expérimental) dans une boîte sans risquer de contaminer toutes les autres.", category: "Isolation" },
  { title: "Nettoyage facile", desc: "Si une boîte est sale ou cassée, tu la supprimes (`rm -rf mon_env`) et tu recommences sans perdre ton frigo.", category: "Usage" }
];

export const TOOLS_COMPARISON_TABLE = [
  { tool: "venv", installPy: false, installPkg: false, buildDist: false, uploadDist: false, manageVenv: true, lockFiles: false, highlight: "Standard Python >= 3.3", note: "Inclus nativement, léger, couplé à pip" },
  { tool: "virtualenv", installPy: false, installPkg: false, buildDist: false, uploadDist: false, manageVenv: true, lockFiles: false, highlight: "Rapide & Multi-Python (-p)", note: "Seeder avec cache local, extensible" },
  { tool: "pip", installPy: false, installPkg: true, buildDist: true, uploadDist: false, manageVenv: false, lockFiles: true, highlight: "Installateur officiel", note: "Installe depuis PyPI / wheels / requirements.txt" },
  { tool: "pip-tools", installPy: false, installPkg: true, buildDist: false, uploadDist: false, manageVenv: false, lockFiles: true, highlight: "Compile requirements", note: "Génère des lockfiles pour pip" },
  { tool: "Pipenv", installPy: false, installPkg: true, buildDist: false, uploadDist: false, manageVenv: true, lockFiles: true, highlight: "Pipfile + Pipfile.lock", note: "Combine pip et virtualenv" },
  { tool: "Poetry", installPy: false, installPkg: true, buildDist: true, uploadDist: true, manageVenv: true, lockFiles: true, highlight: "La Cheffe de cuisine", note: "Gère pyproject.toml, poetry.lock, venv, build & publish" },
  { tool: "PDM / Flit", installPy: false, installPkg: true, buildDist: true, uploadDist: true, manageVenv: true, lockFiles: true, highlight: "Alternatives PEP 621", note: "Similaires à Poetry sur pyproject.toml" },
  { tool: "pyenv", installPy: true, installPkg: false, buildDist: false, uploadDist: false, manageVenv: false, lockFiles: false, highlight: "Installe Python", note: "Gère uniquement les versions de l'interpréteur Python" },
  { tool: "twine / build", installPy: false, installPkg: false, buildDist: true, uploadDist: true, manageVenv: false, lockFiles: false, highlight: "Build & Upload PyPI", note: "Outils dédiés à la distribution de paquets" },
  { tool: "uv", installPy: true, installPkg: true, buildDist: true, uploadDist: true, manageVenv: true, lockFiles: true, highlight: "Tout-en-un ultra-rapide (Rust)", note: "Coche les 6 colonnes (0.06s vs 0.99s pour Poetry)" },
  { tool: "conda", installPy: true, installPkg: true, buildDist: true, uploadDist: true, manageVenv: true, lockFiles: true, highlight: "La Cheffe à domicile (Data Science)", note: "Gère Python + binaires système C/C++/Fortran précompilés" }
];

export const ISOLATION_PYRAMID = [
  {
    level: 1,
    name: "Virtual Environments",
    tools: "venv, virtualenv, Poetry, uv",
    isolationType: "Logique (dépendances Python uniquement)",
    sizeRange: "entre 144 Mo et 178 Mo",
    color: "bg-amber-100 border-amber-400 text-amber-950",
    whenToUse: "90% des projets Python standards (Web, API, scripts, TPs classiques)."
  },
  {
    level: 2,
    name: "Conda Environments",
    tools: "Conda, Mamba, Micromamba",
    isolationType: "Logicielle (dépendances Python + binaires système C/C++)",
    sizeRange: "entre 370 Mo et 1900 Mo",
    color: "bg-rose-100 border-rose-400 text-rose-950",
    whenToUse: "Data Science, Machine Learning, Géomatique (GDAL), Manim, bibliothèques C/Fortran précompilées."
  },
  {
    level: 3,
    name: "Docker Containers",
    tools: "Docker, Podman",
    isolationType: "Système (noyau de l'OS hôte partagé via Container Engine)",
    sizeRange: "entre 215 Mo et 1134 Mo",
    color: "bg-emerald-100 border-emerald-400 text-emerald-950",
    whenToUse: "Déploiement en production, microservices, CI/CD reproductible multi-machines."
  },
  {
    level: 4,
    name: "Virtual Machines (VMs)",
    tools: "VirtualBox, Vagrant, QEMU/KVM",
    isolationType: "OS et ressources virtuelles isolées (Hypervisor + Guest OS complet)",
    sizeRange: "Plusieurs Go (OS complet)",
    color: "bg-orange-100 border-orange-400 text-orange-950",
    whenToUse: "Besoin d'un autre système d'exploitation complet (ex: tester sous Windows/Linux avec un noyau distinct)."
  },
  {
    level: 5,
    name: "Bare Metal (Machine distincte)",
    tools: "Serveur physique dédié",
    isolationType: "Physique (aucun partage matériel)",
    sizeRange: "Disque physique complet",
    color: "bg-sky-100 border-sky-400 text-sky-950",
    whenToUse: "Calcul haute performance (HPC), sécurité matérielle stricte, zéro surcoût de virtualisation."
  }
];
