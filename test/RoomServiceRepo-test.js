import $ from 'jquery';
import chai from 'chai';
const expect = chai.expect;
import RoomServiceRepo from '../src/RoomServiceRepo.js'
import RoomService from '../src/RoomService.js'
import service from '../test/DUMMY.js';

let orders = [
  {
    "userID": 9,
    "date": "15/07/2019",
    "food": "Tasty Fresh Sandwich",
    "totalCost": 13.07
  }
]

describe('RoomServiceRepo', () => {
  let roomServiceRepo, roomService;
  
  beforeEach(() => {
    roomServiceRepo = new RoomServiceRepo(service.roomService);
    roomService = new RoomService(9, orders);
  })
  it('should be a function', () => {
    expect(RoomServiceRepo).to.be.a('function')
  })

  it('should be a new instance of userRepo', () => {
    expect(roomServiceRepo).to.be.a.instanceOf(RoomServiceRepo)
  })

  it('should return an array', () => {
    expect(roomServiceRepo.roomService).to.be.a('array')
  })

  it('should return total order cost for today', () => {
    expect(roomServiceRepo.totalOrderCost('21/10/2019')).to.equal(41.29)
  })

  it('should instantiate new RoomService', () => {
    expect(roomServiceRepo.makeRoomService(9)).be.a.instanceOf(RoomService)
  })
})