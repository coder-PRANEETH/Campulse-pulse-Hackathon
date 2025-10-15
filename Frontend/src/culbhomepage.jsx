import Clubpage from "./clubs";
import Ask from './question.jsx';
import Nav from './Navbar.jsx'
import History from './history.jsx';
import DotGrid from './grid_back.jsx';
import Index from './glowingorb.jsx'

function Clubhome({setques}) {
  return (
    <>
    <DotGrid/>
    <Nav/>
    <History/>
<Clubpage/>
    </>)}
export default Clubhome;