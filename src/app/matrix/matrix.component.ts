import {AfterViewInit, Component, computed, ElementRef, HostListener, viewChild} from '@angular/core';

@Component({
  selector: 'az-matrix',
  imports: [],
  templateUrl: './matrix.component.html',
  standalone: true,
  styleUrl: './matrix.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class MatrixComponent implements AfterViewInit {
  drops: number[] = [];
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private canvas = computed(() => this.canvasRef().nativeElement);
  private context = computed(() => this.canvas().getContext('2d'));
  private start = 0;
  private readonly fontSize = 16;

  constructor() {

  }

  @HostListener('window:resize')
  onResize() {
    this.drops = [];
    this.start = 0;
    this.resizeCanvas();
  }

  ngAfterViewInit() {
    this.resizeCanvas();
    requestAnimationFrame(t => this.drawMatrix(t));
  }

  private getRandomCharacter(): string {
    const ranges = [
      [0x4E00, 0x9FFF], // Common CJK Unified Ideographs (Chinese, Japanese, Korean)
      [0x3040, 0x309F], // Hiragana (Japanese)
      [0x30A0, 0x30FF], // Katakana (Japanese)
      [0x0020, 0x007E], // Basic Latin (ASCII),
      [0x0020, 0x007E], // Basic Latin (ASCII) - doubled weight,
    ];

    // Pick a random range
    const range = ranges[Math.floor(Math.random() * ranges.length)];

    // Generate a random character within the range
    const randomCodePoint = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];

    return String.fromCharCode(randomCodePoint);
  }

  private drawMatrix(timestamp: any): void {
    const canvas = this.canvas();
    const context = this.context();
    if (!context) throw "Canvas context not found";

    const elapsed = timestamp - this.start;
    if (elapsed > 80) {
      this.start = timestamp;

      context.fillStyle = "rgba(0, 0, 0, 0.1)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#00ff00";
      context.font = `${this.fontSize}px monospace`;

      this.drops.forEach((y, index) => {
        const randomChar = this.getRandomCharacter();
        const x = index * this.fontSize;

        context.fillText(randomChar, x, y * this.fontSize);

        if (y * this.fontSize > canvas.height && Math.random() > 0.975) {
          this.drops[index] = 0;
        }
        this.drops[index]++;
      });
    }
    requestAnimationFrame(t => this.drawMatrix(t));
  }

  private resizeCanvas(): void {
    const canvas = this.canvas();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Add an extra column to cover any potential gaps
    const columns = Math.ceil(canvas.width / this.fontSize);
    this.drops = Array(columns).fill(1);
  };


}
