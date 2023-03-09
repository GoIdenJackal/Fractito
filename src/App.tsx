import './App.css';
import iro from '@jaames/iro';

function App() {
  const canvasWidth = 680;
  const canvasHeight = 480;

  let mouseX: number = 0;
  let mouseY: number = 0;
  let isDrawing: boolean = false; // flag to indicate if we are currently drawing
  let startX: number = 0; // x-coordinate of starting point
  let startY: number = 0; // y-coordinate of starting point
  let endX: number = 0; // x-coordinate of ending point
  let endY: number = 0; // y-coordinate of ending point

  const clearButton: HTMLButtonElement = document.getElementById('clearButton') as HTMLButtonElement;
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
  const colourPicker = iro.ColorPicker('#colourPicker', {
    wheelLightness: false, width: 160, color: '#f00',
  });
  const mousePositionContainer = document.getElementById('mousePosition');

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvas.addEventListener('mousedown', (event: MouseEvent) => {
    isDrawing = true; // set flag to indicate we are starting to draw
    startX = event.offsetX; // get starting x-coordinate relative to canvas
    startY = event.offsetY; // get starting y-coordinate relative to canvas
  });

  canvas.addEventListener('mousemove', (event: MouseEvent) => {
    const rect: DOMRect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    if (mousePositionContainer !== null) {
      mousePositionContainer.innerHTML = `X: ${mouseX}, Y: ${mouseY}`;
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false; // set flag to indicate we have finished drawing
  });

  canvas.addEventListener('mousemove', (event: MouseEvent) => {
    if (isDrawing) {
      endX = event.offsetX; // get ending x-coordinate relative to canvas
      endY = event.offsetY; // get ending y-coordinate relative to canvas

      ctx.beginPath();
      ctx.strokeStyle = colourPicker.color.hexString;
      ctx.rect(startX, startY, endX - startX, endY - startY); // create rectangle
      ctx.stroke(); // draw rectangle
    }
  });

  clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  });

  canvas.addEventListener('click', (event: MouseEvent) => {
    const rect: DOMRect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  });

  return (
    <>
    </>
  );
}

export default App;
