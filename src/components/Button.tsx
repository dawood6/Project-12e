import React from 'react'

export interface ButtonProps {
    label: string
    onClickFunc: () => void
}
export const Button: React.FC<ButtonProps> = ({ label, onClickFunc }) => {
    return (
        <button className="custom-btn btn-7" onClick={onClickFunc}><span>{label}</span></button>
    )
}