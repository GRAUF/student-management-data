import inquirer from 'inquirer';
import chalk from 'chalk';
let students = [];
let nextId = 1;
const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Choose an option:',
            choices: [
                'Add Student',
                'Remove Student',
                'Show All Students',
                'Generate Fee Voucher',
                'Exit'
            ]
        }
    ]);
    switch (answers.option) {
        case 'Add Student':
            await addStudent();
            break;
        case 'Remove Student':
            await removeStudent();
            break;
        case 'Show All Students':
            showAllStudents();
            break;
        case 'Generate Fee Voucher':
            await generateFeeVoucher();
            break;
        case 'Exit':
            process.exit();
            break;
    }
    mainMenu();
};
const addStudent = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Student Name:'
        },
        {
            type: 'input',
            name: 'age',
            message: 'Student Age:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Student Email:'
        },
        {
            type: 'checkbox',
            name: 'courses',
            message: 'Select Courses:',
            choices: ['Data Science', 'Applied Generative AI Specialization', 'AWS Solutions Architect Training', 'PMP Certification Training', 'Business Intelligence', 'Advanced Executive Program In Cybersecurity', 'Full Stack Java Developer', 'Program In Digital Marketing']
        }
    ]);
    const student = {
        id: nextId++,
        name: answers.name,
        age: parseInt(answers.age),
        email: answers.email,
        courses: answers.courses,
        feeStatus: 'Pending'
    };
    students.push(student);
    console.log(chalk.green(`Student ${student.name} added with ID ${student.id}.`));
};
const removeStudent = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter Student ID to remove:'
        }
    ]);
    const id = parseInt(answers.id);
    students = students.filter(student => student.id !== id);
    console.log(chalk.red(`Student with ID ${id} removed.`));
};
const showAllStudents = () => {
    console.table(students);
};
const generateFeeVoucher = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter Student ID:'
        },
        {
            type: 'list',
            name: 'paymentMethod',
            message: 'Choose payment method:',
            choices: ['Bank Transfer', 'Cash', 'easeypassa', 'jazz-cash', 'credit-card']
        }
    ]);
    const student = students.find(student => student.id === parseInt(answers.id));
    if (student) {
        student.feeStatus = 'Paid';
        console.log(chalk.blue(`Fee voucher generated for ${student.name}. Payment method: ${answers.paymentMethod}.`));
    }
    else {
        console.log(chalk.red(`Student with ID ${answers.id} not found.`));
    }
    console.log(chalk.greenBright('payment successful paid'));
};
mainMenu();
// import inquirer from 'inquirer';
// import chalk from 'chalk';
// import Table from 'cli-table3';
// // Student type definition
// interface Student {
//     id: string;
//     name: string;
//     age: number;
//     email: string;
//     course: string;
//     fee: number;
//     paymentMethod: 'Bank Transfer' | 'PayPal' | 'Cash';
// }
// // Array to store students
// let students: Student[] = [];
// // Function to generate a unique student ID
// const generateStudentID = (): string => {
//     return `ID${Math.floor(Math.random() * 10000)}`;
// };
// // Function to add a new student
// const addStudent = async () => {
//     const answers = await inquirer.prompt([
//         { name: 'name', message: 'Enter student name:' },
//         { name: 'age', message: 'Enter student age:', validate: (input) => !isNaN(input) ? true : 'Please enter a number' },
//         { name: 'email', message: 'Enter student email:' },
//         { name: 'course',message: 'Select Courses:'},
//         { name: 'fee',message: 'Enter course fee (PKR):', validate: (input) => !isNaN(input) ? true : 'Please enter a number' },
//         {
//             type: 'list',
//             name: 'paymentMethod',
//             message: 'Choose payment method:',
//             choices: ['Bank Transfer', 'essaypassa','jaz-cash','Cash','credit card']
//         }
//     ]);
//     const student: Student = {
//         id: generateStudentID(),
//         name: answers.name,
//         age: parseInt(answers.age),
//         email: answers.email,
//         course: answers.course,
//         fee: parseInt(answers.fee),
//         paymentMethod: answers.paymentMethod
//     };
//     students.push(student);
//     console.log(chalk.green('Student added successfully!'));
// };
// // Function to remove a student
// const removeStudent = async () => {
//     const answers = await inquirer.prompt([
//         { name: 'id', message: 'Enter student ID to remove:' }
//     ]);
//     const index = students.findIndex(student => student.id === answers.id);
//     if (index !== -1) {
//         students.splice(index, 1);
//         console.log(chalk.red('Student removed successfully!'));
//     } else {
//         console.log(chalk.red('Student ID not found!'));
//     }
// };
// // Function to display all students
// const showAllStudents = async () => {
//     if (students.length === 0) {
//         console.log(chalk.yellow('No students found!'));
//         return;
//     }
//     const table = new Table({
//         head: ['ID', 'Name', 'Age', 'Email', 'course','Fee (PKR)', 'Payment Method']
//     });
//     students.forEach(student => {
//         table.push([student.id, student.name, student.age, student.email, student.course, student.fee, student.paymentMethod]);
//     });
//     console.log(table.toString());
// };
// // Main menu
// const main = async () => {
//     while (true) {
//         const answers = await inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'action',
//                 message: 'Choose an action:',
//                 choices: ['Add Student', 'Remove Student', 'Show All Students', 'Exit']
//             }
//         ]);
//         switch (answers.action) {
//             case 'Add Student':
//                 await addStudent();
//                 break;
//             case 'Remove Student':
//                 await removeStudent();
//                 break;
//             case 'Show All Students':
//                 await showAllStudents();
//                 break;
//             case 'Exit':
//                 console.log(chalk.blue('Goodbye!'));
//                 process.exit();
//         }
//     }
// };
// // Start the application
// main();
