const mongoose = require('mongoose');

const uri = 'mongodb://aulad_it_solution:9Ya4RcKo2EHZxS3d@ac-ekxsg0g-shard-00-00.mcy2lk0.mongodb.net:27017,ac-ekxsg0g-shard-00-01.mcy2lk0.mongodb.net:27017,ac-ekxsg0g-shard-00-02.mcy2lk0.mongodb.net:27017/IT_Solution_Database?ssl=true&replicaSet=atlas-aw2bfo-shard-0&authSource=admin&retryWrites=true&w=majority';

async function main() {
  await mongoose.connect(uri);
  const res = await mongoose.connection.db.collection('users').updateMany(
    { email: { $in: ['auladinfo@gmail.com', 'auladdevops@gmail.com'] } },
    { $set: { role: 'admin' } }
  );
  console.log('Modified count:', res.modifiedCount);
  const users = await mongoose.connection.db.collection('users').find({}).toArray();
  users.forEach(u => console.log(u.email, '-> role:', u.role));
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
