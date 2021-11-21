import { Roles, Permissions } from './enums';

export const rolePermissions = new Map();

rolePermissions.set(Roles.USER, [Permissions.READ]);
rolePermissions.set(Roles.MODERATOR, [Permissions.READ, Permissions.CREATE, Permissions.UPDATE]);
rolePermissions.set(Roles.ADMIN, [Permissions.READ, Permissions.CREATE, Permissions.UPDATE, Permissions.DELETE]);
