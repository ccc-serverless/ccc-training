import style from "./Internships.module.scss";
import Grow from "@material-ui/core/Grow";
import { Eye, MousePointer, Search, ArrowRightCircle } from "react-feather";

import heroImgOne from "assets/images/internships/topleft.svg";
import heroImgTwo from "assets/images/internships/topright.svg";
import heroTriangle from "assets/images/internships/mobileTriangle.svg";
import heroSquare from "assets/images/internships/mobileSquare.svg";
import heroBottom from "assets/images/internships/mobileBottom.svg";

export default function Internships() {
  return (
    <div className={style.wrapper}>
      <div className={style.heroWrapper}>
        <div className={style.hero}>
          <p>Internships Encyclopedia</p>
          <p className={style.subTitle}>
            One stop internships hub for students and professionals.
          </p>
          <div className={style.heroSearch}>
            <div className={style.searchBar}>
              <Search />
              <form>
                <input
                  type="text"
                  name="searchString"
                  placeholder="Search for internships"
                />
              </form>
            </div>
          </div>
        </div>

        <img className={style.heroLeft} src={heroImgOne} alt="" />
        <img className={style.heroRight} src={heroImgTwo} alt="" />
        <img
          className={`${style.heroMobile} ${style.heroTriangle}`}
          src={heroTriangle}
          alt=""
        />
        <img
          className={`${style.heroMobile} ${style.heroSquare}`}
          src={heroSquare}
          alt=""
        />
        <img
          className={`${style.heroMobile} ${style.heroBottom}`}
          src={heroBottom}
          alt=""
        />
      </div>
      <div className={style.tabs}>
        <button>
          {/* <img src={mathsButton} alt="" /> */}
          Internships
        </button>
        <button>
          {/* <div className={style.disabled}></div> */}
          {/* <img src={codingButton} alt="" /> */}
          Projects
        </button>
      </div>

      <div className={style.cards}>
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <div className={style.card}>
            <div className={style.top}>{/* <img src={card.image} alt="" /> */}</div>
            <div className={style.bottom}>
              <p className={style.title}>{"Some Name"}</p>
              <p className={style.count}>
                <Eye /> {1200}
              </p>
            </div>
          </div>
        </Grow>
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <div className={style.card}>
            <div className={style.top}>{/* <img src={card.image} alt="" /> */}</div>
            <div className={style.bottom}>
              <p className={style.title}>{"Some Name"}</p>
              <p className={style.count}>
                <Eye /> {1200}
              </p>
            </div>
          </div>
        </Grow>

        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <div className={style.card}>
            <div className={style.top}>{/* <img src={card.image} alt="" /> */}</div>
            <div className={style.bottom}>
              <p className={style.title}>{"Some Name"}</p>
              <p className={style.count}>
                <Eye /> {1200}
              </p>
            </div>
          </div>
        </Grow>
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <div className={style.card}>
            <div className={style.top}>{/* <img src={card.image} alt="" /> */}</div>
            <div className={style.bottom}>
              <p className={style.title}>{"Some Name"}</p>
              <p className={style.count}>
                <Eye /> {1200}
              </p>
            </div>
          </div>
        </Grow>
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <div className={style.card}>
            <div className={style.top}>{/* <img src={card.image} alt="" /> */}</div>
            <div className={style.bottom}>
              <p className={style.title}>{"Some Name"}</p>
              <p className={style.count}>
                <Eye /> {1200}
              </p>
            </div>
          </div>
        </Grow>
      </div>

      <div className={style.preFooter}>
        <div className={style.mission}>
          <div className={style.missionTitle}>
            {/* <img alt="" /> */}
            Our Mission
          </div>
          <p>To provide relevant & updated information around maths & coding</p>

          <button className={style.buttonOverride}>
            Know More <ArrowRightCircle />
          </button>
          {/* <Button
            className={style.buttonOverride}
            onClick={handleKnowMoreModal}
            title="Know More"
            arrow="true"
            background="white-pink"
            radius="25"
          /> */}
        </div>
        <div className={style.line}></div>
        {/* <div className={style.register}>
            <p>Want to join us as a partner & list your offerings?</p>
            <Button
              className={style.buttonOverride}
              title="Register Now"
              arrow="true"
              background="white-pink"
              radius="25"
            />
          </div> */}
      </div>
    </div>
  );
}
