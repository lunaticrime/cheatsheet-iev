export interface TerminalOutputLine {
  id: string;
  type: 'command' | 'stdout' | 'stderr' | 'info' | 'rainbow';
  prompt?: string;
  text: string;
}

export interface ShellFrame {
  level: number;
  ps1: string;
  norc: boolean;
  envVars: Record<string, string>;
}

export interface VirtualEnvInfo {
  name: string;
  type: 'venv' | 'virtualenv' | 'poetry' | 'conda';
  pythonVersion: string;
  path: string;
  packages: Record<string, string>;
}

export interface SimulatorState {
  cwd: string;
  shellStack: ShellFrame[];
  activeEnv: string | null; // name of active venv or conda env
  activeEnvType: 'venv' | 'virtualenv' | 'poetry' | 'conda' | null;
  condaInitialized: boolean;
  bashrcLines: string[];
  envs: Record<string, VirtualEnvInfo>;
  files: Record<string, string>; // absolute path -> content
  directories: string[]; // list of absolute paths
  completedChecks: string[];
}

export const INITIAL_FILES: Record<string, string> = {
  "/home/etudiant/.bashrc": `# ~/.bashrc : exécuté par Bash pour les shells interactifs non-login
export PATH="/usr/local/bin:/usr/bin:/bin"
export PS1="etudiant@polytech:\\w \\$ "
alias ll='ls -la'
`,
  "/home/etudiant/pokestat.py": `# Script pokestat.py (TP 7 & 8)
import requests
import pandas as pd

print("Analyse statistique des Pokémon (Génération 1 à 9)...")
print("Moyenne d'Attaque : 79.5 | Moyenne de Vitesse : 68.2")
print("✓ Script pokestat.py exécuté avec succès !")
`,
  "/home/etudiant/requirements.txt": `numpy==1.26.4
pandas>=2.2.0
matplotlib
scikit-learn~=1.5.0
requests<3.0
`,
  "/home/etudiant/TPs/01_miniTP_aide/README.md": `# Mini-TP 1 : L'aide hors-ligne
1. Que fait pwd ? -> Consultez 'man pwd' ou 'pwd --help'
2. Qui est l'auteur de pwd ? -> Jim Meyering
3. Quelle est la version de pwd ? -> 'pwd --version'
`,
  "/home/etudiant/TPs/02_miniTP_path/README.md": `# Mini-TP 2 : Variable d'environnement PATH et sl
L'application 'sl' (Steam Locomotive) se trouve dans :
/home/etudiant/TPs/02_miniTP_path/bin/sl

Ajoutez ce dossier à votre variable PATH :
export PATH="$PATH:/home/etudiant/TPs/02_miniTP_path/bin"
Puis tapez : sl
`,
  "/home/etudiant/TPs/02_miniTP_path/bin/sl": `[Binaire exécutable ELF 64-bit : Steam Locomotive (sl)]`,
  "/home/etudiant/TPs/03_miniTP_pip/README.md": `# Mini-TP 3 & 4 : Découverte de pip et PyPI
Commandes à tester :
- pip --version
- pip help
- pip list
- pip freeze
`,
  "/home/etudiant/TPs/04_miniTP_dependance/README.md": `# Mini-TP 5 & 6 : Graphe des dépendances et Conflits
Le dossier dist/ contient les paquets wheel (.whl) :
- myapp-0.1.0-py3-none-any.whl (Graphe sans cycle -> Tri topologique : pkg_e, pkg_f, pkg_b, pkg_a, pkg_c, pkg_d, myapp)
- myappconf-0.1.0-py3-none-any.whl (Conflit en diamant : pkg_a exige pkg_c<2 et pkg_b exige pkg_c>=2)

Testez :
pip install dist/myapp-0.1.0-py3-none-any.whl
pip install dist/myappconf-0.1.0-py3-none-any.whl
`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/myapp-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: myapp\nVersion: 0.1.0\nRequires-Dist: pkg_d`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/pkg_a-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: pkg_a\nVersion: 0.1.0\nRequires-Dist: pkg_b`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/pkg_b-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: pkg_b\nVersion: 0.1.0\nRequires-Dist: pkg_e\nRequires-Dist: pkg_f`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/pkg_c-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: pkg_c\nVersion: 0.1.0\nRequires-Dist: pkg_a\nRequires-Dist: pkg_b\nRequires-Dist: pkg_f`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/pkg_d-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: pkg_d\nVersion: 0.1.0\nRequires-Dist: pkg_a\nRequires-Dist: pkg_c`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/pkg_e-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: pkg_e\nVersion: 0.1.0`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/pkg_f-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: pkg_f\nVersion: 0.1.0\nRequires-Dist: pkg_e`,
  "/home/etudiant/TPs/04_miniTP_dependance/dist/myappconf-0.1.0-py3-none-any.whl": `Wheel-Version: 1.0\nName: myappconf\nVersion: 0.1.0\nRequires-Dist: pkg_a (requires pkg_c<2)\nRequires-Dist: pkg_b (requires pkg_c>=2)`,
  "/home/etudiant/TPs/11_miniTP_pyproject/pyproject.toml": `[project]
name = "notre-projet"
version = "2.8.2"
description = "Parce que c'est notre projet !"
authors = [
    {name = "Emmanuel Macron", email = "macron@france.fr"}
]
readme = "README.md"
requires-python = ">=3.9"

dependencies = [
    "numpy==1.26.4",
    "pandas>=2.2.0",
    "matplotlib",
    "scikit-learn~=1.5.0",
    "requests<3.0",
]
`,
  "/home/etudiant/TPs/12_miniTP_poetry/README.md": `# Mini-TP 12 : Poetry
Étapes :
1. Initialisez ou installez le projet avec 'poetry install'
2. Ajoutez un paquet avec 'poetry add requests'
3. Exécutez avec : poetry run python -m show_ade 4YMHMH-120
`,
  "/home/etudiant/TPs/12_miniTP_poetry/pyproject.toml": `[tool.poetry]
name = "show_ade"
version = "0.1.0"
description = "Lecteur d'emploi du temps ADE Polytech"
authors = ["Etudiant Polytech <etudiant@polytech-lille.fr>"]

[tool.poetry.dependencies]
python = ">=3.9"
requests = "^2.31.0"
icalendar = "^5.0.11"
`,
  "/home/etudiant/TPs/13_miniTP_conda/README.md": `# Mini-TP 13 : Conda
Étapes :
1. /usr/localTP/anaconda3/bin/conda init
2. conda env list
3. conda activate mongoenv
4. python plot_restaurants.py restaurants.json
`,
  "/home/etudiant/TPs/13_miniTP_conda/plot_restaurants.py": `# Visualisation des restaurants (MongoDB / JSON)
import sys
print("Chargement des données depuis restaurants.json...")
print("Affichage de la carte de densité (2 450 restaurants analysés).")
print("✓ Graphique généré avec succès dans l'environnement Conda !")
`,
  "/home/etudiant/TPs/13_miniTP_conda/restaurants.json": `[{"name": "Estaminet Lillois", "borough": "Vieux-Lille", "cuisine": "Flamande"}]`,
  "/home/bcazaux/mes-secrets/black_list.csv": `id,nom,motif\n1,installation_globale_pip,Conflit de dépendances\n2,oubli_gitignore_venv,Dépôt Git de 400 Mo`
};

export const INITIAL_DIRECTORIES: string[] = [
  "/",
  "/boot",
  "/bin",
  "/etc",
  "/lib",
  "/usr",
  "/usr/localTP",
  "/usr/localTP/anaconda3",
  "/usr/localTP/anaconda3/bin",
  "/home",
  "/home/jachddou",
  "/home/jachddou/Documents",
  "/home/jachddou/Documents/mes-examens",
  "/home/bcazaux",
  "/home/bcazaux/mes-secrets",
  "/home/etudiant",
  "/home/etudiant/Documents",
  "/home/etudiant/TPs",
  "/home/etudiant/TPs/01_miniTP_aide",
  "/home/etudiant/TPs/02_miniTP_path",
  "/home/etudiant/TPs/02_miniTP_path/bin",
  "/home/etudiant/TPs/03_miniTP_pip",
  "/home/etudiant/TPs/04_miniTP_dependance",
  "/home/etudiant/TPs/04_miniTP_dependance/dist",
  "/home/etudiant/TPs/11_miniTP_pyproject",
  "/home/etudiant/TPs/12_miniTP_poetry",
  "/home/etudiant/TPs/12_miniTP_poetry/show_ade_source",
  "/home/etudiant/TPs/13_miniTP_conda"
];

export function createInitialSimulatorState(): SimulatorState {
  return {
    cwd: "/home/etudiant",
    shellStack: [
      {
        level: 1,
        ps1: "etudiant@polytech:\\w $ ",
        norc: false,
        envVars: {
          USER: "etudiant",
          HOME: "/home/etudiant",
          SHELL: "/bin/bash",
          SHLVL: "1",
          PATH: "/usr/local/bin:/usr/bin:/bin",
          LANG: "fr_FR.UTF-8"
        }
      }
    ],
    activeEnv: null,
    activeEnvType: null,
    condaInitialized: false,
    bashrcLines: [
      'export PATH="/usr/local/bin:/usr/bin:/bin"',
      'export PS1="etudiant@polytech:\\w $ "'
    ],
    envs: {
      base: {
        name: "base",
        type: "conda",
        pythonVersion: "3.12.4",
        path: "/usr/localTP/anaconda3",
        packages: {
          numpy: "1.26.4",
          conda: "24.7.1",
          pip: "24.0"
        }
      },
      mongoenv: {
        name: "mongoenv",
        type: "conda",
        pythonVersion: "3.11.9",
        path: "/usr/localTP/anaconda3/envs/mongoenv",
        packages: {
          pymongo: "4.8.0",
          pandas: "2.2.2",
          matplotlib: "3.9.2",
          numpy: "1.26.4"
        }
      }
    },
    files: { ...INITIAL_FILES },
    directories: [...INITIAL_DIRECTORIES],
    completedChecks: []
  };
}

export function formatPrompt(state: SimulatorState): string {
  const frame = state.shellStack[state.shellStack.length - 1];
  const shortCwd = state.cwd.startsWith("/home/etudiant")
    ? "~" + state.cwd.slice("/home/etudiant".length)
    : state.cwd;
  const envPrefix = state.activeEnv ? `(${state.activeEnv}) ` : "";
  const now = new Date();
  const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  let rendered = frame.ps1
    .replace(/\\w/g, shortCwd || "~")
    .replace(/\\A/g, hhmm)
    .replace(/\\\$/g, "$");

  return `${envPrefix}${rendered}`;
}

function resolvePath(cwd: string, target: string): string {
  if (!target || target === "~") return "/home/etudiant";
  let raw = target;
  if (raw.startsWith("~/")) {
    raw = "/home/etudiant/" + raw.slice(2);
  } else if (!raw.startsWith("/")) {
    raw = cwd === "/" ? `/${raw}` : `${cwd}/${raw}`;
  }
  const parts = raw.split("/").filter(Boolean);
  const stack: string[] = [];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      stack.pop();
    } else {
      stack.push(part);
    }
  }
  return "/" + stack.join("/");
}

function renderCowsay(text: string, character: string = "default"): string {
  const cleanText = text || "Meuh !";
  const borderLen = Math.min(cleanText.length + 2, 54);
  const top = " " + "_".repeat(borderLen);
  const bottom = " " + "=".repeat(borderLen);

  let art = `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

  if (character === "tux") {
    art = `   \\
    \\
        .--.
       |o_o |
       |:_/ |
      //   \\ \\
     (|     | )
    /'\\_   _/\`\\
    \\___)=(___/`;
  } else if (character === "dragon") {
    art = `      \\                    / \\  //\\
       \\    |\\___/|      /   \\//  \\\\
            /0  0  \\__  /    //  | \\ \\
           /     /  \\/_/    //   |  \\  \\
           @_^_@'/   \\/_   //    |   \\   \\`;
  } else if (character === "kitty") {
    art = `     \\
      \\
       (" \`-''-/\").___..--''"\`-._
        \`6_ 6  )   \`-.  (     ).\`-.__.\`)
        (_Y_.)'  ._   )  \`._ \`. \`\`-..-'
          _..\`--'_..-_/  /--'_.'
         (il),-''  (li),'  ((!.-'`;
  }

  return `${top}\n| ${cleanText} |\n${bottom}\n${art}`;
}

