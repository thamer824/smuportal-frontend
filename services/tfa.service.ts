import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TfaService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  enableAppTwoFactor(): Observable<any> {
    return this.httpClient
      .get("http://localhost:3000/api/user/generate-secret")
      .pipe(
        map((res: any) => {
          this.updateTfaStatus("app");
          return res;
        })
      );
  }

  generateEmailSecret(): Observable<any> {
    return this.httpClient
      .get("http://localhost:3000/api/user/generate-secret-email")
      .pipe(
        map((res: any) => {
          this.updateTfaStatus("email");
          return res;
        })
      );
  }

  generateTotp(): Observable<any> {
    return this.httpClient.get("http://localhost:3000/api/user/generate-totp");
  }

  verifyTotp(totp: any): Observable<any> {
    return this.httpClient.post(
      "http://localhost:3000/api/user/verify-totp",
      totp
    );
  }

  private updateTfaStatus(tfaType: string) {
    console.log("Setting new 2FA status to", tfaType);
    const user = this.authService.getCurrentUser;
    user.twoFactorType = tfaType;
    this.authService.setUser(user);
  }
}
