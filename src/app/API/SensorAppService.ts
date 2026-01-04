import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SensorData } from '../types/SensorDate';
import { SettingsData } from '../types/SettingsData';
import { ConfigurationData } from '../types/configurationData';
import { UserData } from '../types/UserData';

@Injectable({
    providedIn: 'root'
})
export class SensorAppService {

    private baseUrl = 'https://project-earth-to-air-server.onrender.com';

    constructor(private http: HttpClient) { }

    async GetLatestSensor(deviceId: string): Promise<SensorData> {
        const observable = this.http.get<SensorData>(
            `${this.baseUrl}/api/latest/${deviceId}`
        );

        const response = await lastValueFrom(observable);
        return response;
    }

    async GetInfo(): Promise<ConfigurationData[]> {
        const observable = this.http.get<ConfigurationData[]>(
            `${this.baseUrl}/api/info`
        );

        const response = await lastValueFrom(observable);
        return response;
    }

    async GetSettingData(deviceId: string): Promise<SettingsData> {
        const observable = this.http.get<SettingsData>(
            `${this.baseUrl}/api/settings/${deviceId}`
        );

        const response = await lastValueFrom(observable);
        return response;
    }

    async GetSensorHistory(deviceId: string, typeRange: string): Promise<SensorData[]> {

        const observable = this.http.get<SensorData[]>(
            `${this.baseUrl}/api/history/${deviceId}/${typeRange}`
        );

        const response = await lastValueFrom(observable);
        return response;
    }

    async Login(UserData: UserData): Promise<UserData> {

        const observable = this.http.post<UserData>(
            `${this.baseUrl}/api/login`, UserData
        );

        const response = await lastValueFrom(observable);
        return response;
    }

    async Signup(UserData: UserData): Promise<UserData> {

        const observable = this.http.post<UserData>(
            `${this.baseUrl}/api/signup`, UserData
        );

        const response = await lastValueFrom(observable);
        return response;
    }

    ConnectLine(userId: string) {
        window.location.href =
            'https://access.line.me/oauth2/v2.1/authorize' +
            '?response_type=code' +
            '&client_id=2008812785' +
            '&redirect_uri=https://project-earth-to-air-server.onrender.com/api/auth/line/callback' +
            `&state=${userId}` +
            '&scope=profile%20openid'
    }

    async SendToLine(userId: string) {
        const observable = this.http.get(
            `${this.baseUrl}/api/send-to-line/${userId}`
        );
        
        const response = await lastValueFrom(observable);
        return response;
    }

    async CancelConnectLine(userId: string) {
        const observable = this.http.get(
            `${this.baseUrl}/api/cancel-line/${userId}`
        );
        const response = await lastValueFrom(observable);
        return response;
    }

}
