import ObjetGraphique from './ObjetGraphique.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class Decor extends ObjetGraphique {
    constructor(x, y, l, h, couleur) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h, couleur);
    }
    // on hérite de la méthode draw(ctx)
    
}

