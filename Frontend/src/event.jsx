import './event.css'


function PhotoCard({ imageUrl, title, description }) {
  return (
    <div className="photo-card-container">
      <div src={imageUrl} alt={title} className="photo-card-image" ></div>
      <div className="descrip">

      <div className="title">{title}</div>
      <p>{description}</p>
      <button className='appl'>Apply</button>
      </div>
    </div>
  )}
      
export default PhotoCard;
