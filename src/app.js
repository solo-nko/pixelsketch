var numOfPieces = 5 * 5;
var canvas = document.querySelector("#sketch-sect");
var pieceColor = "#D04343";
var canvasPieces = new Array();
function retrieveColor(color) {
    if (color === void 0) { color = pieceColor; }
    return color;
}
function setCanvas(num) {
    if (num === void 0) { num = 25; }
    for (var i = 0; i <= num; i++) {
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
function setColor() {
}
setCanvas();
