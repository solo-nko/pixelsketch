var canvas = document.querySelector("#sketch-area"); //TypeScript requires you to declare all technically possible types. Even if you know that the page is set up to only deliver HTMLElements, type safety dictates that this must also be declared potentially null, in the event that the query selector somehow fails to retrieve the element.
//buttons and inputs
var btnPieceColor = document.querySelector("#btn-color");
var btnCanvasColor = document.querySelector("#btn-canvas-color");
var btnClear = document.querySelector("#btn-clear");
var sketchScale = document.querySelector("#sketch-scale");
var pieceColor = btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.value; //retrieve user-defined color
var canvasColor = btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.value; //retrieve user-defined canvas color
var canvasPieces = new Array(); //create an array to store the div elements in
var canvasSize = 5; //default size of the canvas, 5x5 or 25 squares
/**
 * Retrieves the current user-defined piece color.
 */
function changePieceColor() {
    pieceColor = btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.value;
}
/**
 * Retrieves the current user-defined canvas color and then modifies the canvas accordingly.
 */
function changeCanvasColor() {
    canvasColor = btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.value;
    if (canvas != null) {
        canvas.style["background-color"] = canvasColor;
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
    /* canvasPieces.forEach(element => {
        element.addEventListener("mouseover", function () {
            element.style.backgroundColor = pieceColor;
        })
    }) */
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
    }
    for (var i = 0; i < (num * num); i++) {
        canvasPieces.push(document.createElement("div"));
    }
    canvasPieces.forEach(function (element) {
        element.className = "gridPiece";
        canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(element);
        element.addEventListener("mousedown", function () {
            drawPieces(element);
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
 * Rewrites the "Size:" label on the page as the user adjusts the slider. It does this by retrieving the current label as a string, modifying it, sending it back to the DOM element. Also modifies the actual canvasSize value accordingly.
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
setCanvas();
btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.addEventListener("input", changePieceColor);
btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.addEventListener("input", changeCanvasColor);
btnClear === null || btnClear === void 0 ? void 0 : btnClear.addEventListener("click", clearCanvas);
sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.addEventListener("input", resizeLabel);
sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.addEventListener("change", resizeSketchArea); //the reason why I went with the change event instead of input was for performance concerns. I would guess it's a reasonably simple matter to change some text, but constantly resizing the grid might be more taxing, and it visually makes no difference either way.
