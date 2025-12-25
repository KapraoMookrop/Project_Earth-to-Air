import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  imports: [FormsModule],
  providers: [],
  templateUrl: './analytics.html',
})
export class Analytics {
  constructor() {
  }
}

