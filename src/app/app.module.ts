import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { enableProdMode } from "@angular/core";

// Modules
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

// Services
import { AuthService } from "./services/auth/auth.service";
import { UserService } from "./services/user/user.service";
import { MaterialService } from "./services/materials/material.service";

// Pipes
import { FilterPipe } from "./pipes/filter.pipe";
import { PhonePipe } from "./pipes/phone.pipe";

// Components
import { AppComponent } from "./components/index/app.component";
import { MaterialListComponent } from "./components/material/list/material-list.component";
import { MaterialDetailsComponent } from "./components/material/details/material-details.component";
import { AddComponent } from "./components/material/add/add.component";
import { LoginComponent } from "./components/login/login.component";
import {
  HomeComponent,
  homeChildRoutes
} from "./components/home/home.component";
import { HighlightMaterialDirective } from "./directives/highlight-material.directive";
import { AppRoutingModule } from "./app-routing.module";
import { ConcateMaterialName } from './pipes/concatMaterialName.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MaterialListComponent,
    MaterialDetailsComponent,
    AddComponent,
    LoginComponent,
    HomeComponent,
    FilterPipe,
    PhonePipe,
    ConcateMaterialName,
    HighlightMaterialDirective
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    })
  ],
  providers: [AuthService, UserService, MaterialService],
  bootstrap: [AppComponent]
})

// enableProdMode();
export class AppModule {}
