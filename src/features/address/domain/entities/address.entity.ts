import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { CityEntity } from "@/features/city/domain/entities/city.entity";
import { StateEntity } from "@/features/state/domain/entities/state-entity";
import { CountryEntity } from "@/features/country/domain/entities/city.entity";
import { NeighborhoodEntity } from "@/features/neighborhood/domain/entities/neighborhood.entity";
import { WarehouseEntity } from "@/features/warehouse/domain/entities/warehouse.entity";
import { EmployeeEntity } from "@/features/employee/domain/entities/employee.entity";
import { ProviderAddressEntity } from "@/features/provider-address/domain/entities/provider-address.entity";
import { EmployeeAddress } from "@prisma/client";
import { EmployeeAddressEntity } from "@/features/employee-address/domain/entities/employee-address.entity";
import { CustomerAddressEntity } from "@/features/customer-address/domain/entities/customer-address.entity";
import { BillEntity } from "@/features/bill/domain/entities/bill-entity";

export class AddressEntity extends BaseEntity {
  static tableName = "address";

  constructor(
    public id: number,
    public fullAddress: string,
    public street: string,
    public number: string,
    public neighborhoodName: string,
    public neighborhoodId: number | null,
    public cityId: number,
    public stateId: number,
    public countryId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public city: CityEntity,
    public state: StateEntity,
    public country: CountryEntity,
    public neighborhood: NeighborhoodEntity | null,
    public warehouses: WarehouseEntity[],
    public employees: EmployeeEntity[],
    public providerAdresses: ProviderAddressEntity[],
    public employeeAddresses: EmployeeAddressEntity[],
    public customerAdresses: CustomerAddressEntity[],
    public bills: BillEntity[],
    public quotations: QuotationEntity[],
    public branchOffices: BranchOfficeEntity[]
  ) {
    super(id, createdAt, updatedAt, AddressEntity.tableName);

    this.fullAddress = fullAddress;
    this.street = street;
    this.number = number;
    this.neighborhoodName = neighborhoodName;
    this.neighborhoodId = neighborhoodId;
    this.cityId = cityId;
    this.stateId = stateId;
    this.countryId = countryId;
    this.city = city;
    this.state = state;
    this.country = country;
    this.neighborhood = neighborhood;
    this.warehouses = warehouses;
    this.employees = employees;
    this.providerAdresses = providerAdresses;
    this.employeeAddresses = employeeAddresses;
    this.customerAdresses = customerAdresses;
    this.bills = bills;
    this.quotations = quotations;
    this.branchOffices = branchOffices;
  }

  static create(obj: any) {
    return new AddressEntity(
      obj.id,
      obj.fullAddress,
      obj.street,
      obj.number,
      obj.neighborhoodName,
      obj.neighborhoodId,
      obj.cityId,
      obj.stateId,
      obj.countryId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.city,
      obj.state,
      obj.country,
      obj.neighborhood,
      obj.warehouses,
      obj.employees,
      obj.providerAdresses,
      obj.employeeAddresses,
      obj.customerAdresses,
      obj.bills,
      obj.quotations,
      obj.branchOffices
    );
  }

  toObject(): any {
    return {
      id: this.id,
      fullAddress: this.fullAddress,
      street: this.street,
      number: this.number,
      neighborhoodName: this.neighborhoodName,
      neighborhoodId: this.neighborhoodId,
      cityId: this.cityId,
      stateId: this.stateId,
      countryId: this.countryId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      city: this.city.toObject(),
      state: this.state.toObject(),
      country: this.country.toObject(),
      neighborhood: this.neighborhood ? this.neighborhood.toObject() : null,
      warehouses: this.warehouses.map((warehouse) => warehouse.toObject()),
      employees: this.employees.map((employee) => employee.toObject()),
      providerAdresses: this.providerAdresses.map((providerAdress) => providerAdress.toObject()),
      employeeAddresses: this.employeeAddresses.map((employeeAddress) => employeeAddress.toObject()),
      customerAdresses: this.customerAdresses.map((customerAdress) => customerAdress.toObject()),
      bills: this.bills.map((bill) => bill.toObject()),
      quotations: this.quotations.map((quotation) => quotation.toObject()),
      branchOffices: this.branchOffices.map((branchOffice) => branchOffice.toObject()),
    };
  }
}
