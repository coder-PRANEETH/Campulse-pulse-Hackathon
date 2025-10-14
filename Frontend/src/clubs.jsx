import './clubs.css';



var clubs = <div className="cardcontain">
        <div className="profile"><img src="src\assets\IMG_202419_123515.jpg" alt="" /></div>
            <h5>ACE</h5>
            <h5>engineers</h5>
            <h5>computo</h5>
       
    </div>;






function Clubpage(){

    return (
        <>
        <div className="allclub">
            <div className="recom">

            <h1>Recommended :</h1>
            {clubs}
            {clubs}
            </div>
            <div className="containall">

            <h1>All clubs :</h1>
            {clubs}
            {clubs}
            {clubs}
            {clubs}
            {clubs}
            {clubs}
            {clubs}

            </div>
        </div>


        </>
    )
}

export default Clubpage;