import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(`${chalk.bgRed('ERROR:')} ${error}`);
};

const printSuccess = (message) => {
    console.log(`${chalk.bgGreen('SUCCESS:')} ${message}`);
};

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan('HELP')}
        Without params - shows weather;
        -s [CITY] - set city to show weather;
        -h - show help;
        -t [API_KEY] - to save token`)
    );
};

export {printError, printSuccess, printHelp};