import './history.css';
import { Link} from 'react-router-dom';

function History(){
    return(
        <>
        <section>
            <div className="logo">
                <h2>Notifications</h2>
            </div>
            <div className="options">
                <Link to='/events' className="his">Electronics Workshop</Link>
                <Link to='/events' className="his">neededVolunteers</Link>
                <Link to='/events' className="his">Dance club recruitments</Link>
                
                
            </div>
            <div className="history"><h1>
                History
                </h1>
                {/* <div className="his">
                <div className="title">Location of vkj</div>
                <button className="del"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  >
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6L17.5 20a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1L5 6" />
                                                    <path d="M10 11v6" />
                                                    <path d="M14 11v6" />
                                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                    </svg></button>
                
                </div>
                
                
                
                <div className="his">
                <div className="title">Event registration</div>
                <button className="del"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  >
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6L17.5 20a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1L5 6" />
                                                    <path d="M10 11v6" />
                                                    <path d="M14 11v6" />
                                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                    </svg></button>
                
                </div>
                <div className="his">
                <div className="title">Club recommendation</div>
                <button className="del"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  >
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6L17.5 20a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1L5 6" />
                                                    <path d="M10 11v6" />
                                                    <path d="M14 11v6" />
                                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                    </svg></button> */}
                
                {/* </div> */}
                
                
                
            </div>
        </section>
        </>
    )
}

export default History;