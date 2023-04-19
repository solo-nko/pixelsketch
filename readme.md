# Project Pixel Canvas

## What is it?

A simple drawing(?) tool. You can click on places in the drawable area and it will draw a square there. You can choose the color and size of the canvas, as well as the color of your "brush."

This project was originally inspired by a challenge on The Odin Project.

## Why did I make it?

As an exercise in TypeScript, JavaScript and CSS Grid.

## Tech used

This project is built in HTML, CSS and JavaScript. The JavaScript was written almost entirely in TypeScript.

## Known Issues

- Canvas doesn't change color correctly with eraser. This is due to a discrepancy in how the program handles color values. The HTML color picker input element prefers to use hexadecimal, whilst the JS DOM prefers to retrieve the color as an RGB value. Figuring out how to reliably convert between these two has been a headache.

## Things I'd like to do:

- ~~Allow clicking and dragging to paint~~ Done!
- Implement 'default' button
- ~~Implement eraser mode~~ Done!
- Add dark mode
- Export to image or vector