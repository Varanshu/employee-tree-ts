interface Employee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
};

const ceo: Employee = {
    uniqueId: 1,
    name: 'John Smith',
    subordinates: [
        {
            uniqueId: 2,
            name: 'Margot Donald',
            subordinates: [
                {
                    uniqueId: 6,
                    name: 'Cassandra Reynolds',
                    subordinates: [
                        {
                            uniqueId: 11,
                            name: 'Mary Blue',
                            subordinates: []
                        }, {
                            uniqueId: 12,
                            name: 'Bob Saget',
                            subordinates: [
                                {
                                    uniqueId: 14,
                                    name: 'Tina Teff',
                                    subordinates: [
                                        {
                                            uniqueId: 15,
                                            name: 'Will Turner',
                                            subordinates: []
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]
        }, {
            uniqueId: 3,
            name: 'Tyler Simpson',
            subordinates: [
                {
                    uniqueId: 7,
                    name: 'Harry Tobs',
                    subordinates: [
                        {
                            uniqueId: 13,
                            name: 'Thomas Brown',
                            subordinates: []
                        }
                    ]
                },
                {
                    uniqueId: 8,
                    name: 'George Carrey',
                    subordinates: []
                },
                {
                    uniqueId: 9,
                    name: 'Gary Styles',
                    subordinates: []
                }
            ]
        }, {
            uniqueId: 4,
            name: 'Ben Willis',
            subordinates: []
        }, {
            uniqueId: 5,
            name: 'Georgina Flangy',
            subordinates: [
                {
                    uniqueId: 10,
                    name: 'Sophie Turner',
                    subordinates: []
                }
            ]
        }
    ]
}

class IEmployeeOrgApp {

    private allEmployees: Employee;
    private history: String[] = [];
    private currentIndex: number = -1;

    constructor(ceo: Employee) {
        this.allEmployees = ceo
    }

    move(employeeID: number, supervisorID: number): void {
        const employee = this.findEmployee(employeeID, this.allEmployees)
        const supervisor = this.findEmployee(supervisorID, this.allEmployees)
        if (employee && supervisor) {
            this.addToHistory()
            this.removeFromSupervisor(employee)
            supervisor.subordinates.push(employee)
        } else
            console.log("Unable to find the employee please check again with different ID")
        console.log("move", this.allEmployees);
    }

    undo(): void {
        if (this.currentIndex > 0) {
            const prevState = this.history[this.currentIndex]
            this.addToHistory()
            this.allEmployees = JSON.parse(prevState)
            this.currentIndex--;
        }
        console.log("undo", this.allEmployees);
    }

    redo(): void {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++
            const prevState = this.history[this.currentIndex]
            this.allEmployees = JSON.parse(prevState)
        }
        console.log("redo", this.allEmployees);
    }

    private addToHistory(): void {
        if (this.currentIndex < this.history.length - 1) {
            this.history.splice(this.currentIndex + 1)
        }
        this.history.push(JSON.stringify(this.allEmployees))
        this.currentIndex = this.history.length - 1
    }

    private findEmployee(id: number, employee: Employee): Employee | undefined {
        if (employee.uniqueId === id) {
            return employee
        }
        for (const subordinate of employee.subordinates) {
            const employeeRes = this.findEmployee(id, subordinate)
            if (employeeRes)
                return employeeRes
        }
        return
    }

    private removeFromSupervisor(employee: Employee) {
        const supervisor = this.findSupervisor(employee.uniqueId, this.allEmployees, this.allEmployees)
        const index = supervisor ? supervisor.subordinates.indexOf(employee) : -1
        if (supervisor && index !== -1) {
            supervisor.subordinates.splice(index, 1)
        }
    }

    private findSupervisor(id: number, employee: Employee, supervisor: Employee): Employee | undefined {
        if (employee.uniqueId === id && employee.uniqueId === supervisor.uniqueId) {
            return employee
        }
        for (const sub of supervisor.subordinates) {
            if (sub.uniqueId === id)
                return supervisor
        }
        for (const subordinate of employee.subordinates) {
            const employeeRes = this.findSupervisor(id, subordinate, employee)
            if (employeeRes)
                return employeeRes
        }
        return
    }
}

const app = new IEmployeeOrgApp(ceo)
app.move(10, 4)
app.move(9, 5)
app.undo()
app.redo()
