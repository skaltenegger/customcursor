import Util from "./util.js";

class Resizer {
  /**
   * A helper for organizing resize callbacks.
   * @param breakpoints An array of objects that describes the desired breakpoints
   {
     breakpoint: 'mobile',
     zIndex: 100
   }
   * @param strict bool When true, only fires callbacks when the the breakpoint has changed. (default: true)
   * @param delay int The debounce delay micro seconds. (default: 200)
   */
  constructor(breakpoints, strict = true, delay = 200) {
    this.callbacks = {};
    this.lastZIndex = 0;
    this.breakpoints = breakpoints;
    this.initDetector();
    if (this.detector)
      window.addEventListener(
        "resize",
        Util.debounce(e => {
          this.update(strict);
        }, delay)
      );
    this.update(strict);
  }

  /**
   * Creates a `.resizer` element to the page if there isn't already.
   */
  initDetector() {
    if (typeof window === "undefined") return;
    if (!this.detector) {
      this.detector = document.querySelector(".resizer");
    }
    if (!this.detector) {
      let div = document.createElement("div");
      div.className = "resizer";

      document.body.appendChild(div);
      this.detector = document.querySelector(".resizer");
    }
  }

  /**
   * Updates the `is<breakpoint>` properties and triggers any existing callbacks
   */
  update(strict) {
    if (this.detector) {
      let computedStyle = window.getComputedStyle(this.detector, null);

      if (strict && computedStyle.zIndex === this.lastZIndex) return;
      this.lastZIndex = computedStyle.zIndex;

      this.breakpoints.map(breakpoint =>
        this._mapBreakpoints(breakpoint, computedStyle.zIndex)
      );

      if (!this.callbacks) return;
      let callbackGroups = Object.values(this.callbacks);

      callbackGroups.forEach(callbacks => {
        callbacks.forEach(callback => callback());
      });
    }
  }

  /**
   * Adds a callback to be run after resize.
   * @param callback The function to run.
   * @param id A string identifier, useful if you need to delete it later.
   */
  addCallback(callback, id = "default") {
    if (!this.callbacks[id]) this.callbacks[id] = [];
    this.callbacks[id].push(callback);
  }

  /**
   *
   * @param id Useful
   */
  destroyCallbacks(id) {
    if (id === "default") return;

    let cbs = new Map(Object.entries(this.callbacks));
    if (cbs.has(id)) cbs.delete(id);
  }

  /**
   * Creates and Updates `is<breakpoint>` properties for all breakpoints provided
   * @param breakpoint
   * @param zIndex
   */
  _mapBreakpoints(breakpoint, zIndex) {
    let propName =
      "is" +
      breakpoint.breakpoint.charAt(0).toUpperCase() +
      breakpoint.breakpoint.slice(1);
    this[propName] = Number(breakpoint.zIndex) === Number(zIndex);
  }

  _log() {
    console.table([
      Object.keys(this)
        .filter(key => key.startsWith("is"))
        .reduce((obj, key) => {
          obj[key] = this[key];
          return obj;
        }, {})
    ]);
  }
}

export default Resizer;
