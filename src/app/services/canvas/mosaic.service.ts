import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MosaicService {

  constructor() { }

  public createMosaic(section: any) {
    const length = section.data.length
    const firstPixel = [section.data[0], section.data[1], section.data[2], section.data[3]]

    for(let i = 4;i < length;i += 4) {
      section.data[i] = firstPixel[0]
      section.data[i+1] = firstPixel[1]
      section.data[i+2] = firstPixel[2]
      section.data[i+3] = firstPixel[3]
    }

    return section
  }
}
