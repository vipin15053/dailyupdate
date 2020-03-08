/**
 * Created By : Vipin Yadav
 */

import { Component, OnInit } from "@angular/core";
import { RouterModule, Routes, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

// Components
import { MaterialListComponent } from "../material/list/material-list.component";
import { MaterialDetailsComponent } from "../material/details/material-details.component";
import { AddComponent } from "../material/add/add.component";

// Services
import { routerTransition } from "../../services/config/config.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [routerTransition()],
  host: { "[@routerTransition]": "" }
})
export class HomeComponent implements OnInit {
  active: string;
  username:string=JSON.parse(localStorage.getItem("userData")).name;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService
  ) {
    // Detect route changes for active sidebar menu
    this.router.events.subscribe(val => {
      this.routeChanged(val);
    });
  }

  ngOnInit() {}

  // Detect route changes for active sidebar menu
  routeChanged(val) {
    this.active = val.url;
  }

  // Logout User
  logOut() {
    this._userService.logout().subscribe(res => {
      this.toastr.success("Logged Out Successfully");
      localStorage.removeItem("userData");
      this.router.navigate(["/login"]);
    });
  }
}

// Define and export child routes of HomeComponent
export const homeChildRoutes: Routes = [
  {
    path: "",
    component: MaterialListComponent
  },
  {
    path: "add",
    component: AddComponent
  },
  {
    path: "update/:id",
    component: AddComponent
  },
  {
    path: "detail/:id",
    component: MaterialDetailsComponent
  }
];

/**
 * Created By : Vipin Yadav
 */
