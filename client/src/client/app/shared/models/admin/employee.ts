export class Employee {
  id:           number;
  firstName:    string;
  lastName:     string;
  email:        string;
  position:     string;
  role:         string;
  status:       string;
  phoneNumber:  string;
  address:      string;
  city:         string;
  zipCode:      string;
  admin:        boolean;
  editing:      boolean;

  constructor(data: any) {
    this.id           = data.id;
    this.firstName    = data.firstName;
    this.lastName     = data.lastName;
    this.position     = data.position;
    this.role         = data.role;
    this.address      = data.address;
    this.status       = data.status;
    this.city         = data.city;
    this.zipCode      = data.zipCode;
    this.phoneNumber  = data.phoneNumber;
    this.admin        = data.admin;
    this.editing      = false;
    this.email        = data.email;
  }
}
