
import RoomService from '../src/RoomService.js'

class RoomServiceRepo {
  constructor(roomService) {
    this.roomService = roomService;
  }

  totalOrderCost(today) {
    return Number(this.roomService.reduce((acc, food) => {
      food.date === today ? acc += food.totalCost : null;
      return acc;
    }, 0).toFixed(2))
  }

  makeRoomService(id) {
    let allOrders = this.roomService.filter(order => order.userID === id)
    return new RoomService(id, allOrders);
  }

}

export default RoomServiceRepo;
