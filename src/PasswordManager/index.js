import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const passwordDetailsList = []

class PasswordManager extends Component {
  state = {
    passwordList: passwordDetailsList,
    website: '',
    username: '',
    password: '',
    count: 0,
    searchInput: '',
    isPasswordVisible: false,
  }

  websiteInput = event => {
    this.setState({website: event.target.value})
  }

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  addDetails = event => {
    event.preventDefault()

    const {passwordList, website, username, password, count} = this.state

    this.setState(prevState => ({
      count: prevState.count + 1,
    }))

    const newItem = {
      id: uuidv4(),
      website,
      username,
      password,
      count,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newItem],
      website: '',
      username: '',
      password: '',
    }))
  }

  deleteItem = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  onChangingSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  render() {
    const {
      passwordList,
      website,
      username,
      password,
      count,
      searchInput,
      isPasswordVisible,
    } = this.state

    const searchResults = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    let isListEmpty
    if (searchResults.length === 0 || passwordList.length === 0) {
      isListEmpty = true
    } else {
      isListEmpty = false
    }

    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="card-container">
          <form className="form-container" onSubmit={this.addDetails}>
            <h1 className="password-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                className="input-element"
                placeholder="Enter Website"
                onChange={this.websiteInput}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                className="input-element"
                placeholder="Enter Username"
                onChange={this.usernameInput}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                className="input-element"
                placeholder="Enter Password"
                onChange={this.passwordInput}
                value={password}
                type="password"
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-lg-img"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-sm-img"
          />
        </div>
        <div className="password-details-container">
          <div className="password-and-search-container">
            <div className="heading-and-count">
              <h1 className="heading">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-logo"
              />
              <input
                className="input-element"
                placeholder="Search"
                onChange={this.onChangingSearch}
                type="search"
              />
            </div>
          </div>
          <hr />
          <div className="show-password-cont">
            <input
              type="checkbox"
              id="showPassword"
              value="Male"
              onClick={this.onShowPassword}
            />
            <label htmlFor="showPassword" className="form-control heading">
              Show Passwords
            </label>
          </div>
          {isListEmpty && (
            <div className="no-passwords-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          )}
          {!isListEmpty && (
            <ul className="ul-container">
              {searchResults.map(eachItem => (
                <PasswordItem
                  passwordDetails={eachItem}
                  key={eachItem.id}
                  deleteItem={this.deleteItem}
                  isPasswordVisible={isPasswordVisible}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
