import style from "./BasicDetails.module.scss";

import clsx from "clsx";
import { BsArrowRightCircle } from "react-icons/bs";

import Input from "./Input";
import InputCheckbox from "./InputCheckbox";
import InputDate from "./InputDate";
import InputRadio from "./InputRadio";
import InputSelect from "./InputSelect";
import InputPhone from "./InputPhone";

const OPT_EDUCATION = [
  { label: "Pursuing Graduation", value: "grad" },
  { label: "Pursuing Post Graduation", value: "postgrad" },
  { label: "Completed education & looking for a job", value: "job" },
];

const OPT_GENDER = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const OPT_DEGREE = [
  { label: "BCA", value: "BCA" },
  { label: "BE", value: "BE" },
  { label: "B.Tech", value: "BTECH" },
  { label: "BSC", value: "BSC" },
  { label: "MCA", value: "MCA" },
  { label: "ME", value: "ME" },
  { label: "MBA", value: "MBA" },
  { label: "M.Tech", value: "MTECH" },
];

const OPT_BRANCH = [
  { label: "Computer Science", value: "CSE" },
  { label: "Software Engineering", value: "Software Eng" },
];

const OPT_UNIV = [
  { label: "Computer Science", value: "CSE" },
  { label: "Software Engineering", value: "Software Eng" },
];

const OPT_LANG = [
  { label: "Bengali", value: "Bengali" },
  { label: "Marathi", value: "Marathi" },
  { label: "Telugu", value: "Telugu" },
  { label: "Tamil", value: "Tamil" },
  { label: "Gujrati", value: "Gujrati" },
  { label: "Urdu", value: "Urdu" },
  { label: "Kannada", value: "Kannada" },
  { label: "Odia", value: "Odia" },
  { label: "Malayalam", value: "Malayalam" },
];

const OPT_SEM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
  label: num,
  value: num,
}));

let OPT_PASS_YEAR = [];
for (let i = 2000; i < 2022; i++) {
  OPT_PASS_YEAR.push({ label: i, value: i });
}

