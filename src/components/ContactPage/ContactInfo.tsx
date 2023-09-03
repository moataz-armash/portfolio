import Image from "next/image";
import location from "../../../public/images/location.png";
import phone from "../../../public/images/phone.png";
import mail from "../../../public/images/mail.png";
function ContactInfo() {
  const rowsvalue = 3;
  const columnsvalue = 35;
  return (
    <>
      <div className="contact-massege-box">
        <div className="first-contact-container">
          <div className="info-container">
            <Image className="image-icon" src={phone} alt="phone" />
            <div className="phone-number">05388970925</div>
          </div>
          <div className="info-container">
            <Image className="image-icon" src={location} alt="phone" />
            <div className="phone-number">Sakarya, Turkey</div>
          </div>
          <div className="info-container">
            <Image className="image-icon" src={mail} alt="phone" />
            <div className="phone-number">moatazarmash@gmail.com</div>
          </div>
        </div>
        <div className="second-contact-container">
          {/* <div className="massege-box-container"> */}
          <div className="contact-me">
            <p className="title">Contact me !</p>
            <div className="progress-bar contact">
              <div className="progress-fill"></div>
            </div>
          </div>
          <div className="input-container">
            <input type="text" placeholder="Enter your Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Website Type" />
            <textarea
              placeholder="Start Writing Now..."
              rows={rowsvalue}
              cols={columnsvalue}></textarea>
          </div>
          <div className="buttons">
            <button className="send-btn">Send</button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ContactInfo;
