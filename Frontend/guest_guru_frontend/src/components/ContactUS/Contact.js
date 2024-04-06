import React from 'react'
import './Contact.css';
import Logo from "../Assets/logo.png"

function Contact() {
    return (
        <div>
            <div className="container-contact">
                <div className="content-contact">
                    <div className="left-side">
                        <div>
                            <img src={Logo} alt="" srcset="" width={'175px'} />
                        </div>
                        <div className="address-details">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="topic">Address</div>
                            <div className="text-one">Surkhet, NP12</div>
                            <div className="text-two">Birendranagar 06</div>
                        </div>
                        <div className="phone">
                            <i className="fas fa-phone-alt"></i>
                            <div className="topic">Phone</div>
                            <div className="text-one">+0098 9893 5647</div>
                            <div className="text-two">+0096 3434 5678</div>
                        </div>
                        <div className="email-contact">
                            <i className="fas fa-envelope"></i>
                            <div className="topic">Email</div>
                            <div className="text-one">codinglab@gmail.com</div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="topic-text">Send us a message</div>
                        <p>If you have any work from me or any types of queries related to my tutorial, you can send me a message from here. It's my pleasure to help you.</p>
                        <form action="#">

                            <div className="contact-field">
                                <div className='input-box'>
                                    <div>
                                        <p>Full Name</p>
                                        <input className='design-contact' type="text" placeholder="Enter your Full Name" />
                                    </div>

                                    <div>
                                        <p>Email Address</p>
                                        <input className='design-contact' type="text" placeholder="Enter your Email" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-box">
                                <div className='long'>
                                    <p>Subject</p>
                                    <input className='design-contact' type="text" placeholder="Subject" />
                                </div>
                            </div>

                            <div className="input-box">
                                <div className='long'>
                                    <p>Message</p>
                                    <input className='design-contact' type="text" placeholder="Message" />
                                </div>
                            </div>

                            <div className="button">
                                <input type="button" value="Send Now" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;