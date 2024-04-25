angular.module('ObjectModule').controller('ObjectController', function ObjectController() {
      this.employees = [];
      this.employee = {};
      this.property = {};

      this.checkFormValidity = function checkFormValidity() {
            if (this.employee && this.property) {
                  if (this.employee.firstName && this.employee.lastName && this.property.key && this.property.value) {
                        return (
                              this.employee.firstName.trim().length > 0 &&
                              this.employee.lastName.trim().length > 0 &&
                              this.property.key.trim().length > 0 &&
                              this.property.value.trim().length > 0
                        );
                  }
            }
            return false;
      };

      this.onAddNewEmployee = function onAddNewEmployee() {
            if (this.employee && this.property) {
                  this.employees.splice(this.employees.length, 0, {
                        'first name': this.employee.firstName,
                        'last name': this.employee.lastName,
                        [this.property.key]: this.property.value,
                  });
            }
      };

      this.onRemoveEmployee = function onRemoveEmployee(index) {
            this.employees.splice(index, 1);
      };
});
