import React, {useState} from 'react';

/* Sidebar */
const Sidebar = ({ emails, inboxMails, setSidebarSection, composeEmail }) => {

  

  var unreadCount = inboxMails.reduce(
    function(previous, msg) {
      if (msg.read !== "true" ) {
        return previous + 1;
      }
      else {
        return previous;
      }
    }.bind(this), 0);

  var deletedCount = emails.reduce(
    function(previous, msg) {
      if (msg.tag === "deleted") {
        return previous + 1;
      }
      else {
        return previous;
      }
    }.bind(this), 0);

  // const [display, showCompose] = useState();

  return (
    <div id="sidebar">
      <div className="sidebar__compose">
        <a href="#" className="btn compose" onClick={() => {composeEmail(true)}}>
          Compose <span className="fa fa-pencil"></span>
        </a>
      </div>
      <ul className="sidebar__inboxes">
        <li onClick={() => { setSidebarSection('inbox'); }}><a>
          <span className="fa fa-inbox"></span> Inbox
          <span className="item-count">{unreadCount}</span></a></li>
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
    </div>
  );
};

export default Sidebar;