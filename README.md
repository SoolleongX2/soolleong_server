# 술렁
이번엔 진짜 금주! 나의 7일 음주 습관 트래커

## API 명세서

[api 링크](https://github.com/SoolleongX2/soolleong_server/wiki)

## sequelize Model

```javascript
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);

/** 1 : N   User : Post */
db.User.hasMany(db.Post, { onDelete: 'cascade' });
db.Post.belongsTo(db.User);

/** N: M    User : Post => Like */
db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });
```

## ERD
![image](https://user-images.githubusercontent.com/60654009/99878550-9214bf00-2c49-11eb-8b4d-0e80b11b6486.png)




## 기능 소개
- 핵심 기능 소개
- 구현한 기능과 맡은 엄무 분담을 적어주세요.

[예시]
 
- 최영훈 - 로그인, 회원가입

- 남궁권 - 장소검색 API, 장소 조회 API 
