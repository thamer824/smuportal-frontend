import { Component, AfterViewInit } from "@angular/core";
import { BoxBookingService, Booking } from "@app/shared";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-box-booking",
  templateUrl: "./box-booking.component.html",
  styleUrls: ["./box-booking.component.css"]
})
export class BoxBookingComponent implements AfterViewInit {
  constructor(
    private boxBookingService: BoxBookingService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  timeslots = [
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 AM",
    "12:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM"
  ];
  bookings: Booking[];
  boxId: string;
  boxInfo: string;
  bookingsLoaded = false;
  reservationForm: FormGroup;
  loading = false;
  submitted = false;
  successMessage: string;
  errorMessage: string;
  reset = false;
  ngAfterViewInit() {
    this.boxId = this.route.snapshot.params["id"];
    if (Object.keys(this.boxBookingService.currentDate).length !== 0) {
      this.boxBookingService.getBoxBookings(this.boxId).subscribe({
        next: res => {
          this.bookings = res;
          this.bookingsLoaded = true;
        },
        error: error => {
          console.log(error);
        }
      });
    }
    this.boxBookingService.getBoxInfo(this.boxId).subscribe({
      next: res => {
        this.boxInfo = res.floorId.name + res.name;
      },
      error: error => {
        console.log(error);
      }
    });
    this.reservationForm = this.fb.group(
      {
        startTime: ["", [Validators.required]],
        endTime: ["", [Validators.required]]
      },
      { validators: this.checkReservationTime.bind(this) }
    );
  }

  hasBooking(time, cell) {
    const timeInMin = this.timeToMinutes(time);
    if (this.bookings) {
      this.bookings.forEach(booking => {
        if (timeInMin >= booking.startTime && timeInMin <= booking.endTime) {
          cell.style.backgroundColor = "#fa4251";
        }
      });
    }
    return true;
  }

  timeToMinutes(time) {
    if (time) {
      time = time.toString();
      const timePeriod = time.split(" ")[1];
      const timeOffset = timePeriod === "AM" ? 0 : 720;
      const hours = parseInt(time.split(" ")[0].split(":")[0], 10);
      const minutes = parseInt(time.split(":")[1].substr(0, 2), 10);
      return hours * 60 + minutes + timeOffset;
    }
  }

  onSubmit() {
    if (!this.reset) {
      this.submitted = true;
      if (this.reservationForm.invalid) {
        return;
      }
      this.loading = true;
      console.log(this.reservationForm.value);
      this.boxBookingService
        .bookBox(this.boxId, this.reservationForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            data.success
              ? (this.successMessage = data.message)
              : (this.errorMessage = data.message);
          },
          error: error => {
            this.errorMessage = error.error.message;
          }
        });
    } else {
      this.reservationForm.reset();
    }
  }

  checkReservationTime(c: AbstractControl) {
    if (
      !this.timeToMinutes(c.get("startTime").value) ||
      !this.timeToMinutes(c.get("endTime").value)
    ) {
      return null;
    }
    if (
      this.timeToMinutes(c.get("startTime").value) >=
      this.timeToMinutes(c.get("endTime").value)
    ) {
      return { invalidEndDate: true };
    }
    return null;
  }

  get f() {
    return this.reservationForm.controls;
  }

  get startTime() {
    return this.reservationForm.get("startTime");
  }

  get endTime() {
    return this.reservationForm.get("endTime");
  }

  changeStartTime(event) {
    this.startTime.setValue(event.target.value, {
      onlySelf: true
    });
  }

  changeEndTime(event) {
    console.log(event.target.value);
    this.endTime.setValue(event.target.value, {
      onlySelf: true
    });
  }

  book() {
    this.reset = false;
  }
  resetForm() {
    this.reset = true;
  }
}
