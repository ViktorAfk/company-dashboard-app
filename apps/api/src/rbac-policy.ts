import { Role } from '@prisma/client';
import { RolesBuilder } from 'nest-access-control';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

RBAC_POLICY.grant(Role.USER)
  .createOwn('userData')
  .readOwn('userData')
  .updateOwn('userData')
  .grant(Role.ADMIN)
  .readAny('userData')
  .grant(Role.SUPER_ADMIN)
  .extend(Role.ADMIN)
  .readAny('adminData')
  .createAny('adminData')
  .deleteAny('adminData')
  .updateAny('adminData');
