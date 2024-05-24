import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { EmployeeEntity } from "@/features/employee/domain/entities/employee.entity";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";

export class EmployeeAddressEntity extends BaseEntity {
  static tableName = "employee_address";

  constructor(
    public id: number,
    public employeeId: string,
    public addressId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public employee: EmployeeEntity,
    public address: AddressEntity
  ) {
    super(id, createdAt, updatedAt, EmployeeAddressEntity.tableName);

    this.employeeId = employeeId;
    this.addressId = addressId;
    this.employee = employee;
    this.address = address;
  }

  static create(obj: any) {
    return new EmployeeAddressEntity(
      obj.id,
      obj.employeeId,
      obj.addressId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.employee,
      obj.address
    );
  }

  toObject(): any {
    return {
      id: this.id,
      employeeId: this.employeeId,
      addressId: this.addressId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      employee: this.employee.toObject(),
      address: this.address.toObject(),
    };
  }
}
