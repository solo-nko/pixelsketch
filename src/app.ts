const numOfPieces:number = 5*5;
const canvas = document.querySelector("#sketch-sect");
let pieceColor = "#D04343";
let canvasPieces:HTMLElement[] = new Array();

function retrieveColor(color = pieceColor):string {
	return color;
}

function setCanvas(num = 25):void 
{
	for (let i = 0; i <= num; i++) {
		canvasPieces.push(document.createElement("div"));
	}
	canvasPieces.forEach(element => {
		element.className = "gridPiece";
		canvas?.appendChild(element);
		element.addEventListener("click", function():void {
			element.style["background-color"] = retrieveColor();
		});
	});
}

function setColor():void 
{
	
}


setCanvas();