// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

/*---------- IMPORTS -----------*/

import $ from 'jquery';

import './css/base.scss';
import RoomServiceRepo from '../src/RoomServiceRepo.js'
import RoomService from '../src/RoomService.js'
import UserRepo from '../src/UserRepo.js'
import BookingsRepo from '../src/BookingsRepo.js';
import RoomsRepo from '../src/RoomsRepo.js'
import DomUpdates from './DomUpdates';

import './images/home-icon-silhouette.svg'
import './images/double-king-size-bed.svg'
import './images/man-user.svg'
import './images/covered-food-tray-on-a-hand-of-hotel-room-service.svg'
import './images/lighthouse.svg'
// import Chart from 'chart.js';
/*---------- VARIABLES -----------*/

// let userData;
let roomServiceRepo, userRepo, bookingsRepo, roomsRepo, roomService;
let roomInfo;
let today = new Date().toLocaleDateString('en-GB')

/*---------- EVENT LISTENERS -----------*/
$(document).ready(() => {
  fetchUsers()
  fetchRooms()
  fetchBookings()
  fetchRoomService()
  setTimeout(getGeneral, 600)
})


$('.user__search__input').keypress(() => {
  
})

$('.user__search__btn').click(() => {
  event.preventDefault()
  $('.user__search__input').val() !== '' ? isCurrentUser() : null;
})

$('.tabs li').click(tabClick);
$('.submit__rooms__date').click(roomsByDate);
$('.order__submit').click(orderFood);
$('.select__room__type').click(displayRoomType);
$('.remove__booking').click(removeBooking);
$('.change__room').click(changeRoom);
$(document).on('click', '.book__room', bookRoom);
$(document).on('click', '.date', showOrders)


/*---------- FUNCTIONS -----------*/

function fetchUsers() {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
    .then(response => response.json())
    .then(data => {
      userRepo = new UserRepo(data.users);
      console.log('users ', userRepo.users)
    });
}

function fetchRooms() {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
    .then(response => response.json())
    .then(data => {
      roomsRepo = new RoomsRepo(data.rooms);
      console.log('rooms ', roomsRepo.rooms)
    });
}
function fetchBookings() {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
    .then(response => response.json())
    .then(data => {
      bookingsRepo = new BookingsRepo(data.bookings);
      console.log('bookings ', bookingsRepo.bookings)
    });
}
function fetchRoomService() {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
    .then(response => response.json())
    .then(data => {
      roomServiceRepo = new RoomServiceRepo(data.roomServices);
      console.log('room service ', roomServiceRepo.roomService)
    });
}

function tabClick() {
  var tab_id = $(this).attr('data-tab');
  DomUpdates.tabClick(tab_id, this)
}
  
function getGeneral() {
  DomUpdates.generalMain(roomServiceRepo, bookingsRepo, roomsRepo)
  let count = Object.values(bookingsRepo.objectRoomTypes(today, roomsRepo))
    .map(x => x.length);
  DomUpdates.mainChart(bookingsRepo, count)
}

function isCurrentUser() {
  let isUser = userRepo.users.find(user => {
    return user.name === $('.user__search__input').val()
  })
  if (typeof isUser === 'undefined') {
    makeNewUser()
    getUser()
  } else {
    getUser()
  }
}

function newUserInfo() {
  roomService = roomServiceRepo.makeRoomService(userRepo.currentUser.id)
  DomUpdates.loadUserInfo(userRepo, roomService)
  checkOrders()
}

function makeNewUser() {
  let newUser = {
    id: userRepo.users.length + 1,
    name: $('.user__search__input').val()
  };
  userRepo.users.push(newUser)
  DomUpdates.loadNewUser()
}

function getUser() {
  DomUpdates.showUserInfo()
  userRepo.getCurrentUser($('.user__search__input').val())
  newUserInfo()
}

function roomsByDate() {
  event.preventDefault()
  console.log($('.rooms__date__select').val().split('-').reverse().join('/'))
  let date = $('.rooms__date__select').val().split('-').reverse().join('/');
  DomUpdates.roomsByDate(bookingsRepo, date);
}

function orderFood() {
  event.preventDefault()
  let order = readGuestsMind()
  roomServiceRepo.roomService.push(instaCook(order))
  newUserInfo()
  refresh()
}

function readGuestsMind() {
  let index = Math.floor(Math.random() * (99 - 1 + 1)) + 1; 
  let food = roomServiceRepo.roomService[index]
  return {food: food.food, cost: food.totalCost}
}

function instaCook(order) {
  return {
    "userID": userRepo.currentUser.id,
    "date": today,
    "food": order.food,
    "totalCost": order.cost
  }
}

function displayRoomType(e) {
  let type = e.target.innerText.toLowerCase()
  roomInfo = bookingsRepo.availableByType(today, type, roomsRepo)[0]
  let info = [...Object.values(roomInfo)]
  info[2] === true ? info[2] = 'Yes' : info[2] = 'No';
  DomUpdates.displayRoomByType(info)
}

function bookRoom() {
  let newBooking = {userID: userRepo.currentUser.id,
    date: today,
    roomNumber: roomInfo.number}
  bookingsRepo.bookings.push(newBooking)
  DomUpdates.roomBooked()
  refresh()
  console.log(bookingsRepo.numRoomsAvailable(today))
}

function refresh() {
  getGeneral();
  DomUpdates.loadUserInfo(userRepo, roomService);
  checkOrders()
}

function removeBooking() {
  event.preventDefault()
  let booking = bookingsRepo.bookings.findIndex(booking => {
    return booking.userID === userRepo.currentUser.id
  })
  bookingsRepo.bookings.splice(booking, 1)
  DomUpdates.loadNewUser()
}

function changeRoom() {
  event.preventDefault()
  DomUpdates.loadNewUser()
  DomUpdates.generalMain(roomServiceRepo, bookingsRepo, roomsRepo)
}

function checkOrders() {
  DomUpdates.clearOrders()
  if (roomService.allOrders.length === 0) {
    DomUpdates.noOrders()
  } else {
    Object.keys(roomService.sortOrdersByDate()).forEach(date => {
      let theDate = date.split('/').join('-');
      let orders = roomService.sortOrdersByDate()[date]
      DomUpdates.loadAllOrders(theDate, orders)
    })
  }
}

function showOrders(e) {
  console.log(e.target.id)
  let id = `#${e.target.id}`
  $(id).children().toggle('hidden')
}