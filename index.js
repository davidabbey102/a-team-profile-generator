//Link to employee classes
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

//Link to node modules
const fs = require('fs')
const inquirer = require('inquirer')

//Link to HTML generation
const generateHtml = require('./util/generateHtml')

//Create an array named team to be pushed to with each members info for generate HTML to use to create profiles
const team = []

//Adding employees functions. First gets which position employee fills, then directs to position specific functions based on answer
const employeeData = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What is the employee's position?",
                name: 'position',
                choices: ['Manager', 'Engineer', 'Intern']
            }])
        .then(ans => {
            if (ans.position == 'Manager') {
                managerInfo()
            } else if (ans.position == 'Engineer') {
                engineerInfo()
            } else if (ans.position == 'Intern') {
                internInfo()
            }
        })

        .catch((err) => {console.error(err)});
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
    inquirer.prompt([{
        type: 'list',
        message: 'Do you have more employees to add?',
        name: 'more',
        choices: ['Yes', 'No']
    }]).then(ans => {
        if (ans.more === 'Yes') {
            employeeData()
        } else {
            console.log(`Generating team profile page.`)
            fs.writeFile('./dist/index.html', generateHtml(team), (err) =>
            err ? console.log(err) : console.log('COMPLETE!!! Your team profile page file can be found in the dist folder.'))
        }
    })
}

employeeData()