(function (){
    var total = 0, innerValue = "0", displayValue = "0", operator, toBeCleared = false, lastBtnWasOperator = false;

    function launchCalculator() {
        var buttons = document.querySelectorAll(".button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function(e){
                var btn = e.target;

                if(btn.hasAttribute("reset")) {
                    resetBtn();
                } else if(btn.hasAttribute("number")) {
                    numberBtn(btn.innerHTML);
                } else if(btn.hasAttribute("point")) {
                    pointBtn();
                } else if(btn.hasAttribute("operator")) {
                    operatorBtn(btn.innerHTML);
                } else if(btn.hasAttribute("equal")) {
                    equalBtn();
                }
            });
        }

        document.addEventListener("keypress", function(e) {
            var key = String.fromCharCode(e.keyCode);

            if(key == "\r") {
                equalBtn();
            } else if(key >= 0 && key <= 9) {
                numberBtn(key);
            } else if(key == "-" || key == "+" || key == "*" || key == "/") {
                operatorBtn(key);
            } else if(key == ".") {
                pointBtn();
            }
        });
    }

    function updateScreen() {
        var screen = document.querySelector(".value");
        displayValue = innerValue;
        
        if(innerValue.length > 12) {
            displayValue = parseInt(innerValue).toExponential(2);
        }

        parts = displayValue.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        displayValue = parts.join(".");

        screen.innerHTML = displayValue;
    }

    function resetBtn() {
        innerValue = "0";
        toBeCleared = false;
        total = 0;
        operator = undefined;
        lastBtnWasOperator = false;
        updateScreen();
    }

    function operatorBtn(operatorPressed) {
        if(operator != undefined && !lastBtnWasOperator) {
            innerValue = "" + calc(total, innerValue, operator);
            updateScreen();
        }
        operator = operatorPressed;
        toBeCleared = true;
        lastBtnWasOperator = true;
    }

    function numberBtn(number) {
        lastBtnWasOperator = false;
        if(toBeCleared) {
            total = innerValue;
            innerValue = "0";
            toBeCleared = false;
            updateScreen();
        }

        if(innerValue.length < 12) {
            if(displayValue == "0") {
                innerValue = number;
            } else {
                 innerValue = innerValue + number;
            }
        }
        updateScreen();
    }

    function pointBtn() {
        lastBtnWasOperator = false;
        
        if(toBeCleared) {
            total = innerValue;
            innerValue = 0
            toBeCleared = false;
            updateScreen();
        }

        if(displayValue.indexOf(".") === -1) {
            innerValue += ".";
            updateScreen();
        }
    }

    function equalBtn() {
        lastBtnWasOperator = false;
        if(operator != undefined) {                    
            innerValue = "" + calc(total, innerValue, operator);
            operator = undefined;
            updateScreen();
        }
        toBeCleared = true;
    }

    function calc(number1, number2, operator) {
        var calc;
        switch(operator) {
            case "+":
                calc = parseFloat(number1) + parseFloat(number2); 
                break;
            case "-":
                calc = parseFloat(number1) - parseFloat(number2); 
                break;
            case "*":
            case "X":
                calc = parseFloat(number1) * parseFloat(number2); 
                break;
            case "/":
            case "÷":
                calc = parseFloat(number1) / parseFloat(number2); 
                break;
            default:
                calc = 0;
                break;
        }
        return calc;
    }

    launchCalculator();

})();