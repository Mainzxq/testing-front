import React from "react";

const FloatBtn = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#add-log-modal"
        className="btn-floating btn-large blue darken-2 modal-trigger"
      >
        <i className="large material-icons">add</i>
      </a>
      <ul>
        <li>
          <a href="#tech-list-modal" className="btn-float green modal-trigger">
            <i className="material-icons">person</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FloatBtn;
