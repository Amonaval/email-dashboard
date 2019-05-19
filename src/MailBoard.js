import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import EmailList from './components/EmailList';
import Sidebar from './components/Sidebar';
import EmailDetails from './components/EmailDetails';
import ComposeEmail from './components/ComposeEmail';

import {getPrettyDate, getPrettyTime, getFromSessionStorage, 
  getFromLocalStorage, setInLocalStorage} from './utils/utils';


/* App */
class MailBoard extends React.Component {
  constructor(args) {
    super(args);
    
    // Assign unique IDs to the emails
    let allMails = this.props.mailsMock.mails;
    const cachedMails = getFromLocalStorage('sentMails') || [];
    const loggedInUser = getFromSessionStorage('loggedInUser');
    if(!_isEmpty(cachedMails)) {
       cachedMails.forEach((item) => {
          if (item.to === loggedInUser.emailId || 
             item.address === loggedInUser.emailId) {
             item.tag = 'inbox';
             allMails.unshift(item);
          } else if (item.from === loggedInUser.emailId){
             item.tag = 'sent';
             allMails.unshift(item);
          }
       })
    }
    let id = 0;
    for (const email of allMails) {
      email.id = id++;
    }
  
    this.filterEmails = this.filterEmails.bind(this);
    this.composeEmail = this.composeEmail.bind(this);
    this.newItemSend = this.newItemSend.bind(this);

    this.state = {
      selectedEmailId: 0,
      currentSection: 'inbox',
      currentSectionMails: allMails,
      emails: allMails,
      showCompose: false
    };
  }

  componentDidMount() {
    this.setState({currentSectionMails: this.filterEmails('inbox')})
  }

  filterEmails(type) {
    const {emails} = this.state;
    const filterMails = emails.filter(mail => mail.tag === type);
    return filterMails;
  }
  
  openEmail(id) {
    const emails = this.state.emails;
    const index = emails.findIndex(x => x.id === id);
    emails[index].read = 'true';
    this.setState({
      selectedEmailId: id,
      emails
    });
  }
  
  deleteMessage(id) {
    // Mark the message as 'deleted'
    const emails = this.state.emails;
    const index = emails.findIndex(x => x.id === id);
    emails[index].tag = 'deleted';
    
    // Select the next message in the list
    let selectedEmailId = '';
    for (const email of emails) {
      if (email.tag === this.state.currentSection) {
        selectedEmailId = email.id;
        break;
      }
    }
    
    this.setState({
      emails,
      selectedEmailId
    });
  }
  
  setSidebarSection(section) {
    let selectedEmailId = '';
    let currentSectionMails = this.filterEmails(section);

    selectedEmailId = !_isEmpty(currentSectionMails) && currentSectionMails[0].id;
    
    this.setState({
      currentSection: section,
      currentSectionMails,
      selectedEmailId,
      showCompose: false
    });    
  }
  
  composeEmail(val) {
    this.setState({showCompose: val});
  }

  newItemSend(data) {
     let emails = [...this.state.emails];
     const CD = new Date();
     const dateString = `${CD.getFullYear()}-${(CD.getMonth()+1)}-${CD.getDate()}`;
     const loggedInUser = getFromSessionStorage('loggedInUser');
     const sentItem = {
       "from": loggedInUser.emailId,
       "to": data.to,
       "address": data.to,
       "time": `${dateString} 06:35:19`,
       "message": data.message,
       "subject": data.subject,
       "tag": "sent",
       "read": "false"
     }
    emails.unshift(sentItem);
   
    this.setState({
      emails,
      currentSection: 'sent',
      showCompose: false
    });

    var itemList = getFromLocalStorage("sentMails") || [];
    itemList.unshift(sentItem);
    setInLocalStorage("sentMails", itemList);
  }

  render() {
    const {showCompose, emails, selectedEmailId, currentSection} = this.state;
    // const currentEmail = emails.find(x => x.id === selectedEmailId);

    let currentSectionMails = this.filterEmails(currentSection);
    const currentEmail = currentSectionMails[0];
    const selectedEmailId1 = currentSectionMails[0].id;

    return (
      <div>
        <Sidebar
          emails={emails}
          inboxMails={emails.filter(x => x.tag === 'inbox')}
          composeEmail={(val) => { this.composeEmail(val); }}
          setSidebarSection={(section) => { this.setSidebarSection(section); }} />
        <div className="inbox-container">
          <EmailList
            emails={currentSectionMails}
            onEmailSelected={(id) => { this.openEmail(id); }}
            selectedEmailId={selectedEmailId1}
            currentSection={currentSection} />
          {!showCompose && <EmailDetails
            email={currentEmail}
            onDelete={(id) => { this.deleteMessage(id); }} />}
          {showCompose && <ComposeEmail newItemSend={this.newItemSend} />}
        </div>
      </div>
    )
  }
}

export default MailBoard;