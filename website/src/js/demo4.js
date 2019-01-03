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

class Demo4 {
  constructor() {
    initCodrops();
    this.initCursor();
    this.initCanvas();
    this.initHovers();
  }

  initCursor() {
    this.outerCursor = document.querySelector(".demo-4 .circle-cursor--outer");
    this.innerCursor = document.querySelector(".demo-4 .circle-cursor--inner");
    this.outerCursorBox = this.outerCursor.getBoundingClientRect();
    this.innerCursorBox = this.innerCursor.getBoundingClientRect();
    this.outerCursorSpeed = 0.3;

    document.addEventListener("mousemove", e => {
      if (!this.innerCursor.classList.contains("is-visible")) {
        this.setCursorPosition(e, [0, 0], () => {
          TweenMax.set(this.innerCursor, {
            opacity: 1,
            onComplete: () => {
              TweenMax.set(this.outerCursor, {
                opacity: 1
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

  initCanvas() {
    // paper.install(window);
    const canvas = document.querySelector(".circle-cursor__canvas");
    const canvasBounds = canvas.getBoundingClientRect();
    const shapeBounds = {
      width: 100,
      height: 100
    };
    paper.setup(canvas);

    const strokeColor = "#ff0000";
    const strokeWidth = 1.5;
    const segments = 8;
    const radius = 15;

    const noiseScale = 150;
    const noiseRange = 4;
    const safeArea = 5 * (noiseRange + strokeWidth);
    let isNoisy = false;

    var decagon = new paper.Path.RegularPolygon(
      new paper.Point(canvasBounds.width / 2, canvasBounds.height / 2),
      segments,
      radius
    );
    decagon.strokeColor = strokeColor;
    decagon.strokeWidth = strokeWidth;
    decagon.smooth();

    const noiseObjects = decagon.segments.map(segment => new SimplexNoise());
    const noiseValues = [];
    const coordinates = [];

    paper.view.draw();

    paper.view.onFrame = event => {
      // scale up the shape
      if (
        this.outerCursor.classList.contains("is-stuck") &&
        decagon.bounds.width < shapeBounds.width - safeArea
      ) {
        decagon.scale(1.08);
      }

      // while stuck, do perlin noise
      if (
        this.outerCursor.classList.contains("is-stuck") &&
        decagon.bounds.width >= shapeBounds.width - safeArea &&
        true
      ) {
        isNoisy = true;

        // first get coordinates of large circle
        if (coordinates.length === 0) {
          decagon.segments.forEach(segment => {
            coordinates.push([segment.point.x, segment.point.y]);
          });
        }

        // calculate noise value for each point at that frame
        decagon.segments.map((segment, i) => {
          const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
          const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 0);

          const distortionX = this.map(noiseX, -1, 1, -noiseRange, noiseRange);
          const distortionY = this.map(noiseY, -1, 1, -noiseRange, noiseRange);

          const newX = coordinates[i][0] + distortionX;
          const newY = coordinates[i][1] + distortionY;

          segment.point.set(newX, newY);
        });
      }

      // scale down the shape
      if (
        !this.outerCursor.classList.contains("is-stuck") &&
        decagon.bounds.width > 30
      ) {
        const scaleDown = 0.92;
        decagon.scale(scaleDown);
        if (isNoisy) {
          decagon.segments.map((segment, i) => {
            segment.point.set(coordinates[i][0], coordinates[i][1]);
          });
          isNoisy = false;
        }
        decagon.smooth();
      }

      // hover state for codrops nav items
      if (
        this.outerCursor.classList.contains("is-on-codrops-nav") &&
        decagon.fillColor !== strokeColor
      ) {
        decagon.fillColor = strokeColor;
      } else if (
        !this.outerCursor.classList.contains("is-on-codrops-nav") &&
        decagon.fillColor !== "transparent"
      ) {
        decagon.fillColor = "transparent";
      }
      paper.view.draw();
    };
  }

  initHovers() {
    const handleMouseEnter = e => {
      const target = e.currentTarget;
      const box = target.getBoundingClientRect();
      const x = box.left + box.width / 2 - this.outerCursorBox.width / 2;
      const y = box.top + box.height / 2 - this.outerCursorBox.height / 2;

      this.outerCursor.classList.add("is-stuck");
      TweenMax.to(this.outerCursor, 0.2, {
        x: x,
        y: y
      });
    };

    const handleMouseLeave = e => {
      this.outerCursor.classList.remove("is-stuck");
    };

    Util.addEventListenerBySelector(
      ".grid__link--demo4",
      "mouseenter",
      handleMouseEnter
    );
    Util.addEventListenerBySelector(
      ".grid__link--demo4",
      "mouseleave",
      handleMouseLeave
    );

    const codropsNavEnter = e => {
      this.outerCursorSpeed = 0.1;
      this.outerCursor.classList.add("is-on-codrops-nav");
      TweenMax.set(this.innerCursor, { opacity: 0 });
    };

    const codropsNavLeave = e => {
      this.outerCursorSpeed = 0.3;
      this.outerCursor.classList.remove("is-on-codrops-nav");
      TweenMax.set(this.innerCursor, { opacity: 1 });
    };

    Util.addEventListenerBySelector(
      ".demo-4 .content--fixed a",
      "mouseenter",
      codropsNavEnter
    );
    Util.addEventListenerBySelector(
      ".demo-4 .content--fixed a",
      "mouseleave",
      codropsNavLeave
    );
  }

  map(value, in_min, in_max, out_min, out_max) {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }
}

export default Demo4;
