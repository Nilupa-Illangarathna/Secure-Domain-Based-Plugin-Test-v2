import {
  loadState,
  saveState,
  setOption,
  getOption,
  setOriginalStyles,
  getOriginalStyles,
} from "./util/stateManager.js";
import { createControlPanel } from "./util/controlPanel.js";
import { setupEventListeners } from "./util/eventListeners.js";
import { injectStyles } from "./util/styleInjector.js";
import { reset } from "./util/reset.js";
import { injectedStyles } from "./util/styles.js";

class AccessibilityPlugin {
  constructor(options = {}) {
    if (!(this instanceof AccessibilityPlugin)) {
      throw new Error('AccessibilityPlugin must be called with new');
    }

    loadState();

    // Apply custom options provided on initialization
    this.options = { ...getOption(), ...options };
    this.originalStyles = getOriginalStyles();

    this.init();
  }

  init() {
    createControlPanel();
    injectStyles(injectedStyles);
    setupEventListeners();
    console.log("Accessibility Plugin initialized");
  }

  reset() {
    setOriginalStyles(new Map());
    saveState();
  }
}

// Make sure it's available in all environments
if (typeof window !== 'undefined') {
  window.AccessibilityPlugin = AccessibilityPlugin;
}

export default AccessibilityPlugin;