const numOfPieces:number = 5*5;
const canvas = document.querySelector("#sketch-sect");
let canvasPieces = new Array();

function setCanvas(num = 25):void 
{
	for (let i = 0; i <= num; i++) {
		canvasPieces.push(document.createElement("div"));
	}
	canvasPieces.forEach(element => {
		element.className = "gridPiece";
		canvas?.appendChild(element);
	});
}


setCanvas();