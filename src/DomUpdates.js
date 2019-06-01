import $ from 'jquery';
import './css/base.scss';
import RoomServiceRepo from '../src/RoomServiceRepo.js';
import RoomService from '../src/RoomService.js';
import UserRepo from '../src/UserRepo.js';
import BookingsRepo from '../src/BookingsRepo.js';
import RoomsRepo from '../src/RoomsRepo.js';

let today = new Date().toLocaleDateString('en-GB')
console.log(today)
// today = '01/01/2020'
let roomServiceRepo, userRepo, bookingsRepo, roomsRepo, roomService;
let DomUpdates = {

  tabClick(id, it) {
    $('.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(it).addClass('current');
    $("#" + id).addClass('current');
  },

  generalMain(roomServiceRepo, userRepo, bookingsRepo, roomsRepo) {
    $('.rooms__available').text(bookingsRepo.numRoomsAvailable(today))
    $('.todays__income').text(roomServiceRepo.totalOrderCost(today) 
      + bookingsRepo.totalRoomCost(today, roomsRepo))
    $('.rooms__full').text(roomsRepo.percentRoomsAvailable(bookingsRepo, today))
    $('.total__orders').text(roomServiceRepo.totalOrderCost(today))
    $('.popular__book').text(bookingsRepo.mostPopularDay())
    $('.least__popular').text(bookingsRepo.leastPopularDay(today))
    $('.open_rooms_by_date').text()
  },

  loadUserInfo(roomServiceRepo, userRepo, bookingsRepo, roomsRepo, roomService) {
    $('.guest__name').text(userRepo.currentUser.name)
    $('.guest__id').text(userRepo.currentUser.id)
    if (roomService.allOrders.length === 0) {
      $('.all__personal__orders').text('Customer has no order history')
    } else {
      $('.all__personal__orders').text(roomService.allOrders)
    }
    $('.personal__spent__by__day').text(roomService.todaysTotal(today))
    $('.personal__grand__total_spent').text(roomService.totalOrders())
    console.log(roomService.allOrders)
  },

  roomsByDate(bookingsRepo, date) {
    $('.open_rooms_by_date').text(bookingsRepo.numRoomsAvailable(date))
  }

  

}

export default DomUpdates;