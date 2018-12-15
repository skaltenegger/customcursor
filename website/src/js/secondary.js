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
  }

  initSwiper() {
    this.swiper = new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 0,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
    this.swiper.on("touchMove", ev => {
      const { clientX, clientY } = ev;
      this.clientX = clientX;
      this.clientY = clientY;
      TweenMax.to(this.cursor, 0, { x: clientX, y: clientY });

      if (
        clientX < window.innerWidth / 2 &&
        this.cursor.classList.contains("is-right") &&
        !this.cursor.classList.contains("is-left")
      ) {
        this.cursor.classList.add("is-left");
        this.cursor.classList.remove("is-right");
        TweenMax.to(this.cursorIcon, 0.3, {
          rotation: "+=180",
          ease: Back.easeOut.config(1.7)
        });
      }

      if (
        clientX > window.innerWidth / 2 &&
        this.cursor.classList.contains("is-left") &&
        !this.cursor.classList.contains("is-right")
      ) {
        this.cursor.classList.add("is-right");
        this.cursor.classList.remove("is-left");
        TweenMax.to(this.cursorIcon, 0.3, {
          rotation: "+=180",
          ease: Back.easeOut.config(1.7)
        });
      }
    });
  }

  initCursor() {
    this.cursor = document.querySelector(".arrow-cursor");
    this.cursorIcon = document.querySelector(".arrow-cursor__icon");

    TweenMax.to(this.cursorIcon, 0, {
      rotation: -135,
      opacity: 0,
      scale: 0.5
    });

    document.addEventListener("mousemove", ev => {
      const { clientX, clientY } = ev;
      this.clientX = clientX;
      this.clientY = clientY;
      TweenMax.to(this.cursor, 0, { x: clientX, y: clientY });
    });

    const handleMouseMove = e => {
      const { clientX } = e;
      if (!this.cursor.classList.contains("is-visible")) {
        this.cursor.classList.add("is-visible");
        if (clientX > window.innerWidth / 2) {
          this.cursor.classList.add("is-right");
          TweenMax.to(this.cursorIcon, 0.3, {
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: Back.easeOut.config(1.7)
          });
        } else {
          this.cursor.classList.add("is-left");
          TweenMax.to(this.cursorIcon, 0.3, {
            rotation: -180,
            scale: 1,
            opacity: 1,
            ease: Back.easeOut.config(1.7)
          });
        }
      }
    };

    const handleMouseLeave = e => {
      this.cursor.classList.remove("is-left");
      this.cursor.classList.remove("is-right");
      this.cursor.classList.remove("is-visible");
      TweenMax.to(this.cursorIcon, 0.3, {
        rotation: "-=135",
        opacity: 0,
        scale: 0.5,
        onComplete: () => {
          TweenMax.to(this.cursorIcon, 0.3, {
            rotation: -135
          });
        }
      });
    };

    this.swiperBox = document
      .querySelector(".swiper-container")
      .getBoundingClientRect();

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
        TweenMax.to(this.cursorIcon, 0.3, {
          rotation: "+=180",
          ease: Back.easeOut.config(1.7)
        });
      }
    };

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
        TweenMax.to(this.cursorIcon, 0.3, {
          rotation: "+=180",
          ease: Back.easeOut.config(1.7)
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
