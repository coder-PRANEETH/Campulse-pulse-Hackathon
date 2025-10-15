import './clubs.css';



const clubsData = [
  { img: "src/assets/ace.jpg", NAME: "ACE", TYPE: "Civil Engineers", instagram: "https://instagram.com/ace_civil" },
  { img: "src/assets/computo.jpg", NAME: "Computo", TYPE: "Coding / AI & ML", instagram: "https://instagram.com/computo_club" },
  { img: "src/assets/robotics.jpg", NAME: "RoboNix", TYPE: "Robotics & Automation", instagram: "https://instagram.com/robonix_club" },
  { img: "src/assets/eco.png", NAME: "EcoVision", TYPE: "Environmental Awareness", instagram: "https://instagram.com/ecovision_club" },
  { img: "src/assets/music.jpg", NAME: "Aarohi", TYPE: "Music & Performing Arts", instagram: "https://instagram.com/aarohi_club" },
  { img: "src/assets/lit.jpg", NAME: "LitSoc", TYPE: "Literary & Debate", instagram: "https://instagram.com/litsoc_club" },
  { img: "src/assets/drama.jpg", NAME: "Dramatics", TYPE: "Stage & Acting", instagram: "https://instagram.com/dramatics_club" },
  { img: "src/assets/design.jpg", NAME: "Pixel", TYPE: "Design & Creativity", instagram: "https://instagram.com/pixel_design_club" },
  { img: "src/assets/ieee.jpg", NAME: "IEEE", TYPE: "Electronics & Research", instagram: "https://instagram.com/ieee_studentbranch" },
  { img: "src/assets/iet.jpg", NAME: "IET", TYPE: "Innovation & Technology", instagram: "https://instagram.com/iet_official" },
  { img: "src/assets/entre.jpg", NAME: "E-Cell", TYPE: "Entrepreneurship & Startups", instagram: "https://instagram.com/ecell_official" },
  { img: "src/assets/nss.jpeg", NAME: "NSS", TYPE: "Social Service", instagram: "https://instagram.com/nss_club" },
  { img: "src/assets/ncc.jpeg", NAME: "NCC", TYPE: "Discipline & Leadership", instagram: "https://instagram.com/ncc_india" },
  { img: "src/assets/photography.jpg", NAME: "Shutterbugs", TYPE: "Photography & Videography", instagram: "https://instagram.com/shutterbugs_club" },
  { img: "src/assets/fin.jpg", NAME: "FinSights", TYPE: "Finance & Business", instagram: "https://instagram.com/finsights_club" },
  { img: "src/assets/gdsc.jpg", NAME: "GDSC", TYPE: "Google Developers", instagram: "https://instagram.com/gdsc_official" },
  { img: "src/assets/ai.jpg", NAME: "AI Nexus", TYPE: "AI, Data Science & Research", instagram: "https://instagram.com/ai_nexus" },
  { img: "src/assets/astro.jpg", NAME: "AstroClub", TYPE: "Astronomy & Space Science", instagram: "https://instagram.com/astroclub" },
  { img: "src/assets/gaming.jpg", NAME: "GameHub", TYPE: "Gaming & Esports", instagram: "https://instagram.com/gamehub_club" },
  { img: "src/assets/dance.jpg", NAME: "Rhythm", TYPE: "Dance & Performance", instagram: "https://instagram.com/rhythm_club" }
];


var clubs =
      clubsData.map((club, index) => (
          <div className="cardcontain">
        <div key={index} className="profilecll">
          <img src={club.img} alt={club.NAME} />
          <h5>{club.NAME}</h5>
          <h5>{club.TYPE}</h5>
        </div>
      
    </div>));






function Clubpage(){

    return (
        <>
        <div className="allclub">
            <div className="recom">

            <h1>Recommended :</h1>
            {clubs}
           

            </div>
        </div>


        </>
    )
}

export default Clubpage;