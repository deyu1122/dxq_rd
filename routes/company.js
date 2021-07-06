let express = require('express');
let router = express.Router();
let mysql = require('mysql');

// 创建数据库链接(参数不用说了见名知意)
let conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'duanxueqi', // 链接指定数据库
});

router.get('/get', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql = 'select * from company';
  conn.query(sql, (err, result) => {
    if (err) {
      res.json({
        code: 500,
        msg: 'sql执行错误',
        err,
      });
    } else {
      res.json({
        code: 200,
        msg: '查询成功',
        data: result,
      });
    }
    // conn.end(function (err) {
    //   if (err) {
    //     return;
    //   }
    //   console.log('[connection end] succeed!');
    // });
  });
});

module.exports = router;
