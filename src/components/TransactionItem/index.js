import './index.css'

const History = props => {
  const {details, deleted} = props
  const {type, amount, title, id} = details
  console.log(typeof amount)

  const onDelete = () => {
    deleted(id, type, amount)
  }
  return (
    <li className="history">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button
        data-testid="delete"
        className="button"
        onClick={onDelete}
        type="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default History
