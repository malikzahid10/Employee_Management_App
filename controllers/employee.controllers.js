const { Op } = require("sequelize");
const { User, Role, Employee } = require("../models");
const bcrypt = require("bcrypt");

const registerEmployee = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      firstName,
      lastName,
      department,
      salary,
    } = req.body;

    const existUser = await User.findOne({ where: { email: email } });

    if (existUser) {
      return res.status(409).json({
        message: "This Email is Already Registered!",
      });
    }

    const employeeRole = await Role.findOne({ where: { role: "Employee" } });

    if (!employeeRole) {
      return res.status(404).json({
        message: "Role not found!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashPassword,
    });

    const employee = await user.createEmployee({
      firstName,
      lastName,
      department,
      salary,
    });

    await user.addRoles(employeeRole);
    return res.status(201).json({
      message: "Employee created Successfully!",
      newEmployee: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        department: employee.department,
        salary: employee.salary,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOwnProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const employee = await Employee.findOne({
      where: { UserId: userId },
      include: {
        model: User,
        attributes: ["id", "userName", "email", "isActive"],
      },
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee Profile not found!",
      });
    }

    return res.status(200).json({
      message: "Employee Profile Fetch",
      employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const updateOwnProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const employee = await Employee.findOne({ where: { UserId: userId } });

    if (!employee) {
      return res.status(404).json({
        message: "Employee Profile not found!",
      });
    }

    await employee.update(req.body);
    return res.status(200).json({
      message: "Update Own Profile Success!",
      employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: User,
        attributes: ["id", "userName", "email", "isActive"],
      },
    });
    return res.status(200).json({
      message: "Employee fetched Successfully!",
      employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: { id: id },
      include: {
        model: User,
        attributes: ["id", "userName", "email", "isActive"],
      },
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found!",
      });
    }
    return res.status(200).json({
      message: "Employee fetch successfully!",
      employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ where: { id: id } });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found!",
      });
    }

    await employee.update(req.body);

    return res.status(200).json({
      message: "Employee Update Successfully!",
      employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ where: { id: id } });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found!",
      });
    }

    const userId = employee.UserId;

    await employee.destroy();

    await User.destroy({ where: { id: userId } });

    return res.status(200).json({
      message: "Employee deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const searchEmployees = async (req, res) => {
  try {
    const { search } = req.query;

    const employees = await Employee.findAll({
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            lastName: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      },
      include: {
        model: User,
        attributes: ["id", "userName", "email", "isActive"],
      },
    });

    if (employees.length === 0) {
      return res.status(404).json({
        message: "Employee not found this name!",
      });
    }
    return res.status(200).json({
      message: "Employee serached Successfully!",
      employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getSalaryByEmployees = async (req, res) => {
  try {
    const { minSalary } = req.query;

    if (!minSalary) {
      return res.status(400).json({
        message: "Minimum salary is required",
      });
    }

    const employees = await Employee.findAll({
      where: { salary: { [Op.gt]: minSalary } },
      include: {
        model: User,
        attributes: ["id", "userName", "email", "isActive"],
      },
    });

    if (employees.length === 0) {
      return res.status(404).json({
        message: "Employee not found this salary",
      });
    }
    return res.status(200).json({
      message: "Employee fetch successfully this salary",
      employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerEmployee,
  getOwnProfile,
  updateOwnProfile,
  getEmployees,
  getOneEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getSalaryByEmployees,
};
