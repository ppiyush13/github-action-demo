import shell from 'shelljs';
import { getTagName } from './getTagName';

const npmVersion = () => {
    const tagName = process.env.TAG_NAME;
    shell.exec(`npm version ${tagName}`);
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
