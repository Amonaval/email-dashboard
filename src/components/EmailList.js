import React, { Component } from 'react';
import EmailListItem from './EmailListItem';

/* EmailList contains a list of Email components */
const EmailList = ({ emails, onEmailSelected, selectedEmailId, currentSection, onEmailChecked}) => {
  if (emails.length === 0) {
    return (
      <div className="email-list empty">
        Nothing to see here, great job!
      </div>
    );
  }
  
  return (
    <div className="email-list">
      {
        emails.map(email => {
          return (
            <EmailListItem
              onEmailClicked={(id) => { onEmailSelected(id); }}
              onEmailChecked={onEmailChecked}
              email={email}
              currentSection={currentSection}
              selected={selectedEmailId === email.id} />
          );
        })
      }
    </div>
  );
};

export default EmailList;