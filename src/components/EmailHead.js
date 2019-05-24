import React, { Component } from 'react';

const EmailHead = ({ currentSectionMails, currentSection, unReadCount, deleteMultiple }) => {
  
  return (
    <div className="email-head">
        <div className="floatL">
          <h2><span className="capitalize">{currentSection}</span>
          {currentSection === 'inbox' && <span>({unReadCount})</span>}</h2>
        </div>
        <div className="floatR margin10">
          <input type="text" placeholder="Search email" />
          <span className="search-btn">Search</span>
        </div>
        <div className="clearB"></div>
        <div className="fa-btns floatL">
          <span><span className="fa fa-refresh"></span>Refresh</span>
          <span><span className="fa fa-eye"></span></span>
          <span><span className="fa fa-exclamation"></span></span>
          <span onClick={deleteMultiple}><span className="fa fa-trash-o"></span></span>
        </div>
        <div className="fa-btns floatR">
          <span><span className="fa fa-arrow-left"></span></span>
          <span><span className="fa fa-arrow-right"></span></span>
        </div>
    </div>
  );
};

export default EmailHead;