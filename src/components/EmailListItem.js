import React, { Component } from 'react';
import {getPrettyDate, getPrettyTime} from '../utils/utils';

/* Email classes */
const EmailListItem = ({ email, onEmailClicked, selected, currentSection }) => {
  let classes = "email-item";
  if (selected) {
    classes += " selected"
  }
    
  return (
    <div onClick={() => { onEmailClicked(email.id); }} className={classes}>
      <div className="email-item__unread-dot" data-read={email.read}></div>
      <div className="email-item__subject truncate">{email.subject}</div>
      <div className="email-item__details">
        {!(currentSection === 'sent') && <span className="email-item__from truncate">{email.from}</span>}
        {!(currentSection === 'inbox') && <span className="email-item__from truncate">{email.to}</span>}
        <span className="email-item__time truncate">{getPrettyDate(email.time)}</span>
      </div>
    </div>
  );
}

export default EmailListItem;