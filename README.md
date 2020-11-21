# :beers: 술렁
이번엔 진짜 금주! 나의 7일 음주 습관 트래커

## API 명세서

[api 링크](https://github.com/SoolleongX2/soolleong_server/wiki)

## sequelize Model

```javascript
db.User = require('./user')(sequelize, Sequelize);
db.Goal = require('./goal')(sequelize, Sequelize);
db.Record = require('./record')(sequelize, Sequelize);

db.User.hasMany(db.Goal, {onDelete : 'cascade'});
db.Goal.belongsTo(db.User);

db.Goal.hasMany(db.Record, {onDelete : 'cascade'});
db.Record.belongsTo(db.Goal);
```

## ERD
![image](https://user-images.githubusercontent.com/60654009/99878550-9214bf00-2c49-11eb-8b4d-0e80b11b6486.png)




## 기능 소개
** :calendar: 주간 목표 설정하기 **
** :beer: 오늘 음주량 기록하기 **
** :books: 주간 음주량 레포트 확인  **

## 업무 분담
김가영 : 오늘 음주량 기록하기, 주간 음주량 레포트 확인  
김수현 : 주간 목표 설정하기, 주간 음주량 레포트 확인
