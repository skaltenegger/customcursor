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

class Demo3 {
  constructor() {
    initCodrops();
    this.initCursor();
    this.initHovers();
  }

  initCursor() {
    this.outerCursor = document.querySelector(".circle-cursor--outer");
    this.innerCursor = document.querySelector(".circle-cursor--inner");
    this.outerCursorBox = this.outerCursor.getBoundingClientRect();
    this.innerCursorBox = this.innerCursor.getBoundingClientRect();
    this.outerCursorSpeed = 0.3;
    this.easing = Back.easeOut.config(1.7);

    document.addEventListener("mousemove", e => {
      if (!this.innerCursor.classList.contains("is-visible")) {
        this.setCursorPosition(e, [0, 0], () => {
          TweenMax.set(this.innerCursor, {
            opacity: 1,
            onComplete: () => {
              TweenMax.set(this.outerCursor, {
                opacity: 0.2
              });
              this.innerCursor.classList.add("is-visible");
            }
          });
        });
      }

      this.setCursorPosition(e);
    });
  }

  setCursorPosition(
    e,
    durations = [0, this.outerCursorSpeed],
    complete = () => {}
  ) {
    const { clientX, clientY } = e;
    const [innerDuration, outerDuration] = durations;
    TweenMax.to(this.innerCursor, innerDuration, {
      x: clientX - this.innerCursorBox.width / 2,
      y: clientY - this.innerCursorBox.height / 2,
      rotation: -45,
      onComplete: complete()
    });

    if (!this.outerCursor.classList.contains("is-stuck")) {
      TweenMax.to(this.outerCursor, outerDuration, {
        x: clientX - this.outerCursorBox.width / 2,
        y: clientY - this.outerCursorBox.height / 2,
        onComplete: complete()
      });
    }
  }

  initHovers() {
    const handleMouseEnter = e => {
      const target = e.currentTarget;
      const box = target.getBoundingClientRect();
      const x = box.left + box.width / 2;
      const y = box.top + box.height / 2;
      this.outerCursorOriginals = {
        width: this.outerCursorBox.width,
        height: this.outerCursorBox.height
      };
      this.outerCursor.classList.add("is-stuck");
      TweenMax.to(this.outerCursor, 0.2, {
        x: box.left,
        y: box.top,
        width: box.width,
        height: box.height,
        opacity: 0.4,
        borderColor: "#ff0000"
      });
    };

    const handleMouseLeave = e => {
      this.outerCursor.classList.remove("is-stuck");
      TweenMax.to(this.outerCursor, 0.2, {
        width: this.outerCursorOriginals.width,
        height: this.outerCursorOriginals.height,
        opacity: 0.2,
        borderColor: "#ffffff"
      });
    };

    Util.addEventListenerBySelector(
      ".grid__link--demo3",
      "mouseenter",
      handleMouseEnter
    );
    Util.addEventListenerBySelector(
      ".grid__link--demo3",
      "mouseleave",
      handleMouseLeave
    );

    const codropsNavEnter = e => {
      const fullSize = 40;
      this.outerCursorSpeed = 0;
      TweenMax.set(this.innerCursor, { opacity: 0 });
      TweenMax.to(this.outerCursor, 0.3, {
        backgroundColor: "#ffffff",
        ease: this.easing
      });
    };

    const codropsNavLeave = e => {
      this.outerCursorSpeed = 0.3;
      TweenMax.set(this.innerCursor, { opacity: 1 });
      TweenMax.to(this.outerCursor, 0.3, {
        backgroundColor: "transparent",
        ease: this.easing
      });
    };

    Util.addEventListenerBySelector(
      ".demo-3-body .content--fixed a",
      "mouseenter",
      codropsNavEnter
    );
    Util.addEventListenerBySelector(
      ".demo-3-body .content--fixed a",
      "mouseleave",
      codropsNavLeave
    );
  }
}

export default Demo3;
