import React from 'react'
import * as Components from './components'
import './home.scss'

function HomePage({ t }) {
    return (
        <React.Fragment>
            <Components.Subcontent t={t}/>
            <Components.Slide />
            <Components.MainContent t={t} />
            <Components.Trade t={t} />
            <Components.Footer />
        </React.Fragment>
    )
}
export default HomePage