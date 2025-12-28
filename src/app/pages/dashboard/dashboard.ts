import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { SensorData } from '../../types/SensorDate';
import { SensorAppService } from '../../API/SensorAppService';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  providers: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  IsLoading: boolean = false;

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


  SensorData: SensorData | null = null;
  constructor(private sensorAppService: SensorAppService) {
  }

  ngOnInit() {
    this.SearchData();
  }

  async SearchData() {
    this.IsLoading = true;
    try {
      this.SensorData = await this.sensorAppService.GetLatestSensor('esp32_001');
    } catch (err) {
      console.error('Error fetching sensor data:', err);
    } finally {
      this.IsLoading = false;
    }
  }

}

