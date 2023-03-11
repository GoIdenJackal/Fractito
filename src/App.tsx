import './App.css';
import iro from '@jaames/iro';

function App() {
  const canvasWidth = 800;
  const canvasHeight = 800;

  let currentToolSelected: string;

  let mouseX: number = 0;
  let mouseY: number = 0;
  let startX: number = 0; // x-coordinate of starting point
  let startY: number = 0; // y-coordinate of starting point
  let endX: number = 0; // x-coordinate of ending point
  let endY: number = 0; // y-coordinate of ending point

  let currentLineWidth: number = 0;

  const inputLineWidthElement: HTMLInputElement = document.getElementById('lineWidth') as HTMLInputElement;
  inputLineWidthElement.value = '0';

  const clearButton: HTMLButtonElement = document.getElementById('clearButton') as HTMLButtonElement;
  const rectangleButton: HTMLButtonElement = document.getElementById('drawRectangleButton') as HTMLButtonElement;
  const lineButton: HTMLButtonElement = document.getElementById('drawLineButton') as HTMLButtonElement;
  const circleButton: HTMLButtonElement = document.getElementById('drawCircleButton') as HTMLButtonElement;
  const pointButton: HTMLButtonElement = document.getElementById('drawPointButton') as HTMLButtonElement;

  const currentToolSelectedElement = document.getElementById('currentToolSelected');

  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

  const colourPicker = iro.ColorPicker('#colourPicker', {
    wheelLightness: false, width: 160, color: '#f00',
  });

  const mousePositionText = document.getElementById('mousePosition');
  const canvasDimensionsText = document.getElementById('canvasDimensions');

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  if (canvasDimensionsText !== null) {
    canvasDimensionsText.innerHTML = `${canvasWidth} x ${canvasHeight}`;
  }

  canvas.addEventListener('mousedown', (event: MouseEvent) => {
    startX = event.offsetX; // get starting x-coordinate relative to canvas
    startY = event.offsetY; // get starting y-coordinate relative to canvas
  });

  canvas.addEventListener('mousemove', (event: MouseEvent) => {
    const rect: DOMRect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    if (mouseX > canvasWidth) {
      mouseX = 400;
    } else if (mouseX < 0) {
      mouseX = 0;
    }

    if (mouseY > canvasHeight) {
      mouseY = 400;
    } else if (mouseX < 0) {
      mouseY = 0;
    }

    if (mousePositionText !== null) {
      mousePositionText.style.visibility = 'visible';
      mousePositionText.innerHTML = `X: ${Math.round(mouseX)}, Y: ${Math.round(mouseY)}`;
    }
  });

  function distance(x1: number, y1: number, x2: number, y2: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  canvas.addEventListener('mouseup', () => {
    endX = mouseX;
    endY = mouseY;
    ctx.strokeStyle = colourPicker.color.hexString;
    ctx.fillStyle = colourPicker.color.hexString;

    switch (currentToolSelected) {
      case 'Rectangle':
        ctx.beginPath();
        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.stroke();
        break;
      case 'Circle':
        ctx.beginPath();
        ctx.arc(startX, startY, distance(startX, startY, endX, endY), 0, 2 * Math.PI, false);
        ctx.stroke();
        break;
      case 'Line':
        ctx.lineWidth = currentLineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        break;
      case 'Point':
        ctx.beginPath();
        ctx.fillRect(endX - 1, endY - 1, 2, 2);
        ctx.stroke();
        break;

      default:
        break;
    }
  });

  clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  });

  rectangleButton.addEventListener('click', () => {
    currentToolSelected = 'Rectangle';
    if (currentToolSelectedElement !== null) {
      currentToolSelectedElement.style.visibility = 'visible';
      currentToolSelectedElement.innerHTML = `${currentToolSelected} Tool`;
    }
  });

  lineButton.addEventListener('click', () => {
    currentToolSelected = 'Line';
    if (currentToolSelectedElement !== null) {
      currentToolSelectedElement.style.visibility = 'visible';
      currentToolSelectedElement.innerHTML = `${currentToolSelected} Tool`;
    }
  });

  circleButton.addEventListener('click', () => {
    currentToolSelected = 'Circle';
    if (currentToolSelectedElement !== null) {
      currentToolSelectedElement.style.visibility = 'visible';
      currentToolSelectedElement.innerHTML = `${currentToolSelected} Tool`;
    }
  });

  pointButton.addEventListener('click', () => {
    currentToolSelected = 'Point';
    if (currentToolSelectedElement !== null) {
      currentToolSelectedElement.style.visibility = 'visible';
      currentToolSelectedElement.innerHTML = `${currentToolSelected} Tool`;
    }
  });

  inputLineWidthElement.addEventListener('input', () => {
    const { value } = inputLineWidthElement;
    if (value !== undefined) {
      currentLineWidth = parseFloat(value);
      ctx.lineWidth = currentLineWidth;
    }
  });

  return (
    <>
    </>
  );
}

export default App;
