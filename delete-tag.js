const { Octokit } = require("@octokit/rest");

/** check if tag mention */
const tag = process.argv[2];
if (!tag) return null;

(async () => {
    /** create Octokit instance */
    const octokit = new Octokit({
        auth: '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',
    });
    const { data } = await octokit.rest.git.deleteRef({
        owner: 'ppiyush13',
        repo: 'github-action-demo',
        ref: 'tags/' + tag,
    });
    console.log(data);

})();
