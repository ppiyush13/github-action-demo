import got from 'got';
import semverMajor from 'semver/functions/major';
import semverGt from 'semver/functions/gt';
import { pkgMetadata, Url, LegacyBranch } from '../constants';
import { throwError } from '../error';

const getLatestVersion = async () => {
    try {
        const packageName = pkgMetadata.name;
        const response = await got(Url.npm(packageName), {
            responseType: 'json',
        });
        return response.body.collected.metadata.version;
    }
    catch(ex) {
        if(ex.response && ex.response.statusCode === 404)
            return undefined;
        throw ex;
    }
};

export const verifyMainAndNextVersion = (errorKey, { tagName }) => {
    const latestVersion = await getLatestVersion();
    if(latestVersion) 
        return semverGt(tagName, latestVersion)
            ? true
            : throwError(errorKey, [tagName, latestVersion]);
    else
        console.log('Seems like first time publish !!');
};

export const verifyLegacyVersion = ({ branchName, tagName }) => {
    /** assert that major version and branch version matches */
    const branchVersion = LegacyBranch.getVersion(branchName);
    const tagMajorVersion = `${semverMajor(tagName)}`;

    return branchVersion === tagMajorVersion
        ? true
        : throwError('invalidLegacyVersion', [branchName, tagMajorVersion]);
};
