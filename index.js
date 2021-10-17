//Link to HTML generation
const generateHtml = require('./util/generateHtml')

//Link to employee classes
const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

//Link to node modules
const fs = require('fs')
const inquirer = require('inquirer')

//Create an array named team to be pushed to with each members info for generate HTML to use to create profiles and a counter for how many team members have been entered just for fun with console log messages
const team = []
const teamCount = 0

//Adding employees functions. First gets which position employee fills, then directs to position specific functions based on answer
const employeeData = () => {
    inquirer
        .prompt([{
            type: 'list',
            message: "What is the employee's position?",
            name: 'position',
            choices: ['Manager', 'Engineer', 'Intern'],
        }])
        .then(ans => {
            console.log("Hello")
            switch (ans.position) {
                case 'Manager':
                    managerInfo()
                    break
                case 'Engineer':
                    engineerInfo()
                    break
                default:
                    internInfo()
                    break
            }

        })

        .catch((err) => console.error(err));
}

const managerInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the manager's name?",
            name: 'name',
        }, {
            type: 'input',
            message: "What is the manager's ID number?",
            name: 'id',
        }, {
            type: 'input',
            message: "What is the manager's email?",
            name: 'email',
        }, {
            type: 'input',
            message: "What is the manager's office number?",
            name: 'officeNumber'
        }
    ]).then(managerInfo => {
        const { name, id, email, officeNumber } = managerInfo
        const manager = new Manager(name, id, email, officeNumber)
        team.push(manager)
        moreEmployee()
    })
}

const engineerInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the engineer's name?",
            name: 'name',
        }, {
            type: 'iput',
            message: "What is the engineer's ID number?",
            name: 'id',
        }, {
            type: 'input',
            message: "What is the engineer's email?",
            name: 'email',
        }, {
            type: 'input',
            message: "What is the engineer's GitHub username?",
            name: 'gitHub'
        }
    ]).then(engineerInfo => {
        const { name, id, email, gitHub } = engineerInfo
        const engineer = new Engineer(name, id, email, gitHub)
        team.push(engineer)
        moreEmployee()
    })
}

const internInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the intern's name?",
            name: 'name',
        }, {
            type: 'iput',
            message: "What is intern's ID number?",
            name: 'id',
        }, {
            type: 'input',
            message: "What is intern's email?",
            name: 'email',
        }, {
            type: 'input',
            message: 'What school does intern attend?',
            name: 'school'
        }
    ]).then(internInfo => {
        const { name, id, email, school } = internInfo
        const intern = new Intern(name, id, email, school)
        team.push(intern)
        moreEmployee()
    })
}

const moreEmployee = () => {
    teamCount++
    inquirer.prompt([{
        type: 'checkbox',
        message: `You have entered ${teamCount} new employees. Do you have more employees to add?`,
        name: 'more',
        choices: ['Yes', 'No']
    }]).then(ans => {
        if (ans.more === 'Yes') {
            employeeData()
        } else {
            console.log(`You have entered ${teamCount} new employees.
        --------------------------------------------
        Generating team profile page.`)
            fs.writeFile('./generated-html/index.html', generateHtml(team))
        }
    })
}

employeeData()

module.exports = index