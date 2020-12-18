import React from 'react'
import { Button } from '../components/Button'
import { navigate } from "gatsby";
export interface ResultProps {
    link: string;
    reciever: string;
    message: string;
    sender: string;
}
const Result: React.FC<ResultProps> = ({ link, reciever, message, sender }) => {
    return (
        <div className="result">
            <h4>Share lolly with this link:</h4>
            <h3>{`https://virtuallolly-dawood.netlify.app/lolly/${link}`}</h3>
            <div className="resultCard">
                <p className="reciever">To:{reciever}</p>
                <p className="message">Message:{message}</p>
                <p className="sender">From:{sender}</p>
            </div>
            <Button
        label="Go Back"
        onClickFunc={() => navigate("/")}
      />
        </div>
    )
}

export default Result