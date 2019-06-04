import React, {useState} from 'react';
import {sideBarLabels} from '../AppConfig';

/* Sidebar */
const Sidebar = ({ emails, unReadCount, setSidebarSection, composeEmail }) => {

  var deletedCount = emails.reduce(
    function(previous, msg) {
      if (msg.tag === "deleted") {
        return previous + 1;
      }
      else {
        return previous;
      }
    }.bind(this), 0);

  return (
    <div id="sidebar">
      <div className="sidebar__compose">
        <a className="btn compose" onClick={composeEmail}>
          Compose Mail <span className="fa fa-pencil"></span>
        </a>
      </div>
      <div className="section-title">FOLDERS</div>
      <ul className="sidebar__inboxes">
        <li onClick={() => { setSidebarSection('inbox'); }}><a>
          <span className="fa fa-inbox"></span> Inbox
          <span className="item-count">{unReadCount > 0 && unReadCount}</span></a></li>
        <li onClick={() => { setSidebarSection('sent'); }}><a>
          <span className="fa fa-paper-plane"></span> Sent
          <span className="item-count"></span></a></li>
        <li><a>
          <span className="fa fa-pencil-square-o"></span> Drafts
          <span className="item-count"></span>
          </a></li>
        <li onClick={() => { setSidebarSection('deleted'); }}><a>
          <span className="fa fa-trash-o"></span> Trash
          <span className="item-count">{deletedCount}</span>
          </a></li>
      </ul>
      <div className="section-title">CATEGORIES</div>
      <ul className="sidebar__categories">
        <li><span className="fa fa-circle green"></span>Work</li>
        <li><span className="fa fa-circle red"></span>Document</li>
        <li><span className="fa fa-circle blue"></span>Social</li>
        <li><span className="fa fa-circle orange"></span>Advertising</li>
        <li><span className="fa fa-circle aqua-blue"></span>Clients</li>
      </ul>
      <div className="section-title">LABELS</div>
      <ul className="sidebar__labels">
        {
          sideBarLabels.map((item) => {
            return <li><span className="fa fa-tag"></span>{item}</li>
          })
        }
      </ul>
    </div>
  );
};

export default Sidebar;