import type {Config} from '@jest/types';
module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/__tests__/**/*.test.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).test.+(ts|tsx|js)"
    ],

    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
}

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",

    },
};
export default config;
