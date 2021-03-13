import shell from 'shelljs';
import { TagAlreadyExistsError } from './constants';

export const npmVersion = () => {
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
