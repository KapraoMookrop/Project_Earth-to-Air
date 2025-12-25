import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterModule, CommonModule ],  
  providers: [],
  templateUrl: './navber.html',
})
export class Navbar { 
  public IsLoading: boolean = false;
  constructor() {
  }

  currentTime: Date = new Date();
  private timer: any;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}

