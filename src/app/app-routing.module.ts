import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivComponent } from './archiv/archiv.component';
import { BoardComponent } from './board/board.component';
import { ContactComponent } from './contact-section/contact/contact.component';
import { SummaryComponent } from './summary/summary.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './authentication-section/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent },
  { path: 'board', component: BoardComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'archiv', component: ArchivComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
