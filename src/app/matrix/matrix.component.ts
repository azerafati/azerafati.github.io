import {AfterViewInit, Component, ElementRef, viewChild} from '@angular/core';

@Component({
  selector: 'az-matrix',
  imports: [],
  templateUrl: './matrix.component.html',
  standalone: true,
  styleUrl: './matrix.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class MatrixComponent implements AfterViewInit {
  matrixColumns = [];
  drops: number[] = [];
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private start = 0;

  constructor() {

  }

  ngAfterViewInit() {
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) return
    const context = canvas.getContext("2d");

    const fontSize = 16;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Add an extra column to cover any potential gaps
      const columns = Math.ceil(canvas.width / fontSize);
      this.drops = Array(columns).fill(1);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawMatrix = (timestamp: any) => {
      if (!context) throw "Canvas context not found";

      const elapsed = timestamp - this.start;
      if (elapsed > 80) {
        this.start = timestamp;

        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#00ff00";
        context.font = `${fontSize}px monospace`;

        this.drops.forEach((y, index) => {
          const text = String.fromCharCode(48 + Math.random() * 30);
          const x = index * fontSize;

          context.fillText(text, x, y * fontSize);

          if (y * fontSize > canvas.height && Math.random() > 0.975) {
            this.drops[index] = 0;
          }
          this.drops[index]++;
        });
      }
      requestAnimationFrame((t) => drawMatrix(t));
    };
    requestAnimationFrame((t) => drawMatrix(t));


  }

}