export default function BasicDetails({
  onClickNext,
  formData,
  onChangeDob,
  onChangeDropdown,
  onChangeCheckbox,
  onChangeForm,
  validationErrors,
  isFormError,
}) {
  return (
    <div className={style.wrapper}>
      <section>
        <div className={style.regisCode}>
          <div className={style.row}>
            <Input
              label="My invite-only registration code*"
              type="text"
              placeholder="Type code recieved for registration"
              name="inviteCode"
              validationErrors={validationErrors}
            />
          </div>
        </div>
      </section>

      <section>
        <div className={style.row}>
          <InputRadio
            label={"I am currently..."}
            name="education"
            options={OPT_EDUCATION}
            validationErrors={validationErrors}
            onChange={onChangeCheckbox}
          />
        </div>

        <div className={clsx(style.row, style.rowGoalCheckboxes)}>
          <label style={{ marginBottom: "1em" }}>My goal is...</label>
          <div className={style.goalCheckboxes}>
            <InputCheckbox
              row
              group="goal"
              name="start-company"
              label="Start a company"
              style={{ marginBottom: "0.5em" }}
              onChange={onChangeCheckbox}
            />
            <InputCheckbox
              row
              group="goal"
              name="higher-education"
              label="Higher Education"
              style={{ marginBottom: "0.5em" }}
              onChange={onChangeCheckbox}
            />
            <InputCheckbox
              row
              group="goal"
              name="good-job"
              label="Get a good job"
              style={{ marginBottom: "0.5em" }}
              onChange={onChangeCheckbox}
            />

            <InputCheckbox
              row
              group="goal"
              name="not-decided"
              label="Not yet decided"
              onChange={onChangeCheckbox}
            />
          </div>
        </div>

        <div className={style.row}>
          <Input
            label="Full Name (As per your govt. ID )*"
            type="text"
            placeholder="Full Name"
            name="name"
            validationErrors={validationErrors}
          />
        </div>

        <div className={clsx(style.row, style.rowGenderDate)}>
          <InputRadio
            validationErrors={validationErrors}
            className={style.genderWrapper}
            label={"Gender"}
            name="gender"
            options={OPT_GENDER}
            row
          />

          <InputDate
            validationErrors={validationErrors}
            name="dob"
            className={style.genderWrapper}
            label={"Date of Birth*"}
            onChange={onChangeDob}
            value={formData.dob}
          />
        </div>
      </section>

      <section>
        <div className={style.row}>
          <Input
            label="College Registration Number*"
            type="text"
            placeholder="Registration Number"
            name="collgRegistrationNo"
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <Input
            label="College Email Address*"
            type="text"
            placeholder="Email Address"
            name="collgEmail"
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <InputSelect
            options={OPT_DEGREE}
            label="Degree*"
            placeholder="Select Degree"
            name="degree"
            onChange={onChangeDropdown}
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <InputSelect
            options={OPT_BRANCH}
            label="Branch Name*"
            placeholder="Select Branch"
            name="branchName"
            onChange={onChangeDropdown}
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <InputSelect
            options={OPT_UNIV}
            label="University / College Name*"
            placeholder="Select Branch"
            name="university"
            onChange={onChangeDropdown}
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <InputSelect
            options={OPT_SEM}
            label="Current Semester*"
            placeholder="Select Branch"
            name="currSemester"
            onChange={onChangeDropdown}
            validationErrors={validationErrors}
          />

          <InputSelect
            options={OPT_PASS_YEAR}
            label="College Passing out Year*"
            placeholder="Select Branch"
            name="collgPassoutYear"
            onChange={onChangeDropdown}
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <Input
            label="Current Overall CGPA*"
            type="text"
            placeholder="CGPA"
            name="currCgpa"
            validationErrors={validationErrors}
            className={style.inputCgpa}
          />
        </div>
      </section>

      <section>
        <div className={style.row}>
          <Input
            label="Personal Email Address*"
            type="text"
            placeholder="Personal Email Address"
            name="personalEmail"
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <InputPhone
            label="Phone Number*"
            value={formData.phoneNumber}
            name="phoneNumber"
            onChange={onChangeForm}
            validationErrors={validationErrors}
          />
        </div>

        <div className={style.row}>
          <Input
            label="Percentage in Class 10th*"
            type="number"
            placeholder="Class 10 Percent"
            name="percentClass10"
            validationErrors={validationErrors}
          />
          <Input
            label="Percentage in Class 12th*"
            type="number"
            placeholder="Class 12 Percent"
            name="percentClass12"
            validationErrors={validationErrors}
          />
        </div>
      </section>

      <section>
        <div className={style.row}>
          <div className={style.langSelect}>
            <Input className={style.inputHindi} value="Hindi" disabled />
          </div>
          <div className={clsx(style.langCheckboxes, style.first)}>
            <InputCheckbox
              label={"Reading"}
              group="hindiLang"
              name="reading"
              onChange={onChangeCheckbox}
            />
            <InputCheckbox
              label={"Writing"}
              group="hindiLang"
              name="writing"
              onChange={onChangeCheckbox}
            />
            <InputCheckbox
              label={"Speaking"}
              onChange={onChangeCheckbox}
              group="hindiLang"
              name="speaking"
            />
          </div>
        </div>

        <div className={style.row}>
          <div className={style.langSelect}>
            <InputSelect
              label="Regional Language 1*"
              options={OPT_LANG}
              onChange={onChangeDropdown}
              validationErrors={validationErrors}
              name="regionalLangName1"
            />
          </div>
          <div className={style.langCheckboxes}>
            <InputCheckbox
              group="regionalLang1"
              name="reading"
              label={"Reading"}
              onChange={onChangeCheckbox}
            />
            <InputCheckbox
              group="regionalLang1"
              name="writing"
              label={"Writing"}
              onChange={onChangeCheckbox}
            />
            <InputCheckbox
              group="regionalLang1"
              name="speaking"
              label={"Speaking"}
              onChange={onChangeCheckbox}
            />
          </div>
        </div>

        <div className={style.row}>
          <div className={style.langSelect}>
            <InputSelect
              label="Regional Language 2 (optional)"
              options={OPT_LANG}
              onChange={onChangeDropdown}
              validationErrors={validationErrors}
              name="regionalLangName2"
            />
          </div>
          <div className={style.langCheckboxes}>
            <InputCheckbox
              label={"Reading"}
              onChange={onChangeCheckbox}
              group="regionalLang2"
              name="reading"
            />
            <InputCheckbox
              label={"Writing"}
              onChange={onChangeCheckbox}
              group="regionalLang2"
              name="writing"
            />
            <InputCheckbox
              label={"Speaking"}
              onChange={onChangeCheckbox}
              group="regionalLang2"
              name="speaking"
            />
          </div>
        </div>

        <div className={style.row}>
          <div className={style.langSelect}>
            <InputSelect
              label="Foreign Language (optional)"
              options={OPT_LANG}
              onChange={onChangeDropdown}
              name={"foreignLangName"}
              validationErrors={validationErrors}
            />
          </div>
          <div className={style.langCheckboxes}>
            <InputCheckbox
              label={"Reading"}
              onChange={onChangeCheckbox}
              group="foreignLang"
              name="reading"
            />
            <InputCheckbox
              label={"Writing"}
              onChange={onChangeCheckbox}
              group="foreignLang"
              name="writing"
            />
            <InputCheckbox
              label={"Speaking"}
              onChange={onChangeCheckbox}
              group="foreignLang"
              name="speaking"
            />
          </div>
        </div>

        <div className={style.row}>
          <button onClick={onClickNext} className={style.submitBtn}>
            Next <BsArrowRightCircle />
          </button>
        </div>
        {isFormError && (
          <p className={style.error}>
            *Please fill all the fields appropriately and try again
          </p>
        )}
      </section>
    </div>
  );
}
