import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { PhoneEntity } from "@/features/phone/domain/entities/phone.entity";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { EmployeeBranchOfficeEntity } from "@/features/employee-branch-office/domain/entities/employee-branch-office.entity";
import { EmployeeAddressEntity } from "@/features/employee-address/domain/entities/employee-address.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";

export class EmployeeEntity extends BaseEntity {
  static tableName = "employee";

  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public fullName: string,
    public phones: PhoneEntity[],
    public addressId: number | null,
    public address: AddressEntity | null,
    public employeeAddresses: EmployeeAddressEntity[],
    public employeeBranchOffices: EmployeeBranchOfficeEntity[],
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper
  ) {
    super(id, createdAt, updatedAt, EmployeeEntity.tableName);

    this.name = name;
    this.lastName = lastName;
    this.fullName = fullName;
    this.phones = phones;
    this.addressId = addressId;
    this.address = address;
    this.employeeAddresses = employeeAddresses;
    this.employeeBranchOffices = employeeBranchOffices;
  }

  static create(obj: any) {
    return new EmployeeEntity(
      obj.id,
      obj.name,
      obj.lastName,
      obj.fullName,
      obj.phones,
      obj.addressId,
      obj.address,
      obj.employeeAddresses,
      obj.employeeBranchOffices,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt)
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      fullName: this.fullName,
      phones: this.phones.map((phone) => phone.toObject()),
      addressId: this.addressId,
      address: this.address ? this.address.toObject() : null,
      employeeAddresses: this.employeeAddresses.map((employeeAddress) => employeeAddress.toObject()),
      employeeBranchOffices: this.employeeBranchOffices.map((employeeBranchOffice) => employeeBranchOffice.toObject()),
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
    };
  }
}
