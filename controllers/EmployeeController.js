// import Model Employee
const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
    async index(req, res) {
        // memanggil method static all dengan async await
        const employees = await Employee.all();
    
        if (employees.length > 0) {
            const data = {
                message: "Menampilkan data employee",
                data: employees,
            };
            // mengembalikan data json
            return res.status(200).json(data);
        }
        else {
            const data = {
                message: "Employee tidak ditemukan",
                };
                // mengembalikan data json
                return res.status(404).json(data);
        }
    }

    async store(req, res) {
        const { name, gender, phone, address, email, status, hired_on } = req.body;
        // menambahkan validasi data
        if (!name || !gender || !phone || !address || ! email || ! status || ! hired_on) {
            const data = {
                message: "Semua data harus dikirim",
                };
            return res.status(422).json(data);
        }
        else{
            const employee = await Employee.create(req.body);
            const data = {
                message: `Menambahkan data employee`,
                data: employee,
                };
            return res.status(201).json(data);
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const employee = await Employee.find(id);
    
        if (employee) {
            const employee = await Employee.update(id, req.body);
            const data = {
                message: `Mengedit data employee`,
                data: employee,
                };
            return res.status(200).json(data);
        }
        else{
            const data = {
                message: "Data employee tidak ditemukan",
                };
            return res.status(404).json(data);
        }
    }
    
    async destroy(req, res) {
        const { id } = req.params;
        const employee = await Employee.find(id);
    
        if (employee) {
            await Employee.delete(id);
            const data = {
                message: `Menghapus data employee`,
            };
            return res.status(200).json(data);
        }
        else{
            const data = {
                message: "Data employee tidak ditemukan",
                };
            return res.status(404).json(data);
        }
    }
    
    async show(req, res) {
        const { id } = req.params;
        const employee = await Employee.find(id);
    
        if (employee) {
            const data = {
                message: "Menampilkan detail employee",
                data: employee,
            };
            return res.status(200).json(data);
        }
        else{
            const data = {
                message: "Employee tidak ditemukan",
            };
            return res.status(404).json(data);
        }
    }

    async search(req, res) {
        const { name } = req.params;
        const employee = await Employee.find(name);
    
        if (employee.length > 0) {
            const data = {
                message: "Menampilkan detail employee",
                data: employee,
            };
            return res.status(200).json(data);
        }
        else{
            const data = {
                message: "Employee tidak ditemukan",
            };
            return res.status(404).json(data);
        }
    }

    async getActiveEmployees(req, res) {
        try {
            const employees = await Employee.findByStatus('active');
            if (employees && employees.length > 0) {
                const data = {
                    message: "Menampilkan data status active",
                    data: employees,
                };
                return res.status(200).json(data);
            }
            else {
                const data = {
                    message: "Data status active tidak ditemukan",
                };
            return res.status(404).json(data);
            }
        }
        catch (error) {
            const data = {
                message: error.message,
            };
            return res.status(500).json(data);
        }
    }

    async getInactiveEmployees(req, res) {
        try {
            const employees = await Employee.findByStatus('inactive');
            if (employees && employees.length > 0) {
                const data = {
                    message: "Menampilkan data status inactive",
                    data: employees,
                };
                return res.status(200).json(data);
            }
            else {
                const data = {
                    message: "Data status inactive tidak ditemukan",
                };
            return res.status(404).json(data);
            }
        }
        catch (error) {
            const data = {
                message: error.message,
            };
            return res.status(500).json(data);
        }
    }

    async getTerminatedEmployees(req, res) {
        try {
            const employees = await Employee.findByStatus('terminated');
            if (employees && employees.length > 0) {
                const data = {
                    message: "Menampilkan data status terminated",
                    data: employees,
                };
                return res.status(200).json(data);
            }
            else {
                const data = {
                    message: "Data status terminated tidak ditemukan",
                };
            return res.status(404).json(data);
            }
        }
        catch (error) {
            const data = {
                message: error.message,
            };
            return res.status(500).json(data);
        }
    }
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;