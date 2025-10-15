import './history.css';
import { Link} from 'react-router-dom';

var events =[
  {
    "imgurl": "src/assets/hackathon.jpg",
    "title": "Hackathon 2024",
    "description": "A 24-hour coding marathon where students showcase innovative solutions to real-world problems."
  },
  {
    "imgurl": "src/assets/techsymposium.jpg",
    "title": "Tech Symposium",
    "description": "An annual event with guest lectures, workshops, and exhibitions on cutting-edge technologies."
  },
  {
    "imgurl": "src/assets/ai_bootcamp.jpg",
    "title": "AI Bootcamp",
    "description": "Hands-on training sessions in artificial intelligence and machine learning for beginners and enthusiasts."
  },
  {
    "imgurl": "src/assets/robotics_workshop.jpg",
    "title": "Robotics Workshop",
    "description": "Learn robotics fundamentals and compete in building functional robotic models."
  },
  {
    "imgurl": "src/assets/cultural_fest.jpg",
    "title": "Cultural Fest",
    "description": "A celebration of art, music, and dance showcasing the diverse talents of students."
  },
  {
    "imgurl": "src/assets/sports_meet.jpg",
    "title": "Inter-College Sports Meet",
    "description": "Competitive sports event bringing together students from various colleges for athletic challenges."
  },
  {
    "imgurl": "src/assets/startup_pitch.jpg",
    "title": "Startup Pitch Day",
    "description": "Students present their startup ideas to a panel of investors and industry experts."
  },
  {
    "imgurl": "src/assets/environment_day.jpg",
    "title": "Environment Awareness Day",
    "description": "Workshops and activities to promote sustainability and eco-friendly practices."
  },
  {
    "imgurl": "src/assets/music_night.jpg",
    "title": "Music Night",
    "description": "An evening of live music performances by talented student bands and solo artists."
  },
  {
    "imgurl": "src/assets/coding_challenge.jpg",
    "title": "Inter-College Coding Challenge",
    "description": "Competitive coding event testing problem-solving and programming skills of participants."
  }
]
var subjects =[
  {"subject": "basic civil engineering", "link": "https://drive.google.com/drive/folders/1D3uzZxzeqHgD7SEmMYYqtn6CTf5fBsPw?usp=drive_link"},
  {"subject": "basic electrical engineering", "link": "https://drive.google.com/drive/folders/1iT-BRFQGR_IpvHU75grdkTXNxutLgEcv?usp=drive_link"},
  {"subject": "basic electronics engineering", "link": "https://drive.google.com/drive/folders/1A-3qoZWG9URqzdRcOdNa4OGlcQyuWwup?usp=drive_link"},
  {"subject": "basic mechanical engineering", "link": "https://drive.google.com/drive/folders/1yYfazOpr7BFOQxxNbqb18tSjyWLr7K4k?usp=drive_link"},
  {"subject": "biology for engineers", "link": "https://drive.google.com/drive/folders/1sWkXtm_DIP7GR7swONPd5vZs1agUVFrP?usp=drive_link"},
  {"subject": "engineering mathematics 1", "link": "https://drive.google.com/drive/folders/1EcdYPJUjfRFxWZVw9ZCO7ouJkZNpn_G7?usp=drive_link"},
  {"subject": "engineering mathematics 2", "link": "https://drive.google.com/drive/folders/1GU1ApLnsLe54wypcho3CHSKw1YemC8tU?usp=drive_link"},
  {"subject": "engineering chemistry", "link": "https://drive.google.com/drive/folders/10b0Skxnc-Gf9pwWM4c7JjJrMRlTG1xry?usp=drive_link"},
  {"subject": "engineering graphics", "link": "https://drive.google.com/drive/folders/1Pgx6x3BjjDwh3jJqZ81ERPEpSuzv4vkh?usp=drive_link"},
  {"subject": "engineering mechanics", "link": "https://drive.google.com/drive/folders/1HyLFVyzzG26mc0aKb9nzTAwDUAa28OZW?usp=drive_link"},
  {"subject": "engineering physics", "link": "https://drive.google.com/drive/folders/1tlROo6ZPgJbmuINNprATBM4bNlMAOoJ_?usp=drive_link"},
  {"subject": "engineering design", "link": "https://drive.google.com/drive/folders/1-R2DXhkTDarVLsojRw5Sx1YIF-wi6MaB?usp=drive_link"},
  {"subject": "object oriented program in c++", "link": "https://drive.google.com/drive/folders/1PTuowdaOggSgFEkreqzaA1YT7OyUEwH-?usp=drive_link"},
  {"subject": "problem solving and programming in c", "link": "https://drive.google.com/drive/folders/1-lQ_ExUAVvosUAqcxWxF__TI4ahnQcEQ?usp=drive_link"},
  {"subject": "technical communication", "link": "https://drive.google.com/drive/folders/1x9FgFK3TCBoeFADn0NhoUQpUBQUuhuko?usp=drive_link"},
 
];

var allsubj=[];
var allevent =[];
events.forEach((event) => {
 allevent.push(<Link to='/events' className="his">{event.title}</Link>)});

subjects.forEach((sub) => {
  allsubj.push(<a href={sub.link} className="his" target="_blank" rel="noopener noreferrer">{sub.subject}</a>)});

function History(){
    return(
        <>
        <section>
            <div className="logo">
                <h2>Notifications</h2>
            </div>
            <div className="options">
                {allevent}
                
                
            </div>
                <h1>Materials </h1>
            <div className="history">
                {allsubj}
                
                
                
            </div>
        </section>
        </>
    )
}

export default History;