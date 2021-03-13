import shell from 'shelljs';

/** replace actual fn with mock functions */
const execMock = shell.exec = jest.fn();

/** clear mocks after every test case */
afterEach(() => execMock.mockClear());

export const mockShell = () => {
    /** getCommandStack function */
    return () => {
        return execMock.mock.calls.map(args => args[0]);
    };
};
