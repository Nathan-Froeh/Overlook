


class BookingsRepo {
  constructor(bookings) {
    this.bookings = bookings;
  }

  totalRoomCost(date, roomsRepo) {
    let roomNums = this.searchByDate(date).map(booking => booking.roomNumber);
    return roomsRepo.rooms.reduce((acc, room) => {
      roomNums.forEach(num => {
        num === room.number ? acc += room.costPerNight : null;
      })
      return acc;
    }, 0)
  }

  searchByDate(date) {
    return this.bookings.filter(booking => booking.date === date)
  }

  popularDay() {
    let dates = this.bookings.map(booking => booking.date)
    let count = dates.reduce((acc, date) => {
      !acc[date] ? acc[date] = 1 : acc[date] += 1;
      return acc;
    }, {})
    return Object.keys(count).sort((a, b) => count[b] - count[a])[0]
  }
}

export default BookingsRepo;



// popularDay() finds the most booked date
// leastPopularDay() finds day with lest bookings
// roomsAvailable( date ) finds currently open rooms
// availableByType( today, type ) finds a room open today by type or all available rooms
