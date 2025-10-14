import Ask from './question.jsx';
import Nav from './Navbar.jsx'
import History from './history.jsx';
import DotGrid from './grid_back.jsx';
import Index from './glowingorb.jsx'

function Home({setques}) {
  return (
    <>
    <DotGrid/>
    <Nav/>
    <History/>
    <Index/>
    <Ask setques = {setques}/>
    </>
  )
}
export default Home;