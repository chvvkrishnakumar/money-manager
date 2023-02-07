import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails/index'
import History from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    history: [],
    title: '',
    amount: '',
    type: 'Income',
    income: 0,
    expenses: 0,
    balance: 0,
  }

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onType = event => {
    this.setState({type: event.target.options[event.target.selectedIndex].text})
    console.log(event.target.options[event.target.selectedIndex].text)
  }

  addItem = () => {
    const {title, amount, type} = this.state
    const newItem = {
      id: uuidv4(),
      title,
      type,
      amount,
    }
    if (type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income + amount,
        balance: prevState.balance + amount,
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + amount,
        balance: prevState.balance - amount,
      }))
    }
    this.setState(prevState => ({
      history: [...prevState.history, newItem],
      amount: '',
      title: '',
      type: 'Income',
    }))
  }

  deleted = (id, type, amount) => {
    console.log(type, typeof amount)

    this.setState(prevState => ({
      history: prevState.history.filter(each => id !== each.id),
    }))
    if (type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income - amount,
        balance: prevState.balance - amount,
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses - amount,
        balance: prevState.balance + amount,
      }))
    }
  }

  render() {
    const {history, income, type, expenses, balance, amount, title} = this.state

    return (
      <div className="main">
        <div className="header">
          <h1>Hi, Rechard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
        </div>
        <div className="bottom">
          <div className="transactions">
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              value={title}
              id="title"
              onChange={this.onTitle}
              placeholder="TITLE"
              type="text"
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              value={amount}
              onChange={this.onAmount}
              placeholder="AMOUNT"
              id="amount"
              type="text"
            />
            <label htmlFor="select">TYPE</label>
            <select value={type} onChange={this.onType} id="select">
              {transactionTypeOptions.map(each => (
                <option value={each.optionId}>{each.displayText}</option>
              ))}
            </select>
            <button onClick={this.addItem} type="button">
              Add
            </button>
          </div>
          <div className="transaction">
            <h1>History</h1>

            <div className="history">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
              <p> </p>
            </div>
            <ul>
              {history.map(each => (
                <History details={each} key={each.id} deleted={this.deleted} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
