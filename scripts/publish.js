
const matchesLatest = str => str.match(/^v[\d]+.[\d]+.[\d]+$/);
const matchesNext = str => str.match(/^v[\d]+.[\d]+.[\d]+-rc.[\d]+$/);
const previousVersionBranch = str => str.match(/^v[\d]+$/);

function getTagName(branchName, tagName) {
    if(['main', 'master'].includes(branchName)) {
        if(matchesLatest(tagName))
            return 'latest';
        throw new Error('main/master branch can only have tags in format v1.0.0');
    }
    else if(branchName === 'next') {
        if(matchesNext(tagName))
            return 'next';
        throw new Error('next branch can only have tags in format v1.0.0-rc.0');
    }
    else if(previousVersionBranch(branchName)) {
        if(matchesLatest(tagName))
            return 'latest-' + branchName;
        throw new Error('previous branches can only have tags in format v1.0.0');
    }
    else {
        throw new Error(`Branch ${branchName} does not meet any branching format`);
    }
}

const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
const tagName = process.env.TAG_NAME.toLocaleLowerCase();
getTagName(branchName, tagName);
