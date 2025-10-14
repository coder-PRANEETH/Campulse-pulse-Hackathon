import './faculty.css'
import { use, useState } from 'react';
import Messagebox from './messagebox.jsx';

function Faculcard(){

    const[mess,setmess] = useState(false);

    function handleclick(e){
        e.preventDefault();
        setmess(!mess);

    }

    var name = "John Doe";
    var job = "Professor";
    var subject = "Mathematics";

var card = <div className="cardcontain">
        <div className="profile"><img src="src\assets\IMG_20241119_123515.jpg" alt="" /></div>
            <h5>{name}</h5>
            <h5>{job}</h5>
            <h5>{subject}</h5>
        <div className="buttons">
        <button className="message">Message</button>
        <button className="feedback">Feedback</button>
        </div>
    </div>;


    return(<>
    <h3>Handling teachers</h3>
    
    <div className="contain">
        {card}
        {card}
        {card}
        {card}
        {card}
        {card}
    </div>


    </>)
}

export default Faculcard;
