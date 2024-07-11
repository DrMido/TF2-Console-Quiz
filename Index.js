import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

let playName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('TF2 Console Quiz \n');
  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}:
    Answer the following questions.
    These are well known for tf2 casual players
    `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'playerName',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });
  playName = answers.playerName;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question1',
    type: 'list',
    message: 'How many kills before you dominate someone?',
    choices: ['4', '5', '6', '7'],
  });
  return handleAnswer(answers.question1 === '4');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question2',
    type: 'list',
    message: 'When was the Initial release date for tf2?',
    choices: ['2006', '2007', '2008', '2009'],
  });
  return handleAnswer(answers.question2 === '2007');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question3',
    type: 'list',
    message: 'How many food weapons is there in tf2',
    choices: ['4', '5', '6', '7'],
  });
  return handleAnswer(answers.question3 === '7');
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question4',
    type: 'list',
    message: 'How much damage does a bodyshot deal from a sniperrifle?',
    choices: ['20', '30', '40', '50'],
  });
  return handleAnswer(answers.question4 === '50');
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question5',
    type: 'list',
    message: 'What was the first all class-hat?',
    choices: ["Bill's hat", "Ellis's hat", 'Team captain', "Cheater's lament"],
  });
  return handleAnswer(answers.question5 === "Cheater's lament");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Nice work ${playName}! You got it!` });
  } else {
    spinner.error({ text: `Game over, you lose!` });
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const msg = `Congratulations ${playName},\n you are the winner!`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();
