import React from 'react';
import './logoutPop.css'

export default function logoutPop({ open, children, onClose }) {
    if (!open) return null

    return (
        <>
            <div className="mainScr_Overlay" onClick={onClose} />
            <div className="modalVideoMainScr">
                <div className="content_VideoMainScr">
                    { children }
                </div>
            </div>
        </>
    )
}