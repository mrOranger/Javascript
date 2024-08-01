function Log(constructor: Function) {
      console.log("Log ...");
}

@Log
class Person {
      public firstName: string
      public lastName: string;

      public constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
      }
}