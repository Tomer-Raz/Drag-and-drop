import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const TextUpdaterNode = ({ data }: any) => {
  const [text, setText] = useState(data.label || "");

  const onChange = (event: any) => {
    setText(event.target.value);
    data.label = event.target.value;
  };

  return (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5 }}>
      <input
        type="text"
        value={text}
        onChange={onChange}
        style={{ width: "100%" }}
      />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default TextUpdaterNode;
