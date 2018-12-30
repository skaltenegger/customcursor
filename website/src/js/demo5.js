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
    this.nav = document.querySelector(".nav");
    this.navBox = this.nav.getBoundingClientRect();
    this.cursorObjectBox = this.cursor.getBoundingClientRect();
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
            // rotation: -45,
            transformOrigin: "left top",
            onComplete: () => {
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
      x: clientX, // - (this.cursorBox.width * Math.sqrt(2)) / 2,
      y: clientY, // - (this.cursorBox.width * Math.sqrt(2)) / 2,
      onComplete: complete()
    });
  }

  initHovers() {
    const handleMouseEnter = e => {
      const target = e.currentTarget;
      const { clientX, clientY } = e;
      const box = target.getBoundingClientRect();
      const x = box.x;
      const y = box.y;
      this.cursorOriginals = {
        width: this.cursorObjectBox.width,
        height: this.cursorObjectBox.height
      };
      console.log(this.cursorOriginals);
      const activeItem = document.querySelector(".nav__link.is-active");

      if (this.nav.dataset.lastActive !== target.dataset.index) {
        activeItem && activeItem.classList.remove("is-active");

        // snow new image
        document
          .querySelectorAll(".image-wrapper__img")
          .forEach(image => image.classList.remove("is-visible"));

        document
          .querySelector(
            `.image-wrapper__img[data-index="${target.dataset.index}"]`
          )
          .classList.add("is-visible");
      }

      // const percentX = Math.max((100 / box.width) * (clientX - x), 0);
      // const percentY = Math.max((100 / box.height) * (clientY - y), 0);
      // const transformOrigin = `${percentX} ${percentY}`;
      const transformOrigin = "left top";

      this.nav.dataset.lastActive = target.dataset.index;

      this.cursorIsStuck = true;
      TweenMax.to(this.cursor, 0.2, {
        transformOrigin: transformOrigin,
        rotation: 0,
        left: 0,
        top: 0,
        x: x,
        y: y,
        width: box.width,
        height: box.height
      });
    };

    const handleMouseLeave = e => {
      const { clientX, clientY } = e;

      // const box = document
      //   .querySelector(".nav__link.is-active")
      //   .getBoundingClientRect();
      // const percentX = Math.max((100 / box.width) * (clientX - x), 0);
      // const percentY = Math.max((100 / box.height) * (clientY - y), 0);
      // const transformOrigin = `${percentX} ${percentY}`;
      const transformOrigin = `left top`;

      document
        .querySelector(
          `.nav__link[data-index="${this.nav.dataset.lastActive}"]`
        )
        .classList.add("is-active");

      this.deactivateMouseMove = true;

      const inBetweenHandler = e => {
        const { clientX, clientY } = e;
        const inBetweenCursorBox = this.cursor.getBoundingClientRect();
        TweenMax.to(this.cursor, 0, {
          transformOrigin: transformOrigin,
          // left: -1,
          // top: -2,
          x: clientX, // - (this.cursorBox.width * Math.sqrt(2)) / 2,
          y: clientY
        });
      };
      // document.addEventListener("mousemove", inBetweenHandler);

      // this.cursor.classList.remove("is-stuck");
      // setTimeout(() => {
      //   this.cursor.classList.remove("is-stuck");
      // }, 50);

      TweenMax.to(this.cursor, 0.15, {
        transformOrigin: transformOrigin,
        // rotation: -45,
        left: -1,
        top: -2,
        x: clientX, // - (this.cursorBox.width * Math.sqrt(2)) / 2,
        y: clientY,
        width: this.cursorOriginals.width,
        height: this.cursorOriginals.height,
        onComplete: () => {
          this.cursorIsStuck = false;
          // document.removeEventListener("mousemove", inBetweenHandler);
        }
      });
    };

    // show the first image
    document
      .querySelector('.image-wrapper__img[data-index="1"]')
      .classList.add("is-visible");

    // const handleMouseClick = e => {
    //   const index = e.currentTarget.dataset.index;
    //   const activeItem = document.querySelector(".nav__link.is-active");
    //   if (activeItem) {
    //     activeItem.classList.remove("is-active");
    //   }
    //   document
    //     .querySelector(`.nav__link[data-index="${index}"]`)
    //     .classList.add("is-active");
    // };

    Util.addEventListenerByClass("nav__link", "mouseenter", handleMouseEnter);
    Util.addEventListenerByClass("nav", "mouseleave", handleMouseLeave);
    // Util.addEventListenerByClass("nav__link", "click", handleMouseClick);
  }
}

export default Demo5;
