import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { SensorData } from '../../types/SensorDate';
import { SensorAppService } from '../../API/SensorAppService';
import { InfoDialog } from '../../component/info-dialog/info-dialog';
import { ConfigurationData } from '../../types/configurationData';
import { SettingsData } from '../../types/SettingsData';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, InfoDialog, CommonModule],
  providers: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  IsLoading: boolean = false;
  dialogVisible = false;
  dialogTitle = '';
  dialogDescription = '';


  get getPM25Color(): string {
    if (!this.SensorData) return '#9CA3AF';

    const pm = this.SensorData.pm2_5;

    if (pm <= 12) return '#10B981';
    if (pm <= 35.4) return '#3B82F6';
    if (pm <= 55.4) return '#F59E0B';
    if (pm <= 150.4) return '#EF4444';
    return '#9C27B0';
  }

  get tempDiff(): number {
    if (!this.SensorData) return 0;

    const diff = this.SensorData.temp_ground - this.SensorData.temp_ambient;
    return Math.round(diff * 100) / 100;
  }

  get getFilterStatus(): number{
    if(this.SensorData != null && this.SettingsData != null){
      return (this.SensorData.wind_speed / this.SettingsData.wind_speed_baseline) * 100;
    }
    return 0; 
  }

  get getFilterStatusColor(): string {
    const status = this.getFilterStatus;
    if (status >= 80) return '#10B981';
    if (status >= 60) return '#F1C40F ';
    if (status >= 40) return '#E67E22 ';
    return '#EF4444';
  }


  SensorData: SensorData | null = null;
  ConfigurationData: ConfigurationData[] = [];
  SettingsData: SettingsData | null = null;
  constructor(private sensorAppService: SensorAppService) {
  }

  ngOnInit() {
    this.SearchData();
    this.SearchInfo();
    this.SearchSettings();
  }

  async SearchData() {
    this.IsLoading = true;
    try {
      const result = await this.sensorAppService.GetLatestSensor('esp32_001');
      this.SensorData = result;
    } catch (err) {
      console.error('Error fetching sensor data:', err);
    } finally {
      this.IsLoading = false;
    }
  }
  
  async SearchInfo (){
    this.IsLoading = true;
    try {
      const result = await this.sensorAppService.GetInfo();
      this.ConfigurationData = result;
    } catch (err) {
      console.error('Error fetching configuration data:', err);
    } finally {
      this.IsLoading = false;
    }
  }

  async SearchSettings (){
    this.IsLoading = true;
    try {
      const result = await this.sensorAppService.GetSettingData('esp32_001');
      this.SettingsData = result;
    } catch (err) {
      console.error('Error fetching settings data:', err);
    } finally {
      this.IsLoading = false;
    }
  }

  openInfo(codeInfo: string, header: string) {
    const info = this.ConfigurationData.find(item => item.code == codeInfo);
    if (info) {
      this.dialogTitle = header;
      this.dialogDescription = info.value;
      this.dialogVisible = true;
    }
  }

  closeDialog() {
    this.dialogVisible = false;
  }

}