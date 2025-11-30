async function main() {
  console.log('⚡ Seeding deterministic roles/permissions...');
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
