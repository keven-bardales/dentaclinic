import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CustomerTypesEnum } from "../enums/customer-types.enum";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { PhoneEntity } from "@/features/phone/domain/entities/phone.entity";
import { CustomerAddressEntity } from "@/features/customer-address/domain/entities/customer-address.entity";

export class CustomerEntity extends BaseEntity {
  static tableName = "customer";

  constructor(
    public id: string,
    public name: string,
    public lastname: string,
    public fullName: string,
    public type: CustomerTypesEnum,
    public dni: string,
    public rtn: string,
    public quotes: QuotationEntity[],
    public customerPhones: PhoneEntity[],
    public customerAdress: CustomerAddressEntity[],
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper
  ) {
    super(id, createdAt, updatedAt, CustomerEntity.tableName);

    this.name = name;
    this.lastname = lastname;
    this.fullName = fullName;
    this.type = type;
    this.dni = dni;
    this.rtn = rtn;
    this.quotes = quotes;
    this.customerPhones = customerPhones;
    this.customerAdress = customerAdress;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(obj: any) {
    return new CustomerEntity(
      obj.id,
      obj.name,
      obj.lastname,
      obj.fullName,
      obj.type,
      obj.dni,
      obj.rtn,
      obj.quotes,
      obj.customerPhones,
      obj.customerAdress,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt)
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      fullName: this.fullName,
      type: this.type,
      dni: this.dni,
      rtn: this.rtn,
      quotes: this.quotes.map((quote) => quote.toObject()),
      customerPhones: this.customerPhones.map((phone) => phone.toObject()),
      customerAdress: this.customerAdress.map((adress) => adress.toObject()),
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
    };
  }
}
