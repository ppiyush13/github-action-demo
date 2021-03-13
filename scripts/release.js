import shell from 'shelljs';
import { getTagName } from './getTagName';

shell.config.fatal = true;

const npmVersion = () => {
    const tagName = process.env.TAG_NAME;
    shell.exec(`npm version ${tagName} --no-git-tag-version`);
};

const gitTag = () => {
    try {
        const tagName = process.env.TAG_NAME;
        const tagVersion = tagName.substr(1);
        shell.exec(`git tag ${tagName} -m ${tagVersion}`);
    }
    catch {
        console.log('Tagging failed');
    }
};

(async () => {
    npmVersion();
    const distTagNames = await getTagName();
    const version = shell.exec(`node -p "require('./package.json').version"`).trim();
    const name = shell.exec(`node -p "require('./package.json').name"`).trim();

    const firstDistTag = distTagNames.shift();
    shell.exec(`npm publish --tag ${firstDistTag}`);

    gitTag();

    try {
        distTagNames.map(tag => {
            shell.exec(`npm dist-tag add ${name}@${version} ${tag}`);
        });
    }
    catch(ex) {
        console.log('Dist-tagging failed, please consider doing it manually');
    }
    
})();

process.on('uncaughtException', error => {
    process.exit(1);
});

process.on('unhandledRejection', error => {
    process.exit(1);
});
