/**
 * Created By : Vipin Yadav
 */
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService {
  httpoptions: any;
  constructor(private _http: HttpClient) {}
  // post data for login credential...........
  doLogin(data) {
    return this._http.post(`${environment.apiUrl}/users/login`, data);
  }

  // doRegister(data){
  // 		return this._http.post('user-add.php',data);
  // 	}
  // Function of logout..................
  logout() {
    this.httpoptions = new HttpHeaders().set(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("userData")).token
    );
    return this._http.post(`${environment.apiUrl}/users/me/logoutall`, null, {
      headers: this.httpoptions
    });
  }
}
/**
 * Created By : Vipin Yadav
 */
