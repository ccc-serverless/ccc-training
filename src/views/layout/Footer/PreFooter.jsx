import style from "./PreFooter.module.scss";

import CollegesImg from "assets/images/landing/colleges.webp";
import CompaniesImg from "assets/images/landing/companies.webp";
import PrefooterBannerImg from "assets/images/landing/prefooterBanner.webp";

export default function PreFooter() {
  return (
    <div className={style.wrapper}>
      <section className={style.insts}>
        <h1>We partner & train students primarily from premier Institutes in India</h1>
        <p>
          Students from 135 Institutions / Universities have benefitted from our trainings
        </p>
        <img src={CollegesImg} alt="colleges" />
        <div className={style.footer}>125+ more Institutions</div>
      </section>

      <section className={style.companies}>
        <h1>Our Alumni work at the best companies in the world</h1>
        <p>
          Our 521008+ alumni have got placed in 758 companies with 1.22Crs as highest
          package
        </p>
        <img src={CompaniesImg} alt="colleges" />
      </section>

      <div className={style.footer}>730+ more Companies</div>

      <div className={style.banner}>
        <img src={PrefooterBannerImg} alt="banner" />
      </div>
    </div>
  );
}
