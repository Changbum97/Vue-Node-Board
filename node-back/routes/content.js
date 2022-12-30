var router = require('express').Router();
var mysql = require('mysql2');
var db = require('.././models');
var Op = require('sequelize').Op;   // 검색 기능을 위해 사용
db.sequelize.sync();

router.post('/write', function(req, res){		// 글 작성
    db.content.create({				// 게시판번호와 게시글정보를 req.body로 받아와 db에 삽입
        boardnum: req.body.boardnum,
        writer: req.body.writer,
        title: req.body.title,
        text: req.body.text,
    }).then(function(){
        return res.status(200).json({
            message: '글 작성 완료!',
        })
    }).catch(function(err){
        console.log(err);
        return res.status(404).json({message: '에러뜸'});
    })
});
router.post('/boardlist', function(req, res){		// 게시글 불러오기
    db.content.findAll({
        where: {
            boardnum: req.body.boardnum	// 게시판별로 DB가 따로있는게 아니여서 게시판 번호 필요
        },
        offset: 0 + (req.body.page - 1) * 10,	// offset 설정을 통해 페이지에 맞는 글 찾을 수 있음
        // 1page이면 offset 0을 통해 처음 10개 가져옴
        limit: 10,				// 글 10개만 가져오기
        order: [['id', 'ASC']],			// id기준으로 오름차순 정렬
        raw: true,				// raw: true 설정을 해줘야 DB에서 field 정보만 가져옴
    }).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return res.status(404).json({message: '에러뜸'});
    })
});
router.post('/boardlistcnt', function(req, res){	// 해당 게시판의 게시글 개수 가져오기
    db.content.findAndCountAll({		// findAndCoutAll을 통해 조건에 맞는 내용들과 개수를 가져옴
        // 이 때 결과는 result.rows, 갯수는 result.count로 받아옴
        where: {
            boardnum: req.body.boardnum
        },
        raw: true,
    }).then(result => {
        return res.status(200).json(result.count);
    }).catch(err => {
        console.log(err);
        return res.status(404).json({message: '에러뜸'});
    })
});
router.post('/content', function(req, res){		// 게시글 보기
    db.content.findOne({			// id에 맞는 게시글 정보 하나만 불러오면 됨
        where: {
            id: req.body.id
        }, raw:true,
    }).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return res.status(404).json({message: '에러뜸'});
    })
});
router.post('/delete', function(req, res){		// 게시글 삭제
    db.content.destroy({			// destroy를 통해 DB에서 조건에 맞는 정보 삭제
        where: {
            id: req.body.id
        },
    }).then(function(){
        return res.status(200).json({
            message: '글 삭제 완료!'
        });
    }).catch(err =>{
        console.log(err);
        return res.status(404).json({message: '에러뜸'});
    })
});
router.post('/edit', function(req, res){		// 게시글 수정
    db.content.update({text: req.body.text}, {	// update를 통해 조건에 맞는 게시글의 text filed를 수정
        where: {
            id: req.body.id
        },
    }).then(function(){
        return res.status(200).json({
            message: '글 수정 완료!'
        });
    }).catch(err =>{
        console.log(err);
        return res.status(404).json({message: '에러뜸'});
    })
});

// 검색 기능
router.post('/search', function(req, res){
    if(req.body.searchoption == '제목'){	// searchoption이 '제목'일 때
        db.content.findAndCountAll({
            where: {
                title: {
                    [Op.like]: "%"+req.body.searchkeyword+"%"
                    // "%" + [단어] + "%"를 통해 [단어]가 포함된 모든것 검색 가능
                },
            },
            order: [['id', 'ASC']],
            raw: true,
        }).then(result => {
            var cnt = new Object();
            cnt.cnt = result.count;
            result.rows.push(cnt);
            console.log(result.rows);
            return res.status(200).json(result.rows);
        }).catch(err => {
            console.log(err);
            return res.status(404).json({message: '에러뜸'});
        })
    } else {	// searchoption이 '작성자'일 때
        db.content.findAndCountAll({
            where: {
                writer: {
                    [Op.like]: "%"+req.body.searchkeyword+"%"
                },
            },
            order: [['id', 'ASC']],
            raw: true,
        }).then(result => {
            var cnt = new Object();
            cnt.cnt = result.count;
            result.rows.push(cnt);
            console.log(result.rows);
            return res.status(200).json(result.rows);
        }).catch(err => {
            console.log(err);
            return res.status(404).json({message: '에러뜸'});
        })
    }
});

module.exports = router;