import React, {useState, useEffect} from 'react'
import './Sidebar.css'

import Avatar from "@material-ui/core/Avatar"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from '@material-ui/icons/Settings';
import BallotIcon from '@material-ui/icons/Ballot';
import SearchIcon from '@material-ui/icons/Search';

import SidebarChannel from './SidebarChannel'

import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import  db from './firebase'

// import ArtTrackIcon from '@material-ui/icons/ArtTrack';

function Sidebar() {

    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([])
    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
          setChannels(snapshot.docs.map(doc => ({
            id: doc.id,
            channel: doc.data(),
          })))
        )
      )
    }, [])

    const handleAddChannel = () => {
      const channelName = prompt("Please enter the name of your channel:");

      if (channelName) {
        db.collection('channels').add({
          channelName
        }) 
      }
    }

    const [Visible, setVisible] = useState(false)

    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <h3>Meet Platform</h3>
          <ExpandMoreIcon onClick={()=>setVisible(!Visible)} style={{cursor: 'pointer'}} />
        </div>

        { Visible?<div className="chatHeader__search">
          <input placeholder="Search Channels" />
          <SearchIcon />
          </div>:null }
        

        <div className="sidebar__channels">
          <div className="sidebar__channelsHeader">
            <div className="sidebar__header">
              <BallotIcon />
              <h4>Channels List</h4>
            </div>

            <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
          </div>

          <div className="sidebar__channelsLisr" >
            
            {channels.map(({id, channel}) => (
              <SidebarChannel key={id} id={id} channelName={channel.channelName} className="channels" />
            ))}

          </div>
        </div>

        <div className="sidebar__profile">
          <Avatar src={user.photo}/>
          <div className="sidebar__profileInfo">
            <h3>{user.displayName}</h3>
            <p><b>UserID:</b> {user.uid.substring(0,5)}</p>
          </div>

          <div className="sidebar__profileIcons">
            <SettingsIcon />
          </div>
        </div>
      </div>
    );
}

export default Sidebar
