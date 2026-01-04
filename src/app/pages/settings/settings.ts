import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginDialog } from '../../component/login-dialog/login-dialog';
import { SettingsData } from '../../types/SettingsData';
import Swal from 'sweetalert2';
import { SensorAppService } from '../../API/SensorAppService';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, LoginDialog],
  providers: [],
  templateUrl: './settings.html',
})
export class Settings {
  user_id?: string;
  username?: string;
  isConnectedLine: boolean = false;
  deviceId?: string;

  IsLoading: boolean = false;
  dialogLoginVisible = false;
  dialogSignupVisible = false;
  dialogTitle = 'Login';

  SettingData!: SettingsData;
  constructor(private sensorAppService: SensorAppService) { }

  ngOnInit() {
    this.getLocalStrorage();
    this.SearchSettings();

    const params = new URLSearchParams(window.location.search);
    if (params.get('line') == 'success') {
      Swal.fire({
        icon: 'success',
        title: 'เชื่อมต่อ LINE สำเร็จ',
        timer: 1500,
        showConfirmButton: false
      });
      localStorage.setItem('is_connected_line', 'true');
      this.isConnectedLine = true;
    }
  }

  getLocalStrorage() {
    this.user_id = localStorage.getItem('user_id') || undefined;
    this.username = localStorage.getItem('username') || undefined;
    this.isConnectedLine = localStorage.getItem('is_connected_line') === 'true';
    this.deviceId = localStorage.getItem('deviceId') || "esp32_001";
  }

  openSignup() {
    this.dialogSignupVisible = true;
  }

  closeSignup() {
    this.dialogSignupVisible = false;
  }


  openLogin() {
    this.dialogLoginVisible = true;
  }

  closeLogin() {
    this.dialogLoginVisible = false;
  }

  logOut() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('deviceId');
    localStorage.removeItem('is_connected_line');
    this.user_id = undefined;
    this.username = undefined;
    this.deviceId = undefined;
    this.isConnectedLine = false;
  }

  async SearchSettings() {
    this.IsLoading = true;
    try {
      const result = await this.sensorAppService.GetSettingData(this.deviceId!);
      this.SettingData = result;
    } catch (err: HttpErrorResponse | any) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.error?.error || 'เกิดข้อผิดพลาดในการดึงข้อมูลการตั้งค่า',
      });
    } finally {
      this.IsLoading = false;
    }
  }

  async ConnectLine() {
    if (!this.user_id) {
      Swal.fire({
        icon: 'warning',
        text: 'กรุณาเข้าสู่ระบบก่อนเชื่อมต่อกับไลน์',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    try {
      const result = await this.sensorAppService.ConnectLine(this.user_id!);
      const lineAuthUrl = result;
    } catch (err: HttpErrorResponse | any) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.error?.error || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับไลน์',
      });
    } finally {
      this.IsLoading = false;
    }
  }

  async SendToLine() {
    this.IsLoading = true;
    try {
      const result = await this.sensorAppService.SendToLine(this.user_id!);
      Swal.fire({
        icon: 'success',
        title: 'ส่งข้อมูลไปยังไลน์สำเร็จ',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err: HttpErrorResponse | any) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.error?.error || 'เกิดข้อผิดพลาดในการส่งข้อมูลไปยังไลน์',
      });
    } finally {
      this.IsLoading = false;
    }
  }

  async CancelConnectLine() {
    this.IsLoading = true;
    localStorage.setItem('is_connected_line', 'false');
    this.isConnectedLine = false;
    try {
      const result = await this.sensorAppService.CancelConnectLine(this.user_id!);
      Swal.fire({
        icon: 'success',
        title: 'ยกเลิกการเชื่อมต่อ LINE สำเร็จ',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err: HttpErrorResponse | any) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.error?.error || 'เกิดข้อผิดพลาดในการยกเลิกการเชื่อมต่อกับไลน์',
      });
    } finally {
      this.IsLoading = false;
    }
  }
}

