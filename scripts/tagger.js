import shell from 'shelljs';
import { getTagName } from './getTagName';

(async () => {
    console.log('Node version:', shell.exec(`node -v`));
    console.log('NPM version:', shell.exec(`npm -v`));

    const distTagNames = await getTagName();
    const version = shell.exec(`node -p "require('./package.json').version"`);
    const name = shell.exec(`node -p "require('./package.json').name"`);

    const commands = distTagNames.map(tag => {
        return `npm dist-tag add ${name}@${version} ${tag}`;
    });

    console.log(commands);

})();
