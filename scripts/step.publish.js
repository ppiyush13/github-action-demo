import shell from 'shelljs';

export const publish = (publishTag) => {
    shell.exec(`npm publish --tag ${publishTag}`);
};
