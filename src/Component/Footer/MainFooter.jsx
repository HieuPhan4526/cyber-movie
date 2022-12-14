import React from "react";
export default function MainFooter() {
  return (
    <div>
      <div className="footer-content row text-center">
        <div className="col-sm-12 col-md-6">
          <h5>Website Build by Team:</h5>
          <ul>
            <li>
              <a target={`_blank`} href="https://github.com/BinFlex97">
                Đinh Quang Khánh
              </a>{" "}
            </li>
            <li>
              <a target={`_blank`} href="https://github.com/HieuPhan4526">
                Phan Minh Hiếu
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-6">
          <h5>Link source github :</h5>
          <a
            target={`_blank`}
            href="https://github.com/HieuPhan4526/cyber_movie"
          >
            https://github.com/HieuPhan4526/cyber_movie
          </a>
        </div>
      </div>
    </div>
  );
}
