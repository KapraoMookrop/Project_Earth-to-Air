import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, NgClass],
  providers: [],
  templateUrl: './navber.html',
})
export class Navbar {
  public IsLoading: boolean = false;
  constructor() {
  }

}

