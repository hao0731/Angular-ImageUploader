# Angular-ImageUploader
本專案主要功能如下所示：
1.  可以從本地端或是輸入URL來進行圖片編輯
2.  可以針對輸入之圖片進行裁剪
3.  將要裁剪的範圍選定後，可以使用滑鼠在預覽區中針對圖片欲打碼之區域進行馬賽克編輯
4.  提供圖片下載以及PNG、JPG格式上傳至伺服器
5.  可以透過縮圖製作功能針對已上傳之圖片進行縮圖之動作，僅需要輸入該圖片之檔名以及縮圖之寬度

## Tools
使用Node.js + Express製作後端，前端則使用Angular做為框架，為了快速建構網站基本UI，故採用BootStrap進行基本UI設計

## Start
將專案clone下來之後執行`npm install`
由於已經設定好proxy功能，故僅需要輸入`npm start`即可完整啟動應用