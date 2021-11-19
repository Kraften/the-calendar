/**
 * Viewport fix for Chrome and Safari on iOS. 
 * @param  {} innerHeight height of users window (send window.innerHeight).
 */
 const viewPortFix = (innerHeight) => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export default viewPortFix;