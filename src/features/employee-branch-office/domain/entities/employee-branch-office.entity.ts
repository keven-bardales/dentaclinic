import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { EmployeeEntity } from "@/features/employee/domain/entities/employee.entity";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";

export class EmployeeBranchOfficeEntity extends BaseEntity {
  static tableName = "employee_branch_office";

  constructor(
    public id: number,
    public employeeId: string,
    public branchOfficeId: number,
    public isDefault: boolean,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public employee: EmployeeEntity,
    public branchOffice: BranchOfficeEntity
  ) {
    super(id, createdAt, updatedAt, EmployeeBranchOfficeEntity.tableName);

    this.employeeId = employeeId;
    this.branchOfficeId = branchOfficeId;
    this.isDefault = isDefault;
    this.employee = employee;
    this.branchOffice = branchOffice;
  }

  static create(obj: any) {
    return new EmployeeBranchOfficeEntity(
      obj.id,
      obj.employeeId,
      obj.branchOfficeId,
      obj.isDefault,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.employee,
      obj.branchOffice
    );
  }

  toObject(): any {
    return {
      id: this.id,
      employeeId: this.employeeId,
      branchOfficeId: this.branchOfficeId,
      isDefault: this.isDefault,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      employee: this.employee.toObject(),
      branchOffice: this.branchOffice.toObject(),
    };
  }
}
