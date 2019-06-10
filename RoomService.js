
class RoomService {
  constructor(id, allOrders) {
    this.id = id;
    this.allOrders = allOrders;
  }

  todaysTotal(date) {
    return Number(this.allOrders.reduce((acc, order) => {
      order.date === date ? acc += order.totalCost : null;
      return acc;
    }, 0).toFixed(2))
  }

  totalOrders() {
    return Number(this.allOrders.reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0).toFixed(2))
  }

  sortOrdersByDate() {
    let orders = this.allOrders.reduce((acc, order) => {
      if (!acc[order.date]) {
        acc[order.date] = []
      }
      acc[order.date].push(`${order.food} for $${order.totalCost}`)
      return acc;
    }, {})
    return orders;
  }
}

export default RoomService;