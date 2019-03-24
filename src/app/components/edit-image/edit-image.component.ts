import { Component, Input, ElementRef, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { MosaicService } from './../../services/canvas/mosaic.service'

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnChanges, OnInit {
  @Input() hidingImageHeight: number
  @Input() hidingImageWidth: number
  @Input() croppedImageData: string = ''
  @ViewChild('drawImage') drawImage: ElementRef

  private image = new Image()

  constructor(private mosaic: MosaicService) { 
  }

  private mouseDown(e: any) {
    const canvasImage = this.drawImage.nativeElement.getContext('2d')
    this.drawImage.nativeElement.draw = true
    this.drawImage.nativeElement.ctx = this.drawImage.nativeElement.getContext('2d')

    let o = this.drawImage.nativeElement
    this.drawImage.nativeElement.offsetX = this.drawImage.nativeElement.offsetLeft
    this.drawImage.nativeElement.offsetY = this.drawImage.nativeElement.offsetTop

    while(o.offsetParent) {
      o = o.offsetParent
    	this.drawImage.nativeElement.offsetX += o.offsetLeft
      this.drawImage.nativeElement.offsetY += o.offsetTop
    }

    let colorData = canvasImage.getImageData(e.pageX - this.drawImage.nativeElement.offsetX, e.pageY - this.drawImage.nativeElement.offsetY, 9, 9)
    colorData = this.mosaic.createMosaic(colorData)
    this.drawImage.nativeElement.ctx.putImageData(colorData, e.pageX - this.drawImage.nativeElement.offsetX, e.pageY - this.drawImage.nativeElement.offsetY)
  }

  private mouseMove(e: any) {
    const canvasImage = this.drawImage.nativeElement.getContext('2d')
    this.drawImage.nativeElement.ctx = this.drawImage.nativeElement.getContext('2d')

    if (this.drawImage.nativeElement.draw) {
      let colorData = canvasImage.getImageData(e.pageX - this.drawImage.nativeElement.offsetX, e.pageY - this.drawImage.nativeElement.offsetY, 9, 9)
      colorData = this.mosaic.createMosaic(colorData)
      this.drawImage.nativeElement.ctx.putImageData(colorData, e.pageX - this.drawImage.nativeElement.offsetX, e.pageY - this.drawImage.nativeElement.offsetY)
    }
  }

  private mouseUp(e: any) {
    this.drawImage.nativeElement.draw = false
  }

  private touchStart(e: any) {
    const canvasImage = this.drawImage.nativeElement.getContext('2d')
    this.drawImage.nativeElement.draw = true
    this.drawImage.nativeElement.touch = e.targetTouches[0]
    this.drawImage.nativeElement.ctx = this.drawImage.nativeElement.getContext('2d')

    let o = this.drawImage.nativeElement
    this.drawImage.nativeElement.offsetX = this.drawImage.nativeElement.offsetLeft
    this.drawImage.nativeElement.offsetY = this.drawImage.nativeElement.offsetTop

    while(o.offsetParent) {
      o = o.offsetParent
    	this.drawImage.nativeElement.offsetX += o.offsetLeft
      this.drawImage.nativeElement.offsetY += o.offsetTop
    }
    let colorData = canvasImage.getImageData(this.drawImage.nativeElement.touch.pageX - this.drawImage.nativeElement.offsetX, this.drawImage.nativeElement.touch.pageY - this.drawImage.nativeElement.offsetY, 9, 9)
    colorData = this.mosaic.createMosaic(colorData)
    this.drawImage.nativeElement.ctx.putImageData(colorData, this.drawImage.nativeElement.touch.pageX - this.drawImage.nativeElement.offsetX, this.drawImage.nativeElement.touch.pageY - this.drawImage.nativeElement.offsetY)
    e.preventDefault()
  }

  private touchMove(e: any) {
    const canvasImage = this.drawImage.nativeElement.getContext('2d')
    this.drawImage.nativeElement.ctx = this.drawImage.nativeElement.getContext('2d')
    this.drawImage.nativeElement.touch = e.targetTouches[0]

    if (this.drawImage.nativeElement.draw) {
      let colorData = canvasImage.getImageData(this.drawImage.nativeElement.touch.pageX - this.drawImage.nativeElement.offsetX, this.drawImage.nativeElement.touch.pageY - this.drawImage.nativeElement.offsetY, 9, 9)
      colorData = this.mosaic.createMosaic(colorData)
      this.drawImage.nativeElement.ctx.putImageData(colorData, this.drawImage.nativeElement.touch.pageX - this.drawImage.nativeElement.offsetX, this.drawImage.nativeElement.touch.pageY - this.drawImage.nativeElement.offsetY)
    }
    e.preventDefault()
  }

  private touchEnd(e: any) {
    this.drawImage.nativeElement.draw = false
    e.preventDefault()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawImage.nativeElement.width = this.hidingImageWidth
    this.drawImage.nativeElement.height = this.hidingImageHeight
    this.image.src = this.croppedImageData
    this.image.onload = () => {
      this.drawImage.nativeElement.ctx = this.drawImage.nativeElement.getContext('2d')
      this.drawImage.nativeElement.ctx.drawImage(this.image, 0, 0)
    }
  }

  ngOnInit() {
  }

}
