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
  let isUser = userRepo.users.find(user => {
    return user.name === $('.user__search__input').val()
  })
  console.log('you bet ya ', isUser)
  console.log('user count ', userRepo.users.length)
  if (typeof isUser === 'undefined') {
    makeNewUser()
    userRepo.getCurrentUser($('.user__search__input').val())
    newUserInfo()
  } else {
    userRepo.getCurrentUser($('.user__search__input').val())
    newUserInfo()
  }
})
  
$('.tabs li').click(tabClick)
$('.submit__rooms__date').click(roomsByDate)
$('.order__submit').click(orderFood)
$('.select__room__type').click(displayRoomType)
$(document).on('click', '.book__room', bookRoom)


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
  DomUpdates.generalMain(roomServiceRepo, userRepo, bookingsRepo, roomsRepo)

}

function newUserInfo() {
  roomService = roomServiceRepo.makeRoomService(userRepo.currentUser.id)
  DomUpdates.loadUserInfo(roomServiceRepo, userRepo, bookingsRepo, roomsRepo, 
    roomService)
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
  DomUpdates.generalMain(roomServiceRepo, userRepo, bookingsRepo, roomsRepo)
  DomUpdates.loadUserInfo(roomServiceRepo, userRepo, bookingsRepo, roomsRepo, roomService)

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
  DomUpdates.generalMain(roomServiceRepo, userRepo, bookingsRepo, roomsRepo)
  DomUpdates.loadUserInfo(roomServiceRepo, userRepo, bookingsRepo, roomsRepo, roomService)
  console.log(bookingsRepo.numRoomsAvailable(today))
}

function makeNewUser() {
  let newUser = {
    id: userRepo.users.length + 1,
    name: $('.user__search__input').val()
  };
  userRepo.users.push(newUser)
}