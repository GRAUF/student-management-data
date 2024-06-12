#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';

// Student type definition
interface Student {
    id: string;
    name: string;
    age: number;
    email: string;
    course: string;
    fee: number;
    paymentMethod: 'Bank Transfer' | 'PayPal' | 'Cash';
}

// Array to store students
let students: Student[] = [];

// Function to generate a unique student ID
const generateStudentID = (): string => {
    return `ID${Math.floor(Math.random() * 10000)}`;
};

// Function to add a new student
const addStudent = async () => {
    const answers = await inquirer.prompt([
        { name: 'name', message: 'Student Name:' },
        { name: 'age', message: 'Student Age:', validate: (input) => !isNaN(input) ? true : 'Please enter a number' },
        { name: 'email', message: 'Student E_mail:' },
        { name: 'course',message: 'Select Courses:'},
        { name: 'fee',message: 'Enter Course Fee in (PKR):', validate: (input) => !isNaN(input) ? true : 'Please enter a number' },
        {
            type: 'list',
            name: 'paymentMethod',
            message: 'Select payment :',
            choices: ['Bank Transfer', 'essaypassa','jaz-cash','Cash','credit card']
        }

    ]);

    const student: Student = {
        id: generateStudentID(),
        name: answers.name,
        age: parseInt(answers.age),
        email: answers.email,
        course: answers.course,
        fee: parseInt(answers.fee),
        paymentMethod: answers.paymentMethod
    };

    students.push(student);
    console.log(chalk.green('Student has been add successfully!'));
};

// Function to remove a student
const removeStudent = async () => {
    const answers = await inquirer.prompt([
        { name: 'id', message: 'please Enter student ID to remove:' }
    ]);

    const index = students.findIndex(student => student.id === answers.id);
    if (index !== -1) {
        students.splice(index, 1);
        console.log(chalk.red('Student Removed successfully!'));
    } else {
        console.log(chalk.red('Student ID Not Found!'));
    }
};

// Function to display all students
const showAllStudents = async () => {
    if (students.length === 0) {
        console.log(chalk.yellow('No Student Found!'));
        return;
    }

    const table = new Table({
        head: ['ID', 'Name', 'Age', 'Email', 'course','Fee (PKR)', 'Payment Method']
    });

    students.forEach(student => {
        table.push([student.id, student.name, student.age, student.email, student.course, student.fee, student.paymentMethod]);
    });

    console.log(table.toString());
};

// Main menu
const main = async () => {
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Select Option:',
                choices: ['Add Student', 'Remove Student', 'Show All Students', 'Exit']
            }
        ]);

        switch (answers.action) {
            case 'Add Student':
                await addStudent();
                break;
            case 'Remove Student':
                await removeStudent();
                break;
            case 'Show All Students':
                await showAllStudents();
                break;
            case 'Exit':
                console.log(chalk.blue('Goodbye!Come Again!'));
                process.exit();
        }
    }
};

// Start the application
main();
