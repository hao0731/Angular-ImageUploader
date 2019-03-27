import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ImageInfo } from './../../interfaces/structures/image-info'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public async uploadImage(info: ImageInfo): Promise<string> {
    const formData = this.createFormData(info)
    const httpHeader = this.createHttpHeader()
    return await new Promise((resolve, reject) => {
      this.http.post('/api/images', formData, { observe: 'response', headers: httpHeader })
      .subscribe(res => {
        resolve(res['body']['message'])
      }, err => {
        reject(`上傳時發生錯誤`)
      })
    })
  }

  public async resizeImage(info: any): Promise<string> {
    return await new Promise((resolve, reject) => {
      this.http.patch('/api/images', info, { observe: 'response' })
      .subscribe(res => {
        resolve(res['body']['message'])
      }, err => {
        reject(`縮圖時發生錯誤`)
      })
    })
  }

  private createFormData(info: ImageInfo): FormData {
    const data = new FormData()
    data.append('file', info.image, info.image.name)
    return data
  }

  private createHttpHeader(): HttpHeaders {
    const httpHeader = new HttpHeaders()
    httpHeader.append('Content-Type', 'multipart/form-data')
    httpHeader.append('Accept', 'application/json')
    return httpHeader
  }
}
