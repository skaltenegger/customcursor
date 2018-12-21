import initCodrops from "./initCodrops";
import MorphSVGPlugin from "./utils/MorphSVGPlugin";
import Util from "./utils/util";

/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */

class Demo5 {
  constructor() {
    initCodrops();
    this.initCursor();
    this.initHovers();
  }

  initCursor() {
    this.cursor = document.querySelector(".square-cursor");
    this.cursorBox = this.cursor.getBoundingClientRect();

    document.addEventListener("mousemove", e => {
      if (
        !this.cursor.classList.contains("is-visible") &&
        !this.cursor.classList.contains("is-stuck")
      ) {
        this.setCursorPosition(e, 0, () => {
          TweenMax.set(this.cursor, {
            opacity: 1
          });
        });
      }

      if (!this.cursor.classList.contains("is-stuck")) {
        this.setCursorPosition(e);
      }
    });
  }

  setCursorPosition(e, duration = 0, complete = () => {}) {
    const { clientX, clientY } = e;
    TweenMax.to(this.cursor, duration, {
      x: clientX - this.cursorBox.width / 2,
      y: clientY - this.cursorBox.height / 2,
      onComplete: complete()
    });
  }

  initHovers() {
    const handleMouseEnter = e => {
      const target = e.currentTarget;
      const box = target.getBoundingClientRect();
      const x = box.x;
      const y = box.y;
      this.cursorOriginals = {
        width: this.cursorBox.width,
        height: this.cursorBox.height
      };
      this.cursor.classList.add("is-stuck");
      TweenMax.to(this.cursor, 0.2, {
        rotation: 0,
        x: x,
        y: y,
        width: box.width,
        height: box.height
      });
    };

    const handleMouseLeave = e => {
      this.cursor.classList.remove("is-stuck");
      TweenMax.to(this.cursor, 0.2, {
        rotation: -45,
        width: this.cursorOriginals.width,
        height: this.cursorOriginals.height
      });
    };

    Util.addEventListenerByClass("nav__link", "mouseenter", handleMouseEnter);
    Util.addEventListenerByClass("nav__link", "mouseleave", handleMouseLeave);
  }
}

export default Demo5;
