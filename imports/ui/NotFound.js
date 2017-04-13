import React, {Component} from 'react'
import { Link } from 'react-router'

export default () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Page Not Found</h1>
      <p>Unable to find that page</p>
      <Link to="/" className="button button-link">Head Home</Link>
    </div>
  </div>
)