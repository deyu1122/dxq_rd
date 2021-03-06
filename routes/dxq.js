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

//获取公司 参数phone
router.get('/company', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql = 'select * from company where c_phone=?';
  const sqlParams = [req.query.phone];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});

//获取任务列表 参数cid
router.get('/projectByCompany', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql = 'select * from project where cid=?';
  const sqlParams = [req.query.cid];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});

// 根据任务获取学生列表 参数pid
router.get('/projectByProject', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql =
    'select * from sp left join student on sp.sid = student.sid where pid=?';
  const sqlParams = [req.query.pid];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});

// 根据公司获取面试列表 参数cid
router.get('/interviewByCompany', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql =
    'select * from interview left join student on interview.sid = student.sid where cid=?';
  const sqlParams = [req.query.cid];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});

// 根据公司获取评论列表 参数cid
router.get('/commentByCompany', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql =
    'select * from comment left join student on comment.sid = student.sid where cid=?';
  const sqlParams = [req.query.cid];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});

/*****************************/
// 获取学生信息表 参数phone
router.get('/student', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql = 'select * from student where s_phone=?';
  const sqlParams = [req.query.phone];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});

// 获取所有项目信息
router.get('/project', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql =
    'select * from project left join company on project.cid = company.cid';
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
  });
});

// 获取学生接过的项目 参数sid
router.get('/projectByStudent', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql =
    'select * from (sp left join project on sp.pid = project.pid) left join company on project.cid = company.cid where sid=?';
  const sqlParams = [req.query.sid];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});
// 根据学生获取面试信息 参数sid
router.get('/interviewByStudent', (req, res, next) => {
  conn.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
  const sql =
    'select * from interview left join company on interview.cid = company.cid where sid=?';
  const sqlParams = [req.query.sid];
  conn.query(sql, sqlParams, (err, result) => {
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
  });
});
module.exports = router;
