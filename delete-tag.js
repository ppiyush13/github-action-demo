const { Octokit } = require("@octokit/rest");

/** check if tag mention */
const tag = process.argv[2];
if (!tag) throw new Error('specify tag to be deleted');

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
