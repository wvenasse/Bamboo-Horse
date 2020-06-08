module.exports = app => {
    // const router = require('express').Router();
    const mongoose = require('mongoose');
    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');
    const Person = mongoose.model('Person');
    const Video = mongoose.model('Video');
    const AdminUsers = mongoose.model('AdminUser');
    const Ad = mongoose.model('Ad');

    const express = require('express');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const AdminUser = require('../../models/AdminUser');
    const router = express.Router({
        mergeParams: true
    });


    //新闻列表接口
    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name: '新闻分类'
        // }).populate({
        //     path: 'children',
        //     populate:{
        //         path: 'newsList'
        //     }
        // }).lean();
        const parent = await Category.findOne({
            name: '新闻分类'
        });
        const cats = await Category.aggregate([ //聚合查询
            { $match: { parent: parent._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'articles', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'newsList'
                }
            },
            {
                $addFields: {//添加字段=修改字段
                    newsList: { $slice: ['$newsList', 5] } //取数组里的几个字段,第一个参数是你要去筛的哪个字段,第二个参数你要几个
                }
            }
        ]);
        // const subCats = cats.map(v => v._id);
        // cats.unshift({
        //     name: '热门',
        //     newsList: await Article.find().where({
        //         categories: { $in: subCats }
        //     }).populate('categories').limit(5).lean() //并关联查询
        // });

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name;
                return news;
            })
            return cat;
        })
        res.send(cats);
    });

    //人物列表接口
    router.get('/persons/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '人物分类'
        });
        const cats = await Category.aggregate([ //聚合查询
            { $match: { parent: parent._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'people', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'personList'
                }
            }
        ]);
        // const subCats = cats.map(v => v._id);
        // cats.unshift({
        //     name: '热门',
        //     personList: await Person.find().where({
        //         categories: { $in: subCats }
        //     }).limit(10).lean() //并关联查询
        // });

        res.send(cats);

    });

    //视频列表接口
    router.get('/videos/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '视频分类'
        });
        const cats = await Category.aggregate([ //聚合查询
            { $match: { parent: parent._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'videos', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'videoList'
                }
            }
        ]);
        // const subCats = cats.map(v => v._id);
        // cats.unshift({
        //     name: '热门',
        //     videoList: await Video.find().where({
        //         categories: { $in: subCats }
        //     }).limit(3).lean() //并关联查询
        // });
        res.send(cats);
    });

    //热门列表接口
    router.get('/hots/list', async (req, res) => {
        const parent1 = await Category.findOne({
            name: '新闻分类'
        });
        const cats1 = await Category.aggregate([ //聚合查询
            { $match: { parent: parent1._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'articles', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'newsList'
                }
            },
            {
                $addFields: {//添加字段=修改字段
                    newsList: { $slice: ['$newsList', 5] } //取数组里的几个字段,第一个参数是你要去筛的哪个字段,第二个参数你要几个
                }
            }
        ]);
        const subCats1 = cats1.map(v => v._id);
        cats1.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name;
                return news;
            })
            return cat;
        });

        


        const parent2 = await Category.findOne({
            name: '人物分类'
        });
        const cats2 = await Category.aggregate([ //聚合查询
            { $match: { parent: parent2._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'people', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'personList'
                }
            }
        ]);
        const subCats2 = cats2.map(v => v._id);


        const parent3 = await Category.findOne({
            name: '视频分类'
        });
        const cats3 = await Category.aggregate([ //聚合查询
            { $match: { parent: parent3._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'videos', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'videoList'
                }
            }
        ]);
        const subCats3 = cats3.map(v => v._id);


        const cats = [];
        cats.push({
            name: '娱乐资讯',
            hotList: await Article.find().where({
                categories: { $in: subCats1 }
            }).populate('categories').limit(18).lean() //并关联查询
        },{
            name: '明星人物',
            hotList: await Person.find().where({
                categories: { $in: subCats2 }
            }).limit(6).lean() //并关联查询
        },
        {
            name: '精彩视频',
            hotList: await Video.find().where({
                categories: { $in: subCats3 }
            }).limit(3).lean() //并关联查询
        }
        );
        res.send(cats);
    });

    //广告列表接口
    router.get('/ads/list', async (req, res) => {
        const ad = await Ad.findOne({
            name:'首页幻灯片'
        }).lean();
        res.send(ad);
    });

    //文章详情
    router.get('/articles/:id', async (req, res) => {
        const data = await Article.findById(req.params.id)
        .populate('comments.adminUser comments.backcomments.adminUser')
        .lean();
        data.related = await Article.find().where({
            categories: { $in: data.categories }
        }).limit(2);
        res.send(data);
    });

    //更新文章详情
	router.put('/articles/:id',async(req,res) => {
		const model = await Article.findByIdAndUpdate(req.params.id,req.body);
		res.send(model);
    });
    

    //人物详情
    router.get('/persons/:id', async (req, res) => {
        const data = await Person
            .findById(req.params.id)
            .populate('categories items1 items2 partners.person')
            .lean();
        // data.related = await Person.find().where({
        //     categories: {$in: data.categories}
        // }).limit(2);
        res.send(data);
    });

    //视频详情
    router.get('/videos/:id', async (req, res) => {
        const data = await Video.findById(req.params.id).populate('categories').lean();
        res.send(data);
    });

    //管理员列表接口
    router.get('/adminusers/:username', async (req, res) => {
        const user = await AdminUsers.findOne({
            username: req.params.username
        }).lean();
        res.send(user);
    });

    //更新管理员收藏
	router.put('/adminusers/:id',async(req,res) => {
		const model = await AdminUsers.findByIdAndUpdate(req.params.id,req.body);
		res.send(model);
    });
    
    //新建管理员
	router.post('/adminusers',async(req,res) => {
		const model = await AdminUser.create(req.body);
		res.send(model);
    });
    
    //删除管理员
	router.delete('/adminusers/:id',async(req,res) => {
		await AdminUser.findByIdAndDelete(req.params.id,req.body);
		res.send({
			success: true
		});
	});

    //收藏的列表接口
    router.get('/likes/:username', async (req, res) => {
        const user = await AdminUsers.findOne({
            username: req.params.username
        }).populate('alikes.article plikes.person vlikes.video').lean();
        res.send(user);
    });

    //全部新闻列表接口
    router.get('/allnews/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        });
        const cats = await Category.aggregate([ //聚合查询
            { $match: { parent: parent._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'articles', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'newsList'
                }
            },
            {
                $addFields: {//添加字段=修改字段
                    newsList: { $slice: ['$newsList', 5] } //取数组里的几个字段,第一个参数是你要去筛的哪个字段,第二个参数你要几个
                }
            }
        ]);
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name;
                return news;
            })
            return cat;
        })
        res.send(cats);
    });
    //全部人物列表接口
    router.get('/allpersons/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '人物分类'
        });
        const cats = await Category.aggregate([ //聚合查询
            { $match: { parent: parent._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'people', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'personList'
                }
            }
        ]);
        res.send(cats);

    });

    //全部视频列表接口
    router.get('/allvideos/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '视频分类'
        });
        const cats = await Category.aggregate([ //聚合查询
            { $match: { parent: parent._id } }, //查找where
            {
                $lookup: { //外连接，查询另外一个集合
                    from: 'videos', //关联的表，也就是那个集合。集合的名字与模型的名字一一对应
                    localField: '_id', //虚拟字段，也就是本地键
                    foreignField: 'categories',//外键
                    as: 'videoList'
                }
            }
        ]);
        res.send(cats);
    });

    //登录校验中间件
    const authMiddleware = require('../../middleware/auth');
    const resourceMiddleware = require('../../middleware/resource');

    app.use('/web/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);//通用接口 
    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' });//上传中间件
    app.post('/web/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = 'http://localhost:3000/uploads/' + file.filename;
        res.send(file);
    });

    //登录
    app.post('/web/api/login', async (req, res) => {
        const { username, password } = req.body;
        //根据用户名找用户
        const user = await AdminUser.findOne({ username }).select('+password');
        assert(user, 422, '用户不存在');
        //校验密码
        const isVaild = require('bcrypt').compareSync(password, user.password);
        assert(isVaild, 422, '密码错误');
        //返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({ token });
    });

    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

    app.use('/web/api', router);
}


