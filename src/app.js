const fs = require('fs');
const showdown = require('showdown');
const navbar = require('./navbar');
const head = require('./head');
const footer = require('./footer');

const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    simplifiedAutoLink: true,
    // excludeTrailingPunctuationFromURLs: true,
    parseImgDimensions: true,
    underline: true,
        
    literalMidWordUnderscores: true,
    strikethrough: true,
    tables: true,
    ghCodeBlocks: true,
    tasklists: true,
    ghCompatibleHeaderId: true,
    encodeEmails: true,
    ellipsis: true,
    ghMentionsLink: "https://github.com/{u}",
    ghMentionsLinkUser: true,
    ghMentions: true,
    emoji: true,
})
const loadIndex = async () => {
    let data = ''
    try {
        data = await fs.promises.readFile('./private/markdown/index.md', 'utf8');
    } catch (err) {
        console.log(err);
        return '<h1>Une erreur est survenue</h1>';
    }
    const html = converter.makeHtml(data);
    return html;
}
const loadPage = async (path) => {
    let data = ''
    try {
        data = await fs.promises.readFile(`./private/markdown/${path.join('/')}.md`, 'utf8');
    } catch (err) {
        console.log(err);
        return '<h1>Une erreur est survenue</h1>';
    }

    const html = converter.makeHtml(data);
    return html;
}



// path : [ 'folder1', 'folder2', 'page']
const App = (path, res) => {
    // TODO : vérifier que le chemin ne sort pas du dossier private/markdown

    let html = head();
    html += navbar();
    if (path.length === 0) {
        loadIndex().then((body) => {
            res.send(html + body + footer());
        });
    }
    else {
        loadPage(path).then((body) => {
            res.send(html + body + footer());
        });
    }

};

module.exports = App;