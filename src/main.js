import "./styles.css";
import { advanceAfterResult, applyChoice } from "./core/gameEngine.js";
import { createInitialState } from "./core/initialState.js";
import { clearSavedState, loadState, saveState } from "./core/storage.js";
import { renderGame } from "./ui/render.js";

const root = document.querySelector("#app");

let state = loadState() ?? createInitialState();

function commitState(nextState) {
  state = nextState;
  saveState(state);
  render();
}

function handleChoose(choice) {
  commitState(applyChoice(state, choice));
}

function handleContinue() {
  commitState(advanceAfterResult(state));
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
