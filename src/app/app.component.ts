import { Component, ElementRef, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { ImagesService } from './services/http/images.service'

declare var window: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('hidingImage') hidingImage : ElementRef
  @ViewChild('imageBox')imageBox : ElementRef
  private croppedImage: any = ''
  private imageChangedEvent: any = ''
  private imageFileChanged: any = null

  private imageURLForm: FormGroup

  private hidingImageWidth: number = 0
  private hidingImageHeight: number = 0

  private isLoad: boolean = false

  constructor(private fb: FormBuilder, private ImageURLWorker: ImagesService) {
    this.imageURLForm = fb.group({
      'url': ['', [Validators.required]]
    })
  }

  public async fileGetEvent(url: string) {
    try {
      let image = await this.ImageURLWorker.getImageData(url)
      this.imageFileChanged = image
      this.isLoad = true
    }
    catch(e) {
      this.isLoad = false
      console.error(e)
    }
  }
  
  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event
    this.imageFileChanged = null
    if(this.imageChangedEvent.target.files.length) {
      this.isLoad = true
    }
    else {
      this.isLoad = false
    }
  }
  
  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
    this.hidingImage.nativeElement.onload = () => {
      this.hidingImageHeight = this.hidingImage.nativeElement.height
      this.hidingImageWidth = this.hidingImage.nativeElement.width
    }
  }

  public imageLoaded() {
      // show cropper
  }
  public cropperReady() {
      // cropper ready
  }
  public loadImageFailed() {
      // show message
  }
}
