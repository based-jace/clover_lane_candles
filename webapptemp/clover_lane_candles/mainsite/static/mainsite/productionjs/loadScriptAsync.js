"use strict";
/**
 * Allows loading html, including scripts - similar
 * to jQuery's ".html()"
 * 
 * @author: footjohnson
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var loadScriptAsync =
/*#__PURE__*/
function () {
  function loadScriptAsync() {
    _classCallCheck(this, loadScriptAsync);
  }

  _createClass(loadScriptAsync, [{
    key: "ReplaceHtml",

    /**
        * Replaces html on page with given html, executing scripts in the process.
        * 
        * @example
        * // html should be stringified HTML
        * // domLocation would be given via something like document.getElementById("elementId");
        * // returns true
        * loadScriptAsync.ReplaceHtml(html, domLocation)
        * 
        * @param {string} html Html to replace current html
        * @param {HTMLElement} domLocation Node whose html should be replaced
        * 
        * @returns {boolean} True if success; false if failure
    */
    value: function ReplaceHtml(html, domLocation) {
      try {
        var dp = new DOMParser(); // parses html from DOM

        var doc = dp.parseFromString(html, "text/html"); // Clears current element given by "domLocation"
        // Clones the dom location

        var domLocationCopy = domLocation.cloneNode(false); // Clears the given section of the dom

        domLocation.parentNode.replaceChild(domLocationCopy, domLocation);
        this.PlaceElems(doc.head, domLocationCopy, true);
        this.PlaceElems(doc.body, domLocationCopy, true);
      } catch (e) {
        console.log(e);
        return false;
      }

      return true;
    }
    /**
     * Checks if there are any script tags in the node
     * 
     * @example
     * // Returns whether a node or HTMLElement has script tags as children or grandchildren
     * // returns true
     * loadScriptAsync.CheckForScripts(node)
     * 
     * @param {Node} node Node to check for scripts
     * 
     * @returns {boolean} True if it contains scripts; false if it doesn't
     */

  }, {
    key: "CheckForScripts",
    value: function CheckForScripts(node) {
      return node.innerHTML.match(/<[s\u017F]cript(?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?>(?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?<\/[s\u017F]cript>/i) ? true : false;
    }
    /**
     * Recursively places html elements on the DOM
     * 
     * @param {HTMLElement} element Element whose children should be placed on the DOM
     * @param {Node} domLocation Where to put the elements
     * @param {boolean} checkScripts If the function should first check if any scripts tags
     *                      are within the given elems. If there are, use innerHTML instead
     * @param {boolean} isHead If html should be placed in the head of the document (not yet supported)
     * 
     * @example
     * // returns true
     * loadScriptAsync.PlaceElems()
     * 
     * @returns {boolean} True if success; false if failure
     */

  }, {
    key: "PlaceElems",
    value: function PlaceElems(element, domLocation) {
      var checkScripts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var isHead = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      // Checks if elems contain scripts. If not, just user innerHTML
      // Inspired by jQuery
      if (checkScripts) {
        if (!this.CheckForScripts(element)) {
          domLocation.innerHTML += element.innerHTML;
          return true;
        }
      } // console.log(element.childNodes);


      var elems = element.childNodes; // the element's nodes 

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var elem = _step.value;

          if (elem.tagName === "SCRIPT") {
            // If element is a script
            var script = document.createElement("script"); // Creates a new script element

            var src = elem.src; // Grabs src, if it exists

            if (src && src !== "") {
              // If src script
              script.src = src; // Sets src
            } else {
              // If embedded script
              var code = document.createTextNode(elem.innerHTML); // Creates text node

              script.appendChild(code); // Puts embedded code inside of it
            }

            domLocation.appendChild(script); // Adds script to document
          } else {
            // If not a script
            try {
              // If elem contains child elements
              if (elem.children !== undefined) {
                // If elem has the "children" property
                if (elem.children.length > 0) {
                  // If elem has at least 1 child
                  var elemCopy = elem.cloneNode(false); // Clone the element

                  domLocation.appendChild(elemCopy); // Append the childless element to the DOM
                  // Recurse with the elems child nodes and 

                  this.PlaceElems(elem, elemCopy, isHead, false);
                } else {
                  // If 0 child elements
                  domLocation.appendChild(elem); // Append the element to the DOM
                }
              }
            } catch (e) {
              // console.log(elem);
              console.log(e);
              return false;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }]);

  return loadScriptAsync;
}();