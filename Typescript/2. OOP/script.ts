abstract class Person {
      public constructor(private _firstName: string, private _lastName: string) {}

      public get firstName() {
            return this._firstName;
      }

      public get lastName() {
            return this._lastName;
      }

      public set firstName(value: string) {
            if (value.length > 0) {
                  this._firstName = value;
            }
      }

      public set lastName(value: string) {
            if (value.length > 0) {
                  this._lastName = value;
            }
      }

      public toString(): string {
            return `${this.firstName} ${this.lastName}`;
      }
}

class Employee extends Person {
      public constructor(private readonly _id: string, firstName: string, lastName: string, private _salary: number) {
            super(firstName, lastName);
            this.salary = _salary;
      }

      public get id() {
            return this._id;
      }

      public get salary() {
            return this._salary;
      }

      public set salary(value: number) {
            if (value > this._salary) {
                  this._salary = value;
            }
      }

      public toString(): string {
            return `[${this.id}] ${super.toString()} - ${this.salary}`;
      }
}

class Department {
      public employees: Array<Employee>;

      public constructor(private _name: string) {
            this.employees = [];
      }

      public get name() {
            return this._name;
      }

      public set name(value: string) {
            if (value.length > 0) {
                  this._name = value;
            }
      }

      public addEmployee(newEmployee: Employee): void {
            this.employees.push(newEmployee);
      }

      public removeEmployee(oldEmployee: Employee): void {
            const index = this.employees.findIndex(
                  (currEmployee: Employee, index: number) => currEmployee.id === oldEmployee.id
            );
            if (index !== -1) {
                  this.employees.splice(index, 1);
            }
      }

      public *[Symbol.iterator]() {
            for (let i = 0; i < this.employees.length; i++) {
                  yield this.employees[i];
            }
      }

      public toString(): string {
            return `Department ${this.name} `.concat(
                  this.employees.reduce((prev, curr) => prev.concat(curr.toString().concat('\n')), '\n')
            );
      }
}

const development = new Department('development');
const sales = new Department('sales');

development.addEmployee(new Employee('1', 'Mario', 'Rossi', 20000));
development.addEmployee(new Employee('2', 'Maria', 'Bruni', 25000));
development.addEmployee(new Employee('3', 'Federico', 'Neri', 27000));
development.addEmployee(new Employee('4', 'Federica', 'Gialli', 20000));

sales.addEmployee(new Employee('5', 'Angelo', 'Neri', 21000));
sales.addEmployee(new Employee('6', 'Angela', 'Bianchi', 21000));
sales.addEmployee(new Employee('7', 'Francesco', 'Rossi', 21000));
sales.addEmployee(new Employee('8', 'Francesca', 'Verdi', 21000));
sales.addEmployee(new Employee('9', 'Luigi', 'Gialli', 21000));
sales.addEmployee(new Employee('10', 'Luigia', 'Neri', 21000));

console.log(development.toString());
console.log(sales.toString());

for (const employee of development) {
      console.log(employee.toString());
}

for (const employee of sales) {
      console.log(employee.toString());
}