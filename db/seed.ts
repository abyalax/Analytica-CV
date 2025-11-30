import bcrypt from 'bcrypt';

import { db } from '.';
import { mockCVs } from './mock/cv';
import * as schema from './schema';

async function main() {
  console.log('⚡ Seeding deterministic roles/permissions...');

  // reset data agar id diulang dari 1
  await db.execute(`
    TRUNCATE TABLE 
      "role_permissions",
      "user_roles",
      "users",
      "permissions",
      "roles"
    RESTART IDENTITY CASCADE;
  `);

  // --- insert roles ---
  const insertedRoles = await db
    .insert(schema.roles)
    .values([{ name: 'Client' }, { name: 'Admin' }])
    .returning();

  const roleIds = Object.fromEntries(insertedRoles.map((r) => [r.name, r.id]));

  // --- insert permissions ---
  const insertedPermissions = await db
    .insert(schema.permissions)
    .values([
      { key: 'client:read', name: 'Read Client' },
      { key: 'client:create', name: 'Create Client' },
      { key: 'client:update', name: 'Update Client' },
      { key: 'client:delete', name: 'Delete Client' },
      { key: 'client:*', name: 'Manage Client' },

      { key: 'cv:create', name: 'Create CV' },
      { key: 'cv:read', name: 'Read CV' },
      { key: 'cv:update', name: 'Update CV' },
      { key: 'cv:delete', name: 'Delete CV' },

      { key: 'cv:read_analyze', name: 'Read History Analysis CV' },
      { key: 'cv:single_analyze', name: 'Single Analysis CV' },
      { key: 'cv:bulk_analyze', name: 'Bulk Analysis CV' },

      { key: 'job_desc:create', name: 'Create Job Description' },
      { key: 'job_desc:update', name: 'Update Job Description' },
      { key: 'job_desc:read', name: 'Read Job Description' },
      { key: 'job_desc:delete', name: 'Delete Job Description' },
    ])
    .returning();

  const permissionIds = Object.fromEntries(insertedPermissions.map((p) => [p.key, p.id]));

  // --- insert users ---
  const [clientPass, adminPass] = await Promise.all([bcrypt.hash('client_pass', 10), bcrypt.hash('admin_pass', 10)]);

  const insertedUsers = await db
    .insert(schema.users)
    .values([
      { name: 'Client', email: 'client@gmail.com', password: clientPass },
      { name: 'Admin', email: 'admin@gmail.com', password: adminPass },
    ])
    .returning();

  const userIds = Object.fromEntries(insertedUsers.map((u) => [u.email, u.id]));

  // --- map userRoles ---
  await db.insert(schema.userRoles).values([
    { userId: userIds['client@gmail.com'], roleId: roleIds['Client'] },
    { userId: userIds['admin@gmail.com'], roleId: roleIds['Admin'] },
  ]);

  // --- map rolePermissions ---
  await db.insert(schema.rolePermissions).values([
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['cv:create'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['cv:read'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['cv:update'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['cv:delete'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['job_desc:create'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['job_desc:update'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['job_desc:read'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['job_desc:delete'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['cv:read_analyze'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['cv:single_analyze'],
    },
    {
      roleId: roleIds.Client,
      permissionId: permissionIds['cv:bulk_analyze'],
    },

    {
      roleId: roleIds['Admin'],
      permissionId: permissionIds['client:read'],
    },
    {
      roleId: roleIds['Admin'],
      permissionId: permissionIds['client:update'],
    },
    {
      roleId: roleIds['Admin'],
      permissionId: permissionIds['client:delete'],
    },
    {
      roleId: roleIds['Admin'],
      permissionId: permissionIds['client:create'],
    },
    {
      roleId: roleIds['Admin'],
      permissionId: permissionIds['client:*'],
    },
  ]);

  // --- insert cv ---
  await db.insert(schema.cv).values(mockCVs).returning();

  console.log('✅ Seeding User roles/permissions done!');
}
main()
  .then(async () => {
    console.log('✅ Seed data successfully created');
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
