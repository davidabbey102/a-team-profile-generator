const inquirer = require('inquirer')

const employeeData = () => {
inquirer.prompt([
    {
    type: 'checkbox',
    mmessage: 'What is your position',
    name: 'position',
    choices: ['Manager', 'Engineer', 'Intern'],
}
]).then(ans=>{
    if(ans.choice==='Manager'){
        managerInfo()
    } else if (ans.choice==='Engineer'){
        engineerInfo()
    } else {
        internInfo()
    }
})
}

const managerInfo = () =>{
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your name?',
            name: 'name',
        },{
            type: 'iput',
            message: 'What is your ID number?',
            name: 'id',
        },{
            type: 'input',
            message: 'What is your email?',
            name: 'email',
        },{
            type: 'input',
            message: 'What is your office number?',
            name: 'officeNumber'
        }
    ])
}

const engineerInfo = () =>{
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your name?',
            name: 'name',
        },{
            type: 'iput',
            message: 'What is your ID number?',
            name: 'id',
        },{
            type: 'input',
            message: 'What is your email?',
            name: 'email',
        },{
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'gitHub'
        }
    ])
}

const internInfo = () =>{
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your name?',
            name: 'name',
        },{
            type: 'iput',
            message: 'What is your ID number?',
            name: 'id',
        },{
            type: 'input',
            message: 'What is your email?',
            name: 'email',
        },{
            type: 'input',
            message: 'What is school do you attend?',
            name: 'school'
        }
    ])
}






employeeData()

