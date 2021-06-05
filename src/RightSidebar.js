import React from 'react';
import './RightSidebar.css'

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function RightSidebar() {
    return (
        <div className="right__sidebar">
            <div className="sidebar__top">
                <h4>Connected User's</h4>
                <ExpandMoreIcon />
            </div>
        </div>
    )
}

export default RightSidebar
