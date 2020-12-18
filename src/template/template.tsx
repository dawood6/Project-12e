import React from 'react'
import Header from '../components/Header'
import { Lolly } from '../components/Lolly'
import Result from '../components/Result'

const Template = ({ pageContext: { colorOne, colorTwo, colorThree, reciever, sender, message, link } }) => {

    return (
        <div>
            <Header />
            <div className="lollyFormDiv">
                <div>
                    <Lolly top={colorOne} middle={colorTwo} bottom={colorThree} />
                </div>
                <Result link={link} reciever={reciever} sender={sender} message={message} />
            </div>
        </div>
    )
}

export default Template