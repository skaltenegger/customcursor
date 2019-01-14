import TweenMax from "gsap/TweenMax";
import initPageTransitions from "./initPageTransitions";

/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */

class Demo5 {
  constructor() {
    initPageTransitions();
    this.initCursor();
    this.initHovers();
  }

  initCursor() {
    const { Back } = window;
    this.cursor = document.querySelector(".square-cursor");
    this.cursorInner = document.querySelector(".square-cursor__inner");
    this.cursorObjectBox = this.cursorInner.getBoundingClientRect();
    this.cursorBox = this.cursor.getBoundingClientRect();
    this.easing = Back.easeOut.config(1.7);
    this.cursorIsStuck = false;
    this.clientX = -100;
    this.clientY = -100;
    this.showCursor = false;

    this.nav = document.querySelector(".nav");
    this.navBox = this.nav.getBoundingClientRect();

    this.cursorOriginals = {
      width: this.cursorInner.offsetWidth,
      height: this.cursorInner.offsetHeight
    };

    document.addEventListener("mousemove", e => {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    });

    const render = () => {
      if (!this.isStuck) {
        TweenMax.set(this.cursor, {
          x: this.clientX - this.cursorBox.width / 2,
          y: this.clientY - this.cursorBox.height / 2
        });
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  initHovers() {
    const handleMouseEnter = e => {
      this.isStuck = true;
      this.stuckX = this.clientX;
      this.stuckY = this.clientY;
      const target = e.currentTarget;
      const linkBox = target.getBoundingClientRect();

      const activeItem = document.querySelector(".nav__link.is-active");
      if (activeItem && this.nav.dataset.lastActive !== target.dataset.index) {
        this.nav.dataset.lastActive = activeItem.dataset.index;
        activeItem.classList.remove("is-active");
      }

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

    const handleMouseLeave = () => {
      this.isStuck = false;

      document
        .querySelector(
          `.nav__link[data-index="${this.nav.dataset.lastActive}"]`
        )
        .classList.add("is-active");

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
        if (activeItem) {
          activeItem.classList.remove("is-active");
        }

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

    const navItems = document.querySelectorAll(".nav__link");
    navItems.forEach(item => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("click", handleMouseClick);
    });

    this.nav.addEventListener("mouseleave", handleMouseLeave);

    const mainNavItemTween = TweenMax.to(this.cursorInner, 0.2, {
      scale: 0.8,
      borderColor: "#ffffff",
      ease: this.easing,
      paused: true
    });

    const mainNavItems = document.querySelectorAll(".demo-5 .content--fixed a");
    mainNavItems.forEach(item => {
      item.addEventListener("mouseenter", () => {
        mainNavItemTween.play();
      });
      item.addEventListener("mouseleave", () => {
        mainNavItemTween.reverse();
      });
    });
  }
}

export default Demo5;
