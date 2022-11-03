import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getUserDetails, addReport } from "../../redux/StoreUsers/usersActions";
import axios from "axios";
import { TextField } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./ProblemReport.css";
import Loader from "../Loader/Loader";

export default function ProblemReport() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedUser, profile } = useSelector((state) => state.users);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    subject: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

    window.scrollTo(0, 0);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validations(e.target.name, e.target.value);
    if (errors.msg) {
      delete errors.msg;
      setErrors({ ...errors });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if (accessToken) {

    const subject = input.subject;
    const description = input.description;
    dispatch(addReport(subject, description, accessToken));
    setInput({
      subject: "",
      description: "",
    });
    history.push("/report-successfully");
    setMsg("Your report has been submitted!");
  }

  function handleClose() {
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{ width: "50px" }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function validations(name, value) {
    if (name === "fullname") {
      if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(value))
        return setErrors({
          ...errors,
          [name]:
            "Full name can't contain numbers or special characters. A whitespace between words is allowed.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+[^\.]$/.test(value))
        return setErrors({
          ...errors,
          [name]: "Must be a valid e-mail.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
    if (name === "subject") {
      if (!value.length)
        return setErrors({
          ...errors,
          [name]: "Subject is required.",
        });
      delete errors[name];
      return setErrors({ ...errors });
    }
    if (name === "description") {
      if (value.length < 30 || value.length > 300)
        return setErrors({
          ...errors,
          [name]: "Description must contain between 30 and 300 characters.",
        });
      delete errors[name];
      return setErrors({ ...errors });
    }
  }
  console.log(profile);

  useEffect(() => {
    if (!Object.keys(loggedUser).length > 0) history.push("/");
    dispatch(getUserDetails(loggedUser.id, accessToken));
  }, [dispatch, loggedUser]);

  return (<div className="mainAbout">
    <>
      
        <section className="sectionReport">
          <div className="divReport">
            <button
              className="closeBtn"
              type="button"
              onClick={(e) => history.push("/")}
            >
              X
            </button>
            <h1 style={{ fontSize: "1.8em" }}>
              <b>Report a problem</b>
            </h1>
            <form onSubmit={handleSubmit} className="formReport">
            <div className="acomodoInputsReport">
                <div><p>Full name</p></div>
                <div className="acomodoContenedorInputsReport">
                <TextField
                  sx={{ m: 0 }}
                  className="inputReport"
                  label=""
                  autoComplete="off"
                  onChange={handleChange}
                  name="fullname"
                  type="text"
                  value={`${profile.firstName} ${profile.lastName}`}
                  placeholder={`${profile.firstName} ${profile.lastName}`}
                  inputProps={{ maxLength: 40 }}
                  error={errors.fullname ? true : false}
                  helperText={errors.fullname ? `${errors.fullname}` : null}
                  disabled={true}
                />
                </div>
              </div>

              <div className="acomodoInputsReport">
                <div><p>E-mail</p></div>
                <div className="acomodoContenedorInputsReport">
                <TextField
                  sx={{ m: 0 }}
                  className="inputReport"
                  label=""
                  autoComplete="off"
                  onChange={handleChange}
                  name="email"
                  type="text"
                  value={profile.email}
                  placeholder={profile.email}
                  inputProps={{ maxLength: 40 }}
                  error={errors.email ? true : false}
                  helperText={errors.email ? `${errors.email}` : null}
                  disabled={true}
                />
                </div>
              </div>

              <div className="acomodoInputsReport">
                <div><p>Subject</p></div>
                <div className="acomodoContenedorInputsReport">
                <TextField
                  sx={{ m: 0 }}
                  className="inputReport"
                  label="Subject"
                  autoComplete="off"
                  onChange={handleChange}
                  name="subject"
                  type="text"
                  value={input.subject}
                  placeholder="Reason for reporting"
                  inputProps={{ maxLength: 50 }}
                  error={errors.subject ? true : false}
                  helperText={errors.subject ? `${errors.subject}` : null}
                />
                </div>
              </div>
              
              <div className="acomodoInputsReport">
                <div className="acomodoContenedorInputsReport">
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={5}
                  maxLength={300}
                  placeholder="Description..."
                  className="textareaAutosizex"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  // error={errors.description ? true : false}
                  // helperText={errors.description ? `${errors.description}` : null}
                />
                </div>
                <div>
                  <p style={{ fontSize: "0.8em", justifyContent: "center"}}>Description must contain between 30 and 300 characters.</p>
                </div>
              </div>

              <div className="divBtnReport">
                <button
                  disabled={
                    JSON.stringify(errors) !== "{}" ||
                    // !input.fullname ||
                    // !input.email ||
                    !input.subject ||
                    !input.description
                  }
                  type="submit"
                >
                  Submit
                </button>
              </div>


            </form>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={msg}
            action={action}
          />
        </section>
      
    </>
    </div>
  );
}
