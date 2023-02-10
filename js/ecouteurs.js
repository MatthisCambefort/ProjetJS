let inputState = {}
let mousePos = { x: 0, y: 0 }

function ajouteEcouteursClavier() {
    // On va écouter les événements clavier
    // et on va modifier la vitesse du joueur
    // en fonction de la touche pressée
    window.onkeydown = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                inputState.left = true;
                break;
            case 'ArrowRight':
                inputState.right = true;
                break;
            case 'ArrowUp':
                inputState.up = true;
                break;
            case 'ArrowDown':
                inputState.down = true;
                break;
            case 's':
                inputState.start = true;
            break;
        }
    }

    window.onkeyup = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                inputState.left = false;
                break;
            case 'ArrowRight':
                inputState.right = false;
                break;
            case 'ArrowUp':
                inputState.up = false;
                break;
            case 'ArrowDown':
                inputState.down = false;
                break;
            case 's':
                inputState.start = false;
                break;
        }
    }

}

export {ajouteEcouteursClavier, inputState, mousePos }