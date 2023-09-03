import Image from "next/image";
import pen from "../../../public/images/pen.png";
import screen from "../../../public/images/screen.png";
import store from "../../../public/images/store.png";
import Subject from "@/components/Subject";

function Skills() {
  return (
    <>
      <Subject title="Front-end skills" />
      <section className="skills-section">
        <div className="skills-box">
          <h3 className="title">what do i do ?</h3>
          <div className="progress-bar about">
            <div className="progress-fill"></div>
          </div>
          <div className="icon-title-description-container">
            <Image src={pen} alt="pen" />
            <div className="title-desciption-container">
              <h4 className="skill-title">Design Analysis and Optimization</h4>
              <p className="skill-description">
                My process begins with a detailed analysis of your Figma design,
                optimizing its elements to ensure a smooth and efficient
                transition to functional code.
              </p>
            </div>
          </div>
          <div className="icon-title-description-container">
            <Image src={screen} alt="screen" />
            <div className="title-desciption-container">
              <h4 className="skill-title">Precise Conversion to Code</h4>
              <p className="skill-description">
                I meticulously convert your Figma design into high-quality HTML,
                CSS, and JavaScript code, capturing every detail and ensuring a
                seamless user experience.
              </p>
            </div>
          </div>
          <div className="icon-title-description-container">
            <Image src={store} alt="store" />
            <div className="title-desciption-container">
              <h4 className="skill-title">
                Rigorous Testing and Quality Assurance
              </h4>
              <p className="skill-description">
                Before deployment, I subject the code to rigorous testing,
                thoroughly examining its behavior across different devices and
                browsers to guarantee flawless functionality.
              </p>
            </div>
          </div>
        </div>
        <div className="skills-box">
          <p className="title">Coding skills</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="skill-rate-box">
            <div className="skill-rate-container">
              <div className="title-desciption-container">
                <div className="title-rate-container">
                  <p className="skill-title">html</p>
                  <p className="skill-rate">100%</p>
                </div>
                <div className="skill-line-html-background">
                  <div className="skill-line-html"></div>
                </div>
              </div>
            </div>
            <div className="skill-rate-container">
              <div className="title-desciption-container">
                <div className="title-rate-container">
                  <p className="skill-title">css</p>
                  <p className="skill-rate">90%</p>
                </div>
                <div className="skill-line-css-background">
                  <div className="skill-line-css"></div>
                </div>
              </div>
            </div>
            <div className="skill-rate-container">
              <div className="title-desciption-container">
                <div className="title-rate-container">
                  <p className="skill-title">Javascript</p>
                  <p className="skill-rate">90%</p>
                </div>
                <div className="skill-line-css-background">
                  <div className="skill-line-css"></div>
                </div>
              </div>
            </div>
            <div className="skill-rate-container">
              <div className="title-desciption-container">
                <div className="title-rate-container">
                  <p className="skill-title">Typescript</p>
                  <p className="skill-rate">90%</p>
                </div>
                <div className="skill-line-css-background">
                  <div className="skill-line-css"></div>
                </div>
              </div>
            </div>
            <div className="skill-rate-container">
              <div className="title-desciption-container">
                <div className="title-rate-container">
                  <p className="skill-title">Nextjs</p>
                  <p className="skill-rate">90%</p>
                </div>
                <div className="skill-line-css-background">
                  <div className="skill-line-css"></div>
                </div>
              </div>
            </div>
            <div className="skill-rate-container">
              <div className="title-desciption-container">
                <div className="title-rate-container">
                  <p className="skill-title">scss</p>
                  <p className="skill-rate">90%</p>
                </div>
                <div className="skill-line-css-background">
                  <div className="skill-line-css"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;
