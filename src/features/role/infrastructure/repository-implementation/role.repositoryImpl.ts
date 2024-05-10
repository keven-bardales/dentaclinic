import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleDataSourceImpl } from "../datasource-implementations/role.datasourceImpl";

export class RoleRepositoryImpl extends BaseRepositoryImpl<RoleEntity> {
  constructor() {
    super(new RoleDataSourceImpl());
  }

  async roleExists(roleId: number): Promise<boolean> {
    const role = await (this.dataSource as RoleDataSourceImpl).roleExists(roleId);

    return !!role;
  }

  async getAllRolesWithPermissionsAndUsersCount(): Promise<RoleEntity[] | null> {
    const roles = await (this.dataSource as RoleDataSourceImpl).getAllWithPermissionsAndUsersCount();

    if (!roles) {
      return null;
    }

    return roles;
  }

  async getRoleByIdWithUsersAndPermissions(roleId: number): Promise<RoleEntity | null> {
    const role = await (this.dataSource as RoleDataSourceImpl).getRoleByIdWithUsersAndPermissions(roleId);

    if (!role) {
      return null;
    }

    return role;
  }

  async deletePermissionFromRole(roleId: number, permissionsIds: number[]): Promise<boolean> {
    const result = await (this.dataSource as RoleDataSourceImpl).deletePermissionFromRole(roleId, permissionsIds);

    return result;
  }

  async addPermissionToRole(roleId: number, permissionsIds: number[]): Promise<boolean> {
    const result = await (this.dataSource as RoleDataSourceImpl).addPermissionToRole(roleId, permissionsIds);

    return result;
  }

  async checkRoleIds(roleIds: number[]): Promise<RoleEntity[] | null> {
    const result = await (this.dataSource as RoleDataSourceImpl).checkRoleIds(roleIds);

    return result;
  }
}
