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

/*---------- EVENT LISTENERS -----------*/
$(document).ready(() => {
  fetchUsers()
  fetchRooms()
  fetchBookings()
  fetchRoomService()
})

$('.tabs li').click(function() {
  var tab_id = $(this).attr('data-tab');
  DomUpdates.tabClick(tab_id, this)
})

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


