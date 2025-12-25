import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  providers: [],
  templateUrl: './settings.html',
})
export class Settings {
  constructor() {
  }
}

