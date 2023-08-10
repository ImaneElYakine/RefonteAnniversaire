// Mise en place du canvas
var bridge = document.getElementById("bridge"),
    bridgeCanvas = bridge.getContext('2d'),
    brushRadius = 20,
    nbDot = 0,
    img = new Image();
img.crossOrigin = "Anonymous";
img.src = './img/grattage.svg';

var data = bridgeCanvas.getImageData(0,0,bridge.width,bridge.height).data;

img.onload = function(){
    bridgeCanvas.drawImage(img, 0, 0);
    var nb = 0;
    for (let i = 0; i < data.length; i++) {
        if(data[i] !== 0){
            nb++;
        }
    }
}

addMouseMove();
addTouchMove();


// Fonctions de dessins pour le grattage
function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
    var bridgeRect = bridge.getBoundingClientRect();
    return {
        x: Math.floor((xRef-bridgeRect.left)/(bridgeRect.right-bridgeRect.left)*bridge.width),
        y: Math.floor((yRef-bridgeRect.top)/(bridgeRect.bottom-bridgeRect.top)*bridge.height)
    };
}

function drawDot(mouseX,mouseY){
    bridgeCanvas.beginPath();
    bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
    bridgeCanvas.fillStyle = '#000';
    bridgeCanvas.globalCompositeOperation = "destination-out";
    bridgeCanvas.fill();
}

function addMouseMove(){
    bridge.addEventListener("mousemove", function(e) {
        var brushPos = getBrushPos(e.clientX, e.clientY);
        var leftBut = detectLeftButton(e);
        if (leftBut == 1) {
            drawDot(brushPos.x, brushPos.y);
            countPercent();
        }
    }, false);
}

function addTouchMove() {
    bridge.addEventListener("touchmove", function (e) {
        e.preventDefault();
        var touch = e.targetTouches[0];
        if (touch) {
            var brushPos = getBrushPos(touch.pageX, touch.pageY);
            drawDot(brushPos.x, brushPos.y);
        }
    }, false);

    bridge.addEventListener("touchend", function (e) {
        e.preventDefault();
        countPercent();
    }, false);

}

// Fonction qui révèle le prix après un minimum effacé
function countPercent() {
    //Calcul du pourcentage effacé
    var data = bridgeCanvas.getImageData(0,0,bridge.width,bridge.height).data;
    var nb = 0;
    for (let i = 0; i < data.length; i++) {
        if(data[i] !== 0){
            nb++;
        }
    }
    var percent = (nb * 100) / data.length;
    // Révélation de l'image
    if(percent <= 50){
        bridge.removeEventListener("touchmove", addTouchMove);
        bridgeCanvas.clearRect(0,0,bridge.width,bridge.height);
        // On enlève la fonction dessin
        var el = document.getElementById('bridge'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        // On dévoile la popup
        const modal = document.getElementById("modal");
        modal.classList.remove("hidden");

    }
}

function closeModal(){
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}