import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SensorAppService } from '../../API/SensorAppService';
import { UserData } from '../../types/UserData';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  templateUrl: './login-dialog.html',
  imports: [FormsModule],
})
export class LoginDialog {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() type: 'login' | 'signup' = 'login';

  @Output() close = new EventEmitter<void>();

  IsLoading: boolean = false;
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  deviceId: string = '';

  constructor(private sensorAppService: SensorAppService) { }

  onClose() {
    this.resetValues();
    this.close.emit();
  }

  async onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const password = form.querySelector('#password') as HTMLInputElement;
    const confirm = form.querySelector('#confirmPassword') as HTMLInputElement;

    if (password && confirm && password.value !== confirm.value) {
      confirm.setCustomValidity('password-mismatch');
    } else {
      confirm?.setCustomValidity('');
    }

    if (form.checkValidity()) {
      const UserData = {
        username: this.username,
        password: this.password,
        deviceId: this.deviceId
      } as UserData;

      switch (this.type) {
        case 'login':
          await this.login(UserData);
          break;
        case 'signup':
          await this.signup(UserData);
          break;
      }

    } else {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
  }

  private async login(userData: UserData) {
    this.IsLoading = true;
    try {
      const result = await this.sensorAppService.Login(userData);

      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        text: 'ยินดีต้อนรับเข้าสู่ระบบ',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.reload();
      });

      console.log('Login successful:', result);
      this.setLocalStrorage('user_id', result.user_id);
      this.setLocalStrorage('deviceId', this.deviceId);
      this.setLocalStrorage('username', result.username);
      this.setLocalStrorage('is_connected_line', result.is_connected_line.toString());
      this.onClose();

    } catch (err: HttpErrorResponse | any) {
      Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        text: err.error?.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
      });

      console.error('Login failed:', err);
    }finally {
      this.IsLoading = false;
    }
  }


  private async signup(userData: UserData) {
    this.IsLoading = true;
    try {
      const result = await this.sensorAppService.Signup(userData);

      Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ',
        text: 'สามารถเข้าสู่ระบบได้ทันที',
      });

      this.resetValues();
      this.type = 'login';

    } catch (err: HttpErrorResponse | any) {
      Swal.fire({
        icon: 'error',
        title: 'สมัครสมาชิกไม่สำเร็จ',
        text: err.error?.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
      });

      console.error('Signup failed:', err);
    }finally {
      this.IsLoading = false;
    }
  }

  resetValues() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.deviceId = '';
  }

  setLocalStrorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

}
