import $ from 'jquery';
import './css/base.scss';

let today = new Date().toLocaleDateString('en-GB')
console.log(today)
// today = '01/01/2020'
let DomUpdates = {

  tabClick(id, it) {
    $('.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(it).addClass('current');
    $("#" + id).addClass('current');
  },

  generalMain(roomServiceRepo, bookingsRepo, roomsRepo) {
    $('.rooms__available').text(bookingsRepo.numRoomsAvailable(today))
    $('.todays__income').text(roomServiceRepo.totalOrderCost(today) 
      + bookingsRepo.totalRoomCost(today, roomsRepo))
    $('.rooms__full').text(roomsRepo.percentRoomsAvailable(bookingsRepo, today))
    $('.total__orders').text(roomServiceRepo.totalOrderCost(today))
    $('.popular__book').text(bookingsRepo.mostPopularDay())
    $('.least__popular').text(bookingsRepo.leastPopularDay(today))
    $('.open_rooms_by_date').text()
  },

  loadUserInfo(userRepo, roomService) {
    $('.guest__name').text(userRepo.currentUser.name)
    $('.guest__id').text(userRepo.currentUser.id)
    if (roomService.allOrders.length === 0) {
      $('.all__personal__orders').text('Guest has no order history')
    } else {
      this.loadAllOrders(roomService)
    }
    $('.personal__spent__by__day').text(roomService.todaysTotal(today))
    $('.personal__grand__total_spent').text(roomService.totalOrders())
  },

  loadAllOrders(roomService) {
    $('.all__personal__orders').empty()
    roomService.allOrders.forEach(order => {
      $('.all__personal__orders').append(`
        <p>Date: ${order.date}</p>
        <p>Sandwich: ${order.food}</p>
        <p>Price: ${order.totalCost}</p>
      `)
    })

  },

  roomsByDate(bookingsRepo, date) {
    $('.open_rooms_by_date').text(bookingsRepo.numRoomsAvailable(date))
  },

  displayRoomByType(info) {
    $('.room__option').remove()
    $('.room__not__booked').append(`
      <section class = 'room__option'>
        <p>Room type: <span>${info[1]}</span></p>
        <p>Bed count: <span>${info[4]}</span></p>
        <p>Bed size: <span>${info[3]}</span></p>
        <p>Bidet: <span>${info[2]}</span></p>
        <p>Price: $<span>${info[5]}</span></p>
        <p>Room Number: <span>${info[0]}</span></p>
        <button class = 'book__room'>Book Room</button>
      </section>
    `)
  },

  showUserInfo() {
    $('.personal').removeClass('hidden')
  },

  hideUserInfo() {
    $('.personal').addClass('hidden')
  },

  roomBooked() {
    $('.room__not__booked').addClass('hidden');
    $('.room__booked').removeClass('hidden')
  }

}

export default DomUpdates;