import './question.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Ask({ setques }) {
  const navigate = useNavigate();
  const [qt, setqt] = useState("");
  const [text, setText] = useState("");
  const [firstClick, setFirstClick] = useState(true);
  const [isTyping, setIsTyping] = useState(false); 
 const handleSubmit = (e) => {
    e.preventDefault(); 

    if (firstClick) {
      setFirstClick(false);
      navigate("/chat");
    }

    setques(qt);
    setText("");
    setqt(""); 
    setIsTyping(false); 
  };  const handleChange = (e) => {
    const value = e.target.value;
    setqt(value);
    setText(value);
    setIsTyping(value.trim() !== ""); 
  };

  return (
    <div className="ques">
      <button className="add">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M16.5 6.75L9.75 13.5a2.25 2.25 0 1 0 3.18 3.18l6.36-6.36a4.5 4.5 0 1 0-6.36-6.36L6.57 10.5a6.75 6.75 0 1 0 9.55 9.55l5.3-5.3" />
        </svg>
      </button>

      <form id="que" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Ask anything.."
          name="question"
          value={text}
          id="query"
        />
        <button type="submit" id="mic">
          {isTyping ? (
           <svg 
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
</svg>
) : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2a3.5 3.5 0 0 0-3.5 3.5V11A3.5 3.5 0 0 0 12 14.5 3.5 3.5 0 0 0 15.5 11V5.5A3.5 3.5 0 0 0 12 2zm5 9.5a0.75.75 0 0 0-1.5 0c0 2.21-1.79 4-4 4s-4-1.79-4-4a0.75.75 0 0 0-1.5 0c0 2.93 2.24 5.33 5.25 5.73V20H9.5a0.75.75 0 0 0 0 1.5h5a0.75.75 0 0 0 0-1.5H13.25v-2.77C15.76 16.83 18 14.43 18 11.5z"/></svg>)}
        </button>
      </form>
    </div>
  );
}

export default Ask;
