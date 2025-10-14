const CircularProgress = ({ percentage, label, type }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg width="200" height="200" className="progress-ring">
        <defs>
          <linearGradient id="attendanceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#11998e" />
            <stop offset="100%" stopColor="#38ef7d" />
          </linearGradient>
          <linearGradient id="cgpaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f093fb" />
            <stop offset="100%" stopColor="#f5576c" />
          </linearGradient>
        </defs>
        <circle
          className="progress-ring-circle progress-bg"
          stroke="#e0e0e0"
          strokeWidth="15"
          cx="100"
          cy="100"
          r={radius}
        />
        <circle
          className={`progress-ring-circle progress-bar ${type}`}
          strokeWidth="15"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          cx="100"
          cy="100"
          r={radius}
        />
      </svg>
      <div className={`progress-text ${type === 'cgpa' ? 'cgpa-text' : ''}`}>
        {label}
      </div>
    </div>
  );
};

export default CircularProgress;
