import React from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { navigate } from "gatsby";
import './index.css'
import { Lolly } from "../components/Lolly";
export default function Home() {
  return (
    <div className="mainCon">
      <Header />
      <Lolly top="blue" middle="red" bottom="orange" />
      <br />
      <Button
        label="Send Lolly To Friend"
        onClickFunc={() => navigate("/CreateLolly")}
      />
    </div>
  );
}
