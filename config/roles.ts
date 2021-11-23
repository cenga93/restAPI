import { Roles } from './enums';
import { Permissions } from './permissions';
export const rolePermissions = new Map();

/** -------- USER -------- */
rolePermissions.set(Roles.USER, [
     // Auth
     Permissions.user.READ,
     Permissions.user.CREATE,

     // Product
     Permissions.product.CREATE,
     Permissions.product.READ,
]);

/** -------- MODERATOR -------- */
rolePermissions.set(Roles.MODERATOR, [
     // Auth
     Permissions.user.READ,
     Permissions.user.CREATE,
     Permissions.user.UPDATE,

     // Product
     Permissions.product.CREATE,
     Permissions.product.READ,
]);

/** -------- ADMIN -------- */
rolePermissions.set(Roles.ADMIN, [
     // Auth
     Permissions.user.READ,
     Permissions.user.CREATE,
     Permissions.user.UPDATE,
     Permissions.user.DELETE,

     // Product
     Permissions.product.CREATE,
     Permissions.product.READ,
     Permissions.product.DELETE,
]);
