import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Card = (props) => {
  const Png = props.png;


  return (
    <div
      className="card"
      style={{
        background: props.color.backGround,
        boxShadow: props.color.boxShadow,
      }}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={props.barValue}
          text={`${props.barValue}%`}
        />
        <span>{props.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${props.value}</span>
        <span>Last 24 hours</span>
      </div>
    </div>
  );
};

export default Card;
