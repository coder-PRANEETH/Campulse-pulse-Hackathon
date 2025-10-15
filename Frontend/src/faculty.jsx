import './faculty.css'
import { use, useState } from 'react';
import Messagebox from './messagebox.jsx';

function Faculcard(){

    const[mess,setmess] = useState(false);

    function handleclick(e){
        e.preventDefault();
        setmess(!mess);

    }

var teadata =[
  {
    "name": "Dr. Ananya Sharma",
    "job": "Professor",
    "subject": "Computer Science",
    "imgurl": "src/assets/ananya_sharma.jpg"
  },
  {
    "name": "Mr. Rajesh Kumar",
    "job": "Assistant Professor",
    "subject": "Mechanical Engineering",
    "imgurl": "src/assets/rajesh_kumar.jpg"
  },
  {
    "name": "Ms. Priya Nair",
    "job": "Lecturer",
    "subject": "Mathematics",
    "imgurl": "src/assets/priya_nair.jpg"
  },
  {
    "name": "Dr. Suresh Reddy",
    "job": "Professor",
    "subject": "Electronics and Communication",
    "imgurl": "src/assets/suresh_reddy.jpg"
  },
  
  {
    "name": "Mr. Arjun Varma",
    "job": "Lecturer",
    "subject": "Civil Engineering",
    "imgurl": "src/assets/arjun_varma.jpg"
  },
  {
    "name": "Dr. Meera Joshi",
    "job": "Professor",
    "subject": "Chemical Engineering",
    "imgurl": "src/assets/meera_joshi.jpg"
  }];

var card =[];
teadata.forEach((tea) => {
  card.push(
    <div className="cardcontain">
        <div className="profile"><img src={tea.imgurl} alt="" /></div>
            <h4>{tea.name}</h4>
            <h4>{tea.job}</h4>  
            <h4>{tea.subject}</h4>
        <div className="buttons">
        <button className="message" onClick={handleclick}>Message</button>
        <button className="feedback">Feedback</button>
        </div>
    </div>
  );
});

// var card = [<div className="cardcontain">
//         <div className="profile"><img src="src\assets\IMG_20241119_123414.jpg" alt="" /></div>
//             <h4>{name}</h4>
//             <h4>{job}</h4>
//             <h4>{subject}</h4>
//         <div className="buttons">
//         <button className="message">Message</button>
//         <button className="feedback">Feedback</button>
//         </div>
//     </div>;]


    return(<>
    <h3>Handling teachers</h3>
    
    <div className="contain">
        {card}
       
    </div>


    </>)
}

export default Faculcard;
