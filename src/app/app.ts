import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from "@angular/router";
import { Navbar } from './component/navbar/navber';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Navbar, RouterOutlet, NgApexchartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

}