import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class AppComponent {
 title ='Trend Store';
}