
import { InvalidTagForMain, InvalidTagForNext, InvalidTagForPrevious, InvalidBranchingStrategy, ghUrl,
            Main, Master, NextBranch, Latest, NextTag } from './constants';
const matchesLatest = str => str.match(/^v[\d]+.[\d]+.[\d]+$/);
const matchesNext = str => str.match(/^v[\d]+.[\d]+.[\d]+-rc.[\d]+$/);
const previousVersionBranch = str => str.match(/^v[\d]+$/);
const getVersionFromPreviousBranch = str => str.match(/^v([\d]+)$/);


const branchExits = async (branch) => {
    const repo = process.env.REPO;
    const { status } = await fetch(
        ghUrl(repo, branch)
    );
    return status === 200;
}

export const getTagName = async () => {
    const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
    const tagName = process.env.TAG_NAME.toLocaleLowerCase();

    if([Main, Master].includes(branchName)) {
        if(matchesLatest(tagName)) {
            return await branchExits(NextBranch)
                ? [Latest]
                : [Latest, NextTag];
        }
        throw new Error(InvalidTagForMain);
    }
    else if(branchName === NextBranch) {
        if(matchesNext(tagName))
            return [NextTag];
        throw new Error(InvalidTagForNext);
    }
    else if(previousVersionBranch(branchName)) {
        if(matchesLatest(tagName)) {
            const [, version] = getVersionFromPreviousBranch(branchName);
            return [ `${Latest}-${version}` ];
        }
        throw new Error(InvalidTagForPrevious);
    }
    else {
        throw new Error(
            InvalidBranchingStrategy(branchName)
        );
    }
}