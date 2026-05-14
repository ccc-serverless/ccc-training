import { useState, useEffect } from "react";
import style from "./StudentRegistrations.module.scss";

import * as yup from "yup";
import clsx from "clsx";

import BasicDetails from "./BasicDetails";
import TechDetails from "./TechDetails";

const keys = [
  [
    "inviteCode",
    "education",
    "goal",
    "name",
    "gender",
    "dob",
    "collgRegistrationNo",
    "collgEmail",
    "degree",
    "branchName",
    "university",
    "currSemester",
    "collgPassoutYear",
    "currCgpa",
    "personalEmail",
    "phoneNumber",
    "percentClass10",
    "percentClass12",
    "hindiLang",
    "regionalLangName1",
  ],
  [],
];

const validationRules = {
  inviteCode: yup.string().required("*Please enter invite code"),
  education: yup.string().required("*Please select one"),
  goal: yup.object().required("*Please select one"),
  name: yup.string().required("*Please enter full name"),
  gender: yup.string().required("*Please select one"),
  collgRegistrationNo: yup.string().required("*Please enter registration number"),
  collgEmail: yup
    .string()
    .email("*Please enter valid email")
    .required("*Please enter valid email"),
  degree: yup.string().required("*Please select one"),
  branchName: yup.string().required("*Please select one"),
  university: yup.string().required("*Please select one"),
  currSemester: yup.string().required("*Please select one"),
  collgPassoutYear: yup.string().required("*Please select one"),
  currCgpa: yup
    .string()
    .required("Please enter current CGPA")
    .matches(/^[0-9](\.[0-9]{1,2})?$|^4(\.[0]{1,2})?$/, "Enter correct CGPA value"),
  personalEmail: yup
    .string()
    .email("*Please enter valid email")
    .required("*Please enter valid email"),
  phoneNumber: yup
    .number()
    .required("*Please enter phone number")
    .typeError("*Please enter valid phone number"),
  percentClass10: yup
    .string()
    .required("*Please enter class 10 percentage")
    .matches(
      /^(?:100(?:\.0{1,2})?|[0-9]{1,2}(?:\.[0-9]{1,2})?)$/,
      "Please enter correct value"
    ),
  percentClass12: yup
    .string()
    .required("*Please enter class 12 percentage")
    .matches(
      /^(?:100(?:\.0{1,2})?|[0-9]{1,2}(?:\.[0-9]{1,2})?)$/,
      "Please enter correct value"
    ),
  regionalLangName1: yup.string().required("*Please select one"),
  githubUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Please enter correct url"
    )
    .required("*Please enter github profile url"),
  linkedinUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Please enter correct url"
    )
    .required("*Please enter linkedin profile url"),

  internshipCount: yup.number().required("Please select one"),
  hackathonCount: yup.number().required("Please select one"),
  projectCount: yup.number().required("Please select one"),
};

export default function StudentRegistrations() {
  const [validationErrors, setValidationErrors] = useState({});
  const [stepper, setStepper] = useState({
    1: { isActive: true, isDone: false },
    2: { isActive: false, isDone: false },
  });

  const [formData, setFormData] = useState({
    dob: new Date(),
    entrepreneurshipExp: "No",
  });

  const [isFormError, setIsFormError] = useState(false);

  function onChangeForm(e) {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") return;

    setValidationErrors((prev) => ({ ...prev, [name]: null }));

    if (value !== null && value !== undefined)
      setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handlChangeDob(date) {
    setFormData((prev) => ({ ...prev, dob: date }));
  }

  function handleChangeDropdown(e, type) {
    setValidationErrors((prev) => ({ ...prev, [type]: null }));
    setFormData((prev) => ({ ...prev, [type]: e.value }));
  }

  function onChangeCheckbox(e, group, name) {
    setValidationErrors((prev) => ({ ...prev, [name]: null }));
    setFormData((prev) => ({
      ...prev,
      [group]: { ...prev[group], [name]: e.target.checked },
    }));
  }

  function handleClickNext(e) {
    e.preventDefault();
    setValidationErrors({});
    setIsFormError(false);

    let validationRulesActive = {};
    keys[0].forEach((key) => {
      validationRulesActive[key] = validationRules[key];
    });

    const validationSchema = yup.object().shape({
      ...validationRulesActive,
    });

    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      window.scrollTo(0, 0);
      setStepper({
        1: { isActive: false, isDone: true },
        2: { isActive: true, isDone: false },
      });
    } catch (err) {
      let errs = {};
      err.inner.forEach((er) => {
        errs[er.path] = er;
      });

      setIsFormError(true);
      setValidationErrors(errs);
    }
  }

  function validateForm() {
    let validationRulesActive = {};
    for (const key in formData) {
      if (formData[key] !== null) validationRulesActive[key] = validationRules[key];
    }

    const validationSchema = yup.object().shape({
      ...validationRulesActive,
    });

    try {
      validationSchema.validateSync(formData, { abortEarly: false });
    } catch (err) {
      let errs = {};
      setIsFormError(true);

      err.inner.forEach((er) => {
        errs[er.path] = er;
      });

      setValidationErrors(errs);
    }
  }

  useEffect(() => {
    validateForm();
  }, [formData]);

  function onSubmitForm(e) {
    e.preventDefault();
    setValidationErrors({});
    setIsFormError(false);

    const validationSchema = yup.object().shape({ ...validationRules });
    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      if (!formData.termsAndCond || !formData.termsAndCond.isAccept) {
        return setValidationErrors((prev) => ({
          ...prev,
          termsAndCond: { message: "Please check this to proceed" },
        }));
      }

      alert("Done");
    } catch (err) {
      let errs = {};
      err.inner.forEach((er) => {
        errs[er.path] = er;
      });

      setIsFormError(true);
      setValidationErrors(errs);
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.inner}>
        <header>Student Registrations</header>

        <div className={style.stepperWrapper}>
          <div className={style.stepper}>
            <div
              className={clsx(
                style.circleStep,
                stepper[1].isActive && style.isActive,
                stepper[1].isDone && style.isDone
              )}
            >
              <span className={style.circle}>1</span>
              <span className={style.text}>Basic Details</span>
            </div>

            <span className={clsx(style.line, stepper[1].isDone && style.isDone)}></span>

            <div
              className={clsx(
                style.circleStep,
                stepper[2].isActive && style.isActive,
                stepper[2].isDone && style.isDone
              )}
            >
              <span className={style.circle}>2</span>
              <span className={style.text}>Technical Details</span>
            </div>
          </div>
        </div>

        <form onChange={onChangeForm}>
          {stepper[2].isActive ? (
            <TechDetails
              onSubmit={onSubmitForm}
              onChangeDropdown={handleChangeDropdown}
              onChangeCheckbox={onChangeCheckbox}
              validationErrors={validationErrors}
              formData={formData}
              isFormError={isFormError}
            />
          ) : (
            <BasicDetails
              formData={formData}
              onChangeDob={handlChangeDob}
              onClickNext={handleClickNext}
              onChangeDropdown={handleChangeDropdown}
              onChangeCheckbox={onChangeCheckbox}
              validationErrors={validationErrors}
              onChangeForm={onChangeForm}
              isFormError={isFormError}
            />
          )}
        </form>
      </div>
    </div>
  );
}
