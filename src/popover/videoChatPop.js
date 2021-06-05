import React from 'react';
import './videoChatPop.css';

export default function videoChatPop({ open, children, onClose }) {
    if (!open) return null

    return (
        <div className="videoPlatform_popover">
            { children }
        </div>
    )
}