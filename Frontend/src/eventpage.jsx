import PhotoCard from "./event.jsx";
import Ask from './question.jsx';
import Nav from './Navbar.jsx'
import History from './history.jsx';
import DotGrid from './grid_back.jsx';
import Index from './glowingorb.jsx'

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
 var allphoto =[];
 events.forEach((event) => {
  allphoto.push(<PhotoCard imageUrl={event.imgurl} title={event.title} description={event.description} />);
});

function Event({setques}) {
  return (
    <>
    <DotGrid/>
    <Nav/>
    <History/>
{allphoto}
       
    </>)}
export default Event;