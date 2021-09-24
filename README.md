# Intelligent parking management system(There is no authority level)

This project has four functions

> 1、DataCenter:  Data visualization display of vehicle condition in parking lot
>
> 2、OrderManage: Addition, deletion and modification of vehicle order
>
> 3、memberManage: Member Addition and deletion of member users
>
> 4、adminCountMange: Modify account interest, change avatar, delete account

<span style="color: red;font-weight: 700; text-aglin: center;"> Notice: It is not perfect</span>

> This is used to study. 
>
> This project is front-end and back-end separated

### Project dependency import

```powershell
npm install
```

### Front-end

- used [VueJs](https://cn.vuejs.org), so need use ```npm run serve``` to start developed server

```powershell
npm run serve
```



### Back-end

- back-end is base on [NodeJs](https://nodejs.org)

```powershell
mongod --dbpath (dbpath)
```

- data persistence by [mongodb](https://www.mongodb.com/), so a  [mongodb](https://www.mongodb.com/)database is necessary

```po
node app
```

### Folder interpretation

- analog _data: database export data
- static: front-end structure--not use vue-cli
- back-end: serve code
