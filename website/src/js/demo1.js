import PhotoSwipe from "photoswipe";
import PhotoSwipeUIDefault from "photoswipe/src/js/ui/photoswipe-ui-default";
import TweenMax from "gsap/TweenMax";

import initPageTransitions from "./initPageTransitions";
import Util from "./utils/util";

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

class Demo1 {
  constructor() {
    initPageTransitions();
    this.initDemo();
    this.initPhotoSwipeFromDOM(".my-gallery");

    this.scaleGrid();
    window.addEventListener(
      "resize",
      Util.debounce(() => {
        this.scaleGrid();
      }, 10)
    );
  }

  initDemo() {
    const { Back } = window;
    this.easing = Back.easeInOut.config(1.7);
    this.gridInner = document.querySelector(".grid__inner");

    this.cursorWrapper = document.querySelector(".cursor-wrapper");
    this.innerCursor = document.querySelector(".custom-cursor__inner");
    this.outerCursor = document.querySelector(".custom-cursor__outer");

    this.cursorWrapperBox = this.cursorWrapper.getBoundingClientRect();
    this.innerCursorBox = this.innerCursor.getBoundingClientRect();
    this.outerCursorBox = this.outerCursor.getBoundingClientRect();

    document.addEventListener("mousemove", e => {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    });

    const render = () => {
      TweenMax.set(this.cursorWrapper, {
        x: this.clientX,
        y: this.clientY
      });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    this.fullCursorSize = 40;
    this.enlargeCursorTween = TweenMax.to(this.outerCursor, 0.3, {
      backgroundColor: "transparent",
      width: this.fullCursorSize,
      height: this.fullCursorSize,
      ease: this.easing,
      paused: true
    });

    this.mainNavHoverTween = TweenMax.to(this.outerCursor, 0.3, {
      backgroundColor: "#ffffff",
      opacity: 0.3,
      width: this.fullCursorSize,
      height: this.fullCursorSize,
      ease: this.easing,
      paused: true
    });

    const handleMouseEnter = () => {
      this.enlargeCursorTween.play();
    };

    const handleMouseLeave = () => {
      this.enlargeCursorTween.reverse();
    };

    const gridItems = document.querySelectorAll(".grid__item");
    gridItems.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const pswpContainer = document.querySelector(".pswp__container");
    pswpContainer.addEventListener("mouseenter", handleMouseEnter);

    const mainNavItems = document.querySelectorAll(".content--fixed a");
    mainNavItems.forEach(el => {
      el.addEventListener("mouseenter", () => {
        this.mainNavHoverTween.play();
      });
      el.addEventListener("mouseleave", () => {
        this.mainNavHoverTween.reverse();
      });
    });

    this.bumpCursorTween = TweenMax.to(this.outerCursor, 0.1, {
      scale: 0.7,
      paused: true,
      onComplete: () => {
        TweenMax.to(this.outerCursor, 0.2, {
          scale: 1,
          ease: this.easing
        });
      }
    });
  }

  openGalleryActions() {
    this.bumpCursorTween.play();
    this.innerCursor.classList.add("is-closing");
    this.cursorWrapper.classList.add("has-blend-mode");
    this.cursorWrapper.classList.remove("is-outside");
  }

  closeGalleryactions() {
    this.bumpCursorTween.play();
    this.innerCursor.classList.remove("is-closing");
    this.cursorWrapper.classList.remove("has-blend-mode");
    setTimeout(() => {
      const elementMouseIsOver = document.elementFromPoint(
        this.clientX,
        this.clientY
      );
      if (!elementMouseIsOver.classList.contains("grid__thumbnail")) {
        this.enlargeCursorTween.reverse();
      }
    }, 400);
  }

  initPhotoSwipeFromDOM(gallerySelector) {
    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    const parseThumbnailElements = el => {
      const thumbElements = el.childNodes;
      const numNodes = thumbElements.length;
      const items = [];
      let figureEl;
      let linkEl;
      let size;
      let item;

      for (let i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element

        // include only element nodes
        if (figureEl.nodeType !== 1) {
          continue;
        }

        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute("data-size").split("x");

        // create slide object
        item = {
          src: linkEl.getAttribute("href"),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        if (figureEl.children.length > 1) {
          // <figcaption> content
          item.title = figureEl.children[1].innerHTML;
        }

        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute("src");
        }

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    // find nearest parent element
    const closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    const onThumbnailsClick = e => {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);

      const eTarget = e.target || e.srcElement;

      // find root element of slide
      const clickedListItem = closest(eTarget, function(el) {
        return el.tagName && el.tagName.toUpperCase() === "FIGURE";
      });

      if (!clickedListItem) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }

      if (index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    const photoswipeParseHash = () => {
      const hash = window.location.hash.substring(1);
      const params = {};

      if (hash.length < 5) {
        return params;
      }

      const vars = hash.split("&");
      for (let i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        const pair = vars[i].split("=");
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    const openPhotoSwipe = (
      index,
      galleryElement,
      disableAnimation,
      fromURL
    ) => {
      const pswpElement = document.querySelectorAll(".pswp")[0];
      const items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      const options = {
        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute("data-pswp-uid"),

        getThumbBoundsFn: ind => {
          // See Options -> getThumbBoundsFn section of documentation for more info
          const thumbnail = items[index].el.getElementsByTagName("img")[0]; // find thumbnail
          const pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          const rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        captionEl: false,
        closeEl: false,
        arrowEl: false,
        fullscreenEl: false,
        shareEl: false,
        counterEl: false,
        zoomEl: false,
        maxSpreadZoom: 1,
        barsSize: { top: 80, bottom: 80, left: 40, right: 40 },
        closeElClasses: [
          "item",
          "caption",
          "zoom-wrap",
          "ui",
          "top-bar",
          "img"
        ],
        getDoubleTapZoom: (isMouseClick, item) => {
          return item.initialZoomLevel;
        },
        pinchToClose: false
      };

      // PhotoSwipe opened from URL
      if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for (let j = 0; j < items.length; j++) {
            if (items[j].pid === index) {
              options.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // exit if index not found
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      const gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUIDefault,
        items,
        options
      );
      gallery.init();

      this.openGalleryActions();

      gallery.listen("initialZoomOut", () => {});

      gallery.listen("close", () => {
        this.closeGalleryactions();
      });

      // Blend Mode Fix for Microsoft Edge
      const addBlendModeFix = () => {
        const container = gallery.currItem.container;
        const image = Array.from(
          container.querySelectorAll(".pswp__img")
        ).pop();

        const mouseEnter = () => {
          this.cursorWrapper.classList.remove("is-outside");
        };
        image.addEventListener("mouseenter", mouseEnter, false);

        const mouseLeave = () => {
          this.cursorWrapper.classList.add("is-outside");
        };
        image.addEventListener("mouseleave", mouseLeave, false);
      };

      gallery.listen("initialZoomInEnd", () => {
        addBlendModeFix();
      });
      gallery.listen("afterChange", () => {
        addBlendModeFix();
      });
      // End of Blend Mode Fix for Microsoft Edge
    };

    // loop through all gallery elements and bind events
    const galleryElements = document.querySelectorAll(gallerySelector);

    galleryElements.forEach((el, i) => {
      el.setAttribute("data-pswp-uid", i + 1);
      el.onclick = onThumbnailsClick;
    });

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    const hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(
        hashData.pid,
        galleryElements[hashData.gid - 1],
        true,
        true
      );
    }
  }

  scaleGrid() {
    this.gridInner.style.transform = `scale(1)`;
    const innerGridBox = this.gridInner.getBoundingClientRect();
    const availableWidth = window.innerWidth - 70;
    const availableHeight = window.innerHeight - 230;
    const scale = Math.min(
      availableWidth / innerGridBox.width,
      availableHeight / innerGridBox.height
    );
    this.gridInner.style.transform = `scale(${scale})`;
  }
}

export default Demo1;
