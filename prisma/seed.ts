import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import { PrismaClient } from '~/generated/prisma/client';

import 'dotenv/config';
import { mockCVs, mockJobDescriptions } from './data.';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('⚡ Seeding deterministic roles/permissions...');

  // --- Clean DB (TRUNCATE tables) ---
  // Prisma tidak punya truncate, tapi bisa pakai raw SQL
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE 
      "role_permissions",
      "user_roles",
      "users",
      "permissions",
      "roles",
      "cv"
    RESTART IDENTITY CASCADE;
  `);

  // --- Insert Roles ---
  await prisma.role.createMany({
    data: [{ name: 'Client' }, { name: 'Admin' }],
  });

  const insertedRoles = await prisma.role.findMany();
  const roleIds = Object.fromEntries(insertedRoles.map((r) => [r.name, r.id]));

  // --- Insert Permissions ---
  const permissionsData = [
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
  ];

  await prisma.permissions.createMany({ data: permissionsData });

  const insertedPermissions = await prisma.permissions.findMany();
  const permissionIds = Object.fromEntries(insertedPermissions.map((p) => [p.key, p.id]));

  // --- Insert Users ---
  const [clientPass, adminPass] = await Promise.all([bcrypt.hash('client_pass', 10), bcrypt.hash('admin_pass', 10)]);

  await prisma.user.createMany({
    data: [
      { name: 'Client', email: 'client@gmail.com', password: clientPass },
      { name: 'Admin', email: 'admin@gmail.com', password: adminPass },
    ],
  });

  const insertedUsers = await prisma.user.findMany();
  const userIds = Object.fromEntries(insertedUsers.map((u) => [u.email, u.id]));

  // --- Insert user_roles ---
  await prisma.userRoles.createMany({
    data: [
      { user_id: userIds['client@gmail.com'], role_id: roleIds['Client'] },
      { user_id: userIds['admin@gmail.com'], role_id: roleIds['Admin'] },
    ],
  });

  // --- Insert role_permissions ---
  await prisma.rolePermissions.createMany({
    data: [
      // Client Permissions
      { role_id: roleIds.Client, permission_id: permissionIds['cv:create'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:read'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:update'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:delete'] },

      { role_id: roleIds.Client, permission_id: permissionIds['job_desc:create'] },
      { role_id: roleIds.Client, permission_id: permissionIds['job_desc:update'] },
      { role_id: roleIds.Client, permission_id: permissionIds['job_desc:read'] },
      { role_id: roleIds.Client, permission_id: permissionIds['job_desc:delete'] },

      { role_id: roleIds.Client, permission_id: permissionIds['cv:read_analyze'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:single_analyze'] },
      { role_id: roleIds.Client, permission_id: permissionIds['cv:bulk_analyze'] },

      // Admin Permissions
      { role_id: roleIds.Admin, permission_id: permissionIds['client:read'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['client:update'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['client:delete'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['client:create'] },
      { role_id: roleIds.Admin, permission_id: permissionIds['client:*'] },
    ],
  });

  // --- Insert CV (mockCVs imported) ---
  await prisma.cV.createMany({
    data: mockCVs,
  });

  //  --- Insert data Job Descriptions ---
  await prisma.jobDescription.createMany({
    data: mockJobDescriptions,
  });

  console.log('✅ Seeding User roles/permissions done!');
}

main()
  .then(async () => {
    console.log('✅ Seed data successfully created');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
