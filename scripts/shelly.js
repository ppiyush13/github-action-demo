import { exec } from './shell';

export default () => {
    exec(`node -p "require('./package.json').name"`);
    exec(`node -p "require('./package.json').version"`);
};

export const named = () => {
    exec(`node -p "require('./package.json').name"`);
};
