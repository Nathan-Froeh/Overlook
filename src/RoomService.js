class RoomService {
  constructor(id, allOrders) {
    this.id = id;
    this.allOrders = allOrders;
  }

  todaysTotal(date) {
    return this.allOrders.reduce((acc, order) => {
      order.date === date ? acc += order.totalCost : null;
      return acc;
    }, 0)
  }

  totalOrders() {
    return Number(this.allOrders.reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0).toFixed(2))
  }


}



// this.allOrders = [ dates and $ by id]
// todaysTotal( date ) total cost of todays orders
// this.totalOrders() total spent by this customer 

export default RoomService;