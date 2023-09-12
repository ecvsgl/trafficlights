//Wrapped all to onload because there were issues with html-item
//variables going null because JS loading prior than HTML.
window.onload = function () {
    //Lights as global objects.
    let redLight = document.getElementById("red_light");
    let yellowLight = document.getElementById("yellow_light");
    let greenLight = document.getElementById("green_light");

    //To set remaining time to UI.
    let timeBox = document.getElementById("remaining_time");
    //Lock to avoid further input during lighting process.
    let isLightInProgress = false;
    //To manage all timeouts at reset.
    let globalTimeoutArray = [];
    //To manage parsing.
    let counter = 0;

    //Why use event listeners? "onClick" seems to be the same with it?
    document.getElementById("start_button").addEventListener("click", startLightshow);
    document.getElementById("reset_button").addEventListener("click", resetLightShow);

    function startLightshow() {
        let userInput = document.getElementById("light_input").value;
        if (isInputFormCorrect(userInput) && !isLightInProgress) {
            isLightInProgress = true;
            let lightArray = userInput.split(";");
            let mainTimeout = setTimeout(function () {
                turnLightOnFor(lightArray);
            }, 1000);
            globalTimeoutArray.push(mainTimeout);
        } else if (!isInputFormCorrect(userInput)) {
            document.getElementById("light_input").value = "";
            alert("Please provide input in the stated format.");
        } else if (isLightInProgress) {
            console.log("Wait for lights to finish or reset it.");
        }
    }
    //To execute what light to be on during timeout.
    //This function is created to be called during setTimeout.
    //Apperently if I tried to do otherwise, setTimeout fails. 
    //      Why? --> It seems setTimeout requires for any methods to be passed to be wrapped with a func(){...}
    function turnLightOnFor(lightArray) {
        //clear playing field.
        clearLights();
        //Change colors...
        let workingLight = lightBulbDecipher(lightArray[counter].charAt(0));
        let lightColor = lightColorDecipher(lightArray[counter].charAt(0));
        workingLight.style.backgroundColor = lightColor;
        //Duration required for this color && timing.
        let lightDuration = parseInt(lightArray[(counter)].substring(1));
        timer(lightDuration);
        //The end item will be a "", at that point, we want all visual and global variables to reset.
        if (counter == lightArray.length - 2) {
            globalTimeoutArray.push(setTimeout(function () {
                clearLights();
                counter = 0;
                isLightInProgress = false;
                timeBox.innerText = "";
            }, 1000 * lightDuration));
        } else if (counter < (lightArray.length - 2)) {
            counter++;
            globalTimeoutArray.push(setTimeout(function () {
                turnLightOnFor(lightArray);
            }, 1000 * lightDuration));
        }
    }
    //Reset button function, to clear the timeout, and lights.
    function resetLightShow() {
        clearLights();
        for (let j = globalTimeoutArray.length - 1; j >= 0; j--) {
            clearTimeout(globalTimeoutArray[j]);
            globalTimeoutArray.pop(j);
        }
        counter = 0;
        isLightInProgress = false;
        timeBox.innerText = "";
    }
    //Input validity regex checker.
    function isInputFormCorrect(input) {
        const pattern = /^(?:[GYR]\d+;){3}$/;
        return pattern.test(input)
    }
    //Will get the first char of lightArray item, return the relevant bulb.
    function lightBulbDecipher(lightChar) {
        if (lightChar == "R") {
            return redLight;
        } else if (lightChar == "Y") {
            return yellowLight;
        } else if (lightChar == "G") {
            return greenLight;
        }
    }
    //Will get the first char of lightArray item, return the relevant bulb's color.
    function lightColorDecipher(lightChar) {
        if (lightChar == "R") {
            return "red";
        } else if (lightChar == "Y") {
            return "yellow";
        } else if (lightChar == "G") {
            return "green";
        }
    }
    //To reset the lights to black.
    function clearLights() {
        redLight.style.backgroundColor = "black";
        yellowLight.style.backgroundColor = "black";
        greenLight.style.backgroundColor = "black";
    }
    //Counts down from given int until "1".
    //Why 1? At the 0 point, the light-times were intersecting.
    //Therefore, at the 0 point, the following light remaining time is shown instead.
    //On reset or at the end of light display, the remaining time is manually declared as ""
    function timer(startingPoint) {
        if (startingPoint == 1) {
            timeBox.innerText = 1;
        } else if (startingPoint > 1) {
            timeBox.innerText = startingPoint;
            globalTimeoutArray.push(setTimeout(function () {
                timer(startingPoint - 1);
            }, 1000));
        }
    }
}


