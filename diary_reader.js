const Diary = require('./diary_module')
let d = new Diary();
d.tryLock(12345)
d.read()