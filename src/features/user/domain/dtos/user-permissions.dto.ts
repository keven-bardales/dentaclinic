import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ModulePermissionDto } from "@/features/modulePermission/domain/dtos/module-permission-dto";
import { ModulePermissionEntity } from "@/features/modulePermission/domain/entities/modulePermission.entity";

export class UserPermissionDto {
  constructor(public id: number, public name: string) {}

  static create(obj: ModulePermissionEntity) {
    return new UserPermissionDto(obj.id, obj.name);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
