import PhotoCard from "./event.jsx";
import Ask from './question.jsx';
import Nav from './Navbar.jsx'
import History from './history.jsx';
import DotGrid from './grid_back.jsx';
import Index from './glowingorb.jsx'

function Event({setques}) {
  return (
    <>
    <DotGrid/>
    <Nav/>
    <History/>
<PhotoCard />
<PhotoCard />
<PhotoCard />
<PhotoCard />
        <Ask setques = {setques}/>
    </>)}
export default Event;