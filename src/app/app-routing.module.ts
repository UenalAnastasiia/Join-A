import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivComponent } from './archiv/archiv.component';
import { BoardComponent } from './board/board.component';
import { ContactComponent } from './contact/contact.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent },
  { path: 'board', component: BoardComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'archiv', component: ArchivComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
