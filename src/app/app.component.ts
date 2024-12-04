import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatrixComponent} from './matrix/matrix.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatrixComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'azerafati';
}
