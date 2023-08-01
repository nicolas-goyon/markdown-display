const fs = require('fs');

const navbar = () => {
    // Récupérer les données dans private/navbar.json
    const data = fs.readFileSync('./private/navbar.json', 'utf8');
    const navbar = JSON.parse(data);

    let result =  '<nav class="navbar">' + '<h1 class="navbar-title"><a href="/">Airsoft Wiki FR</a></h1>' + '<ul class="navbar-nav">'

    for (const key in navbar) {
        result += `<li> <a class="nav-link" href="/${navbar[key]}">${key}</a ></li >`;
    }
    result += '</nav>';
    

    return (result);
};

module.exports = navbar;