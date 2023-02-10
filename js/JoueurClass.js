import ObjetGraphique from './ObjetGraphique.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class Joueur extends ObjetGraphique {
    constructor(x, y, l, h, couleur, nbVies) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h, couleur);
        this.nbVies = nbVies;
        this.peutSauter = false;
        this.jumpPower = -20;
        this.gravity= 3; // strength per frame of gravity
        this.drag= 0.999; // play with this value to change drag
        this.groundDrag= 0.9; // play with this value to change ground movement
        this.ground= 280;

    }
    // on hérite de la méthode draw(ctx)

    move() {
        this.vy += this.gravity;
        this.vx *= this.peutSauter ? this.groundDrag : this.drag;
        this.vy *=this.drag;
        this.x += this.vx;
        this.y += this.vy;
                 
    }


    testeCollisionAvecBordsDuCanvas(largeurCanvas, hauteurCanvas) {
        if (this.x + this.l > largeurCanvas) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = largeurCanvas - this.l;
            this.vitesse = -this.vitesse;
        }
        if (this.x < 0) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = 0;
            this.vitesse = -this.vitesse;
        }
        if (this.y + this.l > hauteurCanvas) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.y = hauteurCanvas - this.l;
            this.vitesse = -this.vitesse;
        }
        if (this.y < 0) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.y = 0;
            this.vitesse = -this.vitesse;
        }
    }

    detecteCollisionJoueurAvecSol() {
        if (this.y + this.l > 280) {
            // On positionne le joueur à la limite du sol, au point de contact
            this.y = 280 - this.l;
            this.vitesse = -this.vitesse;
            this.peutSauter = true;
        }
        else{
        this.peutSauter = false;
        }
    }
    
}

