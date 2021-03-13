
import got from 'got';
import { Url, Branch, Tag, LegacyBranch } from './constants';
import { throwError } from './error';

const branchExits = async (branch) => {
    const repo = process.env.REPO;
    try {
        const { statusCode } = await got(Url.github(repo, branch));
        return statusCode === 200;
    }
    catch(ex) {
        if(ex.response && ex.response.statusCode === 404) return false;
        throw ex;
    }
}

export const resolveTagNames = async () => {
    const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();

    if([Branch.main, Branch.master].includes(branchName)) {
        return await branchExits(Branch.next)
            ? [Tag.latest]
            : [Tag.latest, Tag.next];
    }
    else if(branchName === Branch.next) {
        return [Tag.next];
    }
    else if(previousVersionBranch(branchName)) {
        const version = LegacyBranch.getVersion(branchName);
        return [ `${Tag.latest}-${version}` ];
    }
    else {
        throwError('invalidBranchingStrategy');
    }
}
