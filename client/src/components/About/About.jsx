import React, { useEffect } from "react";
import logo from "../../sourceImg/logo3.png";
import barb from "../../sourceImg/barb.jpg";
import "./About.css";

export default function About() {
  window.scrollTo(0, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="containerDescription">
        <img src={logo} alt="" width="210px" style={{ padding: "1em" }} />
        <div className="scusiDescription">
          <span>
            My Scusi Books is a book application designed to serve as a bridge
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
                        src={logo}
                        alt=""
                        width="120px"
                        style={{ paddingTop: "10px" }}
                      />
                      <p>AGUSTIN</p>
                      <p>QUIROGA</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="page">
                  <li></li>
                  <li>
                    <a class="btn" href="#">
                      LINKEDIN
                    </a>
                    <br></br>
                    <a class="btn" href="#">
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
                        src={logo}
                        alt=""
                        width="120px"
                        style={{ paddingTop: "10px" }}
                      />
                      <p>ALEJANDRO</p>
                      <p>CORZO</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul className="page">
                  <li></li>
                  <li>
                    <a class="btn" href="#">
                      LINKEDIN
                    </a>
                    <br></br>
                    <a class="btn" href="#">
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
                        style={{ paddingTop: "10px" }}
                      />
                      <p>BARBARA</p>
                      <p>CASSIRAM</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="page">
                  <li></li>
                  <li>
                    <a class="btn" href="#">
                      LINKEDIN
                    </a>
                    <br></br>
                    <a class="btn" href="#">
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
                        src={logo}
                        alt=""
                        width="120px"
                        style={{ paddingTop: "10px" }}
                      />
                      <p>JANO</p>
                      <p>NANZER</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul className="page">
                  <li></li>
                  <li>
                    <a class="btn" href="#">
                      LINKEDIN
                    </a>
                    <br></br>
                    <a class="btn" href="#">
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
                        src={logo}
                        alt=""
                        width="120px"
                        style={{ paddingTop: "10px" }}
                      />
                      <p>JUAN</p>
                      <p>RICAUD</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="page">
                  <li></li>
                  <li>
                    <a class="btn" href="#">
                      LINKEDIN
                    </a>
                    <br></br>
                    <a class="btn" href="#">
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
                        src={logo}
                        alt=""
                        width="120px"
                        style={{ paddingTop: "10px" }}
                      />
                      <p>JUAN</p>
                      <p>LEDESMA</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="page">
                  <li></li>
                  <li>
                    <a class="btn" href="#">
                      LINKEDIN
                    </a>
                    <br></br>
                    <a class="btn" href="#">
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
    </>
  );
}
