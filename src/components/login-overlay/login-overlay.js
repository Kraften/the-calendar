import './login-overlay.css'

const LoginOverlay = (props) => {
    const close = () => {
        console.log('in overlay',props.a)
        const az = props.a
        props.func(!az)

    }
    return (
        <div className={
            props.a 
                ? "overlay flex-column pin-center show"
                : "overlay flex-column pin-center"
        }>
            <div className="overlay-content flex-column">
                <button className="close-button" onClick={close}>
                    <span className={
                        props.a
                            ? "close-button-text"
                            : "close-button-text clicked"
                        }
                    >+</span></button>
                <input type="text" placeholder="email" />
                <input type="text" placeholder="password" />
                <input type="submit" />

            </div>
        </div>
    )
}

export default LoginOverlay;