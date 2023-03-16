var numOfPieces = 5 * 5;
var canvas = document.querySelector("#sketch-sect");
//buttons and inputs
var btnPieceColor = document.querySelector("#btn-color");
var btnCanvasColor = document.querySelector("#btn-canvas-color");
var btnClear = document.querySelector("#btn-clear"); //TypeScript requires you to declare all technically possible types. Even if you know that the page is set up to only deliver HTMLElements, type safety dictates that this must also be declared potentially null, in the event that the query selector somehow fails to retrieve the element.
var sketchScale = document.querySelector("#sketch-scale");
var pieceColor = btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.value;
var canvasColor = btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.value;
var canvasPieces = new Array();
var canvasSize = 5;
function changePieceColor() {
    pieceColor = btnPieceColor === null || btnPieceColor === void 0 ? void 0 : btnPieceColor.value;
}
function changeCanvasColor() {
    canvasColor = btnCanvasColor === null || btnCanvasColor === void 0 ? void 0 : btnCanvasColor.value;
    if (canvas != null) {
        canvas.style["background-color"] = canvasColor;
    }
}
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
function clearCanvas() {
    canvasPieces.forEach(function (element) {
        element.style["background-color"] = canvasColor;
    });
}
function resizeLabel() {
    clearCanvas();
    var sizeString = sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.value;
    canvasSize = Number(sizeString);
    var scaleLabel = document.getElementById("lbl-sketch-scale");
    if (scaleLabel != null) {
        scaleLabel.textContent = "Size: ".concat(sizeString, " x ").concat(sizeString);
    }
}
function resizeSketchArea() {
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
