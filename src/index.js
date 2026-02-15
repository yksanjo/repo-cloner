#!/usr/bin/env node
const chalk = require('chalk');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

async function getRepos(username) {
  const repos = JSON.parse(execSync(`gh repo list ${username} --limit 100 --json name`, { encoding: 'utf8' }));
  return repos.map(r => r.name);
}

async function main() {
  console.log(chalk.cyan('\n📥 Repo Cloner v1.0.0\n'));
  const username = 'yksanjo';
  const repos = await getRepos(username);
  const { selected } = await inquirer.prompt([{ type: 'checkbox', name: 'selected', message: 'Select repos to clone:', choices: repos }]);
  for (const repo of selected) {
    console.log(chalk.blue(`Cloning ${repo}...`));
    try { execSync(`git clone https://github.com/${username}/${repo}.git`, { encoding: 'utf8' }); console.log(chalk.green('✓')); } 
    catch { console.log(chalk.red('✗')); }
  }
}
if (require.main === module) main().catch(console.error);
module.exports = { main };
