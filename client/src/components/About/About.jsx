import React, { useEffect } from "react";
import logo from "../../sourceImg/logo3.png";
import "./About.css"

export default function About() {

  window.scrollTo(0, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="containerDescription">
        <img src={logo} alt="" width="250px" />
        <div className="scusiDescription">
          <h1>Mi Scusi Books</h1>
          <span>
            Scusi Books es una aplicación de libros que busca servir de puente
            entre el comercio y aquellos individuos interesados en la compra de
            los mismos. ESTO ES UN PROTOTIPO JUAJUAJUA
          </span>
        </div>
      </div>
      <div className="containerMembers">
        <div class="component">
          <ul class="align">
            <li>
              <figure class="book">
                {/* Front */}
                <ul class="hardcover_front">
                  <li>
                    <div class="coverDesign blue">
                      <p>AGUSTIN</p>
                      <p>QUIROGA</p>
                    </div>
                  </li>
                  <li></li>
                </ul>
                {/* Pages */}
                <ul class="page">
                  <li style={{ backgroundColor: "#fffbf6"}}></li>
                  <li style={{ backgroundColor: "#fffbf6"}}>
                    <a class="btn" href="#">
                      LINKEDIN
                    </a>
                  </li>
                  <li style={{ backgroundColor: "#fffbf6"}}></li>
                  <li style={{ backgroundColor: "#fffbf6"}}></li>
                  <li style={{ backgroundColor: "#fffbf6"}}></li>
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
                      <p>ALEJANDRO</p>
                      <p>CORZO</p>
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
