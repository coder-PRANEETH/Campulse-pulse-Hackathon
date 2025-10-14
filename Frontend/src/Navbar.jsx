import'./Nav.css'
import { Link} from 'react-router-dom';

function Nav(){
    return(
        <>
        <div  className="navcontain">
            <Link to='/' className="option">Home</Link>
            <Link to='/faculty' className="option">Faculty</Link>
       

      
            <Link to='/club' className="option">Clubs</Link>
            <Link to='/events' className="option">Events</Link>

        </div>
            <Link to='/profile' className="profile-option"></Link>
        </>
    )
}

export default Nav