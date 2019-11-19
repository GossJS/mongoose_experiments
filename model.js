const mg = require('mongoose'); // 4.11.7
 
const options = [`mongodb://reader:123321@kodaktor.ru/readusers`, 
	 { useNewUrlParser: true, useUnifiedTopology: true }, 
	 e => e ? console.error('Соединиться с БД не удалось. На этом всё.') || process.exit(1) : console.log('Успех!')
];

mg
.Promise = global
.Promise; 

module
.exports = mg
.createConnection(...options)
.on('connected', () => console.log('Соединились!'))
.model('User', new mg.Schema(require('./UserSchema')));

// мы можем экспортировать так, ибо монгуз внутренне отслеживает состояние соединения
// встретив вызов createConnection, он попробует выполнить его 
// но если соединение не готово, отложит в очередь на событие успешного соединения
// т.е. можно сказать что коллбэк connected неявно вызывает model 
// ... и модель становится доступной когда это свершается
