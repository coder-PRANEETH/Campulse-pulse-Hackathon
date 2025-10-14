import './messagebox.css'

function Messagebox(props){
    
    var name = props.name;
    return(<>
    <div className="messagebox">
        <h3>{name}</h3>
        <div className="bo"></div>
        <form id='form'>
        <input type="text" name="messa" id="messagei" />
        <button className='send'> <svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round"
>
  <path d="M22 2L11 13" />
  <path d="M22 2L15 22l-4-9-9-4 20-7z" />
</svg></button>
    </form>
    </div>
    </>)
}

export default Messagebox;