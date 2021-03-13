import shell from 'shelljs';
import { getTagName } from './getTagName';
import { TagAlreadyExistsError } from './constants';

shell.config.fatal = true;

const npmVersion = async() => {
    const tagName = process.env.TAG_NAME;
    try {
        shell.exec(`npm version ${tagName}`);
    }
    catch(ex) {
        if(TagAlreadyExistsError(tagName, ex.message)) {
            return ;
        }
        else {
            throw ex;
        }
    }
};

(async () => {
    npmVersion();
    const distTagNames = await getTagName();
    const version = shell.exec(`node -p "require('./package.json').version"`).trim();
    const name = shell.exec(`node -p "require('./package.json').name"`).trim();

    const firstDistTag = distTagNames.shift();
    shell.exec(`npm publish --tag ${firstDistTag}`);

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
