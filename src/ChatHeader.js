import React, { useState } from 'react'
import './ChatHeader.css'

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from './firebase'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'
import VideoCallIcon from '@material-ui/icons/VideoCall';
//import Tippy from '@tippy.js/react';
//import 'tippy.js/dist/tippy.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Video from './Video';
//import VideoHome from './VideoHome'

//popovers
import Logout from './popover/logoutPop';
import VideoChat from './popover/videoChatPop';
//import { Router } from 'express';


const ChatHeader = ({ channelName }) => {

    const user = useSelector(selectUser)
    const logout = () => {
        auth.signOut()
    }
    const [ isLogoutPopOpen, setLogoutPopOpen ] = useState(false);
    const [ isVideoChatOpen, setVideoChatOpen ] = useState(false);
    return (
        <div className='chatHeader' >
            <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash"><DragIndicatorIcon /></span>
                    {channelName}
                </h3>
            </div>

            <div className="chatHeader__right">
                <div className="chatHeader__ico">
                    <span className="chatHeader__hash"><VideoCallIcon onClick={() => setVideoChatOpen(true)}  /></span>
                    
                    <span className="chatHeader__hash"><ExitToAppIcon onClick={() => setLogoutPopOpen(true)}  /></span>
                    
                    <span className="chatHeader__hash"><HelpRoundedIcon /></span>
                </div>
            </div>

            <Logout open={isLogoutPopOpen} onClose={() => setLogoutPopOpen(false)}>
                <div className="popover_body">
                    <h4>Are you sure want to logout?</h4>
                    <div>
                        <button className="btn-primary" onClick={logout}>Sure</button>
                        <button className="btn" onClick={() => setLogoutPopOpen(false)}>Cancel</button>
                    </div>
                </div>
            </Logout>

            <VideoChat open={isVideoChatOpen} onClose={() => setVideoChatOpen(false)}>
                <div>
                    <button
                        className="closed"
                        onClick={() => setVideoChatOpen(false) }
                        >
                            X
                    </button>
                    <div>
                        <Router>
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/:url" component={Video} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </VideoChat>
        </div>
    )
}

export default ChatHeader
