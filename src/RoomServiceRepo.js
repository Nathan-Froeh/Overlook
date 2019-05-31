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


}



// totalOrderCost( date ) total order cost for today
export default RoomServiceRepo;
