(function() {
    var keysPressed = [];
    var keysDiv = document.querySelectorAll(".key");
    var regex = new RegExp("code_");

    for(var i = 0; i < keysDiv.length; i++) {
        keysDiv[i].addEventListener("click", function(e) {
            classes = e.target.classList;
            for(var j = 0; j < classes.length; j++) {
                if(regex.test(classes[j])) {
                    writingOnScreen(classes[j].substr(5, classes[j].length));
                }
            }
        });
    }

    document.addEventListener("keydown", function(e) {
        var charCode = (e.which) ? e.which : e.keyCode;
        if(e.location == 2) {
            charCode += "_right";
        }

        if(!keysPressed[charCode]) {
            keysPressed[charCode] = true;
            
            document.querySelector(".code_" + charCode).classList.add("key_active");
            
            var audio = new Audio('key_sound.mp3');
            audio.volume = 0.05;
            audio.play();
        }
    });

    document.addEventListener("keypress", function(e) {
        writingOnScreen(e.keyCode);
    });

    document.addEventListener("keyup", function(e) {
        var charCode = (e.which) ? e.which : e.keyCode;
        if(e.location == 2) {
            charCode += "_right";
        }

        keysPressed[charCode] = false;
        document.querySelector(".code_" + charCode).classList.remove("key_active");
    });

    function writingOnScreen(code) {
        var content_screen = document.querySelector(".content_screen");
        content_screen.innerHTML = content_screen.innerHTML + String.fromCharCode(code);
    }

    document.addEventListener("mousemove", function(e) {
        var mouse = document.querySelector(".mouse");
        
        mouse.style.left = 80 * e.clientX / window.innerWidth + "%";
        mouse.style.top = (60 * e.clientY / window.innerHeight > 21) ? 60 * e.clientY / window.innerHeight + "%" : "21%";
        if(mouse.style.top < 20) {
            mouse.style.top = 20 + "%";
        }
    });
})();