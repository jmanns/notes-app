import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'

export const PrivateHeader = ({ title, handleLogout }) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{title}</h1>
        <button className="button button-link-text" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()
  }
}, PrivateHeader)
