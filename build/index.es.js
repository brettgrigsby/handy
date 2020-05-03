import { createElement, Fragment } from 'react';

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

var Card = function (_a) {
    var x = _a.x, y = _a.y, z = _a.z, r = _a.r, s = _a.s, hover = _a.hover, index = _a.index;
    return (createElement(Fragment, null,
        createElement("div", { className: 'card' + index }, "The Card Component"),
        createElement("style", { jsx: true }, "\n        .card" + index + " {\n          position: absolute;\n          bottom: 150px;\n          left: calc(50% - 80px);\n          height: 225px;\n          width: 160px;\n          border: 1px solid black;\n          border-radius: 5px;\n          background-color: white;\n          transition: all .2s ease-in-out;\n          transform: translateX(" + x + "px) translateY(" + y + "px) rotate(" + r + "deg) scale(" + s + ", " + s + ");\n          z-index: " + z + ";\n          box-shadow: " + (hover ? '3px 3px 12px 1px' : '1px 1px 3px 0px') + " #282828;\n        }\n      ")));
};

function calculateTransformations(handSize) {
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
    var cards = _a.cards;
    var length = cards.length;
    var transformations = calculateTransformations(length);
    console.log({ transformations: transformations });
    return (createElement("div", { role: 'container' },
        "The Hand Component, dude",
        transformations.map(function (ts, index) { return createElement(Card, __assign({ key: index, index: index }, ts)); })));
};

export { Hand };
//# sourceMappingURL=index.es.js.map
