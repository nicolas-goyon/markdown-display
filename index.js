// Importer les modules nécessaires
const express = require('express');
const showdown = require('showdown');
const fs = require('fs');
const app = require('./src/app');

// Créer une instance de l'application Express
const appExpress = express();
const port = 3080; // Le port sur lequel l'application va écouter

// Définir un middleware pour parser le corps des requêtes HTTP
appExpress.use(express.urlencoded({ extended: true }));
appExpress.use(express.json());

// Définir un routeur pour gérer les différentes routes
const router = express.Router();

// Route pour les fichiers de style (vérifier que le fichier demandé possède l'extension .css)
router.get('/style/*.css', (req, res) => {
    const path = req.url.split('/');
    path.shift();
    fs.readFile(`./public/${path.join('/')}`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.send('<h1>Une erreur est survenue</h1>');
        }
        res.setHeader('Content-Type', 'text/css');  
        res.send(data);
    });
});


router.get('/', (req, res) => {
    app([], res);
});


// Route pour une page peut importe le nombre de dossiers
router.get('/*', (req, res) => {
    const path = req.url.split('/');
    path.shift();
    app(path, res);
});


// Utiliser le routeur
appExpress.use('/', router);

// Démarrer le serveur
appExpress.listen(port, () => {
    console.log(`Le serveur est démarré sur le port ${port}`);
});