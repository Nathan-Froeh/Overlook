
class RoomsRepo {
  constructor(rooms) {
    this.rooms = rooms;
    this.residential;
    this.single;
    this.junior;
  }
  
  totalRoomsAvailable(bookingRepo, today) {
    return bookingRepo.numRoomsAvailable(today)
  }

  percentRoomsAvailable(bookingsRepo, today) {
    return Number((((bookingsRepo.numRoomsAvailable(today) 
      / -this.rooms.length) + 1 ) * 100).toFixed())
  }
}

export default RoomsRepo;