export interface Department {
  _id: number;
  name: string;
  capacity: number;
  floors: [Floor];
}

export interface Floor {
  _id: number;
  name: string;
  capacity: number;
  boxes: [Box];
}

export interface Box {
  _id: number;
  name: string;
  bookings: [Booking];
}

export interface Booking {
  _id: string;
  boxId: string;
  startTime: number;
  endTime: number;
  day: string;
}
