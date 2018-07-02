import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from './shared/module/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminMainComponent } from './admin/main/main.component';
import { AdminTeacherComponent, AdmitTeacherDialog, UpdateTeacherDialog } from './admin/teacher/teacher.component';
import { AdminStudentComponent } from './admin/student/student.component';
import { StudentRecordComponent } from './admin/student/record/record.component';
import { AdminClassComponent, CreateClassDialog } from './admin/class/class.component';
import { ClassService } from './shared/service/class.service';
import { ClassDetailComponent, AdmitStudentDialog, UpdateStudentDialog } from './admin/student/class-detail/class-detail.component';
import { MatDialogModule, MatNativeDateModule } from '@angular/material';
import { AdminCourseComponent, CreateCourseDialog, UpdateSubjectDialog } from './admin/course/course.component';
import { AdminTimeTableComponent } from './admin/time-table/time-table.component';
import { AdminTimeTableDetailComponent } from './admin/time-table/time-table-detail/time-table-detail.component';
import { AdminExaminationComponent } from './admin/examination/examination.component';
import { AdminExaminationDetailComponent, CreateExaminationDialog } from './admin/examination/examination-detail/examination-detail.component';
import { ClassSelectComponent } from './shared/component/class-select/class-select.component';
import { AdminSidenavComponent } from './admin/sidenav/sidenav.component';
import { SubjectService } from './shared/service/subject.service';
import { AdminUpdateClassComponent } from './admin/update-class/update-class.component';
import { TeacherDashboardComponent } from './teacher/dashboard/dashboard.component';
import { TeacherMainComponent } from './teacher/main/main.component';
import { TeacherSidenavComponent } from './teacher/sidenav/sidenav.component';
import { AdminSettingsComponent } from './admin/settings/settings.component';
import { ConfigService } from './shared/service/config.service';
import { UserService } from './shared/service/user.service';
import { AdminBroadcastComponent } from './admin/broadcast/broadcast.component';
import { TeacherClassListComponent } from './teacher/class-list/class-list.component';
import { ResultPreviewComponent } from './shared/component/result-preview/result-preview.component';
import { TeacherFillMarksSelectComponent } from './teacher/fill-marks-select/fill-marks-select.component';
import { TeacherFillMarksSubjectComponent, NewMarkEntryDialog } from './teacher/fill-marks-subject/fill-marks-subject.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { MarksheetService } from './shared/service/marksheet.service';
import { MarksheetComponent } from './shared/component/marksheet/marksheet.component';
import { AdminResultsComponent } from './admin/results/results.component';
import { AdminIdCardComponent } from './admin/id-card/id-card.component';
import { BroadcastService } from './shared/service/broadcast.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminMainComponent, 
    children: [
      {path: '', component: AdminDashboardComponent},
      {path: 'dashboard', redirectTo: ''},
      {path: 'teacher', component: AdminTeacherComponent},
      {path: 'class', component: AdminClassComponent},
      {path: 'class-update/:id', component: AdminUpdateClassComponent},
      {path: 'broadcast', component: AdminBroadcastComponent},
      {path: 'id-card',
      children: [
          {path: '', component: ClassSelectComponent},
          {path: 'detail/:id', component: AdminIdCardComponent}
        ]
      },
      {path: 'results',
      children: [
          {path: '', component: ClassSelectComponent},
          {path: 'detail/:id', component: AdminResultsComponent}
        ]
      },
      {path: 'marksheet',
        children: [
          {path: '', component: ClassSelectComponent},
          {path: 'detail/:id', component: MarksheetComponent}
        ]
      },
      {path: 'student', component: AdminStudentComponent,
        children: [
          {path: '', component: ClassSelectComponent},
          {path: 'detail/:id', component: ClassDetailComponent},
          {path: 'records', component: StudentRecordComponent},
          {path: 'management', component: StudentRecordComponent}
        ]
      },
      { path: 'course', component: AdminCourseComponent },
      { path: 'time-table', component: AdminTimeTableComponent,
        children: [
          {path: '', component: ClassSelectComponent},
          {path: 'detail', component: AdminTimeTableDetailComponent},
        ]
      },
      { path: 'course', component: AdminCourseComponent},
      {path: 'subject-update', component: UpdateSubjectDialog},
      { path: 'examination', component: AdminExaminationComponent,
        children: [
          {path: '', component: ClassSelectComponent},
          {path: 'detail', component: AdminExaminationDetailComponent}
        ]
      },
      { path: 'settings', component: AdminSettingsComponent }
    ]
  },
  {path: 'teacher', component: TeacherMainComponent,
    children: [
      {path: '', component: ClassSelectComponent},
      {path: 'detail/:id', component: TeacherDashboardComponent},
      {path: 'class-list/:id', component: TeacherClassListComponent},
      {path: 'result:/id', component: ResultPreviewComponent},
      {path: 'fill-marks-select/:id', component: TeacherFillMarksSelectComponent},
      {path: 'fill-marks-subject/:id/:subjectId', component: TeacherFillMarksSubjectComponent}
    ]
  },
  { path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    AdminMainComponent,
    AdminSidenavComponent,
    AdminTeacherComponent,
    AdminStudentComponent,
    StudentRecordComponent,
    AdminClassComponent,
    ClassDetailComponent,
    AdminCourseComponent,
    CreateClassDialog,
    AdmitStudentDialog,
    AdmitTeacherDialog,
    CreateCourseDialog,
    AdminTimeTableComponent,
    AdminTimeTableDetailComponent,
    AdminExaminationComponent,
    AdminExaminationDetailComponent,
    CreateExaminationDialog,
    ClassSelectComponent,
    AdminUpdateClassComponent,
    TeacherDashboardComponent,
    TeacherMainComponent,
    TeacherSidenavComponent,
    AdminSettingsComponent,
    AdminBroadcastComponent,
    TeacherClassListComponent,
    ResultPreviewComponent,
    TeacherFillMarksSelectComponent,
    TeacherFillMarksSubjectComponent,
    MarksheetComponent,
    UpdateTeacherDialog,
    UpdateSubjectDialog,
    UpdateStudentDialog,
    NewMarkEntryDialog,
    AdminResultsComponent,
    AdminIdCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  entryComponents: [
    CreateClassDialog,
    AdmitStudentDialog,
    AdmitTeacherDialog,
    CreateCourseDialog,
    CreateExaminationDialog,
    UpdateTeacherDialog,
    UpdateSubjectDialog,
    UpdateStudentDialog,
    NewMarkEntryDialog
  ],
  providers: [
    ClassService,
    SubjectService,
    ConfigService,
    UserService,
    MarksheetService,
    BroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
