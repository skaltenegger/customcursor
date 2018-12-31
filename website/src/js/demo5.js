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
    this.cursorInner = document.querySelector(".square-cursor__inner");
    this.nav = document.querySelector(".nav");
    this.navBox = this.nav.getBoundingClientRect();
    this.cursorObjectBox = this.cursorInner.getBoundingClientRect();
    this.cursorBox = this.cursor.getBoundingClientRect();

    this.cursorIsStuck = false;

    document.addEventListener("mousemove", e => {
      if (
        !this.cursor.classList.contains("is-visible") &&
        !this.cursorIsStuck
      ) {
        this.setCursorPosition(e, 0, () => {
          TweenMax.set(this.cursor, {
            opacity: 1,
            onComplete: () => {
              TweenMax.set(this.cursorInner, {
                rotation: -45
              });
              this.cursor.classList.add("is-visible");
            }
          });
        });
      }

      if (!this.cursorIsStuck) {
        this.setCursorPosition(e);
      }
    });
  }

  setCursorPosition(e, duration = 0, complete = () => {}) {
    const { clientX, clientY } = e;
    TweenMax.set(this.cursor, {
      x: clientX - this.cursorBox.width / 2,
      y: clientY - this.cursorBox.height / 2,
      onComplete: complete()
    });
  }

  initHovers() {
    const handleMouseEnter = e => {
      const target = e.currentTarget;
      const { clientX, clientY } = e;
      const linkBox = target.getBoundingClientRect();

      this.cursorOriginals = {
        width: this.cursorObjectBox.width,
        height: this.cursorObjectBox.height
      };

      const activeItem = document.querySelector(".nav__link.is-active");
      if (this.nav.dataset.lastActive !== target.dataset.index) {
        activeItem && activeItem.classList.remove("is-active");
        // show new image
        document
          .querySelectorAll(".image-wrapper__img")
          .forEach(image => image.classList.remove("is-visible"));
        document
          .querySelector(
            `.image-wrapper__img[data-index="${target.dataset.index}"]`
          )
          .classList.add("is-visible");
      }
      this.nav.dataset.lastActive = target.dataset.index;

      this.cursorIsStuck = true;
      TweenMax.to(this.cursor, 0.25, {
        x: linkBox.x + linkBox.width / 2 - this.cursorBox.width / 2,
        y: linkBox.y + linkBox.height / 2 - this.cursorBox.height / 2 - 0.5
      });
      TweenMax.to(this.cursorInner, 0.2, {
        rotation: 0,
        width: linkBox.width,
        height: linkBox.height
      });
    };

    const handleMouseLeave = e => {
      const { clientX, clientY } = e;

      document
        .querySelector(
          `.nav__link[data-index="${this.nav.dataset.lastActive}"]`
        )
        .classList.add("is-active");

      this.cursorIsStuck = false;

      TweenMax.to(this.cursorInner, 0.25, {
        rotation: -45,
        width: this.cursorOriginals.width,
        height: this.cursorOriginals.height
      });
    };

    // show the first image
    document
      .querySelector('.image-wrapper__img[data-index="1"]')
      .classList.add("is-visible");

    Util.addEventListenerByClass("nav__link", "mouseenter", handleMouseEnter);
    Util.addEventListenerByClass("nav", "mouseleave", handleMouseLeave);
  }
}

export default Demo5;
