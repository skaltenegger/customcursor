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
    this.easing = Back.easeOut.config(1.7);
    this.green = getComputedStyle(
      document.querySelector(".demo-5")
    ).getPropertyValue("--color-link");

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
              this.cursorOriginals = {
                width: this.cursorObjectBox.width,
                height: this.cursorObjectBox.height
              };
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

      const activeItem = document.querySelector(".nav__link.is-active");
      if (activeItem && this.nav.dataset.lastActive !== target.dataset.index) {
        this.nav.dataset.lastActive = activeItem.dataset.index;
        activeItem.classList.remove("is-active");
      }

      this.cursorIsStuck = true;
      TweenMax.to(this.cursor, 0.25, {
        x: linkBox.left + linkBox.width / 2 - this.cursorBox.width / 2,
        y: linkBox.top + linkBox.height / 2 - this.cursorBox.height / 2 - 0.5
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

    const handleMouseClick = e => {
      const target = e.currentTarget;
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
    };

    // show the first image
    document
      .querySelector('.image-wrapper__img[data-index="1"]')
      .classList.add("is-visible");

    Util.addEventListenerBySelector(
      ".nav__link",
      "mouseenter",
      handleMouseEnter
    );
    Util.addEventListenerBySelector(".nav__link", "click", handleMouseClick);
    Util.addEventListenerBySelector(".nav", "mouseleave", handleMouseLeave);

    const codropsNavEnter = e => {
      TweenMax.to(this.cursorInner, 0.2, {
        scale: 0.8,
        borderColor: "#ffffff",
        ease: this.easing
      });
    };

    const codropsNavLeave = e => {
      TweenMax.to(this.cursorInner, 0.2, {
        scale: 1,
        opacity: 1,
        borderColor: "#2edf16",
        ease: this.easing
      });
    };

    Util.addEventListenerBySelector(
      ".demo-5 .content--fixed a",
      "mouseenter",
      codropsNavEnter
    );
    Util.addEventListenerBySelector(
      ".demo-5 .content--fixed a",
      "mouseleave",
      codropsNavLeave
    );
  }
}

export default Demo5;
