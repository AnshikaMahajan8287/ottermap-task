import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const [firstName, setFirstName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("mobileNumber", mobileNumber);
    history.push("/map");
  };

  return (
    <div>
      <h1>Enter Your Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mobile Number: </label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
