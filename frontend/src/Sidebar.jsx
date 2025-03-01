import React from "react";
import { Link } from "react-router-dom";
import "./styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="links">
        <Link to="/create">Create Activity</Link>
        <Link to="/manage">Manage Activities</Link>
        <Link to="/summary">Activity Summary</Link>
      </div>
    </div>
  );
};

export default Sidebar;
