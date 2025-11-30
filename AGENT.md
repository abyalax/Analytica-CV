Contoh use case penggunaan boilerplate

```
  Platform dengan konsep multi-tenant di mana setiap toko (client) memiliki ruang terisolasi untuk mengelola aplikasi POS mereka sendiri, termasuk produk, CV, dan transaksi. Tenant diidentifikasi dengan parameter clientId pada URL sehingga seluruh rute aplikasi, baik untuk admin toko maupun CV, selalu berada dalam scope client tertentu. Struktur routing dipisahkan menjadi tiga lapisan utama: public routes untuk landing, pricing, dan order setup; tenant routes yang terbagi menjadi admin (/[clientId]/admin/...) untuk mengelola data toko dan CV (/[clientId]/me/... atau /[clientId]/orders/...) untuk aktivitas pengguna akhir; serta backoffice routes (/backoffice/...) untuk super admin yang mengawasi seluruh tenant. Dengan pola ini, data dan akses setiap tenant tetap terisolasi namun dapat dikelola secara terpusat.
```

Urutan Access : Guest => CV => Client Admin => System Admin

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database schema
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed the database with initial data
- `pnpm db:studio` - Database Studio to manage data
- `pnpm db:truncate --help` - Show help
- `pnpm db:truncate` - Clear all data (keeps structure)
- `pnpm db:truncate user_roles` - Clear specific tables example users and user_roles
- `pnpm db:drop` - Drop all tables
- `pnpm db:drop roles permissions` - Drop specific tables example roles and permissions
- `pnpm db:drop -- help` - Show help

## How RBAC Works

RBAC di proyek ini berbasis NextAuth (JWT) + middleware App Router:

- **Token berisi roles & permissions**
  Saat login, JWT di inject `roles` dan `permissions` user dari database.
- **Deklarasi izin per route**:

  Setiap file `app/**/page.tsx` atau `app/**/route.ts` bisa mengekspor

  ```ts
  export const permissions = [PERMISSIONS.CV.READ, ...]`.
  ```

- **Auto-generate path permissions**:

  Script `permissions:generate` membaca deklarasi tersebut dan membuat file `lib/routes/permissions.ts` (jangan diedit manual).

- **Enforcement di Middleware**:

  `middleware.ts` membaca path permissions dan memblokir akses jika user tidak memiliki semua permission yang dibutuhkan untuk path tersebut (mendukung route dinamis seperti `[id]` → `:id` dan catch-all `*`).

- **Guard ekstra di API**:

  Untuk response JSON 403 yang konsisten, gunakan `safeHandler(handler, ["permission"])` di masing-masing handler API.

### How To Use

1. Seed & jalankan dev

   ```bash
   pnpm db:seed
   pnpm dev
   ```

   Dev script otomatis menjalankan watcher `permissions:watch` yang akan regenerate `lib/routes/permissions.ts` ketika export array `permissions` di route/page.

2. Tambahkan izin pada halaman (Page Route)

   ```ts
   // app/admin/page.tsx
   export const permissions = [PERMISSIONS.CV.READ, PERMISSIONS.CV.UPDATE ]`. // halaman ini butuh keduanya

   export default function Page() {
   return <div>Admin</div>;
   }
   ```

3. Tambahkan izin pada API (Route Handler)

   ```ts
   // app/api/users/route.ts
   import { NextResponse } from "next/server";
   import { safeHandler } from "~/lib/handler/safe-handler";

   // example guard permissions, but does'nt support per method security
   // all handler will be protected to this permission
   export const permissions = [
     PERMISSIONS.CV.READ,
     PERMISSIONS.CV.UPDATE,
   ];

   export const GET = safeHandler(async () => {
     const data = await db
       .select({
         id: users.id,
         name: users.name,
         email: users.email,
       })
       .from(users);
     return NextResponse.json({ message: "Success Get Data User", data: data });
     // return 403 if doesn't have this permission
   }, ["something:permission"]);
   ```

4. Atur public route (opsional)

   Secara default, `middleware.ts` mengizinkan akses tanpa login ke:

   ```ts
   const publicRoutes = ["/", "/auth/register", "/auth/login"];
   ```

   Tambahkan path lain ke `publicRoutes` di `middleware.ts` jika dibutuhkan.

   ### Catatan Penting
   - File `lib/routes/permissions.ts` adalah hasil generate. Jangan edit manual.
   - Build production otomatis menjalankan generate: `pnpm build` → `pnpm permissions:generate` + `next build`.
   - Route dinamis seperti `/admin/users/[id]` akan di-match sebagai `/admin/users/:id` oleh middleware.
   - Jika user tidak punya izin:
     - Pada halaman/API yang dilindungi middleware: akan di-redirect ke `/auth/login`.
     - Dengan `safeHandler`: handler dapat mengembalikan `403` JSON secara eksplisit.
