import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexMarkers,
  ApexYAxis,
  NgApexchartsModule
} from 'ng-apexcharts';
import { SensorData } from '../../types/SensorDate';
import { SensorAppService } from '../../API/SensorAppService';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [FormsModule, NgApexchartsModule, CommonModule],
  templateUrl: './analytics.html',
})
export class Analytics {
  IsLoading: boolean = false;
  selectedValue = 'temp';
  selectedRange = '1';
  graphColor = '#FF5733';
  maximumValue: number = 0;
  minimumValue: number = 0;
  avgValue: number = 0;

  rawData: SensorData[] = [];

  metricMap: any = {
    temp: { key: 'temp_ambient', label: 'Temperature (°C)' , color: '#FF5733'},
    pm25: { key: 'pm2_5', label: 'PM 2.5 (µg/m³)', color: '#33C3FF' },
    pm10: { key: 'pm1_0', label: 'PM 1.0 (µg/m³)', color: '#33C3FF' },
    voc: { key: 'voc_level', label: 'VOCs (ppm)', color: '#c084fc' },
    wind: { key: 'wind_speed', label: 'Wind Speed (m/s)', color: '#06b6d4' },
    humidity: { key: 'humidity', label: 'Humidity (%)', color: '#60a5fa' }
  };

  series: ApexAxisChartSeries = [];

  chart: ApexChart = {
    type: 'area',
    height: 350,
    toolbar: { show: false },
    fontFamily: 'Kanit, sans-serif',
    zoom: { enabled: false }
  };

  xaxis: ApexXAxis = {
    type: 'datetime'
  };

  stroke: ApexStroke = {
    curve: 'smooth',
    width: 3
  };

  tooltip: ApexTooltip = {
    x: { format: 'dd MMM yyyy HH:mm' }
  };

  markers: ApexMarkers = {
    size: 2
  };

  fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1
    }
  }

  colors: string[] = [this.graphColor];

  yaxis: ApexYAxis = {
    decimalsInFloat: 2
  };

  constructor(private sensorAppService: SensorAppService) {

  }

  ngOnInit() {
    this.SearchData();
  }

  async SearchData() {
    this.IsLoading = true;
    try {
      this.rawData = await this.sensorAppService.GetSensorHistory('esp32_001', this.selectedRange);
    } catch (err) {
      console.error('Error fetching sensor data:', err);
    } finally {
    }
    this.updateChart();
  }

  updateChart() {
    const metric = this.metricMap[this.selectedValue];
    this.colors = [metric.color];

    const values = this.rawData.map(d => Number((d as any)[metric.key]));
    this.maximumValue = Math.max(...values);
    this.minimumValue = Math.min(...values);
    this.avgValue = values.reduce((a, b) => a + b, 0) / values.length;

    this.series = [
      {
        name: metric.label,
        data: this.rawData.map(d => ({
          x: new Date(d.time),
          y: Number((d as any)[metric.key])
        }))
      }
    ];

    this.IsLoading = false;
  }

  onMetricChange(metric: string) {
    this.selectedValue = metric;
    this.updateChart();
  }

  onRangeChange(typeRange: string) {
    this.selectedRange = typeRange;
    this.SearchData();
  }
}