export function executeSimulatedCommand(
  rawInput: string,
  prevState: SimulatorState
): { newState: SimulatorState; outputs: Omit<TerminalOutputLine, 'id'>[] } {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { newState: prevState, outputs: [] };
  }

  // Clone state safely
  const state: SimulatorState = {
    ...prevState,
    shellStack: prevState.shellStack.map(s => ({ ...s, envVars: { ...s.envVars } })),
    bashrcLines: [...prevState.bashrcLines],
    envs: Object.fromEntries(
      Object.entries(prevState.envs).map(([k, v]) => [k, { ...v, packages: { ...v.packages } }])
    ),
    files: { ...prevState.files },
    directories: [...prevState.directories],
    completedChecks: [...prevState.completedChecks]
  };

  const markCheck = (id: string) => {
    if (!state.completedChecks.includes(id)) {
      state.completedChecks.push(id);
    }
  };

  const outputs: Omit<TerminalOutputLine, 'id'>[] = [];

  // Handle chained commands with &&
  if (trimmed.includes("&&")) {
    const subcommands = trimmed.split("&&").map(s => s.trim()).filter(Boolean);
    let currentState = state;
    for (const sub of subcommands) {
      const res = executeSimulatedCommand(sub, currentState);
      currentState = res.newState;
      outputs.push(...res.outputs);
      if (res.outputs.some(o => o.type === "stderr")) {
        break;
      }
    }
    return { newState: currentState, outputs };
  }

  // Handle redirection: pip freeze > requirements.txt or echo ... >> ~/.bashrc
  if (trimmed.includes(">")) {
    const isAppend = trimmed.includes(">>");
    const [leftCmd, rightFile] = trimmed.split(isAppend ? ">>" : ">").map(s => s.trim());
    if (leftCmd === "pip freeze" && rightFile) {
      const targetPath = resolvePath(state.cwd, rightFile);
      const freezeRes = executeSimulatedCommand("pip freeze", state);
      const content = freezeRes.outputs.map(o => o.text).join("\n") + "\n";
      state.files[targetPath] = content;
      outputs.push({
        type: "info",
        text: `✓ Dépendances exportées dans ${targetPath} (${content.trim().split("\n").filter(Boolean).length} paquets).`
      });
      return { newState: state, outputs };
    }
    if (leftCmd.startsWith("echo ") && (rightFile.includes(".bashrc") || rightFile.endsWith(".txt"))) {
      const targetPath = resolvePath(state.cwd, rightFile);
      const echoed = leftCmd.slice(5).replace(/^["']|["']$/g, "");
      state.files[targetPath] = (isAppend ? (state.files[targetPath] || "") : "") + echoed + "\n";
      if (targetPath.endsWith(".bashrc")) {
        state.bashrcLines.push(echoed);
      }
      outputs.push({
        type: "info",
        text: `✓ Ligne ajoutée dans ${targetPath}. (N'oubliez pas 'source ~/.bashrc' pour l'appliquer à la session en cours !)`
      });
      return { newState: state, outputs };
    }
  }

  // Handle pipe into lolcat: <cmd> | lolcat [-a]
  if (trimmed.includes("|")) {
    const parts = trimmed.split("|").map(s => s.trim());
    if (parts.length === 2 && parts[1].startsWith("lolcat")) {
      // Check if lolcat is installed in active env
      const activeEnvObj = state.activeEnv ? state.envs[state.activeEnv] : null;
      const hasLolcat = activeEnvObj && activeEnvObj.packages["lolcat"];
      if (!hasLolcat) {
        outputs.push({
          type: "stderr",
          text: `bash: lolcat : commande introuvable.\n💡 Astuce du cours (TP 10) : activez un environnement virtuel et installez lolcat avec 'pip install lolcat'.`
        });
        return { newState: state, outputs };
      }
      const leftRes = executeSimulatedCommand(parts[0], state);
      const combinedText = leftRes.outputs.map(o => o.text).join("\n");
      markCheck("tp10_pipe_lolcat");
      return {
        newState: leftRes.newState,
        outputs: [{ type: "rainbow", text: combinedText }]
      };
    }
  }

  // Warn gently if the student used uppercase 'Python' or 'Python3' from the slide typo
  const tokens = trimmed.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
  const cleanTokens = tokens.map(t => t.replace(/^["']|["']$/g, ""));
  const cmd = cleanTokens[0] || "";
  const args = cleanTokens.slice(1);
  const currentFrame = state.shellStack[state.shellStack.length - 1];

  if (cmd === "Python" || cmd === "Python3") {
    outputs.push({
      type: "info",
      text: `⚠️ Note pédagogique : Sur Linux/macOS, les commandes sont sensibles à la casse ('${cmd.toLowerCase()}' en minuscules, même si les slides affichent parfois '${cmd}'). Le simulateur accepte et corrige automatiquement en '${cmd.toLowerCase()}'.`
    });
    return executeSimulatedCommand(trimmed.replace(/^Python3?/, cmd.toLowerCase()), state);
  }

  switch (cmd) {
    case "help": {
      outputs.push({
        type: "stdout",
        text: `╔════════════════════════════════════════════════════════════════════════════╗
║  SIMULATEUR DE TERMINAL IEV — COMMANDES SUPPORTÉES (ENVIRONNEMENT SÉCURISÉ) ║
╚════════════════════════════════════════════════════════════════════════════╝
• Navigation & Aide : pwd, ls, cd <chemin>, cat <fichier>, man <cmd>, <cmd> --help, which <cmd>
• Variables & Shell : printenv, env, echo $<VAR>, export VAR=VAL, source ~/.bashrc
• Inception de Bash : bash, bash --norc, echo $SHLVL, ps -f --forest, exit
• Gestionnaire pip  : pip --version, pip help, pip list, pip freeze, pip install <pkg | -r requirements.txt | dist/*.whl>
• Env. Virtuels     : python3 -m venv <nom>, source <nom>/bin/activate, deactivate, virtualenv -p python3.11 <nom>
• Projet Poetry     : poetry new <nom>, poetry init, poetry add <pkg>, poetry lock, poetry install, poetry update, poetry shell, poetry run <cmd>, poetry build
• Env. Conda        : /usr/localTP/anaconda3/bin/conda init, conda env list, conda create -n <nom> python=3.12, conda activate <nom>, conda install <pkg>, conda deactivate, conda remove -n <nom> --all
• Fun & Mini-TPs    : sl (après ajout au PATH), cowsay -t "texte" [-c tux|dragon|kitty], lolcat (en pipe | lolcat)
• Utilitaires       : clear, reset`
      });
      break;
    }

    case "pwd": {
      if (args.includes("--help") || args.includes("-h")) {
        outputs.push({
          type: "stdout",
          text: `Usage: pwd [OPTION]...\nAffiche le nom complet du répertoire de travail courant (Print Working Directory).\n  --help     afficher l'aide et quitter\n  --version  afficher les informations de version et quitter\n\nÉcrit par Jim Meyering.`
        });
        markCheck("tp1_man");
      } else if (args.includes("--version")) {
        outputs.push({
          type: "stdout",
          text: `pwd (GNU coreutils) 9.4\nCopyright (C) 2023 Free Software Foundation, Inc.\nÉcrit par Jim Meyering.`
        });
        markCheck("tp1_version");
      } else {
        outputs.push({ type: "stdout", text: state.cwd });
      }
      break;
    }

    case "man": {
      const targetCmd = args[0];
      if (!targetCmd) {
        outputs.push({ type: "stderr", text: "Quelle page de manuel voulez-vous ? Exemple : man pwd ou man ls" });
        break;
      }
      if (targetCmd === "pwd") {
        markCheck("tp1_man");
        outputs.push({
          type: "stdout",
          text: `PWD(1)                           Manuel de l'utilisateur                          PWD(1)

NOM
       pwd - Afficher le nom du répertoire de travail courant (Print Working Directory)

SYNOPSIS
       pwd [OPTION]...

DESCRIPTION
       Afficher le nom complet (chemin absolu) du répertoire de travail courant.

AUTEUR
       Écrit par Jim Meyering.

VERSION
       GNU coreutils 9.4`
        });
      } else if (targetCmd === "ls") {
        outputs.push({
          type: "stdout",
          text: `LS(1)                            Manuel de l'utilisateur                           LS(1)

NOM
       ls - Lister le contenu d'un répertoire

SYNOPSIS
       ls [OPTION]... [FICHIER]...

OPTIONS
       -a, --all      ne pas ignorer les entrées débutant par . (comme .bashrc)
       -l             utiliser un format d'affichage long`
        });
      } else {
        outputs.push({
          type: "stdout",
          text: `MAN(${targetCmd.toUpperCase()}) : Consultez également '${targetCmd} --help' pour un résumé des options.`
        });
      }
      break;
    }

    case "ls": {
      if (args.includes("--help")) {
        outputs.push({
          type: "stdout",
          text: `Usage: ls [OPTION]... [FILE]...\nListe les fichiers et dossiers du répertoire courant (par défaut).\n  -a, --all   inclure les fichiers cachés commençant par '.' (ex: .bashrc)\n  -l          affichage détaillé`
        });
        break;
      }
      const showHidden = args.some(a => a.startsWith("-") && a.includes("a"));
      const pathArg = args.find(a => !a.startsWith("-"));
      const targetDir = pathArg ? resolvePath(state.cwd, pathArg) : state.cwd;

      if (targetDir.includes("04_miniTP_dependance/dist")) {
        markCheck("tp5_ls");
      }

      if (!state.directories.includes(targetDir)) {
        outputs.push({ type: "stderr", text: `ls: impossible d'accéder à '${pathArg || targetDir}': Aucun fichier ou dossier de ce type` });
        break;
      }

      const entries: string[] = [];
      if (showHidden) {
        entries.push(".", "..");
      }

      // Direct child directories
      for (const dir of state.directories) {
        if (dir !== targetDir && dir.startsWith(targetDir === "/" ? "/" : targetDir + "/")) {
          const rest = dir.slice(targetDir === "/" ? 1 : targetDir.length + 1);
          if (!rest.includes("/")) {
            if (showHidden || !rest.startsWith(".")) {
              entries.push(rest + "/");
            }
          }
        }
      }

      // Direct child files
      for (const filePath of Object.keys(state.files)) {
        if (filePath.startsWith(targetDir === "/" ? "/" : targetDir + "/")) {
          const rest = filePath.slice(targetDir === "/" ? 1 : targetDir.length + 1);
          if (!rest.includes("/")) {
            if (showHidden || !rest.startsWith(".")) {
              entries.push(rest);
            }
          }
        }
      }

      outputs.push({ type: "stdout", text: entries.sort().join("  ") || "(dossier vide)" });
      break;
    }

    case "cd": {
      const target = args[0] || "~";
      const resolved = resolvePath(state.cwd, target);
      if (state.directories.includes(resolved)) {
        state.cwd = resolved;
      } else {
        outputs.push({ type: "stderr", text: `bash: cd: ${target}: Aucun fichier ou dossier de ce type` });
      }
      break;
    }

    case "cat": {
      const target = args[0];
      if (!target) {
        outputs.push({ type: "stderr", text: "cat: veuillez préciser un nom de fichier (ex: cat requirements.txt)" });
        break;
      }
      const resolved = resolvePath(state.cwd, target);
      if (resolved.endsWith("11_miniTP_pyproject/pyproject.toml") || resolved.endsWith("pyproject.toml")) {
        markCheck("tp11_cat_toml");
      }
      if (state.files[resolved] !== undefined) {
        outputs.push({ type: "stdout", text: state.files[resolved].trimEnd() });
      } else {
        outputs.push({ type: "stderr", text: `cat: ${target}: Aucun fichier ou dossier de ce type` });
      }
      break;
    }

    case "printenv":
    case "env": {
      const lines = Object.entries(currentFrame.envVars).map(([k, v]) => `${k}=${v}`);
      if (state.activeEnv) {
        lines.push(`VIRTUAL_ENV=${state.envs[state.activeEnv]?.path || "/home/etudiant/" + state.activeEnv}`);
      }
      outputs.push({ type: "stdout", text: lines.join("\n") });
      break;
    }

    case "echo": {
      const rawEcho = trimmed.slice(4).trim().replace(/^["']|["']$/g, "");
      const expanded = rawEcho.replace(/\$([A-Za-z0-9_]+)/g, (_, varName) => {
        if (varName === "SHLVL") return String(state.shellStack.length);
        return currentFrame.envVars[varName] || "";
      });
      outputs.push({ type: "stdout", text: expanded });
      break;
    }

    case "export": {
      const assignment = trimmed.slice(6).trim();
      const eqIdx = assignment.indexOf("=");
      if (eqIdx === -1) {
        outputs.push({ type: "stderr", text: "Usage : export NOM_VARIABLE=VALEUR (ex: export PATH=\"$PATH:/mon/chemin\")" });
        break;
      }
      const varName = assignment.slice(0, eqIdx).trim();
      let rawVal = assignment.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      rawVal = rawVal
        .replace(/\$PATH/g, currentFrame.envVars.PATH || "")
        .replace(/~/g, "/home/etudiant");

      currentFrame.envVars[varName] = rawVal;
      if (varName === "PS1") {
        currentFrame.ps1 = rawVal;
        markCheck("tp3_ps1");
      }
      if (varName === "PATH" && rawVal.includes("02_miniTP_path")) {
        markCheck("tp2_export");
      }
      outputs.push({
        type: "info",
        text: `✓ Variable ${varName} définie pour la session courante : ${varName}="${rawVal}"`
      });
      break;
    }

    case "source": {
      const target = args[0];
      if (!target) {
        outputs.push({ type: "stderr", text: "source: argument requis (ex: source ~/.bashrc ou source mon_env/bin/activate)" });
        break;
      }
      if (target.includes(".bashrc")) {
        // Reload bashrc
        currentFrame.ps1 = "etudiant@polytech:\\w $ ";
        outputs.push({
          type: "info",
          text: "✓ Fichier ~/.bashrc rechargé dans la session courante (les modifications sont actives dès maintenant)."
        });
        break;
      }
      if (target.endsWith("/bin/activate") || target.endsWith("activate")) {
        const envName = target.split("/")[0];
        if (!state.envs[envName]) {
          outputs.push({
            type: "stderr",
            text: `bash: ${target}: Aucun fichier ou dossier de ce type.\n💡 Créez d'abord l'environnement avec : python3 -m venv ${envName}`
          });
          break;
        }
        state.activeEnv = envName;
        state.activeEnvType = state.envs[envName].type;
        const envBin = `${state.envs[envName].path}/bin`;
        if (!currentFrame.envVars.PATH.startsWith(envBin)) {
          currentFrame.envVars.PATH = `${envBin}:${currentFrame.envVars.PATH}`;
        }
        markCheck("tp7_activate_venv");
        outputs.push({
          type: "info",
          text: `✓ Environnement virtuel '${envName}' activé. Le dossier ${envBin} a été placé en tête de votre PATH.`
        });
        break;
      }
      outputs.push({ type: "stderr", text: `source: ${target}: Fichier non reconnu dans le simulateur.` });
      break;
    }

    case "deactivate": {
      if (!state.activeEnv) {
        outputs.push({ type: "stderr", text: "Aucun environnement virtuel n'est actuellement actif." });
        break;
      }
      const oldEnv = state.activeEnv;
      state.activeEnv = null;
      state.activeEnvType = null;
      currentFrame.envVars.PATH = "/usr/local/bin:/usr/bin:/bin";
      outputs.push({ type: "info", text: `✓ Environnement '${oldEnv}' désactivé. Retour au Python système.` });
      break;
    }

    case "bash": {
      const isNorc = args.includes("--norc") || args.includes("-norc");
      const nextLevel = state.shellStack.length + 1;
      const newEnvVars = { ...currentFrame.envVars, SHLVL: String(nextLevel) };
      const newPs1 = isNorc ? currentFrame.ps1 : "etudiant@polytech:\\w $ ";

      state.shellStack.push({
        level: nextLevel,
        ps1: newPs1,
        norc: isNorc,
        envVars: newEnvVars
      });

      if (isNorc) {
        markCheck("tp3_norc");
        outputs.push({
          type: "info",
          text: `→ Nouveau sous-shell Bash lancé avec --norc (SHLVL=${nextLevel}). ~/.bashrc est ignoré : le prompt personnalisé est conservé !`
        });
      } else {
        markCheck("tp3_bash");
        outputs.push({
          type: "info",
          text: `→ Nouveau sous-shell Bash lancé normalement (SHLVL=${nextLevel}). ~/.bashrc a été exécuté (PS1 réinitialisé).`
        });
      }
      break;
    }

    case "exit": {
      if (state.shellStack.length > 1) {
        state.shellStack.pop();
        outputs.push({
          type: "info",
          text: `← Fermeture du sous-shell. Retour au shell parent (SHLVL=${state.shellStack.length}).`
        });
      } else if (state.activeEnv && state.activeEnvType === "poetry") {
        state.activeEnv = null;
        state.activeEnvType = null;
        outputs.push({ type: "info", text: "← Sortie du shell Poetry." });
      } else {
        outputs.push({
          type: "info",
          text: "Vous êtes déjà dans le shell principal (SHLVL=1). Utilisez le bouton Réinitialiser si vous souhaitez remettre le terminal à zéro."
        });
      }
      break;
    }

    case "ps": {
      let tree = "UID        PID  PPID  C STIME TTY          TIME CMD\n";
      for (let i = 0; i < state.shellStack.length; i++) {
        const pid = 4100 + i * 25;
        const ppid = i === 0 ? 4080 : 4100 + (i - 1) * 25;
        const indent = i === 0 ? "" : " ".repeat(i * 2) + "\\_ ";
        const flag = state.shellStack[i].norc ? "bash --norc" : "bash";
        tree += `etudiant  ${pid}  ${ppid}  0 14:32 pts/0    00:00:00 ${indent}${flag}\n`;
      }
      const lastPid = 4100 + (state.shellStack.length - 1) * 25;
      tree += `etudiant  ${lastPid + 9}  ${lastPid}  0 14:33 pts/0    00:00:00 ${" ".repeat(state.shellStack.length * 2)}\\_ ps -f --forest`;
      outputs.push({ type: "stdout", text: tree });
      break;
    }

    case "which": {
      const target = args[0];
      if (!target) {
        outputs.push({ type: "stderr", text: "Usage : which <commande> (ex: which python ou which pip)" });
        break;
      }
      if (target === "python" || target === "python3" || target === "pip") {
        if (state.activeEnv && state.envs[state.activeEnv]) {
          outputs.push({ type: "stdout", text: `${state.envs[state.activeEnv].path}/bin/${target}` });
        } else {
          outputs.push({ type: "stdout", text: `/usr/bin/${target}` });
        }
      } else if (target === "sl") {
        if (currentFrame.envVars.PATH.includes("02_miniTP_path")) {
          outputs.push({ type: "stdout", text: "/home/etudiant/TPs/02_miniTP_path/bin/sl" });
        } else {
          outputs.push({ type: "stderr", text: "sl not found in PATH" });
        }
      } else {
        outputs.push({ type: "stdout", text: `/usr/bin/${target}` });
      }
      break;
    }

    case "sl": {
      if (currentFrame.envVars.PATH.includes("02_miniTP_path")) {
        markCheck("tp2_run_sl");
        outputs.push({
          type: "stdout",
          text: `      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|      _________________
   /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A
  |      |  |   H  |__--------------------| [___] |   =|                        |
  | ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/
🚂 TCHOU TCHOU ! L'application 'sl' a été trouvée grâce à votre variable PATH !`
        });
      } else {
        markCheck("tp2_try_sl");
        outputs.push({
          type: "stderr",
          text: `bash: sl : commande introuvable.\n💡 Astuce (TP 2) : 'sl' se trouve dans /home/etudiant/TPs/02_miniTP_path/bin.\nAjoutez ce chemin à votre variable PATH avec :\nexport PATH="$PATH:/home/etudiant/TPs/02_miniTP_path/bin"`
        });
      }
      break;
    }

    case "python":
    case "python3": {
      if (args[0] === "-m" && args[1] === "venv") {
        const envName = args[2];
        if (!envName) {
          outputs.push({ type: "stderr", text: "Usage : python3 -m venv <nom_environnement>" });
          break;
        }
        const envPath = resolvePath(state.cwd, envName);
        state.envs[envName] = {
          name: envName,
          type: "venv",
          pythonVersion: "3.12.4",
          path: envPath,
          packages: { pip: "24.0" }
        };
        if (!state.directories.includes(envPath)) {
          state.directories.push(envPath, `${envPath}/bin`, `${envPath}/lib`);
        }
        markCheck("tp7_create_venv");
        outputs.push({
          type: "stdout",
          text: `✓ Environnement virtuel '${envName}' créé dans ${envPath} (copie de Python 3.12.4 + dossier site-packages).\nPour l'activer : source ${envName}/bin/activate`
        });
        break;
      }

      if (args[0] === "-m" && args[1] === "pip") {
        const pipSubCmd = "pip " + args.slice(2).join(" ");
        return executeSimulatedCommand(pipSubCmd, state);
      }

      if (args[0] && args[0].endsWith("pokestat.py")) {
        const active = state.activeEnv ? state.envs[state.activeEnv] : null;
        if (!active || (!active.packages["requests"] && !active.packages["pandas"])) {
          outputs.push({
            type: "stderr",
            text: `Traceback (most recent call last):\n  File "pokestat.py", line 2, in <module>\n    import requests\nModuleNotFoundError: No module named 'requests'\n💡 Activez un environnement virtuel et installez les dépendances : pip install -r requirements.txt`
          });
        } else {
          outputs.push({
            type: "stdout",
            text: `Analyse statistique des Pokémon (Génération 1 à 9)...\nMoyenne d'Attaque : 79.5 | Moyenne de Vitesse : 68.2\n✓ Script pokestat.py exécuté avec succès dans (${state.activeEnv}) !`
          });
        }
        break;
      }

      if (args[0] && args[0].includes("plot_restaurants.py")) {
        if (state.activeEnv === "mongoenv") {
          markCheck("tp13_conda_run");
          outputs.push({
            type: "stdout",
            text: `Chargement des données depuis restaurants.json...\nAffichage de la carte de densité (2 450 restaurants analysés).\n✓ Graphique généré avec succès dans l'environnement Conda (mongoenv) !`
          });
        } else {
          outputs.push({
            type: "stderr",
            text: `ModuleNotFoundError: No module named 'pymongo'\n💡 Activez d'abord l'environnement Conda dédié avec : conda activate mongoenv`
          });
        }
        break;
      }

      if (args.includes("--version") || args.includes("-V")) {
        const pyVer = state.activeEnv && state.envs[state.activeEnv]
          ? state.envs[state.activeEnv].pythonVersion
          : "3.12.4";
        outputs.push({ type: "stdout", text: `Python ${pyVer}` });
        break;
      }

      outputs.push({
        type: "stdout",
        text: `Python 3.12.4 (${state.activeEnv ? "env: " + state.activeEnv : "système global"})\nAstuce : utilisez 'python3 -m venv mon_env' ou exécutez un script .py.`
      });
      break;
    }

    case "pip": {
      const sub = args[0];
      const activeEnvObj = state.activeEnv ? state.envs[state.activeEnv] : null;
      const pipLocation = activeEnvObj
        ? `${activeEnvObj.path}/lib/python${activeEnvObj.pythonVersion.slice(0, 4)}/site-packages/pip (python ${activeEnvObj.pythonVersion.slice(0, 4)})`
        : `/usr/lib/python3/dist-packages/pip (python 3.12)`;

      if (!sub || sub === "help" || sub === "--help" || sub === "-h") {
        outputs.push({
          type: "stdout",
          text: `Usage: pip <command> [options]

Commandes principales :
  install      Installer des paquets (depuis PyPI, requirements.txt ou fichier .whl)
  uninstall    Désinstaller des paquets
  freeze       Afficher les paquets installés au format 'paquet==version' (pour requirements.txt)
  list         Lister les paquets installés sous forme de tableau lisible
  show         Afficher les détails et dépendances d'un paquet installé`
        });
        break;
      }

      if (sub === "--version" || sub === "-V") {
        markCheck("tp4_version");
        outputs.push({ type: "stdout", text: `pip 24.0 from ${pipLocation}` });
        break;
      }

      if (sub === "list") {
        const pkgs = activeEnvObj
          ? activeEnvObj.packages
          : { pip: "24.0", numpy: "1.26.4", setuptools: "68.2.0" };
        let table = `Package       Version\n------------- --------\n`;
        for (const [k, v] of Object.entries(pkgs)) {
          table += `${k.padEnd(13)} ${v}\n`;
        }
        outputs.push({ type: "stdout", text: table.trimEnd() });
        break;
      }

      if (sub === "freeze") {
        markCheck("tp4_freeze");
        const pkgs = activeEnvObj
          ? activeEnvObj.packages
          : { numpy: "1.26.4" };
        const lines = Object.entries(pkgs)
          .filter(([k]) => k !== "pip" && k !== "setuptools" && k !== "wheel")
          .map(([k, v]) => `${k}==${v}`);
        outputs.push({
          type: "stdout",
          text: lines.length ? lines.join("\n") : "# Aucun paquet tiers installé (hors pip/setuptools)"
        });
        break;
      }

      if (sub === "install") {
        const restArgs = args.slice(1);
        if (restArgs.length === 0) {
          outputs.push({ type: "stderr", text: "ERREUR : Vous devez donner au moins un nom de paquet à installer." });
          break;
        }

        // Special case: TP 5 & 6 wheel files can be inspected/simulated
        if (restArgs[0].includes("myappconf")) {
          markCheck("tp6_conflict");
          outputs.push({
            type: "stderr",
            text: `Processing ./dist/myappconf-0.1.0-py3-none-any.whl
Collecting pkg_a (from myappconf==0.1.0)
Collecting pkg_b (from myappconf==0.1.0)
ERROR: Cannot install myappconf because these package versions have conflicting dependencies.

Le conflit est causé par :
    pkg_a 0.1.0 dépend de pkg_c < 2
    pkg_b 0.1.0 dépend de pkg_c >= 2

ERROR: ResolutionImpossible: pour résoudre ce conflit en diamant (Slide 27), il faut assouplir les contraintes de versions.`
          });
          break;
        }

        if (restArgs[0].includes("myapp-0.1.0")) {
          markCheck("tp5_myapp");
          outputs.push({
            type: "stdout",
            text: `Processing ./dist/myapp-0.1.0-py3-none-any.whl
Résolution du graphe des dépendances par tri topologique (Slide 24) :
  Ordre calculé : pkg_e -> pkg_f -> pkg_b -> pkg_a -> pkg_c -> pkg_d -> myapp
Installing collected packages: pkg_e, pkg_f, pkg_b, pkg_a, pkg_c, pkg_d, myapp
Successfully installed pkg_e-0.1.0 pkg_f-0.1.0 pkg_b-0.1.0 pkg_a-0.1.0 pkg_c-0.1.0 pkg_d-0.1.0 myapp-0.1.0`
          });
          break;
        }

        // Check school session permission if no active virtual environment!
        if (!activeEnvObj) {
          outputs.push({
            type: "stderr",
            text: `error: externally-managed-environment / Permission denied: '/usr/lib/python3/dist-packages'
× Sur le système de l'école (Slide 21), vous n'avez pas les droits administrateur pour installer des paquets globalement avec pip !
💡 Solution (Slide 32) : Créez et activez un environnement virtuel :
   python3 -m venv mon_env
   source mon_env/bin/activate`
          });
          break;
        }

        if (restArgs[0] === "-r" && restArgs[1]) {
          activeEnvObj.packages["numpy"] = "1.26.4";
          activeEnvObj.packages["pandas"] = "2.2.2";
          activeEnvObj.packages["matplotlib"] = "3.9.2";
          activeEnvObj.packages["scikit-learn"] = "1.5.2";
          activeEnvObj.packages["requests"] = "2.31.0";
          outputs.push({
            type: "stdout",
            text: `Lecture de ${restArgs[1]}...\nInstalling collected packages: numpy, pandas, matplotlib, scikit-learn, requests\nSuccessfully installed matplotlib-3.9.2 numpy-1.26.4 pandas-2.2.2 requests-2.31.0 scikit-learn-1.5.2`
          });
          break;
        }

        const installedList: string[] = [];
        for (const pkg of restArgs) {
          const cleanName = pkg.split(/[=<>~]/)[0];
          const ver = cleanName === "cowsay" ? "6.1" : cleanName === "lolcat" ? "1.4" : cleanName === "black" ? "24.10.0" : "2.31.0";
          activeEnvObj.packages[cleanName] = ver;
          installedList.push(`${cleanName}-${ver}`);
          if (cleanName === "cowsay" || cleanName === "lolcat") {
            markCheck("tp9_install_cowsay");
          }
        }

        outputs.push({
          type: "stdout",
          text: `Collecting ${restArgs.join(", ")}\n  Downloading wheel packages from PyPI (*.whl)...\nInstalling collected packages: ${restArgs.join(", ")}\nSuccessfully installed ${installedList.join(" ")}`
        });
        break;
      }

      outputs.push({ type: "stderr", text: `pip: sous-commande '${sub}' non reconnue. Tapez 'pip help'.` });
      break;
    }

    case "virtualenv": {
      let pyVer = "3.12";
      let envName = "myenv";
      for (let i = 0; i < args.length; i++) {
        if (args[i] === "-p" && args[i + 1]) {
          pyVer = args[i + 1].toLowerCase().replace("python", "") || "3.11";
          i++;
        } else if (!args[i].startsWith("-")) {
          envName = args[i];
        }
      }
      const envPath = resolvePath(state.cwd, envName);
      state.envs[envName] = {
        name: envName,
        type: "virtualenv",
        pythonVersion: `${pyVer}.9`,
        path: envPath,
        packages: { pip: "24.0", setuptools: "69.5.1", wheel: "0.43.0" }
      };
      if (!state.directories.includes(envPath)) {
        state.directories.push(envPath, `${envPath}/bin`);
      }
      outputs.push({
        type: "stdout",
        text: `created virtual environment CPython${pyVer}.9.final.0-64 in 135ms
  creator CPython3Posix(dest=${envPath}, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy)
✓ Environnement '${envName}' créé avec Python ${pyVer} (seeder ultra-rapide depuis le cache local).\nPour l'activer : source ${envName}/bin/activate`
      });
      break;
    }

    case "cowsay": {
      const activeEnvObj = state.activeEnv ? state.envs[state.activeEnv] : null;
      if (!activeEnvObj || !activeEnvObj.packages["cowsay"]) {
        outputs.push({
          type: "stderr",
          text: `bash: cowsay : commande introuvable.\n💡 Astuce (TP 9) : Créez/activez un environnement virtuel et installez cowsay avec 'pip install cowsay'.`
        });
        break;
      }
      if (args.includes("-h") || args.includes("--help")) {
        outputs.push({
          type: "stdout",
          text: `usage: cowsay [-h] [-t TEXT] [-c CHARACTER]
Available Characters (-c):
  beavis, cheese, cow, daemon, dragon, fox, ghostbusters, kitty,
  meow, milk, pig, sheep, stegosaurus, stimpy, trex, turkey, turtle, tux`
        });
        break;
      }
      let text = "Bonjour !";
      let character = "default";
      for (let i = 0; i < args.length; i++) {
        if (args[i] === "-t" && args[i + 1]) {
          text = args[i + 1];
          i++;
        } else if (args[i] === "-c" && args[i + 1]) {
          character = args[i + 1];
          i++;
        } else if (!args[i].startsWith("-")) {
          text = args[i];
        }
      }
      outputs.push({ type: "stdout", text: renderCowsay(text, character) });
      break;
    }

    case "poetry": {
      const sub = args[0];
      if (!sub || sub === "--help" || sub === "help") {
        outputs.push({
          type: "stdout",
          text: `Poetry (version 1.8.4) — Gestionnaire de dépendances et de paquets Python

Commandes du cycle de vie (Slide 47) :
  1. poetry new <projet> / poetry init      Démarrer un projet (crée/initialise pyproject.toml)
  2. poetry add <paquet>                    Ajouter une dépendance dans pyproject.toml
  3. poetry lock / install / update         Résoudre poetry.lock et installer dans l'environnement virtuel
  4. poetry shell / poetry run <commande>   Activer l'environnement ou y exécuter une commande
  5. poetry build                           Construire les distributions sdist (.tar.gz) et wheel (.whl)
  6. poetry publish -u <user> -p <pass>     Publier sur PyPI`
        });
        break;
      }

      if (sub === "new") {
        const projName = args[1] || "mon_projet";
        const projPath = resolvePath(state.cwd, projName);
        state.directories.push(projPath, `${projPath}/${projName}`, `${projPath}/tests`);
        state.files[`${projPath}/pyproject.toml`] = `[tool.poetry]\nname = "${projName}"\nversion = "0.1.0"\ndescription = ""\nauthors = ["Etudiant <etudiant@polytech-lille.fr>"]\n\n[tool.poetry.dependencies]\npython = "^3.12"\n`;
        outputs.push({
          type: "stdout",
          text: `Created package ${projName} in ${projName}\n✓ Arborescence et fichier pyproject.toml créés.`
        });
        break;
      }

      if (sub === "init") {
        const tomlPath = `${state.cwd}/pyproject.toml`;
        state.files[tomlPath] = `[tool.poetry]\nname = "show_ade"\nversion = "0.1.0"\ndescription = "Projet initialisé avec Poetry"\n\n[tool.poetry.dependencies]\npython = ">=3.9"\n`;
        outputs.push({
          type: "stdout",
          text: `✓ Fichier pyproject.toml généré dans ${state.cwd}.`
        });
        break;
      }

      if (sub === "add") {
        const pkgs = args.slice(1);
        if (!pkgs.length) {
          outputs.push({ type: "stderr", text: "Usage : poetry add <paquet>" });
          break;
        }
        state.envs["poetry-env"] = {
          name: "poetry-env",
          type: "poetry",
          pythonVersion: "3.12.4",
          path: "/home/etudiant/.cache/pypoetry/virtualenvs/show-ade-py3.12",
          packages: { ...(state.envs["poetry-env"]?.packages || {}), requests: "2.32.3", icalendar: "5.0.13" }
        };
        for (const p of pkgs) {
          state.envs["poetry-env"].packages[p] = "2.32.3";
        }
        outputs.push({
          type: "stdout",
          text: `Using version ^2.32.3 for ${pkgs.join(", ")}\nUpdating dependencies\nResolving dependencies... (0.3s)\nWriting lock file (poetry.lock)\nPackage operations: ${pkgs.length} install(s), 0 updates, 0 removals\n  ✓ Ajouté à pyproject.toml, verrouillé dans poetry.lock et installé dans le venv Poetry.`
        });
        break;
      }

      if (sub === "lock") {
        state.files[`${state.cwd}/poetry.lock`] = `# This file is automatically @generated by Poetry 1.8.4 and should not be changed by hand.\n[[package]]\nname = "matplotlib"\nversion = "3.9.2"\n`;
        outputs.push({
          type: "stdout",
          text: `Updating dependencies\nResolving dependencies... (0.4s)\nWriting lock file\n✓ Fichier poetry.lock généré : toutes les versions exactes sont désormais figées !`
        });
        break;
      }

      if (sub === "install" || sub === "update") {
        markCheck("tp12_poetry_install");
        state.envs["poetry-env"] = {
          name: "poetry-env",
          type: "poetry",
          pythonVersion: "3.12.4",
          path: "/home/etudiant/.cache/pypoetry/virtualenvs/show-ade-py3.12",
          packages: { requests: "2.32.3", icalendar: "5.0.13", matplotlib: "3.9.2", numpy: "1.26.4" }
        };
        outputs.push({
          type: "stdout",
          text: `Creating virtualenv show-ade-py3.12 in /home/etudiant/.cache/pypoetry/virtualenvs\nInstalling dependencies from lock file\nPackage operations: 4 installs, 0 updates, 0 removals\n  - Installing numpy (1.26.4)\n  - Installing requests (2.32.3)\n  - Installing icalendar (5.0.13)\n  - Installing matplotlib (3.9.2)\nInstalling the current project: show_ade (0.1.0)`
        });
        break;
      }

      if (sub === "shell") {
        state.activeEnv = "poetry-env";
        state.activeEnvType = "poetry";
        outputs.push({
          type: "stdout",
          text: `Spawning shell within /home/etudiant/.cache/pypoetry/virtualenvs/show-ade-py3.12\n✓ Sous-shell Poetry actif.`
        });
        break;
      }

      if (sub === "run") {
        markCheck("tp12_poetry_run");
        outputs.push({
          type: "stdout",
          text: `[Exécution isolée via Poetry dans show-ade-py3.12]\nCommande : ${args.slice(1).join(" ")}\n📅 Emploi du temps ADE (Ressource 4YMHMH-120) :\n  • Lun 08h00–12h00 : Initiation aux Environnements Virtuels (Achddou & Cazaux)\n  • Mar 14h00–17h00 : Machine Learning & NoSQL\n✓ Exécution terminée avec succès !`
        });
        break;
      }

      if (sub === "build") {
        outputs.push({
          type: "stdout",
          text: `Building show_ade (0.1.0)\n  - Building sdist\n  - Built show_ade-0.1.0.tar.gz\n  - Building wheel\n  - Built show_ade-0.1.0-py3-none-any.whl\n✓ Distributions générées dans dist/.`
        });
        break;
      }

      if (sub === "publish") {
        outputs.push({
          type: "stdout",
          text: `Publishing show_ade (0.1.0) to PyPI\n - Uploading show_ade-0.1.0-py3-none-any.whl 100%\n - Uploading show_ade-0.1.0.tar.gz 100%\n✓ Paquet publié (simulation) !`
        });
        break;
      }

      outputs.push({ type: "stderr", text: `poetry: commande '${sub}' non reconnue.` });
      break;
    }

    case "/usr/localTP/anaconda3/bin/conda":
    case "conda": {
      const sub = args[0];
      if (sub === "init") {
        state.condaInitialized = true;
        outputs.push({
          type: "stdout",
          text: `modified      /home/etudiant/.bashrc\n==> For changes to take effect, close and re-open your current shell, or run 'source ~/.bashrc' <==\n✓ Conda est initialisé !`
        });
        break;
      }

      if (sub === "env" && args[1] === "list") {
        markCheck("tp13_conda_list");
        const envLines = Object.values(state.envs)
          .filter(e => e.type === "conda")
          .map(e => {
            const star = state.activeEnv === e.name ? "*" : " ";
            return `${e.name.padEnd(20)} ${star}  ${e.path}`;
          });
        outputs.push({
          type: "stdout",
          text: `# conda environments:\n#\n${envLines.join("\n")}`
        });
        break;
      }

      if (sub === "create") {
        const nameIdx = args.indexOf("-n");
        const envName = nameIdx !== -1 && args[nameIdx + 1] ? args[nameIdx + 1] : "myenv";
        const pyArg = args.find(a => a.toLowerCase().startsWith("python="));
        const pyVer = pyArg ? pyArg.split("=")[1] : "3.12";
        state.envs[envName] = {
          name: envName,
          type: "conda",
          pythonVersion: `${pyVer}.4`,
          path: `/usr/localTP/anaconda3/envs/${envName}`,
          packages: { python: `${pyVer}.4`, pip: "24.0" }
        };
        outputs.push({
          type: "stdout",
          text: `Channels: defaults, conda-forge
Platform: linux-64
Collecting package metadata (repodata.json): done
Solving environment (OS + arch + contraintes): done
Downloading and Extracting Packages (binaires précompilés depuis anaconda.org) :
  python-${pyVer}.4 | 31.2 MB | ######################################################## | 100%
Preparing transaction: done
Executing transaction: done
# To activate this environment, use:
#     $ conda activate ${envName}
# To deactivate an active environment, use:
#     $ conda deactivate`
        });
        break;
      }

      if (sub === "activate") {
        const envName = args[1] || "base";
        if (!state.envs[envName] || state.envs[envName].type !== "conda") {
          outputs.push({
            type: "stderr",
            text: `EnvironmentNameNotFound: Impossible de trouver l'environnement Conda '${envName}'.\nVérifiez la liste avec 'conda env list' ou créez-le avec 'conda create -n ${envName} python=3.12'.`
          });
          break;
        }
        state.activeEnv = envName;
        state.activeEnvType = "conda";
        if (envName === "mongoenv") {
          markCheck("tp13_conda_activate");
        }
        outputs.push({
          type: "info",
          text: `✓ Environnement Conda (${envName}) activé.`
        });
        break;
      }

      if (sub === "deactivate") {
        state.activeEnv = null;
        state.activeEnvType = null;
        outputs.push({ type: "info", text: "✓ Environnement Conda désactivé." });
        break;
      }

      if (sub === "install") {
        const pkg = args.find(a => !a.startsWith("-") && a !== "install") || "manim";
        const targetEnv = state.activeEnv && state.envs[state.activeEnv]?.type === "conda"
          ? state.envs[state.activeEnv]
          : state.envs["base"];
        targetEnv.packages[pkg] = "0.18.1";
        outputs.push({
          type: "stdout",
          text: `Collecting package metadata (repodata.json): done
Solving environment: done
Téléchargement des binaires précompilés (Python + bibliothèques système C/C++ cairo, ffmpeg, pango) :
  ${pkg}-0.18.1       | 14.8 MB | ################################################# | 100%
✓ Paquet '${pkg}' et ses dépendances système installés dans (${targetEnv.name}).`
        });
        break;
      }

      if (sub === "remove") {
        const nameIdx = args.indexOf("-n");
        const envName = nameIdx !== -1 && args[nameIdx + 1] ? args[nameIdx + 1] : "";
        if (envName && state.envs[envName]) {
          delete state.envs[envName];
          if (state.activeEnv === envName) {
            state.activeEnv = null;
            state.activeEnvType = null;
          }
          outputs.push({
            type: "stdout",
            text: `Remove all packages in environment /usr/localTP/anaconda3/envs/${envName}:\n✓ Environnement Conda '${envName}' supprimé avec succès.`
          });
        } else {
          outputs.push({ type: "stderr", text: "Usage : conda remove -n <nom_env> --all" });
        }
        break;
      }

      outputs.push({
        type: "stdout",
        text: `Commandes Conda disponibles : conda env list, conda create -n <env> python=3.12, conda activate <env>, conda install <pkg>, conda deactivate, conda remove -n <env> --all`
      });
      break;
    }

    default: {
      outputs.push({
        type: "stderr",
        text: `bash: ${cmd} : commande non supportée ou introuvable dans ce simulateur pédagogique.\n💡 Tapez 'help' pour afficher la liste complète des commandes du cours prises en charge.`
      });
      break;
    }
  }

  return { newState: state, outputs };
}
