const User = require('./mongo2');
User
.findOne({login: 'ego@yandex.ru'})
.then(x => console.log('Результат: ' + x.password) || process.exit(0))
.catch(err => console.error(err) || process.exit(1));
