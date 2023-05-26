import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {
  selectedImage: File | undefined;
  htmlContent: string | undefined;
  soilImage: string | undefined; // Ajoutez cette ligne

  constructor(private http: HttpClient) {}

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(): void{
    if (!this.selectedImage) {
      console.log('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.http.post('http://localhost:5001/predict', formData, { responseType: 'text' })
      .subscribe(
        (response: string) => {
          this.htmlContent = response;
          if (this.htmlContent.includes('Red Soil')) {
            this.soilImage = 'assets/images/RedSoil.jpg';
          } else if (this.htmlContent.includes('Sand Soil')) {
            this.soilImage = 'assets/images/SandSoil.jpg';
          }
        },
        (error: any) => {
          console.log('Error:', error);
        }
      );
  }
}
