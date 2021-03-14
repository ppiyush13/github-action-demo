import shell from 'shelljs';
import { pkgMetadata } from './constants';

export const applyDistTags = distTags => {
    const { name, version } = pkgMetadata;

    try {
        distTags.map(tag => {
            const command = `npm dist-tag add ${name()}@${version()} ${tag}`;
            console.log(`Executing command: ${command}`);
            shell.exec(command);
        });
    }
    catch(ex) {
        console.error('Dist-tagging failed, please consider doing it manually');
    }
};
