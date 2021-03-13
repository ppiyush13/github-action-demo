import { mockShell } from '../shell';
import shelly, { named } from '../shelly';


describe('testing shell', () => {

    it('should mock and returns all', () => {
        const getCommandStack = mockShell();
        shelly();
        expect(getCommandStack()).toEqual([
            `node -p "require('./package.json').name"`,
            `node -p "require('./package.json').version"`,
        ])
    });

    it('should mock and returns all', () => {
        const getCommandStack = mockShell();
        named();
        expect(getCommandStack()).toEqual([
            `node -p "require('./package.json').name"`,
        ])
    });
});
