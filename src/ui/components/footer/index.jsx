import React from 'react';
import './index.scss';
import Label from '../dynamic/label';

export default () => (
  <div id="no-print">
    <div className="footer">      
      <div className="footer-copyright">
       {/* &copy; 2020 TELUS*/}
    </div>
      <div className="float-right text-muted">
        <a href="https://jira.tsl.telus.com/secure/CreateIssueDetails!init.jspa?pid=16812&issuetype=1&summary=[Feedback]&priority=3" target="_new"><Label labelId="sendFeedBackLb" /></a>
      </div>
      <div className="float-right text-muted pr-2"><a href="mailto:dlFOMCTier3@telus.com"><Label labelId="contactUsLb" /></a> &nbsp;|</div>
      <div className="float-right text-muted pr-2"><a href="/UserGuide.pptx"><Label labelId="userGuideLb" /></a> &nbsp;|</div>
      <div className="float-right text-muted pr-2"><Label labelId="versionLb" />: 2020-05-24 v1 &nbsp;|</div>
    </div>
  </div>
);
