import React from "react";

const DisplayContacts = (data) => {
  return (
    <div>
      {data["data"].map((d) => (
        <p key={d.friend}>{d.friend}</p>
      ))}
    </div>
  );
};

export default DisplayContacts;
