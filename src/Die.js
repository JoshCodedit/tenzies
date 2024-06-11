import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? '#8670eb' : '#ffffff'
  };

  return (
    <div className="die-face" style={style} onClick={props.onClick}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
