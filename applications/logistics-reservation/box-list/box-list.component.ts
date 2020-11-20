import { Component, OnInit } from "@angular/core";
import { BoxBookingService } from "../../../shared/services";
import { Department, Floor, Box, Booking } from "@app/shared";
import { Router } from "@angular/router";

@Component({
  selector: "app-box-list",
  templateUrl: "./box-list.component.html",
  styleUrls: ["./box-list.component.css"]
})
export class BoxListComponent implements OnInit {
  constructor(
    private boxBookingService: BoxBookingService,
    private router: Router
  ) {}
  departments: Department[];
  currentDepartment: Department;
  currentBoxes: Box[];
  currentFloors: Floor[];

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

  ngOnInit() {
    this.boxBookingService.fetchDepartments().subscribe(departments => {
      this.departments = departments;
      this.currentFloors = departments[0].floors;
    });
  }

  loadFloors(btnDept) {
    const id = btnDept.id;
    this.currentDepartment = this.departments.filter(dept => {
      if (dept.name === id) {
        return dept;
      }
    })[0];
    // Update department in service
    this.boxBookingService.currentDepartment = this.currentDepartment;
    this.currentFloors = this.currentDepartment.floors;
    console.log("Current Floors", this.currentFloors);
    console.log(this.currentDepartment);
  }

  loadBoxes(btnFloor) {
    const floorId = btnFloor.id;
    this.boxBookingService.fetchBookedBoxes(floorId).subscribe(res => {
      this.currentBoxes = res;
      console.log(this.currentBoxes);
    });
  }

  timeToMinutes(time) {
    const timePeriod = time.split(" ")[1];
    const timeOffset = timePeriod === "AM" ? 0 : 720;
    const hours = parseInt(time.split(" ")[0].split(":")[0], 10);
    const minutes = parseInt(time.split(":")[1].substr(0, 2), 10);
    return hours * 60 + minutes + timeOffset;
  }

  hasBooking(cell, time, boxName) {
    const timeInMin = this.timeToMinutes(time);
    const box = this.currentBoxes.find((box: Box) => box.name === boxName);
    if (box) {
      box.bookings.forEach((booking: Booking) => {
        if (timeInMin >= booking.startTime && timeInMin <= booking.endTime) {
          cell.style.backgroundColor = "#fa4251";
        }
      });
    }
    return true;
  }
  bookBox(boxId) {
    this.router.navigate(["/apps/logistics/book-box", boxId]);
  }
}
