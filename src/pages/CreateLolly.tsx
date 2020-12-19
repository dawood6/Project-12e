import { Field, Form, Formik, useFormik } from "formik"
import React, { useEffect, useRef, useState } from "react"
import Header from "../components/Header"
import { Lolly } from "../components/Lolly"
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import gql from "graphql-tag"
import Result from "../components/Result"
import axios from 'axios'
const ADD_LOLLY = gql`
    mutation addLolly($colorOne: String!, 
        $colorTwo: String!,
        $colorThree: String!,
        $reciever: String!,
        $sender: String!,
        $message: String!){
            addLolly(colorOne: $colorOne,colorTwo: $colorTwo,colorThree: $colorThree,reciever: $reciever,sender: $sender,message: $message){
                sender
                reciever
                message
                link
            }
    }
`

const DisplayingErrorMessagesSchema = Yup.object().shape({
    reciever: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    sender: Yup.string().required("Required").min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    message: Yup.string().required('Required').min(2, 'Too Short')
});


const CreateLolly = () => {

    const [colorOne, setColorOne] = useState("#d52358")
    const [colorTwo, setColorTwo] = useState("#e95946")
    const [colorThree, setColorThree] = useState("#deaa43")
    const [addLolly, { data }] = useMutation(ADD_LOLLY);
    const formik = useFormik({
        initialValues: {
            reciever: '',
            sender: '',
            message: '',
        },
        validationSchema: DisplayingErrorMessagesSchema,
        onSubmit: (values, { resetForm }) => {
            addLolly({
                variables: {
                    colorOne, colorTwo, colorThree,
                    reciever: values.reciever,
                    sender: values.sender,
                    message: values.message
                }
            })

            resetForm({
                values: {
                    reciever: ""
                    , sender: "", message: ""
                }
            })


        },
    });

    return (
        <div className="createLolly">
            <Header />

            <div className="lollyFormDiv">
                <div className="lolly">
                    <Lolly top={colorOne} middle={colorTwo} bottom={colorThree} />
                </div>
                {!data ? <> <div className="lollyColor">
                    <label className="lolyColorChanger">
                        <input
                            type="color"
                            value={colorOne}
                            className="lolyPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColorOne(e.target.value)
                            }}
                        />
                    </label>

                    <label className="lolyColorChanger">
                        <input
                            type="color"
                            value={colorTwo}
                            className="lolyPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColorTwo(e.target.value)
                            }}
                        />
                    </label>
                    <label className="lolyColorChanger">
                        <input
                            type="color"
                            value={colorThree}
                            className="lolyPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColorThree(e.target.value)
                            }}
                        />
                    </label>
                </div>
                    <form className="form-container" onSubmit={formik.handleSubmit}>
                        <label htmlFor="firstName">To</label>
                        <br /> <input
                            id="reciever"
                            name="reciever"
                            type="text"
                            placeholder="Reciever Name"
                            onChange={formik.handleChange}
                            value={formik.values.reciever}
                        />

                        {formik.errors.reciever ? <div className="error">{formik.errors.reciever}</div> : null}
                        <br /> <label htmlFor="message">Message</label>
                        <br /> <textarea
                            id="message"
                            name="message"
                            placeholder="Beatiful Message"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                        />
                        <br />
                        {formik.errors.message ? <div className="error">{formik.errors.message}</div> : null}
                        <label htmlFor="sender">From</label>
                        <br />
                        <input
                            id="sender"
                            name="sender"
                            type="sender"
                            onChange={formik.handleChange}
                            value={formik.values.sender}
                            placeholder="Sender Name"
                        />
                        {formik.errors.sender ? <div className="error">{formik.errors.sender}</div> : null}
                        <div className="space-mob">

                        </div>
                        <button type="submit" className="custom-btn btn-7"><span>Freeze this lolly</span></button>
                    </form></> : <Result link={data?.addLolly?.link} reciever={data?.addLolly?.reciever} sender={data?.addLolly?.sender} message={data?.addLolly?.message} />}
            </div>
        </div >
    )
}
export default CreateLolly