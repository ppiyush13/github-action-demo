import nock from 'nock';
import mockedEnv from 'mocked-env';
import { getTagName } from './getTagName';
import { ghUrl, InvalidTagForMain, InvalidTagForNext, InvalidTagForPrevious, InvalidBranchingStrategy } from './constants';

describe('testing publisher module positive scenarios', () => {
    afterEach(() => nock.cleanAll());
    const { repo, url } = {
        repo: 'owner/repo',
        url: ghUrl('owner/repo', 'next'),
    };

    it.each([
        {
            branch: 'main',
            tag: 'v1.0.13',
            nextBranchExists: true,
            expectedDistTags: ['latest'],
        },
        {
            branch: 'master',
            tag: 'v1.0.13',
            nextBranchExists: false,
            expectedDistTags: ['latest', 'next'],
        },
        {
            branch: 'v5',
            tag: 'v5.0.0',
            expectedDistTags: ['latest-5'],
        },
        {
            branch: 'next',
            tag: 'v4.0.0-rc.1',
            expectedDistTags: ['next'],
        },
        {
            branch: 'V3',
            tag: 'v3.0.1',
            expectedDistTags: ['latest-3'],
        },
    ])('Pos: Testing getTagName function', async ({ branch, tag, nextBranchExists, expectedDistTags }) => {
        mockedEnv({
            REPO: repo,
            BRANCH_NAME: branch,
            TAG_NAME: tag,
        });

        nock('https://api.github.com/repos/owner/repo')
            .get('/branches/next') 
            .reply(nextBranchExists ? 200 : 404);

        await expect(getTagName()).resolves.toEqual(expectedDistTags);
    });

    it.each([
        {
            branch: 'main',
            tag: 'v1.0.13-rc.4',
            expectedError: InvalidTagForMain,
        },
        {
            branch: 'master',
            tag: 'v1.0.13-beta.0',
            expectedError: InvalidTagForMain,
        },
        {
            branch: 'main',
            tag: '1.0.13',
            expectedError: InvalidTagForMain,
        },
        {
            branch: 'next',
            tag: 'v4.0.0',
            expectedError: InvalidTagForNext,
        },
        {
            branch: 'v5',
            tag: 'v5.0.0-rc.4',
            expectedError: InvalidTagForPrevious,
        },
        {
            branch: 'release_branch',
            tag: 'v5.0.0',
            expectedError: InvalidBranchingStrategy('release_branch'),
        },
        {
            branch: 'v5.0.0',
            tag: 'v5.0.0',
            expectedError: InvalidBranchingStrategy('v5.0.0'),
        },
        {
            branch: 'v5-0-0',
            tag: 'v5.0.0',
            expectedError: InvalidBranchingStrategy('v5-0-0'),
        },
        {
            branch: '5',
            tag: 'v5.0.0',
            expectedError: InvalidBranchingStrategy('5'),
        },
    ])('Neg: Testing getTagName function', async ({ branch, tag, expectedError }) => {
        mockedEnv({
            BRANCH_NAME: branch,
            TAG_NAME: tag,
        });
        await expect(getTagName()).rejects.toThrow(expectedError);
    });
});
