const ProfileCard = ({ name, registerNumber, course, semester, imageUrl }) => {
  return (
    <div className="card profile-card">
      <div className="profile-image-container">
        <img src='src\assets\IMG_20241119_123515.jpg' alt={name} className="profile-image" />
      </div>
      <div className="profile-info">
        <h2 className="student-name">{name}</h2>
        <p className="register-number">Register No. {registerNumber}</p>
        <p className="course-info">{course}</p>
        <p className="course-info">{semester}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
