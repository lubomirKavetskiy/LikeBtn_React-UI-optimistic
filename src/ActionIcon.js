import React from "react";

export const ActionIcon = ({
  icon,
  count,
  highlight,
  highlightColor,
  ...rest
}) => (
  <span
    style={{
      display: "inline-block",
      width: 60,
      cursor: "pointer",
      color: highlight ? highlightColor : undefined
    }}
    {...rest}
  >
    <span className={`pr-2 oi oi-${icon}`} />
    {count > 0 && <span>{count}</span>}
  </span>
);
