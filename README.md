# 货运代理报价平台

## 数据库部署

数据库配置（用户名、用户密码、数据库名）等位于项目根目录下的`.env`文件中，该文件模板可见`.env-template`。需要注意即使文件里没有用引号引起来，整数依然被当作一个字符串传入，需要用`parseInt`等函数进行预处理。

安装mysql。设置用户。根据mysql的用户名和用户密码设置`.env`中的`DB_USERNAME`和`DB_PASSWORD`两项。

修改期望的数据库名`DB_NAME`。然后启动mysql服务并登录。执行如下命令：

```sql
CREATE DATABASE yourdbname;
```

创建成功后可用如下命令检查

```sql
SHOW DATABASES;
```

如果能看到刚刚添加的数据库名，数据库即部署完成。

## 基本 script

运行 nest 开发者模式

```
npm run start:dev
```

正常运行之后可以试用一下地址
API 请求地址： `localhost:3001`
API 文档：`localhost:3001/api`

---
