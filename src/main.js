import "./styles.css";
import {
  advanceAfterResult,
  applyChoice,
  canGoToNextView,
  getViewedState,
  goToNextView,
  goToPreviousView,
  startGame
} from "./core/gameEngine.js";
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
  if (canGoToNextView(state)) {
    commitState(goToNextView(state));
    return;
  }
  commitState(state.phase === "home" ? startGame(state) : advanceAfterResult(state));
}

function handlePrevious() {
  commitState(goToPreviousView(state));
}

function handleNext() {
  commitState(goToNextView(state));
}

function handleRestart() {
  clearSavedState();
  commitState(createInitialState());
}

function render() {
  renderGame(root, {
    state: getViewedState(state),
    onChoose: handleChoose,
    onContinue: handleContinue,
    onPrevious: handlePrevious,
    onNext: handleNext,
    onRestart: handleRestart
  });
}

render();
