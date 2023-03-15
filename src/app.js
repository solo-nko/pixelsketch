var numOfPieces = 5 * 5;
var canvas = document.querySelector("#sketch-sect");
var canvasPieces = new Array();
function setCanvas(num) {
    if (num === void 0) { num = 25; }
    for (var i = 0; i <= num; i++) {
        canvasPieces.push(document.createElement("div"));
    }
    canvasPieces.forEach(function (element) {
        element.className = "gridPiece";
        canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(element);
    });
}
setCanvas();
