import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './Main.css'
import { Context } from '../../Context/Context'

const Main = () => {
    const { input, setInput, onSent, showResult, recentPrompt, resultData, loading} = useContext(Context)

    return (
        <div className='main'>
            <div className="main-title">
                <h2>Gemini</h2>
                <img src={assets.user_icon} />
            </div>
            <div className="main-content">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for out work retreat</p>
                                <img src={assets.message_icon} />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the follwing code</p>
                                <img src={assets.code_icon} />
                            </div>
                        </div>
                    </>
                : 
                <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon}/>
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon}/>
                        {!loading?
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        :
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                            
                        }
                    </div>
                </div>
            }
                <div className="bottom-content">
                    <div className="search-box">
                        <input onChange={(e) => { setInput(e.target.value) }} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img onClick={() => { onSent() }} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default Main