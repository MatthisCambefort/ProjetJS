import Joueur from './JoueurClass.js';
import Obstacle from './ObstacleClass.js';
import Decor from './DecorClass.js';
import DecorClimb from './DecorClimb.js';
import { ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { rectsOverlap } from './collisions.js';



let canvas, ctx;
let gameState = 'menuStart';
let joueur;
let decor1;
let tableauDesObjetsGraphiques = [];

// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;


function init(event) {
    console.log("Page chargée et les éléments HTML sont prêts à être manipulés");
    canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');

    // On va prendre en compte le clavier
    ajouteEcouteursClavier();
    //ajouteEcouteurSouris();

    // On va créer un joueur params (x, y, l, h, couleur)
    joueur = new Joueur(10, 280, 30, 30, 'green', 3);
    joueur.vy = 280;
    tableauDesObjetsGraphiques.push(joueur);

    // et des obstacles
    creerDesObstaclesLevel1();

    requestAnimationFrame(animationLoop);

}


// Obstacle paramètres : (x, y, l, h, couleur)
function creerDesObstaclesLevel1() {
    tableauDesObjetsGraphiques.push(new Decor(0, 280, canvas.width, canvas.height, 'green'));
    tableauDesObjetsGraphiques.push(new Decor(0, 300, canvas.width, canvas.height, '#684027'));

    tableauDesObjetsGraphiques.push(new DecorClimb(190, 250, 30, 30, 'black'));
    tableauDesObjetsGraphiques.push(new DecorClimb(220, 220, 30, 60, 'black'));
    tableauDesObjetsGraphiques.push(new DecorClimb(250, 190, 30, 90, 'black'));





}


function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'jeuEnCours':
            // 2 - On dessine le nouveau contenu
            tableauDesObjetsGraphiques.forEach(o => {
                o.draw(ctx);
            });

            // 3 - on déplace les objets
            testeEtatClavierPourJoueur();

            //joueur.followMouse(mousePos);

            joueur.move();
            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            joueur.detecteCollisionJoueurAvecSol();
            detecteCollisionJoueurAvecObstacles();
            //grimperDecor();

            break;
    }

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}

function afficheMenuStart(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("Press s to start", 190, 100);
    ctx.strokeText("Press s to start", 190, 100);
    if (inputState.start) {
        gameState = 'jeuEnCours';
    }
}
function afficheGameOver(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.strokeText("GAME OVER", 190, 100);
    ctx.fillText("Press s to restart", 250, 300);
    ctx.strokeText("Press s to restart", 250, 300);
    if (inputState.start) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
}

function testeEtatClavierPourJoueur() {
    joueur.vx = 0;
    if (inputState.left) {
        joueur.vx = -5;
    } else {
        if (inputState.right) joueur.vx = 5;
    }

    if (inputState.up && joueur.peutSauter) {
        //joueur.gravity = 0;
        console.log("jumpPower")
        joueur.vy = joueur.jumpPower;
        joueur.peutSauter = false;
    }

}

function detecteCollisionJoueurAvecObstacles() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    let obstacleCourant;

    for(let i = 0; i < tableauDesObjetsGraphiques.length; i++) {
        let o = tableauDesObjetsGraphiques[i];
        if (o instanceof Obstacle) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                obstacleCourant = o;
                // on sort de la boucle !
                break;
                //o.drawBoundingBox(ctx);
                //joueur.draw(ctx);
                //joueur.drawBoundingBox(ctx);
            }
        }
    }

    

    if (collisionExist) {
        if (((joueur.y+joueur.h) < obstacleCourant.y+4) && (joueur.x > (obstacleCourant.x - joueur.l)) 
                && (joueur.x < (obstacleCourant.x + obstacleCourant.l))) {
            console.log("collision par le haut de l'obstacle")
            joueur.y = obstacleCourant.y - joueur.h-4;

        } else if (joueur.x < obstacleCourant.x)  {
            //collision par gauche
            console.log("collision par la gauche de l'obstacle")
            joueur.x = obstacleCourant.x - joueur.l;
            //joueur.y = obstacleCourant.y;
        } else if (joueur.x > obstacleCourant.x) {
            console.log("collision par la droite de l'obstacle")
            joueur.x = obstacleCourant.x + obstacleCourant.l;
            //joueur.y = obstacleCourant.y;

        }


        /*else if ((joueur.y < obstacleCourant.y) && (joueur.x < obstacleCourant.x)){
            joueur.x = obstacleCourant.x - joueur.l;
            joueur.y = obstacleCourant.y - joueur.h;
        }

        else if((joueur.y < obstacleCourant.y) && (joueur.x > obstacleCourant.x)){
            joueur.x = obstacleCourant.x + obstacleCourant.l;
            joueur.y = obstacleCourant.y - joueur.h;
        }*/



        //gameState = 'gameOver';

    } else {
        joueur.couleur = 'green';
    }
}


function grimperDecor() {
    let climbExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiques.forEach(dc => {
        if (dc instanceof DecorClimb) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, dc.x, dc.y, dc.l, dc.h)) {
                climbExist = true;
            }
        }
    });
    /*decor1 = new DecorClimb(100, 250, 30, 30, 'black');
        if (climbExist) {
            joueur.couleur = 'blue';
            joueur.x = 10;
            joueur.y = 10;
        } else {
            joueur.couleur = 'green';
        }*/
}