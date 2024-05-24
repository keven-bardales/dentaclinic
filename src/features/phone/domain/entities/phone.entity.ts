import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { PhoneStatusEnum } from "../enums/phone-status.entity";
import { CustomerEntity } from "@/features/customer/domain/entities/customer.entity";
import { BranchOfficePhoneEntity } from "@/features/branch-office-phone/domain/entities/branch-office-phone.entity";
import { CompanyPhoneEntity } from "@/features/company-phone/domain/entities/company-phone.entity";
import { EmployeeEntity } from "@/features/employee/domain/entities/employee.entity";
import { ProviderEntity } from "@/features/provider/domain/entity/provider.entity";

export class PhoneEntity extends BaseEntity {
  static tableName = "phone";

  constructor(
    public id: string,
    public customerId: string | null,
    public providerId: string | null,
    public employeeId: string | null,
    public phone: string | null,
    public status: PhoneStatusEnum,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public customer: CustomerEntity,
    public provider: ProviderEntity,
    public employee: EmployeeEntity,
    public branchOfficePhones: BranchOfficePhoneEntity[],
    public companyPhones: CompanyPhoneEntity[]
  ) {
    super(id, createdAt, updatedAt, PhoneEntity.tableName);

    this.customerId = customerId;
    this.providerId = providerId;
    this.employeeId = employeeId;
    this.phone = phone;
    this.status = status;
    this.customer = customer;
    this.provider = provider;
    this.employee = employee;
    this.branchOfficePhones = branchOfficePhones;
    this.companyPhones = companyPhones;
  }

  static create(obj: any) {
    return new PhoneEntity(
      obj.id,
      obj.customerId,
      obj.providerId,
      obj.employeeId,
      obj.phone,
      obj.status,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.customer,
      obj.provider,
      obj.employee,
      obj.branchOfficePhones,
      obj.companyPhones
    );
  }

  toObject(): any {
    return {
      id: this.id,
      customerId: this.customerId,
      providerId: this.providerId,
      employeeId: this.employeeId,
      phone: this.phone,
      status: this.status,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      customer: this.customer.toObject(),
      provider: this.provider.toObject(),
      employee: this.employee.toObject(),
      branchOfficePhones: this.branchOfficePhones.map((branchOfficePhone) => branchOfficePhone.toObject()),
      companyPhones: this.companyPhones.map((companyPhone) => companyPhone.toObject()),
    };
  }
}
