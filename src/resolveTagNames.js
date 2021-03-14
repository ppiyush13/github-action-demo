
import { Branch, Tag, LegacyBranch, previousVersionBranch } from './constants';
import { throwError } from './error';
import { getDistTagVersion } from './dist-tags';

export const resolveTagNames = () => {
    const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();

    if([Branch.main, Branch.master].includes(branchName)) {
        const distTagOfLatest =  getDistTagVersion(Tag.latest);
        const distTagOfNext = getDistTagVersion(Tag.next);

        if(
            distTagOfLatest === distTagOfNext ||
            (distTagOfLatest && !distTagOfNext)
        )
            return [Tag.latest, Tag.next];

        return [Tag.latest];
    }
    else if(branchName === Branch.next) {
        return [Tag.next];
    }
    else if(LegacyBranch.matchVersion(branchName)) {
        const version = LegacyBranch.getVersion(branchName);
        return [ `${Tag.latest}-${version}` ];
    }
    else {
        throwError('invalidBranchingStrategy');
    }
}
