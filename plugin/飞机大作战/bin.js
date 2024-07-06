const { segment } = require("icqq");

settings = {
  database: {
    host: "121.196.233.81",
    port: 3306,
    user: "root",
    password: "JxPWJRSAa2sxk2SK",
    database: "qqgroupmsg",
  },
};

const path = require("path");

const sql = require("mysql").createConnection(settings.database);

async function setup(bot, TDconfig) {
  bot.on("message.group", function (e) {
    // console.log(e);
    if (!TDconfig.groupId.includes(e.group_id)) return;

    const fromGroup = e.group_id;
    const fromAccount = e.sender.user_id;
    const message = e.raw_message;
    const command =
      message.split(" ").length > 1 ? message.split(" ") : [message];
    const fromName = e.sender.nickname;
    //#region 以下定义好多好多东西

    const 纸飞机 = {
      type: 101,
      score: 100,
      防御系数: 1.81,
      级别: 1,
    };
    const 木飞机 = {
      type: 102,
      score: 200,
      防御系数: 1.98,
      级别: 2,
    };
    const 铁皮飞机 = {
      type: 103,
      score: 500,
      防御系数: 2.24,
      级别: 3,
    };
    const 钢化飞机 = {
      type: 104,
      score: 1000,
      防御系数: 2.45,
      级别: 4,
    };
    const 窜天猴发射器 = {
      type: 201,
      score: 100,
      攻击系数: 1.99,
      级别: 1,
      暴击攻击: 2.25,
    };
    const 对天导弹发射器 = {
      type: 202,
      score: 200,
      攻击系数: 2.21,
      级别: 2,
      暴击攻击: 2.51,
    };
    const 多角度发射器 = {
      type: 203,
      score: 300,
      攻击系数: 2.35,
      级别: 3,
      暴击攻击: 2.68,
    };
    const 高精度发射器 = {
      type: 204,
      score: 500,
      攻击系数: 2.54,
      级别: 4,
      暴击攻击: 2.9,
    };

    //#endregion

    if (command[0] == "飞机大作战游戏帮助") {
      bot
        .makeForwardMsg([
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/主菜单.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/炮兵.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/飞行员.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
        ])
        .then((m) => {
          e.reply(m);
        });
      return;
    }

    if (command[0] == "炮兵怎么玩？" || command[0] == "炮兵怎么玩") {
      bot
        .makeForwardMsg([
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/主菜单.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/炮兵.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/飞行员.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
        ])
        .then((m) => {
          e.reply(m);
        });
      return;
    }

    if (command[0] == "飞行员怎么玩" || command[0] == "飞行员怎么玩？") {
      bot
        .makeForwardMsg([
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/主菜单.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/炮兵.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
          {
            user_id: 2870926164,
            message: [
              segment.image(path.join(__dirname, "./帮助文件/飞行员.jpg")),
            ],
            nickname: "帮助",
            time: new Date().getTime(),
          },
        ])
        .then((m) => {
          e.reply(m);
        });
      return;
    }

    if (command[0] == "创建角色") {
      let userData = {};
      let data = {};
      let res = [];
      let usertype = 2; //默认用户为飞行员

      //先检查是否有积分账户
      query = "SELECT * FROM user WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 user 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        //检测返回的数组长度
        if (data.length <= 0) {
          //创建积分账户
          userData = {
            QQid: fromAccount,
            score: 0,
            sign_Date: "1970-01-01",
            dayN: 0,
            ban: 0,
          };

          query =
            "INSERT INTO user (QQid,score,sign_Date,dayN,ban) values (" +
            "'" +
            fromAccount +
            "'" +
            ",'0','1970-01-01','0','0')";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 user 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              return;
            }
          });
          //已经为用户创建积分账户
        } else {
          //用户有账户
          userData = data[0];
        }

        //到这里每个人都有积分账户，且保存在userData中

        //检测用户是否有游戏账户
        query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
        sql.query(query, function (err, gamedata) {
          if (err) {
            console.error("读取数据表 user 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          if (gamedata.length <= 0) {
            //为用户创建游戏账户

            //取一个随机数决定用户是飞行员还是炮兵
            if (Math.floor(Math.random() * 11) >= 7) {
              //用户为炮兵
              usertype = 3;
            }

            query =
              "INSERT INTO game_user_a (QQid,type,allow,bulletN) values (" +
              "'" +
              fromAccount +
              "'" +
              ",'0','" +
              usertype +
              "','0')";
            sql.query(query, function (err, tmp) {
              if (err) {
                console.error("写入数据表 game_user_a 时失败 :" + err);
                bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                return;
              }
            });

            if (usertype == 2) usertypename = "飞行员";
            if (usertype == 3) usertypename = "炮兵";

            res = [
              segment.at(fromAccount),
              "\n创建成功啦\n",
              "你的职业为" + usertypename,
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          //用户有游戏账户
          res = [segment.at(fromAccount), "小可爱你已经注册过了呢"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        });
      });
    }

    if (command[0] == "购买飞机") {
      let res = [];

      //先检测是否有飞机名
      if (command.length <= 1) {
        res = [segment.at(fromAccount), "\n小可爱你不说买啥我咋给你卖awa"];

        bot.sendGroupMsg(fromGroup, res);
        return;
      }

      //判断是否注册
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 user 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow == 3) {
          res = [segment.at(fromAccount), "\n你是炮兵呢宝，不能购买飞机的"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的用户都是飞行员

        //判断飞行员是否有飞机
        if (gamedata.type != 0) {
          //用户有飞机,进行识别
          if (gamedata.type == 纸飞机.type) {
            res = [
              segment.at(fromAccount),
              "\n宝贝你有个纸飞机\n",
              "“出售飞机”后再来购买吧",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          if (gamedata.type == 木飞机.type) {
            res = [
              segment.at(fromAccount),
              "\n宝贝你有个木飞机\n",
              "“出售飞机”后再来购买吧",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          if (gamedata.type == 铁皮飞机.type) {
            res = [
              segment.at(fromAccount),
              "\n宝贝你有个铁皮飞机\n",
              "“出售飞机”后再来购买吧",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          if (gamedata.type == 钢化飞机.type) {
            res = [
              segment.at(fromAccount),
              "\n宝贝你有个钢化飞机\n",
              "“出售飞机”后再来购买吧",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          //数据异常
          res = [
            segment.at(fromAccount),
            "\n数据异常！\n",
            "异常数据：gamedata.type\n",
            "异常值：" + gamedata.type,
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里都是没飞机的飞行员

        //判断是否有所要购买的飞机
        if (
          (command[1] != "纸飞机") &
          (command[1] != "木飞机") &
          (command[1] != "铁皮飞机") &
          (command[1] != "钢化飞机")
        ) {
          res = [segment.at(fromAccount), "\n我从未听过这个飞机"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //已经过滤掉所有奇怪的请求了
        //获取用户积分

        query = "SELECT * FROM user WHERE QQid = " + fromAccount;
        sql.query(query, function (err, data) {
          if (err) {
            console.error("读取数据表 user 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          //检测返回的数组长度
          if (data.length <= 0) {
            //创建积分账户
            userData = {
              QQid: fromAccount,
              score: 0,
              sign_Date: "1970-01-01",
              dayN: 0,
              ban: 0,
            };

            query =
              "INSERT INTO user (QQid,score,sign_Date,dayN,ban) values (" +
              "'" +
              fromAccount +
              "'" +
              ",'0','1970-01-01','0','0')";
            sql.query(query, function (err, tmp) {
              if (err) {
                console.error("写入数据表 user 时失败 :" + err);
                bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                return;
              }
            });
            //已经为用户创建积分账户
          } else {
            //用户有账户
            userData = data[0];
          }

          //只有有账户且没飞机的飞行员才能到这里

          var newscore = userData.score;
          //检查积分余额
          if (command[1] == "纸飞机") {
            if (userData.score <= 纸飞机.score) {
              res = [segment.at(fromAccount), "\n你积分不够呜呜"];

              bot.sendGroupMsg(fromGroup, res);
              return;
            } else {
              newscore = newscore - 纸飞机.score;
            }
          }

          if (command[1] == "木飞机") {
            if (userData.score <= 木飞机.score) {
              res = [segment.at(fromAccount), "\n你积分不够呜呜"];

              bot.sendGroupMsg(fromGroup, res);
              return;
            } else {
              newscore = newscore - 木飞机.score;
            }
          }

          if (command[1] == "铁皮飞机") {
            if (userData.score <= 铁皮飞机.score) {
              res = [segment.at(fromAccount), "\n你积分不够呜呜"];

              bot.sendGroupMsg(fromGroup, res);
              return;
            } else {
              newscore = newscore - 铁皮飞机.score;
            }
          }

          if (command[1] == "钢化飞机") {
            if (userData.score <= 钢化飞机.score) {
              res = [segment.at(fromAccount), "\n你积分不够呜呜"];

              bot.sendGroupMsg(fromGroup, res);
              return;
            } else {
              newscore = newscore - 钢化飞机.score;
            }
          }

          //过滤了所有积分不足的人，并进行了扣费

          //上传数据
          query =
            "UPDATE user SET score='" +
            newscore +
            "' WHERE QQid='" +
            fromAccount +
            "'";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 user 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              return;
            }
          });

          //购买成功啦
          //上传数据

          if (command[1] == "纸飞机") _type = 纸飞机.type;
          if (command[1] == "木飞机") _type = 木飞机.type;
          if (command[1] == "铁皮飞机") _type = 铁皮飞机.type;
          if (command[1] == "钢化飞机") _type = 钢化飞机.type;

          query =
            "UPDATE game_user_a SET type='" +
            _type +
            "' WHERE QQid='" +
            fromAccount +
            "'";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 user 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              res = [segment.at(fromAccount), "\n数据库问题,购买失败"];

              bot.sendGroupMsg(fromGroup, res);

              //退钱

              query =
                "UPDATE user SET score='" +
                userData.score +
                "' WHERE QQid='" +
                fromAccount +
                "'";
              sql.query(query, function (err, tmp) {
                if (err) {
                  console.error("写入数据表 user 时失败 :" + err);
                  bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                  return;
                }
              });
              return;
            }
          });

          //购买成功了

          res = [segment.at(fromAccount), "\n购买成功啦!"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        });
      });
    }

    if (command[0] == "我的飞机") {
      //查询是不是飞行员
      //判断是否注册
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow == 3) {
          res = [segment.at(fromAccount), "\n你是炮兵呢宝，没有飞机的"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的用户都是飞行员

        //判断飞行员是否有飞机
        if (gamedata.type != 0) {
          //用户有飞机,进行识别
          if (gamedata.type == 纸飞机.type) {
            res = [segment.at(fromAccount), "\n 宝贝你有个纸飞机\n"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          if (gamedata.type == 木飞机.type) {
            res = [segment.at(fromAccount), "\n宝贝你有个木飞机\n"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          if (gamedata.type == 铁皮飞机.type) {
            res = [segment.at(fromAccount), "\n宝贝你有个铁皮飞机\n"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          if (gamedata.type == 钢化飞机.type) {
            res = [segment.at(fromAccount), "\n宝贝你有个钢化飞机\n"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          //数据异常
          res = [
            segment.at(fromAccount),
            "\n 数据异常！\n",
            "异常数据：gamedata.type\n",
            "异常值：" + gamedata.type,
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }
        res = [segment.at(fromAccount), "\n亲爱的你没有飞机呢，快去买个吧。"];

        bot.sendGroupMsg(fromGroup, res);
        return;
      });
    }

    if (command[0] == "职业查询") {
      //判断是否注册
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow == 3) {
          res = [segment.at(fromAccount), "\n你是炮兵呢宝"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          res = [segment.at(fromAccount), "\n你是飞行员呢宝"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }
      });
    }

    if (command[0] == "出售飞机") {
      //查询是不是飞行员
      //判断是否注册
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow == 3) {
          res = [
            segment.at(fromAccount),
            "\n你是炮兵呢宝，没有飞机的，咋能卖飞机呢",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的用户都是飞行员

        //判断飞行员是否有飞机
        if (gamedata.type == 0) {
          //用户有飞机,进行识别

          res = [segment.at(fromAccount), "\n亲爱的你没有飞机呢，怎么卖呢。"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          //读取用户积分数据
          query = "SELECT score FROM user WHERE QQid = " + fromAccount;
          sql.query(query, function (err, data) {
            if (err) {
              console.error("读取数据表 user 时失败 :" + err);
              bot.sendGroupMsg(fromAccount, "读取数据库错误。");
              return;
            }

            if (data.length <= 0) {
              res = [
                segment.at(fromAccount),
                "\n臭宝你还没注册呢,试着发送“创建角色”",
              ];

              bot.sendGroupMsg(fromGroup, res);
              return;
            }

            userData = data[0];

            var newscore = userData.score;

            if (gamedata.type == 纸飞机.type)
              newscore = newscore + 纸飞机.score * 0.6;
            if (gamedata.type == 木飞机.type)
              newscore = newscore + 木飞机.score * 0.6;
            if (gamedata.type == 铁皮飞机.type)
              newscore = newscore + 铁皮飞机.score * 0.6;
            if (gamedata.type == 钢化飞机.type)
              newscore = newscore + 钢化飞机.score * 0.6;

            //上传数据

            query =
              "UPDATE game_user_a SET type='0' WHERE QQid='" +
              fromAccount +
              "'";
            sql.query(query, function (err, tmp) {
              if (err) {
                console.error("写入数据表 user 时失败 :" + err);
                bot.sendgroupMsg(fromGroup, "写入数据库错误!");
                res = [segment.at(fromAccount), "\n 数据库问题,出售失败"];

                bot.sendGroupMsg(fromGroup, res);
                return;
              }

              query =
                "UPDATE user SET score='" +
                newscore +
                "' WHERE QQid='" +
                fromAccount +
                "'";
              sql.query(query, function (err, tmp) {
                if (err) {
                  console.error("写入数据表 user 时失败 :" + err);
                  bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                  return;
                }

                res = [
                  segment.at(fromAccount),
                  "\n 出售成功！",
                  "\n获取了购买飞机的60%积分",
                ];

                bot.sendGroupMsg(fromGroup, res);
                return;
              });
            });
          });
        }
      });
    }

    if (command[0] == "起飞") {
      //查询是不是飞行员
      //判断是否注册
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          var gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow == 3) {
          res = [
            segment.at(fromAccount),
            "\n你是炮兵呢宝，没有飞机的，咋能起飞呢",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的用户都是飞行员

        //判断飞行员是否有飞机
        if (gamedata.type == 0) {
          //用户有飞机,进行识别

          res = [segment.at(fromAccount), "\n亲爱的你没有飞机呢，怎么飞行呢。"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的人都是有飞机的飞行员
        //检查飞行许可证

        if (gamedata.allow == 1) {
          res = [
            segment.at(fromAccount),
            "\n亲爱的你的飞行许可证被吊销了呢，重新去办理吧",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        if (gamedata.allow == 2) {
          res = [
            segment.at(fromAccount),
            "\n亲爱的你还没办理飞行许可证呢，快去办理吧",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //有飞机、有许可证、是飞行员
        //查看是否已经有正在飞行的飞机

        query = "SELECT * FROM game_a_sky WHERE QQid = " + fromAccount;
        sql.query(query, function (err, data) {
          if (err) {
            console.error("读取数据表 game_a_sky 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          //判断是否有数据
          if (data.length >= 1) {
            skydata = data[0];
            nowtime = Date.now();

            let flytime = new Date(skydata.timestamp);
            let givescore = 0;

            //bot.sendGroupMsg(fromGroup, data.type);

            if (skydata.type == 纸飞机.type) {
              typename = "纸飞机";
              givescore = parseInt(
                (parseInt(nowtime - skydata.timestamp) / 600000) *
                  0.01 *
                  纸飞机.score
              );
            }
            if (skydata.type == 木飞机.type) {
              typename = "木飞机";
              givescore = parseInt(
                (parseInt(nowtime - skydata.timestamp) / 6000000) *
                  0.01 *
                  木飞机.score
              );
            }
            if (skydata.type == 铁皮飞机.type) {
              typename = "铁皮飞机";
              givescore = parseInt(
                (parseInt(nowtime - skydata.timestamp) / 600000) *
                  0.01 *
                  铁皮飞机.score
              );
            }
            if (skydata.type == 钢化飞机.type) {
              typename = "钢化飞机";
              givescore = parseInt(
                (parseInt(nowtime - skydata.timestamp) / 600000) *
                  0.01 *
                  钢化飞机.score
              );
            }

            res = [
              segment.at(fromAccount),
              "\n亲爱的你有飞机正在飞行哦",
              "\n起飞时间：" + flytime,
              "\n飞机类型：" + typename,
              "\n已积累的积分：" + givescore,
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          //没有飞机在飞行
          //获取用户飞机类型

          nowtime = Date.now();
          skydata = data[0];

          query =
            "INSERT INTO game_a_sky (QQid,type,timestamp) values (" +
            "'" +
            fromAccount +
            "'" +
            ",'" +
            gamedata.type +
            "','" +
            nowtime +
            "')";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 game_a_sky 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              return;
            }

            if (gamedata.type == 纸飞机.type) {
              typename = "纸飞机";
              givescore = 0.01 * 纸飞机.score;
              res = [
                segment.at(fromAccount),
                "\n飞机起飞啦！",
                "\n小心别被炮兵打下来哦",
                "\n你的" + typename + "预计每十分钟获得" + givescore + "积分",
              ];

              bot.sendGroupMsg(fromGroup, res);
              return;
            }

            if (gamedata.type == 木飞机.type) {
              typename = "木飞机";
              givescore = 0.01 * 木飞机.score;
              res = [
                segment.at(fromAccount),
                "\n飞机起飞啦！",
                "\n小心别被炮兵打下来哦",
                "\n你的" + typename + "预计每十分钟获得" + givescore + "积分",
              ];

              bot.sendGroupMsg(fromGroup, res);
              return;
            }

            if (gamedata.type == 铁皮飞机.type) {
              typename = "铁皮飞机";
              givescore = 0.01 * 铁皮飞机.score;
              res = [
                segment.at(fromAccount),
                "\n飞机起飞啦！",
                "\n小心别被炮兵打下来哦",
                "\n你的" + typename + "预计每十分钟获得" + givescore + "积分",
              ];

              bot.sendGroupMsg(fromGroup, res);
              return;
            }

            if (gamedata.type == 钢化飞机.type) {
              typename = "钢化飞机";
              givescore = 0.01 * 钢化飞机.score;
              res = [
                segment.at(fromAccount),
                "\n飞机起飞啦！",
                "\n小心别被炮兵打下来哦",
                "\n你的" + typename + "预计每十分钟获得" + givescore + "积分",
              ];

              bot.sendGroupMsg(fromGroup, res);
              return;
            }
          });
        });
      });
    }

    if (command[0] == "降落") {
      //查询是不是飞行员
      //判断是否注册
      nowtime = Date.now();
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow == 3) {
          res = [
            segment.at(fromAccount),
            "\n你是炮兵呢宝，没有飞机的，咋能降落飞机呢呢",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的用户都是飞行员

        //判断飞行员是否有飞机
        if (gamedata.type == 0) {
          //用户有飞机,进行识别

          res = [segment.at(fromAccount), "\n亲爱的你没有飞机呢，怎么降落呢。"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //读取空中的数据
        query = "SELECT * FROM game_a_sky WHERE QQid = " + fromAccount;
        sql.query(query, function (err, data) {
          if (err) {
            console.error("读取数据表 game_a_sky 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          let typename = "";

          //判断是否有数据
          if (data.length <= 0) {
            //没有飞机在飞行
            res = [segment.at(fromAccount), "\n亲爱的你没有飞机正在飞行哦"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          // 有飞机在飞行

          let givescore = 0;

          skydata = data[0];

          if (skydata.type == 纸飞机.type) {
            typename = "纸飞机";
            givescore = parseInt(
              (parseInt(nowtime - skydata.timestamp) / 600000) *
                0.01 *
                纸飞机.score
            );
          }
          if (skydata.type == 木飞机.type) {
            typename = "木飞机";
            givescore = parseInt(
              (parseInt(nowtime - skydata.timestamp) / 600000) *
                0.01 *
                木飞机.score
            );
          }
          if (skydata.type == 铁皮飞机.type) {
            typename = "铁皮飞机";
            givescore = parseInt(
              (parseInt(nowtime - skydata.timestamp) / 600000) *
                0.01 *
                铁皮飞机.score
            );
          }
          if (skydata.type == 钢化飞机.type) {
            typename = "钢化飞机";
            givescore = parseInt(
              (parseInt(nowtime - skydata.timestamp) / 600000) *
                0.01 *
                钢化飞机.score
            );
          }

          query = "SELECT score FROM user WHERE QQid = " + fromAccount;
          sql.query(query, function (err, data) {
            if (err) {
              console.error("读取数据表 user 时失败 :" + err);
              bot.sendGroupMsg(fromAccount, "读取数据库错误。");
              return;
            }

            if (data.length <= 0) {
              res = [
                segment.at(fromAccount),
                "\n臭宝你还没注册呢,试着发送“创建角色”",
              ];

              bot.sendGroupMsg(fromGroup, res);
              return;
            }

            userData = data[0];

            newscore = userData.score + givescore;

            query =
              "UPDATE user SET score='" +
              newscore +
              "' WHERE QQid='" +
              fromAccount +
              "'";
            sql.query(query, function (err, tmp) {
              if (err) {
                console.error("写入数据表 user 时失败 :" + err);
                bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                return;
              }

              //  删除飞行记录
              query = "DELETE FROM game_a_sky WHERE QQid='" + fromAccount + "'";
              sql.query(query, function (err, tmp) {
                if (err) {
                  console.error("删除数据表行 game_a_sky 时失败 :" + err);
                  bot.sendPrivateMsg(fromAccount, "更新数据库错误!");
                  return;
                }

                //  删除飞行记录
                res = [
                  segment.at(fromAccount),
                  "\n降落成功啦！",
                  "\n本次飞行获得" + givescore + "积分",
                ];

                bot.sendGroupMsg(fromGroup, res);
                return;
              });
            });
          });
        });
      });
    }

    if (command[0] == "办理飞行许可证") {
      //查询是不是飞行员
      //判断是否注册
      nowtime = Date.now();
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow == 3) {
          res = [
            segment.at(fromAccount),
            "\n你是炮兵呢宝，办理不了飞行许可证呢",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的用户都是飞行员

        //判断飞行员是否有飞机
        if (gamedata.type == 0) {
          //用户有飞机,进行识别

          res = [
            segment.at(fromAccount),
            "\n亲爱的你没有飞机呢，先去买飞机吧。",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //检查许可证状态
        if (gamedata.allow == 0) {
          res = [segment.at(fromAccount), "\n亲爱的已经有许可证了呢。"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //获取账户余额
        query = "SELECT score FROM user WHERE QQid = " + fromAccount;
        sql.query(query, function (err, data) {
          if (err) {
            console.error("读取数据表 user 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          if (data.length <= 0) {
            res = [
              segment.at(fromAccount),
              "\n臭宝你还没注册呢,试着发送“创建角色”",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          userData = data[0];

          newscore = userData.score - 100;

          query =
            "UPDATE user SET score='" +
            newscore +
            "' WHERE QQid='" +
            fromAccount +
            "'";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 user 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              return;
            }

            query =
              "UPDATE game_user_a SET allow='0' WHERE QQid='" +
              fromAccount +
              "'";
            sql.query(query, function (err, tmp) {
              if (err) {
                console.error("写入数据表 game_user_a 时失败 :" + err);
                bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                return;
              }
            });

            res = [segment.at(fromAccount), "\n购买成功啦！", "\n快去起飞吧宝"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          });
        });
      });
    }

    //这里往下都是炮兵的部分
    if (command[0] == "购买大炮") {
      //先检查用户有没有注册

      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow != 3) {
          res = [segment.at(fromAccount), "\n你不是炮兵呢宝，买不了大炮哦"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //检测用户是否有大炮
        if (gamedata.type != 0) {
          res = [
            segment.at(fromAccount),
            "\n宝宝你有大炮的，要是不想要的话就出售大炮吧",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //检查是否有参数
        if (command.length <= 1) {
          res = [segment.at(fromAccount), "\n不说买什么炮我怎么卖嘛宝"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //检查炮名称是否正确
        if (
          (command[1] != "窜天猴发射器") &
          (command[1] != "对天导弹发射器") &
          (command[1] != "多角度发射器") &
          (command[1] != "高精度发射器")
        ) {
          res = [segment.at(fromAccount), "\n宝宝我还没听过这个炮呢"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //读取积分数据
        query = "SELECT score FROM user WHERE QQid = " + fromAccount;
        sql.query(query, function (err, data) {
          if (err) {
            console.error("读取数据表 user 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          if (data.length <= 0) {
            res = [
              segment.at(fromAccount),
              "\n臭宝你还没注册呢,试着发送“创建角色”",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          userData = data[0];
          if (command[1] == "窜天猴发射器")
            newscore = userData.score - 窜天猴发射器.score;
          if (command[1] == "对天导弹发射器")
            newscore = userData.score - 对天导弹发射器.score;
          if (command[1] == "多角度发射器")
            newscore = userData.score - 多角度发射器.score;
          if (command[1] == "高精度发射器")
            newscore = userData.score - 高精度发射器.score;
          if (newscore <= 0) {
            //余额不足
            res = [segment.at(fromAccount), "\n臭宝你积分不够呢"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          query =
            "UPDATE user SET score='" +
            newscore +
            "' WHERE QQid='" +
            fromAccount +
            "'";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 user 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              return;
            }

            if (command[1] == "窜天猴发射器") _type = 窜天猴发射器.type;
            if (command[1] == "对天导弹发射器") _type = 对天导弹发射器.type;
            if (command[1] == "多角度发射器") _type = 多角度发射器.type;
            if (command[1] == "高精度发射器") _type = 高精度发射器.type;

            query =
              "UPDATE game_user_a SET type='" +
              _type +
              "' WHERE QQid='" +
              fromAccount +
              "'";
            sql.query(query, function (err, tmp) {
              if (err) {
                console.error("写入数据表 game_user_a 时失败 :" + err);
                bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                return;
              }
            });

            res = [
              segment.at(fromAccount),
              "\n购买成功啦！",
              "\n快去发射炮弹吧宝",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          });
        });
      });
    }

    if (command[0] == "购买炮弹") {
      var new_bulletN = 0;
      if (command.length <= 1) {
        new_bulletN = 1;
      } else {
        if (/^\d+$/.test(command[1]) === true) {
          new_bulletN = command[1];
        } else {
          return;
        }
      }

      //此时炮弹的购买数都已确定

      //查看用户是否有账户
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow != 3) {
          res = [segment.at(fromAccount), "\n你不是炮兵呢宝，买不了炮弹哦"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //检测用户是否有大炮
        if (gamedata.type == 0) {
          res = [segment.at(fromAccount), "\n宝宝你没有大炮买什么炮弹嘛"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //到这里的用户有账户、有大炮、是炮兵、知道买多少炮弹
        //读取积分数据
        query = "SELECT score FROM user WHERE QQid = " + fromAccount;
        sql.query(query, function (err, data) {
          if (err) {
            console.error("读取数据表 user 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          if (data.length <= 0) {
            res = [
              segment.at(fromAccount),
              "\n臭宝你还没注册呢,试着发送“创建角色”",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }

          new_bulletN = parseInt(new_bulletN);

          userData = data[0];
          newscore = parseInt(userData.score) - new_bulletN * 50;
          if (newscore <= 0) {
            //余额不足
            res = [segment.at(fromAccount), "\n臭宝你积分不够呢"];

            bot.sendGroupMsg(fromGroup, res);
            return;
          }
          query =
            "UPDATE user SET score='" +
            newscore +
            "' WHERE QQid='" +
            fromAccount +
            "'";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 user 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              return;
            }

            bulletN = parseInt(gamedata.bulletN) + new_bulletN;
            query =
              "UPDATE game_user_a SET bulletN ='" +
              bulletN +
              "' WHERE QQid='" +
              fromAccount +
              "'";
            sql.query(query, function (err, tmp) {
              if (err) {
                console.error("写入数据表 game_user_a 时失败 :" + err);
                bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                return;
              }
            });

            res = [
              segment.at(fromAccount),
              "\n购买了" + new_bulletN + "炮弹",
              "\n现在共" + bulletN + "发炮弹",
              "\n共花费" + new_bulletN * 50 + "积分",
              "\n剩余" + newscore + "积分",
              "\n快去发射炮弹吧宝",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          });
        });
      });
    }

    if (command[0] == "开炮" || command[0] == "发射") {
      //查看用户是否有账户
      query = "SELECT * FROM game_user_a WHERE QQid = " + fromAccount;
      sql.query(query, function (err, data) {
        if (err) {
          console.error("读取数据表 game_user_a 时失败 :" + err);
          bot.sendGroupMsg(fromAccount, "读取数据库错误。");
          return;
        }

        if (data.length <= 0) {
          res = [
            segment.at(fromAccount),
            "\n臭宝你还没注册呢,试着发送“创建角色”",
          ];

          bot.sendGroupMsg(fromGroup, res);
          return;
        } else {
          gamedata = data[0];
        }
        //到这都有game账户了

        //检测用户是否为炮兵还是飞行员
        if (gamedata.allow != 3) {
          res = [segment.at(fromAccount), "\n你不是炮兵呢宝，不能开炮"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //检测用户是否有大炮
        if (gamedata.type == 0) {
          res = [segment.at(fromAccount), "\n宝宝你没有大炮呢，去购买大炮吧"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //判断用户是否有炮弹
        if (gamedata.bulletN <= 0) {
          res = [segment.at(fromAccount), "\n宝宝你没有了炮弹哦，去购买炮弹吧"];

          bot.sendGroupMsg(fromGroup, res);
          return;
        }

        //获取超时时间
        nowtime = Date.now();
        if (gamedata.timeout != "") {
          if ((nowtime - gamedata.timeout) / 60000 < 30) {
            res = ["半小时只能发射一次哦"];
            console.log(nowtime);
            console.log(gamedata.timeout);
            console.log((nowtime - gamedata.timeout) / 60000);

            bot.sendTempMsg(fromGroup, fromAccount, res);
            return;
          }
        }

        var old_bulletN = gamedata.bulletN;
        //获取天空的数据
        query = "SELECT * FROM game_a_sky";
        sql.query(query, function (err, data) {
          if (err) {
            console.error("读取数据表 game_a_sky 时失败 :" + err);
            bot.sendGroupMsg(fromAccount, "读取数据库错误。");
            return;
          }

          if (data.length <= 0) {
            res = [
              segment.at(fromAccount),
              "\n现在天空没有飞机呢宝，一会再来吧",
            ];

            bot.sendGroupMsg(fromGroup, res);
            return;
          } else {
            //获取空中飞机数量
            var planeN = data.length;
            //生成一个随机数
            planeID = Math.floor(Math.random() * planeN);
          }

          //获取飞机的信息
          let planeinfo = {
            QQid: data[planeID].QQid,
            type: data[planeID].type,
            timestamp: data[planeID].timestamp,
          };

          if (gamedata.type == 窜天猴发射器.type) 大炮级别 = 1;
          if (gamedata.type == 对天导弹发射器.type) 大炮级别 = 2;
          if (gamedata.type == 多角度发射器.type) 大炮级别 = 3;
          if (gamedata.type == 高精度发射器.type) 大炮级别 = 4;

          if (planeinfo.type == 纸飞机.type) 飞机级别 = 1;
          if (planeinfo.type == 木飞机.type) 飞机级别 = 2;
          if (planeinfo.type == 铁皮飞机.type) 飞机级别 = 3;
          if (planeinfo.type == 钢化飞机.type) 飞机级别 = 4;

          if (大炮级别 == 飞机级别) {
            if (gamedata.type == 窜天猴发射器.type)
              大炮伤害 = 窜天猴发射器.暴击攻击;
            if (gamedata.type == 对天导弹发射器.type)
              大炮伤害 = 对天导弹发射器.暴击攻击;
            if (gamedata.type == 多角度发射器.type)
              大炮伤害 = 多角度发射器.暴击攻击;
            if (gamedata.type == 高精度发射器.type)
              大炮伤害 = 高精度发射器.暴击攻击;
          } else {
            if (gamedata.type == 窜天猴发射器.type)
              大炮伤害 = 窜天猴发射器.攻击系数;
            if (gamedata.type == 对天导弹发射器.type)
              大炮伤害 = 对天导弹发射器.攻击系数;
            if (gamedata.type == 多角度发射器.type)
              大炮伤害 = 多角度发射器.攻击系数;
            if (gamedata.type == 高精度发射器.type)
              大炮伤害 = 高精度发射器.攻击系数;
          }

          if (planeinfo.type == 纸飞机.type) 飞机防御 = 纸飞机.防御系数;
          if (planeinfo.type == 木飞机.type) 飞机防御 = 木飞机.防御系数;
          if (planeinfo.type == 铁皮飞机.type) 飞机防御 = 铁皮飞机.防御系数;
          if (planeinfo.type == 钢化飞机.type) 飞机防御 = 钢化飞机.防御系数;

          if (planeinfo.type == 纸飞机.type) 收益 = 纸飞机.score * 0.6;
          if (planeinfo.type == 木飞机.type) 收益 = 木飞机.score * 0.6;
          if (planeinfo.type == 铁皮飞机.type) 收益 = 铁皮飞机.score * 0.6;
          if (planeinfo.type == 钢化飞机.type) 收益 = 钢化飞机.score * 0.6;
          query =
            "UPDATE game_user_a SET bulletN ='" +
            (old_bulletN - 1) +
            "',timeout = '" +
            nowtime +
            "' WHERE QQid='" +
            fromAccount +
            "'";
          sql.query(query, function (err, tmp) {
            if (err) {
              console.error("写入数据表 game_user_a 时失败 :" + err);
              bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
              return;
            }
          });
          if (大炮伤害 - 飞机防御 > 0) {
            击败概率 = (大炮伤害 - 飞机防御) * 100;
            if (Math.floor(Math.random() * 101) < 击败概率) {
              //击败成功

              query = "SELECT score FROM user WHERE QQid = " + fromAccount;
              sql.query(query, function (err, data) {
                if (err) {
                  console.error("读取数据表 user 时失败 :" + err);
                  bot.sendGroupMsg(fromAccount, "读取数据库错误。");
                  return;
                }

                if (data.length <= 0) {
                  res = [
                    segment.at(fromAccount),
                    "\n臭宝你还 没注册呢,试着发送“创建角色”",
                  ];

                  bot.sendGroupMsg(fromGroup, res);
                  return;
                }

                newscore = parseInt(data[0].score) + 收益;

                query =
                  "UPDATE user SET score ='" +
                  newscore +
                  "' WHERE QQid='" +
                  fromAccount +
                  "'";
                sql.query(query, function (err, tmp) {
                  if (err) {
                    console.error("写入数据表 user 时失败 :" + err);
                    bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                    return;
                  }

                  query =
                    "DELETE FROM game_a_sky WHERE QQid='" +
                    planeinfo.QQid +
                    "'";
                  sql.query(query, function (err, tmp) {
                    if (err) {
                      console.error("删除数据表行 game_a_sky 时失败 :" + err);
                      bot.sendPrivateMsg(fromAccount, "更新数据库错误!");
                      return;
                    }

                    res = [
                      segment.at(fromAccount),
                      "\n你的炮弹击败了" + planeinfo.QQid + "的飞机",
                      "\n获得了" + 收益 + "积分",
                    ];

                    bot.sendGroupMsg(fromGroup, res);
                  });

                  res = [
                    segment.at(planeinfo.QQid),
                    "\n你的飞机被" + fromAccount + "击败了",
                  ];

                  bot.sendGroupMsg(fromGroup, res);
                  return;
                });
              });
            } else {
              //击败失败
              res = [segment.at(fromAccount), "你的炮弹射偏了awa"];
              bot.sendGroupMsg(fromGroup, res);
              return;
            }
          } else {
            击败概率 = (飞机防御 - 大炮伤害) * 100;
            if (Math.floor(Math.random() * 101) > 击败概率) {
              //自爆成功

              query =
                "UPDATE game_user_a SET type ='0' WHERE QQid='" +
                fromAccount +
                "'";
              sql.query(query, function (err, tmp) {
                if (err) {
                  console.error("写入数据表 user 时失败 :" + err);
                  bot.sendPrivateMsg(fromAccount, "写入数据库错误!");
                  return;
                }
              });
              res = [segment.at(fromAccount), "\n你的大炮炸膛了呜呜呜"];

              bot.sendGroupMsg(fromGroup, res);
              res = [
                segment.at(planeinfo.QQid),
                "\n" + fromAccount + "试图攻击你的飞机,只不过他炸膛了",
              ];

              bot.sendGroupMsg(fromGroup, res);
              return;
            } else {
              //自爆失败
              res = [segment.at(fromAccount), "你的炮弹射偏了awa"];
              bot.sendGroupMsg(fromGroup, res);
              return;
            }
          }
        });
      });
    }
  });
}

module.exports = setup;
