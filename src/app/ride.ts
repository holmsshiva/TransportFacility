export class Ride {
	id: number;
	vType: string;
	vNumber: string;
	totalSeat: number;
	availableSeat: number;
	bookings: [{
		EmployeeID: number,
		pickupTime: string;
		pickupLocation: string;
		destination: string;
	}]
}