import { createInitialSimulatorState, executeSimulatedCommand, formatPrompt } from '../src/utils/terminalSimulator.ts';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`ASSERTION FAILED: ${message}`);
  }
}

console.log("=== Running Automated Verification of Virtual Terminal Simulator ===");
let state = createInitialSimulatorState();

// Test 1: Security check — prompt does NOT contain "atlas"
const initialPrompt = formatPrompt(state);
assert(!initialPrompt.toLowerCase().includes("atlas"), "Prompt must not contain injected hostname 'atlas'");
console.log("✓ Security check 1 passed: Prompt is clean ->", initialPrompt);

// Test 2: TP 1 (man pwd & pwd --version)
let res = executeSimulatedCommand("man pwd", state);
state = res.newState;
assert(res.outputs[0].text.includes("Jim Meyering"), "man pwd should mention author Jim Meyering");
res = executeSimulatedCommand("pwd --version", state);
state = res.newState;
assert(state.completedChecks.includes("tp1_man") && state.completedChecks.includes("tp1_version"), "TP 1 checks completed");
console.log("✓ TP 1 (man pwd, pwd --version) passed.");

// Test 3: TP 2 (sl & PATH)
res = executeSimulatedCommand("sl", state);
state = res.newState;
assert(res.outputs[0].type === "stderr", "sl should fail before adding to PATH");
res = executeSimulatedCommand('export PATH="$PATH:/home/etudiant/TPs/02_miniTP_path/bin"', state);
state = res.newState;
res = executeSimulatedCommand("sl", state);
state = res.newState;
assert(res.outputs[0].text.includes("TCHOU TCHOU"), "sl should succeed after adding to PATH");
assert(state.completedChecks.includes("tp2_run_sl"), "TP 2 check completed");
console.log("✓ TP 2 (PATH & sl) passed.");

// Test 4: TP 3 (Inception of bash, PS1, --norc)
res = executeSimulatedCommand("bash", state);
state = res.newState;
assert(state.shellStack.length === 2, "bash should increment SHLVL to 2");
res = executeSimulatedCommand('export PS1="[\\A] > "', state);
state = res.newState;
res = executeSimulatedCommand("bash --norc", state);
state = res.newState;
assert(state.shellStack.length === 3 && state.shellStack[2].ps1.includes("[\\A]"), "bash --norc should preserve custom PS1");
res = executeSimulatedCommand("exit", state);
state = res.newState;
res = executeSimulatedCommand("exit", state);
state = res.newState;
assert(state.shellStack.length === 1, "exit should return to SHLVL 1");
console.log("✓ TP 3 (Inception of bash & --norc) passed.");

// Test 5: TP 4, 5, 6 (pip, topological sort, diamond conflict)
res = executeSimulatedCommand("pip --version && pip freeze", state);
state = res.newState;
res = executeSimulatedCommand("pip install dist/myapp-0.1.0-py3-none-any.whl", state);
state = res.newState;
assert(res.outputs[0].text.includes("pkg_e -> pkg_f -> pkg_b -> pkg_a -> pkg_c -> pkg_d -> myapp"), "Topological sort order verified");
res = executeSimulatedCommand("pip install dist/myappconf-0.1.0-py3-none-any.whl", state);
state = res.newState;
assert(res.outputs[0].type === "stderr" && res.outputs[0].text.includes("ResolutionImpossible"), "Diamond conflict detected");
console.log("✓ TP 4, 5 & 6 (pip, topological sort, conflict) passed.");

// Test 6: Global pip install blocked without venv -> then allowed inside venv (TP 7, 8, 9, 10)
res = executeSimulatedCommand("pip install cowsay", state);
assert(res.outputs[0].type === "stderr", "Global pip install should be blocked on school session");
res = executeSimulatedCommand("python3 -m venv mon_env && source mon_env/bin/activate", state);
state = res.newState;
assert(state.activeEnv === "mon_env", "mon_env should be active");
res = executeSimulatedCommand("pip install cowsay lolcat", state);
state = res.newState;
res = executeSimulatedCommand('cowsay -t "Bonjour !" | lolcat', state);
state = res.newState;
assert(res.outputs[0].type === "rainbow" && res.outputs[0].text.includes("Bonjour !"), "cowsay | lolcat rainbow pipe works");
console.log("✓ TP 7, 8, 9 & 10 (venv, cowsay | lolcat) passed.");

// Test 7: TP 11 & 12 (pyproject.toml & Poetry)
res = executeSimulatedCommand("cat ~/TPs/11_miniTP_pyproject/pyproject.toml", state);
state = res.newState;
assert(res.outputs[0].text.includes('version = "2.8.2"'), "pyproject.toml cat works");
res = executeSimulatedCommand("poetry install && poetry run python -m show_ade 4YMHMH-120", state);
state = res.newState;
assert(state.completedChecks.includes("tp12_poetry_run"), "Poetry workflow works");
console.log("✓ TP 11 & 12 (pyproject.toml & Poetry) passed.");

// Test 8: TP 13 (Conda)
res = executeSimulatedCommand("conda env list && conda activate mongoenv && python plot_restaurants.py restaurants.json", state);
state = res.newState;
assert(state.completedChecks.includes("tp13_conda_run"), "Conda workflow works");
console.log("✓ TP 13 (Conda workflow) passed.");

// Test 9: Unsupported command fails safely
res = executeSimulatedCommand("rm -rf /", state);
assert(res.outputs[0].type === "stderr" && res.outputs[0].text.includes("commande non supportée"), "Unsupported commands fail safely");
console.log("✓ Safe failure on unsupported command passed.");

console.log("\nALL 9 TEST SUITES PASSED SUCCESSFULLY!");
