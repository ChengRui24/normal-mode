import "./styles.css";
import { advanceAfterResult, applyChoice, startGame } from "./core/gameEngine.js";
import { createInitialState } from "./core/initialState.js";
import { clearSavedState, loadState, saveState } from "./core/storage.js";
import { renderGame } from "./ui/render.js";

const root = document.querySelector("#app");

let state = loadState() ?? createInitialState();

function commitState(nextState, options = {}) {
  state = nextState;
  saveState(state);
  if (options.render !== false) {
    render();
  }
}

function handleChoose(choice, options) {
  commitState(applyChoice(state, choice), options);
}

function handleContinue() {
  commitState(state.phase === "home" ? startGame(state) : advanceAfterResult(state));
}

function handleRestart() {
  clearSavedState();
  commitState(createInitialState());
}

function render() {
  renderGame(root, {
    state,
    onChoose: handleChoose,
    onContinue: handleContinue,
    onRestart: handleRestart
  });
}

render();
