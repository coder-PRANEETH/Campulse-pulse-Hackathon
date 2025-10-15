import './event.css'


function PhotoCard({ imageUrl, title, description }) {
  return (
    <div className="photo-card-container">
      <img src={imageUrl} alt={title} className="photo-card-image" ></img>
      <div className="descrip">

      <div className="title">{title}</div>
      <p>{description}</p>
      <button className='appl'>Apply</button>
      </div>
    </div>
  )}
      
export default PhotoCard;
