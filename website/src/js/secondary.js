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

class Secondary {
  constructor() {
    initCodrops();
    this.initCursor();
    this.initSwiper();
    window.lazySizes.init();
    this.easing = Back.easeOut.config(1.7);
    this.animationDuration = 0.3;
  }

  updateCursorPosition(e) {
    const { clientX, clientY } = e;
    this.clientX = clientX;
    this.clientY = clientY;
    TweenMax.to(this.cursor, 0, {
      x: clientX - this.cursorBox.width / 2,
      y: clientY - this.cursorBox.height / 2
    });
  }

  initSwiper() {
    this.swiper = new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 40,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
    this.swiper.on("touchMove", e => {
      const { clientX, clientY } = e;
      this.updateCursorPosition(e);

      if (
        clientX < window.innerWidth / 2 &&
        this.cursor.classList.contains("is-right") &&
        !this.cursor.classList.contains("is-left")
      ) {
        this.cursor.classList.add("is-left");
        this.cursor.classList.remove("is-right");
        TweenMax.to(this.cursorIcon, this.animationDuration, {
          rotation: -180,
          ease: this.easing
        });
      }

      if (
        clientX > window.innerWidth / 2 &&
        this.cursor.classList.contains("is-left") &&
        !this.cursor.classList.contains("is-right")
      ) {
        this.cursor.classList.add("is-right");
        this.cursor.classList.remove("is-left");
        TweenMax.to(this.cursorIcon, this.animationDuration, {
          rotation: 0,
          ease: this.easing
        });
      }
    });
  }

  initCursor() {
    this.cursor = document.querySelector(".arrow-cursor");
    this.cursorIcon = document.querySelector(".arrow-cursor__icon");
    this.cursorBox = this.cursor.getBoundingClientRect();
    this.swiperBox = document
      .querySelector(".swiper-container")
      .getBoundingClientRect();

    TweenMax.to(this.cursorIcon, 0, {
      rotation: -135,
      opacity: 0,
      scale: 0.5
    });

    document.addEventListener("mousemove", e => {
      this.updateCursorPosition(e);
    });

    // mouseEnter
    const handleMouseMove = e => {
      const { clientX, clientY } = e;
      let beforeRotation;
      if (clientY < window.innerHeight / 2) {
        beforeRotation = -135;
      } else {
        beforeRotation = clientX > window.innerWidth / 2 ? 135 : -315;
      }
      if (!this.cursor.classList.contains("is-visible")) {
        this.cursor.classList.add("is-visible");
        TweenMax.to(this.cursorIcon, 0, {
          rotation: beforeRotation,
          opacity: 0,
          onComplete: () => {
            if (clientX > window.innerWidth / 2) {
              this.cursor.classList.add("is-right");
              TweenMax.to(this.cursorIcon, this.animationDuration, {
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: this.easing
              });
            } else {
              this.cursor.classList.add("is-left");
              TweenMax.to(this.cursorIcon, this.animationDuration, {
                rotation: -180,
                scale: 1,
                opacity: 1,
                ease: this.easing
              });
            }
          }
        });
      }
    };

    // mouseLeave
    const handleMouseLeave = e => {
      const { clientX, clientY } = e;
      let rotation = 0;
      if (clientY < window.innerHeight / 2) {
        rotation = this.cursor.classList.contains("is-right") ? -135 : -45;
      } else {
        rotation = this.cursor.classList.contains("is-right") ? 135 : -315;
      }
      TweenMax.to(this.cursorIcon, this.animationDuration, {
        rotation: rotation,
        opacity: 0,
        scale: 0.3,
        onComplete: () => {
          this.cursor.classList.remove("is-left");
          this.cursor.classList.remove("is-right");
          this.cursor.classList.remove("is-visible");
        }
      });
    };

    // move to the left
    const handleMoveToPrev = e => {
      const { clientX, clientY } = e;
      if (
        clientX < window.innerWidth / 2 &&
        clientY > this.swiperBox.top &&
        this.cursor.classList.contains("is-right") &&
        !this.cursor.classList.contains("is-left")
      ) {
        this.cursor.classList.add("is-left");
        this.cursor.classList.remove("is-right");
        TweenMax.to(this.cursorIcon, this.animationDuration, {
          rotation: -180,
          ease: this.easing
        });
      }
    };

    // move to the right
    const handleMoveToNext = e => {
      const { clientX, clientY } = e;
      if (
        clientX > window.innerWidth / 2 &&
        clientY > this.swiperBox.top &&
        this.cursor.classList.contains("is-left") &&
        !this.cursor.classList.contains("is-right")
      ) {
        this.cursor.classList.add("is-right");
        this.cursor.classList.remove("is-left");
        TweenMax.to(this.cursorIcon, this.animationDuration, {
          rotation: 0,
          ease: this.easing
        });
      }
    };

    Util.addEventListenerByClass(
      "swiper-container",
      "mousemove",
      handleMouseMove
    );
    Util.addEventListenerByClass(
      "swiper-container",
      "mouseleave",
      handleMouseLeave
    );
    Util.addEventListenerByClass(
      "swiper-button-prev",
      "mousemove",
      handleMoveToPrev
    );
    Util.addEventListenerByClass(
      "swiper-button-next",
      "mousemove",
      handleMoveToNext
    );
  }
}

export default Secondary;
