import { hashPassword } from "../src/lib/password";

const pw = process.argv[2];
if (!pw || pw.length < 10) {
  console.error('Usage: npm run hash-password -- "a-strong-password (10+ characters)"');
  process.exit(1);
}
console.log(hashPassword(pw));
