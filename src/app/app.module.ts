import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent, StudentDetailsDialog} from './student/student.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule, MatCardModule} from '@angular/material';
import { MatDialogModule,MatGridListModule, MatSortModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddComponent } from './add/add.component';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from "@angular/material/button";
import { DeleteComponent } from './delete/delete.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HeaderComponent,
    StudentDetailsDialog,
    AddComponent,
    DashboardComponent,
    DeleteComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,  
    FlexLayoutModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule ,MatInputModule, MatDialogModule,MatCardModule,MatIconModule,MatSortModule,
    MatPaginatorModule,ChartsModule,MatSnackBarModule,MatButtonModule,MatSelectModule
  ],
  entryComponents: [StudentDetailsDialog,DeleteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
