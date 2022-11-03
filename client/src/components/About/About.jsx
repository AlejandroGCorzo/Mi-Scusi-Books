import React, { useEffect } from "react";
import logo from "../../sourceImg/logo3.png";
import barb from "../../sourceImg/barb.jpg";
import agus from "../../sourceImg/agus.png";
import ale from "../../sourceImg/ale.jpg";
import jano from "../../sourceImg/jano.jpg";
import juan1 from "../../sourceImg/juan1.jpg";
import juan2 from "../../sourceImg/juan2.jpg";
import "./About.css";

export default function About() {
  window.scrollTo(0, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mainAbout">
    <div className="contentMainAbout">
      <div className="containerDescription">
        <img src={logo} alt="" width="210px" style={{ padding: "1em" }} />
        <div className="scusiDescription">
          <span>
            Mi Scusi Books is a book application designed to serve as a bridge
            between the trade and those interested in buying them, with the main
            objective to fully meet the needs of our customers, offering the
            largest assortment of textbooks, reading and digital innovation.
          </span>
        </div>
      </div>

      <div className="containerMembers">

        <div className="divTitles">
          <h2>
            <b>Scusi Team</b>
          </h2>
          <h3>Meet the members behind Mi Scusi Books</h3>
        </div>
      
        <div class="component">
          <ul class="align">
            <li>
              <figure class="book">
                {/* Front */}
                <ul class="hardcover_front">
                  <li>
                    <div class="coverDesign blue">
                      <img
                        src={agus}
                        alt=""
                        width="120px"
                        style={{
                          marginTop: "10px",
                          border: "2px double white",
                        }}
                      />
                      <p>AGUSTIN</p>
                      <p>QUIROGA</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="pageAbout">
                  <li></li>
                  <li>
                    <a
                      class="btn"
                      href="https://www.linkedin.com/in/agust%C3%ADn-quiroga-b8325922b/"
                      target="_blank"
                    >
                      LINKEDIN
                    </a>
                    <br></br>
                    <a
                      class="btn"
                      href="https://github.com/Azthirk"
                      target="_blank"
                    >
                      GITHUB
                    </a>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                {/* Back */}
                <ul class="hardcover_back">
                  <li></li>
                  <li></li>
                </ul>
                <ul class="book_spine">
                  <li></li>
                  <li></li>
                </ul>
              </figure>
            </li>
          </ul>
        </div>
        <div class="component">
          <ul class="align">
            <li>
              <figure class="book">
                {/* Front */}
                <ul class="hardcover_front">
                  <li>
                    <div class="coverDesign blue">
                      <img
                        src={ale}
                        alt=""
                        width="120px"
                        style={{
                          marginTop: "10px",
                          border: "2px double white",
                        }}
                      />
                      <p>ALEJANDRO</p>
                      <p>CORZO</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul className="pageAbout">
                  <li></li>
                  <li>
                    <a
                      class="btn"
                      href="https://www.linkedin.com/in/alejandro-gabriel-corzo/"
                      target="_blank"
                    >
                      LINKEDIN
                    </a>
                    <br></br>
                    <a
                      class="btn"
                      href="https://github.com/AlejandroGCorzo"
                      target="_blank"
                    >
                      GITHUB
                    </a>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                {/* Back */}
                <ul class="hardcover_back">
                  <li></li>
                  <li></li>
                </ul>
                <ul class="book_spine">
                  <li></li>
                  <li></li>
                </ul>
              </figure>
            </li>
          </ul>
        </div>
        <div class="component">
          <ul class="align">
            <li>
              <figure class="book">
                {/* Front */}
                <ul class="hardcover_front">
                  <li>
                    <div class="coverDesign blue">
                      <img
                        src={barb}
                        alt=""
                        width="120px"
                        style={{
                          marginTop: "10px",
                          border: "2px double white",
                        }}
                      />
                      <p>BARBARA</p>
                      <p>CASSIRAM</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="pageAbout">
                  <li></li>
                  <li>
                    <a
                      class="btn"
                      href="https://www.linkedin.com/in/barbara-cassiram"
                      target="_blank"
                    >
                      LINKEDIN
                    </a>
                    <br></br>
                    <a
                      class="btn"
                      href="https://github.com/cassirambd"
                      target="_blank"
                    >
                      GITHUB
                    </a>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                {/* Back */}
                <ul class="hardcover_back">
                  <li></li>
                  <li></li>
                </ul>
                <ul class="book_spine">
                  <li></li>
                  <li></li>
                </ul>
              </figure>
            </li>
          </ul>
        </div>
        <div class="component">
          <ul class="align">
            <li>
              <figure class="book">
                {/* Front */}
                <ul class="hardcover_front">
                  <li>
                    <div class="coverDesign blue">
                      <img
                        src={jano}
                        alt=""
                        width="120px"
                        style={{
                          marginTop: "10px",
                          border: "2px double white",
                        }}
                      />
                      <p>JANO</p>
                      <p>NANZER</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul className="pageAbout">
                  <li></li>
                  <li>
                    <a
                      class="btn"
                      href="https://www.linkedin.com/in/jano-nanzer-4410951bb/"
                      target="_blank"
                    >
                      LINKEDIN
                    </a>
                    <br></br>
                    <a
                      class="btn"
                      href="https://github.com/JanoNanzer"
                      target="_blank"
                    >
                      GITHUB
                    </a>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                {/* Back */}
                <ul class="hardcover_back">
                  <li></li>
                  <li></li>
                </ul>
                <ul class="book_spine">
                  <li></li>
                  <li></li>
                </ul>
              </figure>
            </li>
          </ul>
        </div>
        <div class="component">
          <ul class="align">
            <li>
              <figure class="book">
                {/* Front */}
                <ul class="hardcover_front">
                  <li>
                    <div class="coverDesign blue">
                      <img
                        src={juan1}
                        alt=""
                        width="120px"
                        style={{
                          marginTop: "10px",
                          border: "2px double white",
                        }}
                      />
                      <p>JUAN</p>
                      <p>RICAUD</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="pageAbout">
                  <li></li>
                  <li>
                    <a
                      class="btn"
                      href="https://www.linkedin.com/in/juanricaud/"
                      target="_blank"
                    >
                      LINKEDIN
                    </a>
                    <br></br>
                    <a
                      class="btn"
                      href="https://github.com/jRicaud11"
                      target="_blank"
                    >
                      GITHUB
                    </a>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                {/* Back */}
                <ul class="hardcover_back">
                  <li></li>
                  <li></li>
                </ul>
                <ul class="book_spine">
                  <li></li>
                  <li></li>
                </ul>
              </figure>
            </li>
          </ul>
        </div>
        <div class="component">
          <ul class="align">
            <li>
              <figure class="book">
                {/* Front */}
                <ul class="hardcover_front">
                  <li>
                    <div class="coverDesign blue">
                      <img
                        src={juan2}
                        alt=""
                        width="120px"
                        style={{
                          marginTop: "10px",
                          border: "2px double white",
                        }}
                      />
                      <p>JUAN</p>
                      <p>LEDESMA</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="pageAbout">
                  <li></li>
                  <li>
                    <a
                      class="btn"
                      href="https://www.linkedin.com/in/juan-franco-ledesma/"
                      target="_blank"
                    >
                      LINKEDIN
                    </a>
                    <br></br>
                    <a
                      class="btn"
                      href="https://github.com/JuanFrancoLedesma"
                      target="_blank"
                    >
                      GITHUB
                    </a>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                {/* Back */}
                <ul class="hardcover_back">
                  <li></li>
                  <li></li>
                </ul>
                <ul class="book_spine">
                  <li></li>
                  <li></li>
                </ul>
              </figure>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}
