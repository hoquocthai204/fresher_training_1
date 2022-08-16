import React from 'react'
import './formHeader.scss'

function FormHeader(props) {
    return (
        <React.Fragment>
            <h1 className='form_header'>{props.title}</h1>
            <p className='subheader'>{props.subtitle}</p>
        </React.Fragment>
    )
}
export { FormHeader }