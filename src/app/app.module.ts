import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SummaryComponent } from './summary/summary.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BoardComponent } from './board/board.component';
import { ContactComponent } from './contact/contact.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogTaskDetailsComponent } from './dialog-task-details/dialog-task-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ArchivComponent } from './archiv/archiv.component';
import { DialogRequestComponent } from './dialog-request/dialog-request.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogAddContactComponent } from './dialog-add-contact/dialog-add-contact.component';
import { DialogContactDetailsComponent } from './dialog-contact-details/dialog-contact-details.component';
import { DialogEditTaskComponent } from './dialog-edit-task/dialog-edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummaryComponent,
    BoardComponent,
    ContactComponent,
    DialogAddTaskComponent,
    DialogTaskDetailsComponent,
    ArchivComponent,
    DialogRequestComponent,
    DialogAddContactComponent,
    DialogContactDetailsComponent,
    DialogEditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
