import React from "react";
import style from "../Welcome/Welcome.module.css";

function Welcome() {
  const currentDate = new Date();

  return (
    <div>
      <div className={style.all}>
        <div className={style.content}>
          <h3>Today is</h3>
          <h5>
            {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
          </h5>
          <div className={style.date}>
            <p>
              {currentDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
              })}
            </p>
            <p>
              {currentDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
