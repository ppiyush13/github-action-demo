
const errors = {
    invalidMainTagFormat: () => 'main/master branch can only have tags in format vx.x.x',
    invalidMainTag: (tagName, version) => `main/master branch tag [${tagName}] should be greater than published package version [${version}]`,
    invalidNextTagFormat: () => `next branch can only have tags in format vx.x.x-rc.x`,
    invalidNextTag: (tagName, version) => `next branch tag [${tagName}] should be greater than published package version [${version}]`,
    invalidLegacyTagFormat: () => `Legacy branch can only have tags in format vx.x.x`,
    invalidLegacyVersion: (branch, majorVersion) => `Legacy branch [${branch}] should have tags with major version [${majorVersion}]`,
    invalidBranchingStrategy: branch => `Branch ${branch} does not meet any branching format`,
};

export const throwError = (key, args = []) => {
    const errorFn = errors[key];
    throw new Error(
        errorFn(...args),
    );
};
