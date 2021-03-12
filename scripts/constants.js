
export const InvalidTagForMain = 'main/master branch can only have tags in format vx.x.x';
export const InvalidTagForNext = 'next branch can only have tags in format vx.x.x-rc.x';
export const InvalidTagForPrevious = 'Previous branches can only have tags in format vx.x.x';
export const InvalidBranchingStrategy = branch => `Branch ${branch} does not meet any branching format`;

export const ghUrl = (repo, branch) => `https://api.github.com/repos/${repo}/branches/${branch}`;

/** branch */
export const Main = 'main';
export const Master = 'master';
export const NextBranch = 'next';

/** tags */
export const Latest = 'latest';
export const NextTag = 'next';
