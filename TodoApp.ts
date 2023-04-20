// todo commandline tool, using program npm package, takes input then print it
import { program }
from 'commander';

program
    .version('0.0.1')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq');

// create code to take input from commandline as todo
program
    .command('add <task>')
    .description('Add a task to the list')
    .action((task) => {
        console.log(`Adding task: ${task}`);
    }
    );

// create code to print the list of todo
program.parse(process.argv);
