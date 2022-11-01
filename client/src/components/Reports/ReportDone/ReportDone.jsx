import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import img from "../../../sourceImg/logo3.png";
import "./ReportDone.css";

export default function ReportDone() {
  const history = useHistory();
  const { loggedUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (!Object.keys(loggedUser).length > 0) history.push("/");
  }, []);

  return (
    <>
      <section className="reportModal">
        <div className="divReportModal">
          <img src={img} alt="" className="imgReportModal" />
          <h2>
            <b>Your report has been sent</b>
          </h2>
          <h3>Thanks for contact us!</h3>
          <button
            className="btnHome"
            type="button"
            onClick={() => {
              history.push("/");
            }}
          >
            <b>GO HOME</b>
          </button>
        </div>
      </section>
    </>
  );
}
