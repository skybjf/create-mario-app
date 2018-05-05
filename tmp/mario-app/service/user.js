// 返回值包装函数
// 标记：需抽离
const responseWrapper = (arg) => {
    return {
        code: 0,
        result: arg,
        msg: "success"
    }
}

const userService = function () {
    const config = {};
    // 通过ID查找
    config.getById = function (pool, id) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log("userERROE:" + err);
                }
                connection.query('SELECT * FROM user WHERE id=?', [id], function (error, results, fields) {
                    // And done with the connection.
                    connection.release();
                    // Handle error after the release.
                    if (error) {
                        reject();
                    } else {
                        let result = results[0];
                        result = responseWrapper(result);
                        resolve(result);
                    };
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        })
    }
    // 查找所有
    config.getAll = function (pool) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log("userERROE:" + err);
                }
                connection.query('SELECT username FROM user', function (error, results, fields) {
                    connection.release();
                    if (error) {
                        reject();
                    } else {
                        const result = results;
                        resolve(result);
                    };
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        })
    }

    return config;
}()
module.exports = userService;