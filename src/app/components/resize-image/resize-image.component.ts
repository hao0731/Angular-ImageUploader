import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from './../../services/http/api.service'

@Component({
  selector: 'app-resize-image',
  templateUrl: './resize-image.component.html',
  styleUrls: ['./resize-image.component.css']
})
export class ResizeImageComponent implements OnInit {
  private resizeImageForm: FormGroup
  private imageURL: string = ''

  constructor(private fb: FormBuilder, private api: ApiService) { 
    this.resizeImageForm = fb.group({
      'filename': ['', [Validators.required]],
      'width': [250, [Validators.required, Validators.pattern(/^([1-9]\d{2}|1\d{3}|2000)$/)]]
    })
  }

  private async resizeImage(info: any) {
    this.imageURL = ''
    try {
      const imageURL = await this.api.resizeImage(info)
      this.imageURL = imageURL
    }
    catch(e) {
      this.imageURL = '縮圖時發生錯誤'
    }
  }

  ngOnInit() {
  }

}
