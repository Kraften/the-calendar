import React from 'react'
import viewPortFix from '../../utils/utils'
import LoginOverlay from '../../components/login-overlay/login-overlay'
import './landing-page.css'

const LandingPage = () => {
    const [showLoginPanel, setShowLoginPanel] = React.useState(false)
    const loginCLickEvent = () => {
        setShowLoginPanel(!showLoginPanel)
    }
    const handleCloseFromChild = (data) => {
        setShowLoginPanel(data)
    }

    viewPortFix(window.innerHeight)
    return (
        <div className="landing-page">
            <LoginOverlay showLoginPanel={showLoginPanel} handleClose={handleCloseFromChild}/>
            <span className="login-btn" onClick={loginCLickEvent}>LOGIN</span>
            <h1>
                <span>the</span>
                <span>Calendar</span>
            </h1>
        </div>
    )
}

export default LandingPage;