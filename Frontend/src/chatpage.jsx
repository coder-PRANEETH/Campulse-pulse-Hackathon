import Ask from './question.jsx';
import Nav from './Navbar.jsx'
import History from './history.jsx';
import DotGrid from './grid_back.jsx';
import Chat from './chat.jsx';

function Chatpage({ans,setques}){
    return (
    <>
    <DotGrid/>
    <Nav/>
    <History/>
    <Chat ans = {ans}/>
    <Ask setques = {setques}/>
    </>
  )
}
export default Chatpage;