//收藏的新闻列表接口
    // router.get('/likenews/:username', async (req, res) => {
    //     const user = await AdminUsers.findOne({
    //         username: req.params.username
    //     }).populate('alikes.article').lean();
    //     res.send(user);
    // });
    // //收藏的人物列表接口
    // router.get('/likeperson/:username', async (req, res) => {
    //     const user = await AdminUsers.findOne({
    //         username: req.params.username
    //     }).populate('plikes.person').lean();
    //     res.send(user);
    // });
    // //收藏的视频列表接口
    // router.get('/likevideo/:username', async (req, res) => {
    //     const user = await AdminUsers.findOne({
    //         username: req.params.username
    //     }).populate('vlikes.video').lean();
    //     res.send(user);
    // });

     //导入新闻数据
    // router.get('/news/init', async (req, res) => {
    //     const parent = await Category.findOne({
    //         name: '新闻分类'
    //     })
    //     const cats = await Category.find().where({
    //         parent: parent
    //     }).lean();
    //     const newsTitles = ["夏日新版本“稷下星之队”即将6月上线", "王者荣耀携手两大博物馆 走进稷下学宫", "王者大陆第一学院【稷下】档案", "跨界合作丨控油神装登场，唤醒无限护肤力量！", "像素游戏时代“老四强”重聚《魂斗罗：归来》，新版本、新英雄燃爆两周年庆", "6月11日全服不停机更新公告", "【已修复】王者大陆的端午宝藏活动页面异常问题说明", "6月7日体验服停机更新公告", "6月4日全服不停机更新公告", "关于2019年KPL春季赛总决赛 RNG.M vs eStarPro 补赛、赛果及世界冠军杯安排公告", "活力夏日活动周 王者峡谷好礼多", "王者大陆的端午宝藏活动公告", "峡谷庆端午 惊喜礼不断", "【场里场外，一起开黑】感恩礼包放送", "KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！", "【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】", "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？", "【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】", "KRKPL：还在用庄周打辅助？JY边路庄周带你越塔莽！", "世冠KPL赛区战队出征名单公布 王者，无惧挑战！"];
    //     const newsList = newsTitles.map(title => {
    //         const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5); //复制一份 打乱排序
    //         return {
    //             categories: randomCats.slice(0, 2),
    //             title: title
    //         }
    //     })
    //     await Article.deleteMany({});
    //     await Article.insertMany(newsList);
    //     res.send(newsList);
    // });


        //导入人物数据
    // router.get('/persons/init', async (req, res) => {
    //     await Person.deleteMany({});
    //     const rawData = [
    //         {
    //             "name": "热门",
    //             "persons": [
    //                 { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" },
    //                 { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" },
    //                 { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" },
    //                 { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" },
    //                 { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" },
    //                 { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" },
    //                 { "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" },
    //                 { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" },
    //                 { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" },
    //                 { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }]
    //         },
    //         {
    //             "name": "战士",
    //             "persons": [
    //                 { "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" },
    //                 { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" },
    //                 { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" },
    //                 { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" },
    //                 { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" },
    //                 { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" },
    //                 { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" },
    //                 { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" },
    //                 { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" },
    //                 { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" },
    //                 { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" },
    //                 { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" },
    //                 { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" },
    //                 { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" },
    //                 { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" },
    //                 { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" },
    //                 { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" },
    //                 { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" },
    //                 { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" },
    //                 { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" },
    //                 { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }]
    //         },
    //         {
    //             "name": "法师", "persons": [{ "name": "小乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "扁鹊", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "沈梦溪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }]
    //         }, { "name": "坦克", "persons": [{ "name": "廉颇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "白起", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "项羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "猪八戒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }] }, { "name": "刺客", "persons": [{ "name": "阿轲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" }, { "name": "李白", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "娜可露露", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "百里玄策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }] }, { "name": "射手", "persons": [{ "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }] }, { "name": "辅助", "persons": [{ "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "蔡文姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "鬼谷子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }] }];
    //     for (let cat of rawData) { //in-k索引值
    //         if (cat.name === '热门') {
    //             continue;
    //         }
    //         //找到当前分类在数据库中对应的数据
    //         const category = await Category.findOne({
    //             name: cat.name
    //         });
    //         cat.persons = cat.persons.map(person => {
    //             person.categories = [category];//mongo足够智能提取对象并将id放入
    //             return person;
    //         })
    //         //录入人物
    //         await Person.insertMany(cat.persons);
    //     }
    //     res.send(await Person.find());
    // });