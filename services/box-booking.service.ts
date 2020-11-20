import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Department, Box, Booking } from "../models";
import { HttpClient, HttpParams } from "@angular/common/http";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

@Injectable({ providedIn: "root" })
export class BoxBookingService {
  private currentDate$: BehaviorSubject<NgbDate>;
  private departments: Department[];
  private currentDepartment$: BehaviorSubject<Department>;
  private boxes: Box[];

  constructor(private httpClient: HttpClient) {
    this.currentDate$ = new BehaviorSubject<NgbDate>({} as NgbDate);
    this.currentDepartment$ = new BehaviorSubject<Department>({} as Department);
  }

  public set currentDate(date: NgbDate) {
    this.currentDate$.next(date);
  }

  public get currentDate() {
    return this.currentDate$.value;
  }

  public get formattedDate() {
    const month = this.currentDate.month.toString().padStart(2, "0");
    const day = this.currentDate.day.toString().padStart(2, "0");
    const year = this.currentDate.year;
    return `${month}-${day}-${year}`;
  }

  getCurrentDepartment(): Observable<Department> {
    return this.currentDepartment$.asObservable();
  }

  set currentDepartment(department: Department) {
    this.currentDepartment$.next(department);
  }

  get currentDepartmentId() {
    return this.currentDepartment$.value._id;
  }

  fetchDepartments(): Observable<Department[]> {
    if (this.departments) {
      return of(this.departments);
    }
    return this.httpClient.get("http://localhost:3000/api/user/depts").pipe(
      tap((departments: Department[]) => {
        this.departments = departments;
        // Set current department to the first one
        this.currentDepartment$.next(departments[0]);
      })
    );
  }

  fetchBookedBoxes(floorId: string): Observable<Box[]> {
    // Setup log namespace query parameter
    const params = new HttpParams().set("date", this.formattedDate);
    return this.httpClient
      .get(
        `http://localhost:3000/api/user/depts/${this.currentDepartmentId}/floors/${floorId}/booking`,
        { params }
      )
      .pipe(
        tap((boxes: Box[]) => {
          this.boxes = boxes;
          console.log("BOXES from API", this.boxes);
        })
      );
  }

  getBoxBookings(boxId: string): Observable<Booking[]> {
    const params = new HttpParams().set("date", this.formattedDate);
    return this.httpClient.get<Booking[]>(
      `http://localhost:3000/api/user/box/${boxId}/booking`,
      { params }
    );
  }

  bookBox(boxId: string, reservation: any) {
    const params = new HttpParams().set("date", this.formattedDate);
    return this.httpClient.post(
      `http://localhost:3000/api/user/book/${boxId}`,
      reservation,
      { params }
    );
  }

  getBoxInfo(boxId: string) {
    return this.httpClient.get<any>(
      `http://localhost:3000/api/user/box/${boxId}/info`
    );
  }
}
