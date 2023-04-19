const canvas:HTMLElement|null = document.querySelector("#sketch-area"); //TypeScript requires you to declare all technically possible types. Even if you know that the page is set up to only deliver HTMLElements, type safety dictates that this must also be declared potentially null, in the event that the query selector somehow fails to retrieve the element.

type element = HTMLElement|null;
type inputElement = HTMLInputElement|null;

//buttons and inputs
const btnPieceColor:inputElement = document.querySelector("#btn-color");
const btnCanvasColor:inputElement = document.querySelector("#btn-canvas-color");
const btnClear:element = document.querySelector("#btn-clear");
const btnEraser:element = document.querySelector("#btn-eraser");
const sketchScale:inputElement = document.querySelector("#sketch-scale");

let primaryColor:string = getComputedStyle(document.documentElement,null).getPropertyValue('--primaryColor').trim(); //trim is because getComputedStyle apparently also captures whitespace.
let accentColor2:string = getComputedStyle(document.documentElement,null).getPropertyValue('--accentColor2').trim();

let storageColor:string|undefined = btnPieceColor?.value; //retrieve user-defined sketch color
let pieceColor:string|undefined = storageColor;
let canvasColor:string|undefined = btnCanvasColor?.value; //retrieve user-defined canvas color


let canvasPieces:HTMLElement[] = new Array(); //create an array to store the div elements in
let canvasSize:number = 5; //default size of the canvas, 5x5 or 25 squares
let canvasClick:boolean = false;

//just a quick and dirty void method to change button colors. I may later expand it to use with dark mode
function paletteSwitch():void {
	if (btnEraser != null) {
	btnEraser.style.backgroundColor = primaryColor;
	}
}

/**
 * Takes three number arguments representing rgb color values and converts them to an equivalent hexadecimal value.
 * @param r Red color value
 * @param g Green color value
 * @param b Blue color value
 * @returns Hexadecimal equivalent
 */
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
	const hex = x.toString(16)
	return hex.length === 1 ? '0' + hex : hex
 }).join('')

 /**
  * Uses rgbToHex helper function to convert an HTML rgb color to hex
  * @param rgbInput rgb value, as a string in the format "rgb(#, #, #)"
  * @returns 
  */
function convertRGBtoHex(rgbInput:string):string {
	let rgbNumString:string[];
	let rgbNum:number[];
	
	//Expect a TypeError to crop up because sometimes rgbInput arrives undefined. It doesn't seem to affect the functionality of the program as long as it's properly caught, though.
	try {
	rgbNumString = (rgbInput.split("(")[1].split(")")[0]).split(",");
	rgbNum = [Number.parseInt(rgbNumString[0]), Number.parseInt(rgbNumString[1]), Number.parseInt(rgbNumString[2])];
	} catch (error) {
		return "error";
	}

	return rgbToHex(rgbNum[0], rgbNum[1], rgbNum[2]);
}

/**
 * Retrieves the current user-defined piece color.
 */
function changePieceColor():void
{
	storageColor = btnPieceColor?.value;
	pieceColor = storageColor;
}

/**
 * Retrieves the current user-defined canvas color and then modifies the canvas accordingly.
 */
function changeCanvasColor():void
{
	let previousCanvasColor = canvasColor;
	canvasColor = btnCanvasColor?.value;
	if (canvas != null && canvasColor != undefined)
	{
		canvas.style.backgroundColor = canvasColor;	
	}

	canvasPieces.forEach(element => {
		let pieceHexColor = convertRGBtoHex(element.style.backgroundColor);
		if (pieceHexColor == previousCanvasColor && canvasColor != undefined) {
			pieceHexColor = canvasColor;
			element.style.backgroundColor = pieceHexColor;
		}
	});

	//this code checks if the eraser is currently active (as evidenced by pieceColor being equal to previousCanvasColor) and updates it to match the new canvas color
	if (pieceColor == previousCanvasColor) {
		pieceColor = canvasColor;
	}
}

/**
 * Modifies the color (more technically the background color) of the div it is called on
 * @param item The grid piece to be colored in.
 */
function drawPieces(item:HTMLElement) 
{
	if (pieceColor != undefined) {
		item.style.backgroundColor = pieceColor;
	};
}

/**
 * Modifies CSS Grid rules to programmatically draw a grid of squares and set an HTML class and JS event handlers on each of them.
 * @param num The size of the canvas as expressed in length or width (the canvas will have a square aspect ratio so it doesn't matter which).
 */
function setCanvas(num = canvasSize):void 
{ //assuming the canvas didn't come back null, we override the grid size using inline CSS.
	if(canvas != null) {
		canvas.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
		canvas.style.gridTemplateRows = `repeat(${num}, 1fr)`;
	} //then, we add each grid square to the canvasPieces array, for the purpose of running an array function on them in a sec
	for (let i = 0; i < (num*num); i++) {
		canvasPieces.push(document.createElement("div"));
	} //the aforementioned array function goes through canvasPieces and assigns the class "gridPiece" to each grid square div, and then adds it to the DOM.
	canvasPieces.forEach(element => {
		element.className = "gridPiece";
		canvas?.appendChild(element);
		element.addEventListener("mousedown", function(event){
			event.preventDefault(); //this line prevents the browser from treating the gridpieces as draggable objects, which was causing the page to function unreliably because when you clicked to draw, the browser would sometimes treat this as a drag n' drop action and interfere.
			drawPieces(element);
		})
		element.addEventListener("mouseenter", function(event){
			if (event.buttons > 0){
				drawPieces(element);
			}
		});
	});
}

/**
 * 'Clears' the canvas by resetting each square to match the canvas's background color.
 */
function clearCanvas():void
{
	canvasPieces.forEach(element => {
		if (canvasColor != undefined) {
			element.style.backgroundColor = canvasColor;
		}
	})
}

/**
 * Rewrites the "Size:" label on the page as the user adjusts the slider. It does this by retrieving the current label as a string, modifying it, and sending it back to the DOM element. Also modifies the actual canvasSize value accordingly.
 */
function resizeLabel():void {
	const sizeString:string|undefined = sketchScale?.value;
	canvasSize = Number(sizeString);
	let scaleLabel = document.getElementById("lbl-sketch-scale");
	if (scaleLabel != null) {
		scaleLabel.textContent = `Size: ${sizeString} x ${sizeString}`;
	}
}

/**
 * Resizes the sketch area. Before doing so, it clears out the canvas, and then deletes each of the grid squares. It then calls setCanvas() to rebuild them according to the new size.
 */
function resizeSketchArea():void
{
	clearCanvas();
	canvasPieces.forEach(element => {
		canvas?.removeChild(element);
	})
	for (let i = 0; i != canvasPieces.length;) {
		canvasPieces.shift();
	}
	setCanvas(canvasSize);
}

/**
 * Sets the cursor to "erase" squares by matching their color to the canvas.
 */
function eraserMode():void
{
	if (btnEraser != null) {
		if (btnEraser.style.backgroundColor == primaryColor) {
			btnEraser.style.backgroundColor = accentColor2;
		} else {
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


btnPieceColor?.addEventListener("input", changePieceColor);
btnCanvasColor?.addEventListener("input", changeCanvasColor);
btnEraser?.addEventListener("click", eraserMode);
btnClear?.addEventListener("click", clearCanvas);
sketchScale?.addEventListener("input", resizeLabel);
sketchScale?.addEventListener("change", resizeSketchArea);//the reason why I went with the change event instead of input was for performance concerns. I would guess it's a reasonably simple matter to change some text, but constantly resizing the grid might be more taxing, and it visually makes no difference either way.