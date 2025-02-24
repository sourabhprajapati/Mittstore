import React from "react";
import "./EnquiryForm.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ContactImage from "../../assets/lets.jpg";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";

const EnquiryForm = () => {
    return (
        <>
            <Header />
            <div className="box5">
            <div className="contact-container">
                <div className="contact-box">
                    {/* Left Section - Contact Form */}
                    <div className="left-section">
                        <h2>Let's Discuss</h2>
                        <p>
                            To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly.
                        </p>
                        <form>
                            <input type="text" placeholder="Your Name" required />
                            <input type="email" placeholder="Your Email" required />
                            <textarea placeholder="Your Message" required></textarea>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>

                    {/* Right Section - Image and Contact Details */}
                    <div className="right-section">
                        <img src={ContactImage} alt="Contact Illustration" className="contact-image" />
                        <div className="info">
                            <p>
                                <FaMapMarkerAlt /> S-14, 3rd floor, Mangal Marg, Bapu Nagar, Jaipur (Raj.)
                            </p>
                            <p>
                                <FaPhoneAlt /> 7374003601
                            </p>
                            <p>
                                <FaEnvelope /> info@mittsure.com
                            </p>
                        </div>
                        <div className="social-icons">
                            <FaFacebook />
                            <FaTwitter />
                            <FaInstagram />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </>

    );
};

export default EnquiryForm;