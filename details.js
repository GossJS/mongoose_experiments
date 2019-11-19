const mg = require('mongoose'); // 4.11.7
mg.set('bufferCommands', false);
 
const options = [`mongodb://reader:123321@kodaktor.ru/readusers`, 
	 { useNewUrlParser: true }, 
	 e => e ? console.error('Соединиться с БД не удалось. На этом всё.') || process.exit(1) : console.log('Успех!')
];

mg.Promise = global.Promise; // иначе DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated

console.log(1);

const conn = mg.createConnection(...options);
  // обработчик ошибки выполняется асинхронно как и «успех»
  // 
console.log(2);

const UserSchema = new mg.Schema(require('./UserSchema.js'));

console.log(3);
 

const User = conn.model('User', UserSchema);
 
User
.findOne({login: 'ego@yandex.ru'})
.then(x => console.log(x.password) || process.exit(0))
.catch(err => console.error(err) || process.exit(1));
// пароль получим после «Успех»
// findOne возвращает объект Query, он не является инстансом Promise
// если сработал коллбэк ошибки, то User.findOne просто не вызовет ни then ни catch
// catch сработает например если модель была неправильная, например conn.model('User2', UserSchema)
// или например если такого логина нет – Cannot read property 'password' of null

// хотя findOne() возвращает Query, findOne().then().catch возвращает промис
// либо свой монгузовский либо нативный

console.log(4);
// process.exit(0); это сработает раньше чем результат findOne
// т.е. сначала все синхронные действия 1 2 3 4 потом



 
