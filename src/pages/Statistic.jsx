import { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { BitcoinService } from '../services/bitcoin-service.js'

export class Statistic extends Component {
  state = {
    marketPrice: null,
    transactions: null,
  }

  async componentDidMount() {
    try {
      const marketPrice = await BitcoinService.getMarketPrice()
      const transactions = await BitcoinService.getConfirmedTransactions()
      this.setState({ marketPrice, transactions })
    } catch (err) {
      console.log(err)
    }
  }

  isChartLoading() {
    const { marketPrice, transactions } = this.state
    return !(
      marketPrice &&
      marketPrice.values &&
      transactions &&
      transactions.values
    )
  }

  pricePerDay() {
    return this.state.marketPrice.values.map(c => c.y)
  }

  confirmedTransactions() {
    return this.state.transactions.values.map(c => c.y)
  }

  render() {
    return this.isChartLoading() ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h2>Market Price:</h2>
        <Chart data={this.pricePerDay()} color='#06c076' />
        <h2>Confirmed Transactions Per Day:</h2>
        <Chart data={this.confirmedTransactions()} color='#c00f06' />
      </div>
    )
  }
}
