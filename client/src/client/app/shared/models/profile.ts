export class Profile {
  id:           number;
  firstName:    string;
  lastName:     string;
  email:        string;
  admin:        boolean;

  constructor(data: any) {
    this.id           = data.id;
    this.firstName    = data.firstName;
    this.lastName     = data.lastName;
    this.admin        = data.admin;
    this.email        = data.email;
  }
}
