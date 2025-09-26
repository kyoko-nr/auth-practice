import * as admin from 'firebase-admin';

// Initialize Admin SDK (uses default credentials or GOOGLE_APPLICATION_CREDENTIALS)
if (admin.apps.length === 0) {
  admin.initializeApp();
}

async function main() {
  const [, , uid, role] = process.argv;
  if (!uid || !role || !['admin', 'user'].includes(role)) {
    console.error('Usage: ts-node scripts/set-role.ts <uid> <admin|user>');
    process.exit(1);
  }

  await admin.auth().setCustomUserClaims(uid, { role });
  console.log(`Set role for uid=${uid} to role=${role}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

