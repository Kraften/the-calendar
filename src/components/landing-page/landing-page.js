import viewPortFix from '../../utils/utils'
import LoginOverlay from '../login-overlay/login-overlay'
import './landing-page.css'
import React from 'react'

const LandingPage = () => {
    const [showResults, setShowResults] = React.useState(false)
    const loginCLickEvent = () => {
        setShowResults(!showResults)
        console.log(showResults)
    }

    const pull_data = (data) => {
        setShowResults(data)
        console.log('in landing page', data)

    }

    viewPortFix(window.innerHeight)
    return (
        <div className="landing-page">
            {/* { showResults ? <LoginOverlay a={showResults}
            func={pull_data}/> : null} */}
            <LoginOverlay a={showResults} func={pull_data}/>
            <span className="login-btn" onClick={loginCLickEvent}>LOGIN</span>
            <h1>
                <span>the</span>
                <span>Calendar</span>
            </h1>
        </div>
    )
}

export default LandingPage;