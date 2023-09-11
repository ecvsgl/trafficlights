window.onload = function () {
    let redLight;
    let yellowLight;
    let greenLight;

    let counter = 0;
    let timeout;

    let lights_working = false;

    document.getElementById("start_button").onclick = processLightshow;
    function processLightshow() {

        let userInput = document.getElementById("light_input").value;

        if (isInputFormCorrect(userInput)) {

            let redLight = document.getElementById("redlight");
            let yellowLight = document.getElementById("yellowlight");
            let greenLight = document.getElementById("greenlight");

            let lightArray = userInput.split(";");
            for (let i = 0; i<lightArray.length; i++){
                let workingLight
            }









        } else {
            document.getElementById("light_input").value = "";
            alert("Please provide input in the stated format.");
        }
    }

    function startLightshow() {
        if (!lights_working) {
            lights_working = true;
            processLightshow();
        }
    }
    function resetLightShow() {
        clearTimeout(timeout);
        lights_working = false;
        redLight.style.backgroundColor = "black";
        yellowLight.style.backgroundColor = "black";
        greenLight.style.backgroundColor = "black";
    }

    function isInputFormCorrect(input) {
        const pattern = /^(?:[GYR]\d+;){3}$/;
        return pattern.test(input)
    }
}


