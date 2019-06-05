import $ from 'jquery';
import './css/base.scss';
import Chart from 'chart.js';

let today = new Date().toLocaleDateString('en-GB')

let DomUpdates = {

  tabClick(id, it) {
    $('.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(it).addClass('current');
    $("#" + id).addClass('current');
  },

  generalMain(roomServiceRepo, bookingsRepo, roomsRepo) {
    $('.rooms__available').text(bookingsRepo.numRoomsAvailable(today))
    $('.todays__income').text(Number((roomServiceRepo.totalOrderCost(today) 
      + bookingsRepo.totalRoomCost(today, roomsRepo)).toFixed(2)))
    $('.rooms__full').text(roomsRepo.percentRoomsAvailable(bookingsRepo, today))
    $('.total__orders').text(roomServiceRepo.totalOrderCost(today))
    $('.popular__book').text(bookingsRepo.mostPopularDay())
    $('.least__popular').text(bookingsRepo.leastPopularDay(today))
    $('.open_rooms_by_date').text()
    this.mainChart(bookingsRepo, roomsRepo)
  },

  loadUserInfo(userRepo, roomService) {
    $('.guest__name').text(userRepo.currentUser.name)
    $('.guest__id').text(userRepo.currentUser.id)
    $('.personal__spent__by__day').text(roomService.todaysTotal(today))
    $('.personal__grand__total_spent').text(roomService.totalOrders())
  },

  clearOrders() {
    $('.all__personal__orders').empty()
  },

  noOrders() {
    $('.all__personal__orders').text('Guest has no order history')
  },

  loadAllOrders(date, orders) {
    $('.all__personal__orders').append(`
    <section class = '${date} order__by__date'>
      <button class = 'date' id = 'date${date}'>${date}</button>
    </section>
    `)
    orders.forEach(order => {
      $(`.${date}`).append(`
        <p class = 'hidden'>${order}</p>
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
    $('.room__booked').removeClass('hidden');
  },

  loadNewUser() {
    $('.room__not__booked').removeClass('hidden');
    $('.room__booked').addClass('hidden');
  },

  mainChart(bookingsRepo, count) {
    $('#myChart').empty()
    var myChart = new Chart($('#myChart'), {
      type: 'doughnut',
      data: {
        labels: ['Total Filled Rooms', 'Open Suite', 'Open Residential Suite'
          , 'Open Single Room', 'Open Junior Suite'],
        datasets: [{
          label: '# of Rooms',
          data: [bookingsRepo.bookingByDate()[today]
            , count[0], count[1], count[2], count[3]],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
          ],
          borderColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
          ],
          borderWidth: 1
        }]
      }
    });
  }

}

export default DomUpdates;