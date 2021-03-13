import { assertBranchingStrategy } from './assert/assertBranchingStrategy';
import { resolveTagNames } from './resolveTagNames';
import { npmVersion } from './step.npm-version';
import { publish } from './step.publish';
import { applyDistTags } from './step.dist-tag';
import { handleGlobalException } from './globalException';

(async () => {
    try {
        assertBranchingStrategy();

        /** verify branching strategy and get all npm dist-tags */
        const [publishDistTag, ...otherDistTag] = await resolveTagNames();
        
        /** run: npm version */
        npmVersion();

        /** run: npm publish */
        publish(publishDistTag);

        /** run: npm dist-tag add */
        applyDistTags(otherDistTag);
    }
    catch(ex) {
        /** log error and exit */
        handleGlobalException(ex);
    }
})();
