angular.module('ObjectModule').controller('ObjectController', function ObjectController() {
      this.employees = [];
      this.employee = {};
      this.property = {};

      this.checkFormValidity = function checkFormValidity() {
            if (this.employee && this.property) {
                  if (this.employee.firstName && this.employee.lastName && this.property.key && this.property.value) {
                        if (
                              this.employee.firstName.trim().length > 0 &&
                              this.employee.lastName.trim().length > 0 &&
                              this.property.key.trim().length > 0 &&
                              this.property.value.trim().length > 0
                        ) {
                              return true;
                        }
                  }
            }
            return false;
      };

      this.onAddNewEmployee = function onAddNewEmployee(employee, property) {
            if (employee && property) {
                  this.employees.splice(0, 0, {
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        [property.key]: property.value,
                  });
            }
      };
});
