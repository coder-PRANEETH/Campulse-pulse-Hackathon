import './profile.css'
import ProfileCard from './ProfileCard';
import CircularProgress from './CircularProgress';
function Profile() {
    const studentData = {
      name: 'John Wick',
      registerNumber: 'XXXXXXXXXXX',
      course: 'B Tech Computer Science & Engineering (Artificial Intelligence & Data Science)',
      semester: 'III Semester',
      imageUrl: 'src\assets\IMG_20241119_123515.jpg',
      attendance: 81,
      cgpa: 8.5,
    };
  
    const mentorMeetings = [
      {
        date: '15/01/2024',
        faculty: 'Dr. Rajesh Kumar',
        designation: 'Associate Professor',
        remarks: 'Good academic progress',
      },
      {
        date: '22/02/2024',
        faculty: 'Dr. Priya Sharma',
        designation: 'Assistant Professor',
        remarks: 'Needs improvement in attendance',
      },
    ];
   
        

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="university-name">SASTRA DEEMED TO BE UNIVERSITY</h1>
          <p className="university-tagline">
            THINK MERIT | THINK TRANSPARENCY | THINK SASTRA
          </p>
          <p className="university-tagline">THANJAVUR - KUMBAKONAM - CHENNAI</p>
        </div>
      </header>

      <div className="cards-grid">
        <ProfileCard
          name={studentData.name}
          registerNumber={studentData.registerNumber}
          course={studentData.course}
          semester={studentData.semester}
          imageUrl={studentData.imageUrl}
        />

        <div className="card progress-card">
          <h3 className="card-title">Attendance</h3>
          <CircularProgress
            percentage={studentData.attendance}
            label={`${studentData.attendance}%`}
            type="attendance"
          />
        </div>

        <div className="card progress-card">
          <h3 className="card-title">Academic Performance</h3>
          <CircularProgress
            percentage={(studentData.cgpa / 10) * 100}
            label={`${studentData.cgpa} CGPA`}
            type="cgpa"
          />
        </div>
      </div>

     
    </div>
  );
};



export default Profile;