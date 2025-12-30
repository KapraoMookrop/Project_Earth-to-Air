import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  templateUrl: './info-dialog.html',
})
export class InfoDialog {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() visible: boolean = false;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
