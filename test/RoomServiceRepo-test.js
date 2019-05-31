import $ from 'jquery';
import chai from 'chai';
const expect = chai.expect;
import RoomServiceRepo from '../src/RoomServiceRepo.js'
import service from '../test/DUMMY.js';

describe('RoomServiceRepo', () => {
  let roomServiceRepo;
  
  beforeEach(() => {
    roomServiceRepo = new RoomServiceRepo(service.roomService);
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
})