import React, {useState, useEffect} from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import Message from './Message'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import {useSelector} from 'react-redux'
import firebase from 'firebase'

import {selectChannelId, selectChannelName} from './features/appSlice'
import {selectUser} from './features/userSlice'
import db from './firebase'

function Chat() {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if(channelId) {
        db.collection("channels").doc(channelId).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot =>
            setMessages(snapshot.docs.map((doc) => doc.data()))    
        )}
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault()

        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("")
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                {messages.map(message => (
                    <Message 
                        timestamp = {message.timestamp}
                        message = {message.message}
                        user = {message.user}    
                    />
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input
                        disabled = {!channelId} 
                        value={input} 
                        onChange={e => setInput(e.target.value)}
                        type="text" 
                        placeholder={`Select Channel for Sending Messages`}
                        required
                    />
                    <button 
                        disabled = {!channelId}
                        className="chat__inputButton"
                        type="submit"
                        onClick = {sendMessage}>
                        Send Message
                     </button>
                </form>

                <div className="chat__inputIcons">
                    <SendIcon fontSize="large" onClick = {sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default Chat
