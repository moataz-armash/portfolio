import Image from "next/image";
import pen from "../../../public/pen.png";
import screen from "../../../public/screen.png";
import store from "../../../public/store.png";
import Subject from "@/components/Subject";

function Skills() {
  return (
    <>
      <Subject title="Front-end skills" />
      <div className="skills-container">
        <div className="skills">
          <p className="title">what do i do ?</p>
          <div className="score-line"></div>
          <div className="icon-title-description-container">
            {/* <div className="icon"></div> */}
            <Image src={pen} alt="pen" />
            <div className="title-desciption-container">
              <p className="skill-title">HTML, CSS, Javascript</p>
              <p className="skill-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                quia error deserunt qui, sunt perspiciatis assumenda nesciunt,
                reprehenderit facilis illo ut pariatur nobis! Magni ducimus
                omnis eius velit illo autem.
              </p>
            </div>
          </div>
          <div className="icon-title-description-container">
            {/* <div className="icon"></div> */}
            <Image src={screen} alt="screen" />
            <div className="title-desciption-container">
              <p className="skill-title">HTML, CSS, Javascript</p>
              <p className="skill-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                quia error deserunt qui, sunt perspiciatis assumenda nesciunt,
                reprehenderit facilis illo ut pariatur nobis! Magni ducimus
                omnis eius velit illo autem.
              </p>
            </div>
          </div>
          <div className="icon-title-description-container">
            {/* <div className="icon"></div> */}
            <Image src={store} alt="store" />
            <div className="title-desciption-container">
              <p className="skill-title">HTML, CSS, Javascript</p>
              <p className="skill-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                quia error deserunt qui, sunt perspiciatis assumenda nesciunt,
                reprehenderit facilis illo ut pariatur nobis! Magni ducimus
                omnis eius velit illo autem.
              </p>
            </div>
          </div>
        </div>
        <div className="skills">
          <p className="title">Coding skills</p>
          <div className="score-line"></div>
          <div className="icon-title-description-container">
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
          <div className="icon-title-description-container">
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
          <div className="icon-title-description-container">
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
          <div className="icon-title-description-container">
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
          <div className="icon-title-description-container">
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
          <div className="icon-title-description-container">
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
    </>
  );
}

export default Skills;
