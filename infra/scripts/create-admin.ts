type AdminSeed = { name: string; email: string; phone?: string; password: string };

const admin: AdminSeed = {
  name: process.env.ADMIN_NAME ?? 'Glamandi Admin',
  email: process.env.ADMIN_EMAIL ?? 'admin@glamandi.local',
  phone: process.env.ADMIN_PHONE,
  password: process.env.ADMIN_PASSWORD ?? 'ChangeMe123!',
};

console.log('Create this admin through the UsersModule seed command or API:', admin);
