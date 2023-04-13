var canvas = document.querySelector("#sketch-area"); //TypeScript requires you to declare all technically possible types. Even if you know that the page is set up to only deliver HTMLElements, type safety dictates that this must also be declared potentially null, in the event that the query selector somehow fails to retrieve the element.
//buttons and inputs
var btnPieceColor = document.querySelector("#btn-color");
var btnCanvasColor = document.querySelector("#btn-canvas-color");
var btnClear = document.querySelector("#btn-clear");
var btnEraser = document.querySelector("#btn-eraser");
var sketchScale = document.querySelector("#sketch-scale");
var primaryColor = getComputedStyle(document.documentElement, null).getPropertyValue('--primaryColor').trim();
var accentColor2 = getComputedStyle(document.documentElement, null).getPropertyValue('--accentColor2').trim();
var storageColor = btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.value; //retrieve user-defined color
var pieceColor = storageColor;
var canvasColor = btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.value; //retrieve user-defined canvas color
var canvasPieces = new Array(); //create an array to store the div elements in
var canvasSize = 5; //default size of the canvas, 5x5 or 25 squares
var canvasClick = false;
function paletteSwitch() {
    if (btnEraser != null) {
        btnEraser.style.backgroundColor = primaryColor;
    }
}
var rgbToHex = function (r, g, b) { return '#' + [r, g, b].map(function (x) {
    var hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}).join(''); };
function convertRGBtoHex(rgbInput) {
    var rgbNumString = (rgbInput.split("(")[1].split(")")[0]).split(",");
    var rgbNum = [Number.parseInt(rgbNumString[0]), Number.parseInt(rgbNumString[1]), Number.parseInt(rgbNumString[2])];
    return rgbToHex(rgbNum[0], rgbNum[1], rgbNum[2]);
}
/**
 * Retrieves the current user-defined piece color.
 */
function changePieceColor() {
    storageColor = btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.value;
}
/**
 * Retrieves the current user-defined canvas color and then modifies the canvas accordingly.
 */
function changeCanvasColor() {
    var previousCanvasColor = canvasColor;
    canvasColor = btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.value;
    if (canvas != null && canvasColor != undefined) {
        canvas.style.backgroundColor = canvasColor;
    }
    if (pieceColor == previousCanvasColor) {
        pieceColor = canvasColor;
        canvasPieces.forEach(function (element) {
            var hexColor = convertRGBtoHex(element.style.backgroundColor);
            if (hexColor == previousCanvasColor && canvasColor != undefined) {
                hexColor = canvasColor;
                element.style.backgroundColor = hexColor;
            }
        });
    }
}
/**
 * Modifies the color (more technically the background color) of the div it is called on
 * @param item The grid piece to be colored in.
 */
function drawPieces(item) {
    if (pieceColor != undefined) {
        item.style.backgroundColor = pieceColor;
    }
    ;
}
/**
 * Modifies CSS Grid rules to programmatically draw a grid of squares and set an HTML class and JS event handlers on each of them.
 * @param num The size of the canvas as expressed in length or width (the canvas will have a square aspect ratio so it doesn't matter which).
 */
function setCanvas(num) {
    if (num === void 0) { num = canvasSize; }
    if (canvas != null) {
        canvas.style.gridTemplateColumns = "repeat(".concat(num, ", 1fr)");
        canvas.style.gridTemplateRows = "repeat(".concat(num, ", 1fr)");
    } //then, we add each grid square to the canvasPieces array, for the purpose of running an array function on them in a sec
    for (var i = 0; i < (num * num); i++) {
        canvasPieces.push(document.createElement("div"));
    } //the aforementioned array function goes through canvasPieces and assigns the class "gridPiece" to each grid square div, and then adds it to the DOM.
    canvasPieces.forEach(function (element) {
        element.className = "gridPiece";
        canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(element);
        element.addEventListener("mousedown", function (event) {
            event.preventDefault(); //this line prevents the browser from treating the gridpieces as draggable objects, which was causing the page to function unreliably because when you clicked to draw, the browser would sometimes treat this as a drag n' drop action and interfere.
            drawPieces(element);
        });
        element.addEventListener("mouseenter", function (event) {
            if (event.buttons > 0) {
                drawPieces(element);
            }
        });
    });
}
/**
 * 'Clears' the canvas by resetting each square to match the canvas's background color.
 */
function clearCanvas() {
    canvasPieces.forEach(function (element) {
        element.style["background-color"] = canvasColor;
    });
}
/**
 * Rewrites the "Size:" label on the page as the user adjusts the slider. It does this by retrieving the current label as a string, modifying it, and sending it back to the DOM element. Also modifies the actual canvasSize value accordingly.
 */
function resizeLabel() {
    var sizeString = sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.value;
    canvasSize = Number(sizeString);
    var scaleLabel = document.getElementById("lbl-sketch-scale");
    if (scaleLabel != null) {
        scaleLabel.textContent = "Size: ".concat(sizeString, " x ").concat(sizeString);
    }
}
/**
 * Resizes the sketch area. Before doing so, it clears out the canvas, and then deletes each of the grid squares. It then calls setCanvas() to rebuild them according to the new size.
 */
function resizeSketchArea() {
    clearCanvas();
    canvasPieces.forEach(function (element) {
        canvas === null || canvas === void 0 ? void 0 : canvas.removeChild(element);
    });
    for (var i = 0; i != canvasPieces.length;) {
        canvasPieces.shift();
    }
    setCanvas(canvasSize);
}
/**
 * Sets the cursor to "erase" squares by matching their color to the canvas.
 */
function eraserMode() {
    if (btnEraser != null) {
        if (btnEraser.style.backgroundColor == primaryColor) {
            btnEraser.style.backgroundColor = accentColor2;
        }
        else {
            btnEraser.style.backgroundColor = primaryColor;
        }
    }
    switch (pieceColor) {
        case canvasColor:
            pieceColor = storageColor;
            break;
        case storageColor:
            pieceColor = canvasColor;
            break;
    }
}
setCanvas();
paletteSwitch();
btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.addEventListener("input", changePieceColor);
btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.addEventListener("input", changeCanvasColor);
btnEraser === null || btnEraser === void 0 ? void 0 : btnEraser.addEventListener("click", eraserMode);
btnClear === null || btnClear === void 0 ? void 0 : btnClear.addEventListener("click", clearCanvas);
sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.addEventListener("input", resizeLabel);
sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.addEventListener("change", resizeSketchArea); //the reason why I went with the change event instead of input was for performance concerns. I would guess it's a reasonably simple matter to change some text, but constantly resizing the grid might be more taxing, and it visually makes no difference either way.
