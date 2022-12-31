module.exports = (sequelize, DataTypes) => {
    return sequelize.define('content', {
        writer: {	// 작성자
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        title: {		// 제목
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        text: {		// 글 내용
            type: DataTypes.STRING(3000),
        },
        boardnum: {	// 게시판 번호
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imagecnt: { // 이미지 개수
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci',	// 이걸 해줌으로써 DB에 한글사용 가능
    });
}