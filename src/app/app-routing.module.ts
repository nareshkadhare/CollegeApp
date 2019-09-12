import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'subject-form', loadChildren: './subject-form/subject-form.module#SubjectFormPageModule' },
  { path: 'lectureform', loadChildren: './tab3/lectureform/lectureform.module#LectureformPageModule' },   { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
