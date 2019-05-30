
var moment = require('moment');

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

  mostPopularDay() {
    return Object.keys(this.bookingByDate()).sort((a, b) => {
      return this.bookingByDate()[b] - this.bookingByDate()[a]
})[0]
  }

  bookingByDate() {
    let dates = this.bookings.map(booking => booking.date)
    return dates.reduce((acc, date) => {
      !acc[date] ? acc[date] = 1 : acc[date] += 1;
      return acc;
    }, {})
  }

  leastPopularDays() {
    let day = Object.keys(this.bookingByDate()).sort((a, b) => {
      return this.bookingByDate()[a] - this.bookingByDate()[b]
    })[0]
    return Object.keys(this.bookingByDate()).filter(x => {
      return this.bookingByDate()[x] === this.bookingByDate()[day]
    })
  }

  leastPopularDay(today) {
    let day = today.split('/').reverse().join('')
    let days = this.leastPopularDays().map(x => x.split('/').reverse().join(''))
    days.sort((a, b) => a - b)
    let firstDay = days.find(x => x >= day).split('')
    return firstDay[6] + firstDay[7] + '/' + firstDay[4] + firstDay[5] + '/'
      + firstDay[0] + firstDay[1] + firstDay[2] + firstDay[3]
  }
}

export default BookingsRepo;




// leastPopularDay() finds day with least bookings
// roomsAvailable( date ) finds currently open rooms
// availableByType( today, type ) finds a room open today by type or all available rooms
