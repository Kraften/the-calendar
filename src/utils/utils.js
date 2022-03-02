/**
 * Viewport fix for Chrome and Safari on iOS.
 * @param  {} innerHeight height of users window (send window.innerHeight).
 */
const viewPortFix = (innerHeight) => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

/**
 * @description ### Returns Go / Lua like responses(data, err)
 * when used with await
 *
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.all([req1, req2, req3])
 * - Example response [ [data1, data2, data3], undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.race([req1, req2, req3])
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 * @param {Promise} promise
 * @returns {Promise} [ data, undefined ]
 * @returns {Promise} [ undefined, Error ]
 */
const handlePromise = (promise) => {
    return promise
        .then((data) => [data, undefined])
        .catch((error) => Promise.resolve([undefined, error]));
};

export { viewPortFix, handlePromise };
