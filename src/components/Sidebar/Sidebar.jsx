import React, { useContext, useState } from 'react'
import {assets} from "../../assets/assets"
import "./Sidebar.css"
import { Context } from '../../Context/Context'

const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const {onSent, prevPrompts, setLoading, setShowResult} = useContext(Context)
    function newChat() {
        setLoading(false) 
        setShowResult(false)
    }

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=> setExtended(prev=>!prev)} src={assets.menu_icon} className='menu-icon'/>
            <div onClick={()=>{newChat()}} className="new-chat">
                <img src={assets.plus_icon} className='plus-icon'/>
                {extended?<p>New Chat</p>:null}
            </div>
            {
                extended?
                <div className="recent">
                    <h3 className='recent-title'>Recent</h3>
                    {prevPrompts.map((item, index) => {
                        return(
                            <div onClick={()=>{onSent(item)}} key={index} className="recent-item">
                                <img src={assets.message_icon}/>
                                <span>{item.slice(0, 18)}</span>
                            </div>
                        )
                    })}
                   
                </div>
                :null
            }
        </div>
        <div className="bottom">
            <div className="bottom-item recent-item">
                <img src={assets.question_icon}/>
                {extended?<span>Help</span>:null}
            </div>
            <div className="bottom-item recent-item">
                <img src={assets.history_icon}/>
                {extended?<span>Activity</span>:null}
            </div>
            <div className="bottom-item recent-item">
                <img src={assets.setting_icon}/>
                {extended?<span>Settings</span>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar