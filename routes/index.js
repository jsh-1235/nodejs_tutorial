var express = require('express');
var router = express.Router();

images = [
  {
    'id': 1,
    'title': '첫 번째 포스트',
    'content': '첫 번째 포스트 내용입니다.',
    'source': "https://placeimg.com/640/320/any/1",
    'date': "2020-09-01"
  },
  {
    'id': 2,
    'title': '두 번째 포스트',
    'content': '두 번째 포스트 내용입니다.',
    'source': "https://placeimg.com/640/320/any/2",
    'date': "2020-09-02"
  },
  {
    'id': 3,
    'title': '세 번째 포스트',
    'content': '세 번째 포스트 내용입니다.',
    'source': "https://placeimg.com/640/320/any/3",
    'date': "2020-09-03"
  },
  {
    'id': 4,
    'title': '네 번째 포스트',
    'content': '네 번째 포스트 내용입니다.',
    'source': "https://placeimg.com/640/320/any/4",
    'date': "2020-09-04"
  },
  {
    'id': 5,
    'title': '다섯 번째 포스트',
    'content': '다섯 번째 포스트 내용입니다.',
    'source': "https://placeimg.com/640/320/any/5",
    'date': "2020-09-05"
  }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(images.length);
  // console.log(images[0].title);  

  res.render('index', { title: 'Express', images: images, list: list });
});

module.exports = router;

//==================================================================
// pug alignment : Alt + Shift + F
//==================================================================