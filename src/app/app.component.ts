import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatrixComponent } from './matrix/matrix.component'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatrixComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Alireza Zerafati'
}
