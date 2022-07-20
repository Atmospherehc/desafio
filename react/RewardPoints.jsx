import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const RewardPoints = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get("/api/sessions?items=*");
      const email = response.data.namespaces.profile.email.value;
      console.log("aaaa", email);
      const userData = await axios.get(
        "https://hc3-node-api.herokuapp.com:43524/rewards",
        {
          data: JSON.stringify({ email: "yallatea06@protonmail.com" }),
        }
      );
      console.log("teste", userData.data);
    };

    getCurrentUser();
  }, []);

  return <p className="pontos"> {points} pontos teste teste </p>;
};

export default RewardPoints;
