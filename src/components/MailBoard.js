import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _bindAll from 'lodash/bindAll';
import EmailList from './EmailList';
import Sidebar from './Sidebar';
import EmailDetails from './EmailDetails';
import EmailHead from './EmailHead';
import ComposeEmail from './ComposeEmail';

import {getPrettyDate, getPrettyTime, getFromSessionStorage, 
  getFromLocalStorage, setInLocalStorage} from '../utils/utils';


/* App */
class MailBoard extends React.Component {
  constructor(args) {
    super(args);
    
    // Assign unique IDs to the emails
    let allMails = this.props.mailsMock.mails;
    
    // Fetch Saved mails & update current mail list
    allMails = this.fetchCachedMails(allMails);

    let id = 0;
    for (const email of allMails) {
      email.id = id++;
    }
    
    _bindAll(this, ['filterEmails', 'composeEmail', 'newItemSend',
      'openEmail', 'setSidebarSection', 'deleteMultiple', 'selectEmail',
      'deleteMessage', 'togglePane']);

    this.state = {
      selectedEmailId: 0,
      currentSection: 'inbox',
      currentSectionMails: allMails,
      showPane: false,
      emails: allMails,
      showCompose: false
    };
  }

  componentDidMount() {
    this.setState({currentSectionMails: this.filterEmails('inbox')})
  }

  fetchCachedMails(allMails){
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
    return allMails;
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

  selectEmail(e, id) {
    const emails = this.state.emails;
    const index = emails.findIndex(x => x.id === id);
    if (e.target.checked) {
      emails[index].selected = true;
    } else {
      emails[index].selected = false;
    }

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


  deleteMultiple() {
    const emails = this.state.emails;

    for (const email of emails) {
      if (email.selected) {
            email.tag = 'deleted';
            email.selected = false;
      }
    }
    const index = emails.findIndex(x => x.tag === this.state.currentSection);
    this.setState({
      emails,
      selectedEmailId: index
    });
  }
  
  setSidebarSection(section) {
    let selectedEmailId = '';
    let currentSectionMails = this.filterEmails(section);

    selectedEmailId = !_isEmpty(currentSectionMails) && currentSectionMails[0].id;
    
    this.setState({
      currentSection: section,
      currentSectionMails,
      selectedEmailId: currentSectionMails && currentSectionMails[0].id,
      showCompose: false
    });    
  }
  
  composeEmail() {
    this.setState({showCompose: true});
  }

  newItemSend(data) {
     let emails = [...this.state.emails];
     const CD = new Date();
     const dateString = `${CD.getFullYear()}-${(CD.getMonth())}-${CD.getDate()}`;
     const timeString = `${CD.getHours()}:${(CD.getMinutes())}:${(CD.getSeconds())}`;
     const loggedInUser = getFromSessionStorage('loggedInUser');
     const sentItem = {
       "from": loggedInUser.emailId,
       "to": data.to,
       "address": data.to,
       "time": `${dateString} ${timeString}`,
       "message": data.message,
       "subject": data.subject,
       "tag": "sent",
       "id": emails.length,
       "read": "false"
     }
    emails.unshift(sentItem);
   
    this.setState({
      emails,
      currentSection: 'sent',
      selectedEmailId:  emails.length-1,
      showCompose: false
    });

    var itemList = getFromLocalStorage("sentMails") || [];
    itemList.push(sentItem);
    setInLocalStorage("sentMails", itemList);
  }

  unReadCount(mails) {
     var unreadCount = mails.reduce(function(previous, msg) {
        if (msg.read !== "true" ) {
          return previous + 1;
        }
      else {
        return previous;
      }
    }.bind(this), 0);
    return unreadCount;
  }

  togglePane() {
    this.setState({showPane: !this.state.showPane});
  }

  render() {
    const {showCompose, emails, selectedEmailId, currentSection} = this.state;
    const currentEmail = emails.find(x => x.id === selectedEmailId);
    let currentSectionMails = this.filterEmails(currentSection);
    const unReadCount = this.unReadCount(emails.filter(x => x.tag === 'inbox'));

    const isAuthenticated = getFromSessionStorage("isAuthenticated");

    return (
      <div>
      {isAuthenticated && <div className={`left-pane ${this.state.showPane ? 'expand': ''}`}></div>}
      <div className={`mail-container ${this.state.showPane ? 'expand': ''}`}>
        {isAuthenticated && <span className="fa fa-align-justify toggle-pane" onClick={this.togglePane} />}
        <Sidebar
          emails={emails}
          unReadCount={unReadCount}
          composeEmail={this.composeEmail}
          setSidebarSection={this.setSidebarSection} />
        <div className="inbox-container">
          <EmailHead
            currentSectionMails={currentSectionMails}
            deleteMultiple={this.deleteMultiple}
            unReadCount={unReadCount}
            currentSection={currentSection} />
          <EmailList
            emails={currentSectionMails}
            openEmail={this.openEmail}
            selectedEmailId={selectedEmailId}
            onEmailChecked={this.selectEmail}
            currentSection={currentSection} />
          {!showCompose && <EmailDetails
            email={currentEmail}
            onDelete={this.deleteMessage} />}
          {showCompose && <ComposeEmail newItemSend={this.newItemSend} />}
        </div>
      </div>
      </div>
    )
  }
}

export default MailBoard;