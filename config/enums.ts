export enum Permissions {
     CREATE = 'user:create',
     READ = 'user:read',
     UPDATE = 'user:update',
     DELETE = 'user:delete',
}

export enum TokenTypes {
     ACCESS = 'access',
     REFRESH = 'refresh',
     RESET_PASSWORD = 'resetPassword',
}

export enum MembershipTypes {
     TRIAL = 'trial',
     FREE = 'free',
     PAID = 'paid',
}

export enum Roles {
     USER = 'user',
     ADMIN = 'admin',
}
