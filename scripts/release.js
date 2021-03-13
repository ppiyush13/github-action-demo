import shell from 'shelljs';
import { getTagName } from './getTagName';

shell.config.fatal = true;

const npmVersion = () => {
    try {
        const tagName = process.env.TAG_NAME;
        shell.exec(`npm version ${tagName}`);
    }
    catch(ex) {
        console.log('(');
        console.log('Error:', ex.message);
        console.log(')');
        throw ex;
    }
};

(async () => {
    npmVersion();
    const distTagNames = await getTagName();
    const version = shell.exec(`node -p "require('./package.json').version"`).trim();
    const name = shell.exec(`node -p "require('./package.json').name"`).trim();

    const firstDistTag = distTagNames.shift();
    shell.exec(`npm publish --tag ${firstDistTag}`);

    distTagNames.map(tag => {
        shell.exec(`npm dist-tag add ${name}@${version} ${tag}`);
    });

})();

process.on('uncaughtException', error => {
    process.exit(1);
});

process.on('unhandledRejection', error => {
    process.exit(1);
});
