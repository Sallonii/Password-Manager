import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deleteItem, isPasswordVisible} = props
  const {id, website, username, password} = passwordDetails

  const initial = username.slice(0, 1).toUpperCase()

  const onClickingDeleteButton = () => {
    deleteItem(id)
  }

  return (
    <li className="list-container">
      <div className="profile-initial">{initial}</div>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        {isPasswordVisible && <p>{password}</p>}
        {!isPasswordVisible && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button
        type="button"
        data-testid="delete"
        onClick={onClickingDeleteButton}
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
