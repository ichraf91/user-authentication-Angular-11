import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  nitrogen = 0;
  phosporus = 0;
  potassium = 0;
  temperature = 0;
  humidity = 0;
  ph = 0;
  rainfall = 0;
  prediction = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  predictCrop(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const requestData = {
      Nitrogen: this.nitrogen.toString(),
      Phosporus: this.phosporus.toString(),
      Potassium: this.potassium.toString(),
      Temperature: this.temperature.toString(),
      Humidity: this.humidity.toString(),
      pH: this.ph.toString(),
      Rainfall: this.rainfall.toString()
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const requestDataJson = JSON.stringify(requestData);
    this.http.post<any>('http://localhost:5000/predict', requestDataJson, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      response => {
        this.prediction = response.prediction;
      },
      error => {
        console.error('Erreur lors de la prédiction de la culture :', error.status, error.statusText);
      }
    );
  }
}
