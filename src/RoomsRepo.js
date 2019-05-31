
class RoomsRepo {
  constructor(rooms) {
    this.rooms = rooms;
  }
  totalRoomsAvailable(bookingRepo, today) {
    return bookingRepo.numRoomsAvailable(today)
  }

  percentRoomsAvailable(bookingsRepo, today) {
    return Number((((bookingsRepo.numRoomsAvailable(today) 
      / -this.rooms.length) + 1 ) * 100).toFixed())
  }


}


// totalRoomsAvailable() rooms open today
// percentRoomsAvailable() % rooms full today

export default RoomsRepo;