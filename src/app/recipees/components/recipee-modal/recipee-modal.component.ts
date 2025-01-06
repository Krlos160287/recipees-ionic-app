import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButton} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
    selector: 'app-recipee-modal',
    templateUrl: './recipee-modal.component.html',
    styleUrls: ['./recipee-modal.component.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonButton]
})
export class RecipeeModalComponent {

  @Input() edit: boolean = false;

  @Output() closeDialogEvent = new EventEmitter<void>();

  imageBase64: string | undefined = undefined;

  closeModal() {
    this.closeDialogEvent.emit();
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      source: CameraSource.Camera,
      resultType: CameraResultType.DataUrl,
    });
    this.imageBase64 = image.dataUrl;
  }

  uploadPhoto() {
    if (this.imageBase64) {
      const body = { image: this.imageBase64 };

    //   this.http.post('/api/upload', payload).subscribe({
    //     next: (response) => console.log('Upload successful:', response),
    //     error: (error) => console.error('Upload failed:', error),
    //   });
    }
  }

  deletePhoto() {
    this.imageBase64 = undefined;
  }
}
