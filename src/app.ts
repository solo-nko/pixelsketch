const numOfPieces:number = 5*5;
const canvas:HTMLElement|null = document.querySelector("#sketch-sect");
let pieceColor = "#D04343";
let canvasColor = "#F0F8FF";
let canvasPieces:HTMLElement[] = new Array();
let canvasSize:number = 5;

//buttons and inputs
const btnClear:HTMLElement|null = document.querySelector("#btn-clear"); //TypeScript requires you to declare all technically possible types. Even if you know that the page is set up to only deliver HTMLElements, type safety dictates that this must also be declared potentially null, in the event that the query selector somehow fails to retrieve the element.
const sketchScale:HTMLInputElement|null = document.querySelector("#sketch-scale");

function retrieveColor(color = pieceColor):string 
{
	return color;
}

function changeColor():void
{

}

function setCanvas(num = canvasSize):void 
{
	if(canvas != null) {
		canvas.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
		canvas.style.gridTemplateRows = `repeat(${num}, 1fr)`;
	}
	for (let i = 0; i < (num*num); i++) {
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

function clearCanvas():void
{
	canvasPieces.forEach(element => {
		element.style["background-color"] = canvasColor;
	})
}

function resizeLabel():void {
	clearCanvas();
	const sizeString:string|undefined = sketchScale?.value;
	canvasSize = Number(sizeString);
	let scaleLabel = document.getElementById("lbl-sketch-scale");
	if (scaleLabel != null) {
		scaleLabel.textContent = `Size: ${sizeString} x ${sizeString}`;
	}
}

function resizeSketchArea()
{
	canvasPieces.forEach(element => {
		canvas?.removeChild(element);
	})
	for (let i = 0; i != canvasPieces.length;) {
		canvasPieces.shift();
	}
	setCanvas(canvasSize);
}


setCanvas();

btnClear?.addEventListener("click", clearCanvas);
sketchScale?.addEventListener("input", resizeLabel);
sketchScale?.addEventListener("change", resizeSketchArea);