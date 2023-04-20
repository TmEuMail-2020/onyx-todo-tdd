import {program} from 'commander';
import {readFile, writeFile} from 'fs/promises';

interface Todo {
    task: string;
    completed: boolean;
}

// accept an array of todos, optional argument
program.arguments('<input tasks>')
    .description('Add a new task')
    .action((task: string) => {
        // show me how to use arguments
        console.log(`You added the task "${task}".`);



    });


program
    .version('0.1.0')
    .description('A simple command-line todo tool');

program
    .command('add <task>')
    .description('Add a new task')
    .action(async (task: string) => {
        const todos = await loadTodos();
        todos.push({task, completed: false});
        await saveTodos(todos);
        console.log(`Task "${task}" added to your todo list.`);
    });

program
    .command('list')
    .description('List all tasks')
    .action(async () => {
        const todos = await loadTodos();
        if (todos.length === 0) {
            console.log('Your todo list is empty.');
        } else {
            console.log('Your todo list:');
            for (let i = 0; i < todos.length; i++) {
                const todo = todos[i];
                console.log(`[${todo.completed ? 'x' : ' '}] ${todo.task}`);
            }
        }
    });

program
    .command('complete <index>')
    .description('Mark a task as completed')
    .action(async (index: string) => {
        const todos = await loadTodos();
        const i = parseInt(index, 10) - 1;
        if (i >= 0 && i < todos.length) {
            todos[i].completed = true;
            await saveTodos(todos);
            console.log(`Task "${todos[i].task}" marked as completed.`);
        } else {
            console.log(`Invalid task index: ${index}.`);
        }
    });

async function loadTodos(): Promise<Todo[]> {
    try {
        const data = await readFile('todos.json', 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveTodos(todos: Todo[]): Promise<void> {
    const data = JSON.stringify(todos, null, 2);
    await writeFile('todos.json', data, 'utf-8');
}

program.parse(process.argv);
