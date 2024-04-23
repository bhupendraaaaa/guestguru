import React, {useRef} from 'react'
import './Contact.css';
import Logo from "../Assets/logo.png"
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';


function Contact() {
    const form = useRef();

  const handleSendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_td6ru2v', 'template_i71cv5h', form.current, {
        publicKey: 'yWRT5wPPCx65kemq4',
      })
      .then(
        (result) => {
            console.log(result.text);
            Swal.fire({
                icon: 'success',
                title: 'Email Sent Successfully',
                text: 'Thank you for contacting us. We will get back to you soon.',
            });
            form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
            
        },
      );
  };
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
                            <div className="text-one">9864785154</div>
                            <div className="text-two">9848300000</div>
                        </div>
                        <div className="email-contact">
                            <i className="fas fa-envelope"></i>
                            <div className="topic">Email</div>
                            <div className="text-one">guestguru63@gmail.com</div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="topic-text">Send us a message</div>
                        <p>If you have any work from me or any types of queries related to my tutorial, you can send me a message from here. It's my pleasure to help you.</p>
                        <form action="#" ref={form} 
                        onSubmit={handleSendEmail}
                        >

                            <div className="contact-field">
                                <div className='input-box'>
                                    <div>
                                        <p>Full Name</p>
                                        <input required className='design-contact' type="text" placeholder="Enter your Full Name" name='user_name' />
                                    </div>

                                    <div>
                                        <p>Email Address</p>
                                        <input required className='design-contact' type="text" placeholder="Enter your Email" name='user_email'/>
                                    </div>
                                </div>
                            </div>

                            <div className="input-box">
                                <div className='long'>
                                    <p>Subject</p>
                                    <input required className='design-contact' type="text" placeholder="Subject" name='user_subject' />
                                </div>
                            </div>

                            <div className="input-box">
                                <div className='long'>
                                    <p>Message</p>
                                    <input required className='design-contact' type="text" placeholder="Message" name='message' />
                                </div>
                            </div>

                            <div className="button">
                                <input type="submit" value="Send Now" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;