import shell from 'shelljs';
import { getTagName } from './getTagName';

(async () => {
    const distTagNames = await getTagName();
    const version = shell.exec(`node -p "require('./package.json').version"`).trim();
    const name = shell.exec(`node -p "require('./package.json').name"`).trim();

    const commands = distTagNames.map(tag => {
        return `npm dist-tag add ${name}@${version} ${tag}`;
    });

    console.log(commands);

    const result = commands.map(command => shell.exec(command));
    console.log(result);

})();
