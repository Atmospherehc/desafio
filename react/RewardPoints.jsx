import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./styles.css";

const POINTS_API = "https://hc3-node-api.herokuapp.com/rewards";

const RewardPoints = () => {
  const [points, setPoints] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get("/api/sessions?items=*");
      const email = response?.data?.namespaces?.profile?.email?.value;
      const userData = await fetch(`${POINTS_API}?email=${email}`);
      const { rewardPoints } = await userData.json();
      setPoints(rewardPoints);
      setLoading(false);
    };

    getCurrentUser();
  }, []);

  return isLoading ? (
    <div className={style.loadingIcon}>
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAxMWMuNTExLTYuMTU4IDUuNjg1LTExIDEyLTExczExLjQ4OSA0Ljg0MiAxMiAxMWgtMi4wMDljLS41MDYtNS4wNDYtNC43OTMtOS05Ljk5MS05cy05LjQ4NSAzLjk1NC05Ljk5MSA5aC0yLjAwOXptMjEuOTkxIDJjLS41MDYgNS4wNDYtNC43OTMgOS05Ljk5MSA5cy05LjQ4NS0zLjk1NC05Ljk5MS05aC0yLjAwOWMuNTExIDYuMTU4IDUuNjg1IDExIDEyIDExczExLjQ4OS00Ljg0MiAxMi0xMWgtMi4wMDl6Ii8+PC9zdmc+"></img>
    </div>
  ) : (
    <p className={style.pontos}>{points} pontos</p>
  );
};

export default RewardPoints;
