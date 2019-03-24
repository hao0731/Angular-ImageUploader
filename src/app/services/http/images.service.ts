import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  public async getImageData(url: string): Promise<Blob> {
    return await new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(image => {
        resolve(image)
      },err => {
        reject(err)
      })
    })
  }
}
