import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './components/uploader/uploader.component';
import { ResizeImageComponent } from './components/resize-image/resize-image.component';

const routes: Routes = [
  { path: '', component: UploaderComponent },
  { path: 'thumbnail', component: ResizeImageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
