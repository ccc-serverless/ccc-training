import style from "./BasicDetails.module.scss";

import { BsArrowRightCircle } from "react-icons/bs";

import Input from "./Input";
import InputCheckbox from "./InputCheckbox";
// import InputDate from "./InputDate";
// import InputRadio from "./InputRadio";
import InputSelect from "./InputSelect";
import clsx from "clsx";
import InputRadio from "./InputRadio";

const OPT_COUNT = [1, 2, 3, 4, 5, 6];

const OPT_COUNT_INTERNSHIP = OPT_COUNT.map((count) => ({
  label: count.toString(),
  value: count,
})).concat({ label: "7 & above", value: "7+" });

const OPT_COUNT_HACKATHONS = OPT_COUNT.map((count) => ({
  label: count.toString(),
  value: count,
})).concat(
  [8, 9, "10 & Above"].map((count) => ({ label: count, value: count }))
);

const Langs = [
  [
    "C",
    "C++",
    "Javascript",
    "CSS",
    "ReactJS",
    "PHP",
    "SQL",
    "UNIX/Linux",
    "Ruby on Rails",
  ],
  [
    "Java",
    "Python",
    "HTML",
    "NodeJs",
    "Angular",
    "MongoDB",
    "Flutter",
    "Django",
    "R Programming",
  ],
];

const Skills = [
  [
    "Data Structures",
    "Algorithms",
    "DevOps",
    "Blockchain",
    "Git/Github",
    "Rest API",
    "Machine Learning",
    "Artificial Intelligence",
    "DBMS",
    "Web App Development",
    "UI/UX Design",
  ],
  [
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "Unit/Functional Testing",
    "Power BI",
    "Tableau",
    "Cyber Security",
    "Salesforce",
    "Computer Networks",
    "Mobile App Development",
    "AR/VR",
  ],
];

export default function TechDetails({
  onChangeDropdown,
  onChangeCheckbox,
  validationErrors,
  formData,
  onSubmit,
  isFormError,
}) {
  return (
    <div className={style.wrapper}>
      <section>
        <div className={style.row}>
          <Input
            label="Github Profile URL(Optional)"
            placeholder="Type URL"
            name="githubUrl"
            validationErrors={validationErrors}
          />
        </div>
        <div className={style.row}>
          <Input
            label="Linkedin Profile URL(Optional)"
            placeholder="Type URL"
            name="linkedinUrl"
            validationErrors={validationErrors}
          />
        </div>
      </section>

      <section>
        <div className={style.row}>
          <InputSelect
            name="internshipCount"
            label="Internships  Completed*"
            options={OPT_COUNT_INTERNSHIP}
            placeholder="Select Count"
            onChange={onChangeDropdown}
            validationErrors={validationErrors}
          />
          <InputSelect
            name="projectCount"
            label="Projects  Completed*"
            options={OPT_COUNT_HACKATHONS}
            placeholder="Select Count"
            onChange={onChangeDropdown}
            validationErrors={validationErrors}
          />
        </div>

        <div className={clsx(style.row, style.rowHalf)}>
          <InputSelect
            name="hackathonCount"
            label="Hackathons Participated*"
            options={OPT_COUNT_HACKATHONS}
            placeholder="Select Count"
            validationErrors={validationErrors}
            onChange={onChangeDropdown}
          />
        </div>

        <div className={clsx(style.row, style.rowColumn)}>
          <InputRadio
            className={style.genderWrapper}
            label={"Have Entrepreneurship experience?"}
            name="entrepreneurshipExp"
            value={formData.entrepreneurshipExp}
            options={[
              { label: "No", value: "No" },
              { label: "Yes", value: "Yes" },
            ]}
            row
          />
        </div>
      </section>

      <section>
        <label className={style.langLabel}>Language Expertise*</label>
        <div className={clsx(style.row, style.skillCheckboxes)}>
          <div className={style.col}>
            {Langs[0].map((lang) => (
              <InputCheckbox
                row
                group="langExpertise"
                label={lang}
                name={lang}
                onChange={onChangeCheckbox}
              />
            ))}
          </div>
          <div className={style.col}>
            {Langs[1].map((lang) => (
              <InputCheckbox
                row
                group="langExpertise"
                label={lang}
                name={lang}
                onChange={onChangeCheckbox}
              />
            ))}
          </div>
        </div>
        <label className={style.langLabel}>Skills*</label>
        <div className={clsx(style.row, style.skillCheckboxes)}>
          <div className={style.col}>
            {Skills[0].map((lang) => (
              <InputCheckbox
                row
                group="skills"
                label={lang}
                name={lang}
                onChange={onChangeCheckbox}
              />
            ))}
          </div>
          <div className={style.col}>
            {Skills[1].map((lang) => (
              <InputCheckbox
                row
                group="skills"
                label={lang}
                name={lang}
                onChange={onChangeCheckbox}
              />
            ))}
          </div>
        </div>
        <div className={style.row}>
          <button onClick={onSubmit} className={style.submitBtn}>
            Submit <BsArrowRightCircle />
          </button>
        </div>
        <div className={style.footer}>
          <InputCheckbox
            group="termsAndCond"
            name="isAccept"
            onChange={onChangeCheckbox}
          />
          <label>
            By submitting the form you agree to our
            <span className={style.termsText}>Terms & Conditions</span>
          </label>
        </div>

        {isFormError ? (
          <p style={{ color: "red", marginTop: "0.5em" }}>
            *Please fill all the fields appropriately and try again
          </p>
        ) : (
          <>
            {validationErrors["termsAndCond"] && (
              <p style={{ color: "red", marginTop: "0.5em" }}>
                {validationErrors["termsAndCond"].message}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
