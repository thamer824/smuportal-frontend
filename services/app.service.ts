import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject, Subject, of } from "rxjs";
import { Application } from "../models/apps.model";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AppService {
  private appsConfig: any;
  private apps: Application[];
  private filteredApps$: Subject<Application[]>;

  constructor(private httpClient: HttpClient) {
    this.filteredApps$ = new ReplaySubject<Application[]>(1);
  }

  async loadAppsConfig() {
    const data = await this.httpClient
      .get("/assets/apps/config.json")
      .toPromise();
    this.appsConfig = data;
  }

  getSearchResults(): Observable<Application[]> {
    return this.filteredApps$.asObservable();
  }

  search(searchTerm: string): Observable<void> {
    return this.fetchApps().pipe(
      tap((apps: Application[]) => {
        apps = apps.filter(app => {
          if (app.name.toLowerCase().includes(searchTerm)) {
            return app;
          } else if (this.searchFeatures(searchTerm, app)) {
            return app;
          }
        });
        this.filteredApps$.next(apps);
      }),
      map(() => void 0)
    );
  }

  private searchFeatures(searchTerm: string, app: Application): boolean {
    return app.features.some(feature => {
      return feature.name.toLowerCase().includes(searchTerm);
    });
  }

  private findInConfig(appName: string) {
    return this.appsConfig.find(
      app => app.appName.toLowerCase() === appName.toLowerCase()
    );
  }

  private loadAppIcons() {
    this.apps.forEach((app: Application) => {
      const appConfig = this.findInConfig(app.name);
      if (appConfig) {
        app.iconUrl = appConfig.iconUrl;
        app.path = appConfig.path;
      }
    });
  }

  private fetchApps(): Observable<Application[]> {
    if (this.apps) {
      return of(this.apps);
    }

    return this.httpClient.get("http://localhost:3000/api/user/apps").pipe(
      tap((apps: Application[]) => {
        this.apps = apps;
        this.loadAppIcons();
      })
    );
  }
}
