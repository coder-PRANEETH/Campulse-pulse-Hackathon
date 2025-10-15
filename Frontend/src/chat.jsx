import {useEffect, useState } from 'react';
import CampusNavigation from "./map.jsx";
import { fetchChat } from './fetchfunctions.jsx';
import './chat.css';



function Chat({ans}) {
    var [chat,setchat] =useState([]);
    var [nav,setnav] =useState(false);
    useEffect(() => {
    if (ans) {
      setchat(prev => [...prev, <div className="question">{ans}</div>]);
      var answer = fetchChat(ans);
      answer.then(data => {
       const BUILDING_LOCATIONS = {
  "vkj ": [10.726767, 79.020843],
  "jvc ": [10.727548, 79.017953],
  "nmv ": [10.727605, 79.016893],
  "vv " : [10.729352, 79.018169],
  "soc ": [10.728921, 79.020438],
  "cv ": [10.729296, 79.019623],
  "tdc ": [10.728789, 79.020853],
  "ltc ": [10.727997, 79.020207],
  "som ": [10.728139, 79.020984],};

// Normalize user input
const lower = data.toLowerCase();

if ( BUILDING_LOCATIONS.hasOwnProperty(lower)) {setchat(prev => [...prev,<CampusNavigation key={Date.now()} coordinates={BUILDING_LOCATIONS[lower]}/>,]);}
else{setchat(prev => [...prev, <div className="answer">{data}</div>]);}});}}, [ans]);
    
  return (
    <div className="chat-container">
        <div className="top"></div>
        {chat}
    
        <div className="bot"></div>
        </div>
  );
}
export default Chat;