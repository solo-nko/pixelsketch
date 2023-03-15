var numOfPieces = 5 * 5;
var canvas = document.querySelector("#sketch-sect");
var pieceColor = "#D04343";
var canvasColor = "#F0F8FF";
var canvasPieces = new Array();
var canvasSize = 5;
//buttons and inputs
var btnClear = document.querySelector("#btn-clear"); //TypeScript requires you to declare all technically possible types. Even if you know that the page is set up to only deliver HTMLElements, type safety dictates that this must also be declared potentially null, in the event that the query selector somehow fails to retrieve the element.
var sketchScale = document.querySelector("#sketch-scale");
function retrieveColor(color) {
    if (color === void 0) { color = pieceColor; }
    return color;
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
        element.addEventListener("click", function () {
            element.style["background-color"] = retrieveColor();
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
btnClear === null || btnClear === void 0 ? void 0 : btnClear.addEventListener("click", clearCanvas);
sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.addEventListener("input", resizeLabel);
sketchScale === null || sketchScale === void 0 ? void 0 : sketchScale.addEventListener("change", resizeSketchArea);
