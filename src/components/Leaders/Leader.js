import React from "react";
import "./Leader.css";
import chairman from "../../assets/chairman.png";
import sir from "../../assets/sir.jpg";
import mam from "../../assets/mam.jpg";
import Header from "../header/Header";
import Footer from "../Footer/Footer";

const Leader = () => {
  return (
    <>
      <Header />
      <div className="team-section">
        <div className="team-header">
          <h1>LEADERSHIP</h1>
        </div>

        {/* Chairman Card - Single row */}
        <div className="chairman-card">
          <img src={chairman} alt="Manoj Mittal" className="team-photo" />
          <h1>Manoj Mittal</h1>
          <p className="role">Chairman</p>
          <p className="description">
            The man with a mission is a business tycoon, yet a social activist at heart. He has led 
            Sanjiv Prakashan (the biggest publishing house in Rajasthan) as a co-partner to enviable 
            heights of glory. He has infused his legendary insight into the realm of education, steering 
            this sector into challenging waters and expanding its vision and dimensions within this vast domain.
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>

        {/* Directors - Appear in a row below Chairman */}
        <div className="directors-container">
          {[{ name: "Yash Mittal", role: "Director", image: sir, description: "He is ambitious and a fresh prospect for transforming young India. As the youngest director, graduated from Middlesex University, Dubai, specialized in Computer Systems Engineering, he provides valuable insights to Mittsure Technologies to spearhead the growth of new avenues and business opportunities." },
            { name: "Ishita Mittal", role: "Director", image: mam, description: "She is always at the forefront of creating new frontiers and loves to lead from the front. As the Director and a Computer Science graduate, she is a visionary who is charting the new growth path for Mittsure Technologies with grace and elegance." }]
            .map((member, index) => (
              <div className="director-card" key={index}>
                <img src={member.image} alt={member.name} className="team-photo" />
                <h1>{member.name}</h1>
                <p className="role">{member.role}</p>
                <p className="description">{member.description}</p>
                <div className="social-icons">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-linkedin"></i>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leader;