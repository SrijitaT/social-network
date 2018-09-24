import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotificationMenu extends Component {
  render() {
    return (
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="dropdown-item" to="/">
          Action
        </Link>
        <Link className="dropdown-item" to="/">
          Another action
        </Link>
        <Link className="dropdown-item" to="/">
          Something else here
        </Link>
      </div>
    );
  }
}
export default NotificationMenu;
