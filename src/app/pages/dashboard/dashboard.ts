import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  providers: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  constructor() {
  }
}

