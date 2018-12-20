import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/src/js/ui/photoswipe-ui-default";
import TweenMax from "gsap/TweenMax";

import initCodrops from "./initCodrops";
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

class Demo1 {
  constructor() {
    initCodrops();
    this.initDemo();
    this.initPhotoSwipeFromDOM(".my-gallery");
    this.scaleGrid();
    window.addEventListener(
      "resize",
      Util.debounce(e => {
        this.scaleGrid();
      }, 10)
    );
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

  initDemo() {
    this.gridInner = document.querySelector(".grid__inner");
    this.cursor = document.querySelector(".custom-cursor");

    document.addEventListener("mousemove", ev => {
      const { clientX, clientY } = ev;
      this.clientX = clientX;
      this.clientY = clientY;

      TweenMax.to(this.cursor, 0, { x: clientX, y: clientY });
    });

    const handleMouseEnter = e => {
      this.cursor.classList.add("is-visible");
    };

    const handleMouseLeave = e => {
      this.cursor.classList.remove("is-visible");
    };

    Util.addEventListenerByClass("grid__item", "mouseenter", handleMouseEnter);
    Util.addEventListenerByClass(
      "pswp__container",
      "mouseenter",
      handleMouseEnter
    );
    Util.addEventListenerByClass("grid__item", "mouseleave", handleMouseLeave);
  }

  initPhotoSwipeFromDOM(gallerySelector) {
    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    const parseThumbnailElements = el => {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

      for (var i = 0; i < numNodes; i++) {
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
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    const onThumbnailsClick = e => {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
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
      var hash = window.location.hash.substring(1),
        params = {};

      if (hash.length < 5) {
        return params;
      }

      var vars = hash.split("&");
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split("=");
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

    var openPhotoSwipe = (index, galleryElement, disableAnimation, fromURL) => {
      var pswpElement = document.querySelectorAll(".pswp")[0],
        gallery,
        options,
        items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {
        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute("data-pswp-uid"),

        getThumbBoundsFn: function(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
            pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

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
        getDoubleTapZoom: function(isMouseClick, item) {
          return item.initialZoomLevel;
        },
        pinchToClose: false
      };

      // PhotoSwipe opened from URL
      if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
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
      gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();

      this.cursor.classList.add("is-closing");

      gallery.listen("close", () => {
        this.cursor.classList.remove("is-closing");
        setTimeout(() => {
          const elementMouseIsOver = document.elementFromPoint(
            this.clientX,
            this.clientY
          );
          if (!elementMouseIsOver.classList.contains("grid__thumbnail")) {
            this.cursor.classList.remove("is-visible");
          }
        }, 400);
      });

      gallery.listen("initialZoomOut", () => {});
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute("data-pswp-uid", i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(
        hashData.pid,
        galleryElements[hashData.gid - 1],
        true,
        true
      );
    }
  }
}

export default Demo1;
