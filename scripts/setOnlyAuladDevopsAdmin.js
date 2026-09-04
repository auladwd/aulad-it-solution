const mongoose = require('mongoose');

const uri = 'mongodb://aulad_it_solution:9Ya4RcKo2EHZxS3d@ac-ekxsg0g-shard-00-00.mcy2lk0.mongodb.net:27017,ac-ekxsg0g-shard-00-01.mcy2lk0.mongodb.net:27017,ac-ekxsg0g-shard-00-02.mcy2lk0.mongodb.net:27017/IT_Solution_Database?ssl=true&replicaSet=atlas-aw2bfo-shard-0&authSource=admin&retryWrites=true&w=majority';

async function main() {
  await mongoose.connect(uri);
  const usersCollection = mongoose.connection.db.collection('users');

  // Set role 'user' for everyone except auladdevops@gmail.com
  await usersCollection.updateMany(
    { email: { $ne: 'auladdevops@gmail.com' } },
    { $set: { role: 'user' } }
  );

  // Set role 'admin' strictly for auladdevops@gmail.com
  await usersCollection.updateMany(
    { email: 'auladdevops@gmail.com' },
    { $set: { role: 'admin' } }
  );

  const users = await usersCollection.find({}).toArray();
  console.log('Database users permissions:');
  users.forEach(u => console.log(`- ${u.email}: role = ${u.role}`));
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
