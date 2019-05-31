import RoomService from '../src/RoomService.js'

class RoomServiceRepo {
  constructor(roomService) {
    this.roomService = roomService;
  }

  totalOrderCost(today) {
    return this.roomService.reduce((acc, food) => {
      food.date === today ? acc += food.totalCost : null;
      return acc;
    }, 0)
  }

  makeRoomService(id) {
    let allOrders = this.roomService.filter(order => order.userID === id)
    return new RoomService(id, allOrders);
  }

}



// totalOrderCost( date ) total order cost for today
export default RoomServiceRepo;
