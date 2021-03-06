import React__default, { useState, useRef, useEffect, createElement, Fragment } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function useHover() {
    var _a = useState(false), isHovering = _a[0], setIsHovering = _a[1];
    var isTouched = false;
    var ref = useRef(null); // TODO: find more constrained type to satisfy this useRef
    var handleMouseEnter = function () {
        if (!isTouched) {
            setIsHovering(true);
        }
        isTouched = false;
    };
    var handleMouseLeave = function () {
        setIsHovering(false);
    };
    var handleTouch = function () {
        isTouched = true;
    };
    useEffect(function () {
        var element = ref.current;
        if (element) {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('touchstart', handleTouch);
            return function () {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('touchend', handleTouch);
            };
        }
    }, [ref.current]);
    return [ref, isHovering];
}

var DEFAULT_HOVER_TRANSFORMATIONS = { y: -40, r: 0, z: 200, s: 1.8 };
var heldListener;
var Card = function (_a) {
    var x = _a.x, y = _a.y, z = _a.z, r = _a.r, s = _a.s, id = _a.id, imgSrc = _a.imgSrc, _b = _a.cardText, cardText = _b === void 0 ? 'no card image or text' : _b, handleClick = _a.handleClick;
    var _c = useHover(), hoverRef = _c[0], isHovered = _c[1];
    var _d = useState(__assign(__assign({}, DEFAULT_HOVER_TRANSFORMATIONS), { x: x })), hoverTransformations = _d[0], setHoverTransformations = _d[1];
    var _e = useState(false), isHeld = _e[0], setIsHeld = _e[1];
    var currentTransformations = (isHovered || isHeld) ?
        hoverTransformations :
        { y: y, z: z, r: r, s: s, x: x };
    useEffect(function () {
        setHoverTransformations(__assign(__assign({}, DEFAULT_HOVER_TRANSFORMATIONS), { x: x }));
    }, [x]);
    var cx = currentTransformations.x, cy = currentTransformations.y, cz = currentTransformations.z, cr = currentTransformations.r, cs = currentTransformations.s;
    var handleCardClick = function (e) {
        var pageX = e.pageX, pageY = e.pageY;
        if (isHeld) {
            document.removeEventListener('mousemove', heldListener);
            setIsHeld(false);
            setHoverTransformations(__assign(__assign({}, DEFAULT_HOVER_TRANSFORMATIONS), { x: x }));
            handleClick({ id: id, position: { x: pageX, y: pageY } });
        }
        else {
            heldListener = updateHoverTransformations(pageX, pageY);
            document.addEventListener('mousemove', heldListener);
            setIsHeld(true);
            setHoverTransformations(__assign(__assign({}, DEFAULT_HOVER_TRANSFORMATIONS), { x: x }));
        }
    };
    var updateHoverTransformations = function (baseX, baseY) { return function (e) {
        var pageX = e.pageX, pageY = e.pageY;
        var xDiff = pageX - baseX;
        var yDiff = pageY - baseY;
        var y = DEFAULT_HOVER_TRANSFORMATIONS.y, z = DEFAULT_HOVER_TRANSFORMATIONS.z, r = DEFAULT_HOVER_TRANSFORMATIONS.r, s = DEFAULT_HOVER_TRANSFORMATIONS.s;
        setHoverTransformations({ z: z, r: r, s: s, y: (y + yDiff), x: (x + xDiff) });
    }; };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { ref: hoverRef, className: 'card' + id, onClick: handleCardClick }, !imgSrc && (React__default.createElement("p", { className: 'card-text' }, cardText))),
        React__default.createElement("style", { jsx: true }, "\n        .card" + id + " {\n          position: absolute;\n          bottom: 150px;\n          left: calc(50% - 80px);\n          height: 225px;\n          width: 160px;\n          border: " + (imgSrc ? 'none' : '1px solid black') + ";\n          border-radius: 10px;\n          background-color: white;\n          background-image: " + (imgSrc ? ('url(' + imgSrc + ')') : 'none') + "; \n          background-size: 100% 100%;\n          transition: " + (isHeld ? 'none' : 'all .2s ease-in-out') + ";\n          transform: translateX(" + cx + "px) translateY(" + cy + "px) rotate(" + cr + "deg) scale(" + cs + ", " + cs + ");\n          z-index: " + cz + ";\n          box-shadow: " + (isHovered ? '3px 3px 12px 1px' : '1px 1px 3px 0px') + " #282828;\n          cursor: " + (isHeld ? 'grabbing' : 'grab') + ";\n        }\n        .card-text {\n          padding: 10px;\n        }\n      ")));
};

function calculateTransformations(handSize) {
    // TODO: make 0-n handSize a table lookup instead of calculating values
    // maybe n=10? 15? to cover the majority of use cases and have the calculations
    // as a catch for higher numbers
    var deviation = (35.0 / 180.0) * Math.PI;
    var min = Math.PI / 2 - deviation;
    var max = Math.PI / 2 + deviation;
    var span = max - min;
    var stepValue = span / (handSize - 1);
    var transformations = [];
    var current = min;
    // the 3 multiplications are against arbitrary constants
    // these should be derived from the space allowed for the total hand
    // with hardish rules around smaller number of cards
    // some crude checks to handle a smaller number of cards
    var xConst = handSize * 50;
    xConst = xConst > 500 ? 500 : xConst;
    var rConst = handSize * -8;
    rConst = rConst < -40 ? -40 : rConst;
    var yConst = handSize * 40;
    yConst = yConst < 300 ? yConst : 300;
    for (var i = 0; i < handSize; i++) {
        // is there a better way to fix rotation for 1 card?
        var r = handSize === 1 ? 0 : Math.round((current - (Math.PI / 2)) * (-1 * rConst));
        transformations.push({
            r: r,
            x: Math.round((Math.cos(current)) * (-1 * xConst)),
            y: Math.round(((1 - Math.sin(current)) * yConst)),
            z: 10 + i,
            s: 1
        });
        current = current + stepValue;
    }
    return transformations;
}

var Hand = function (_a) {
    var cards = _a.cards, height = _a.height;
    var length = cards.length;
    var transformations = calculateTransformations(length);
    return (createElement(Fragment, null,
        createElement("div", { role: 'container', className: 'hand' }, transformations.map(function (ts, index) {
            var _a = cards[index], id = _a.id, imgSrc = _a.imgSrc, cardText = _a.cardText, handleClick = _a.handleClick;
            return (createElement(Card, __assign({ key: "card=" + id, id: id, imgSrc: imgSrc, cardText: cardText, handleClick: handleClick }, ts)));
        })),
        createElement("style", { jsx: true }, "\n        .hand {\n          position: relative;\n          height: " + (height || 600) + "px;\n        }\n      ")));
};

export { Hand };
//# sourceMappingURL=index.es.js.map
