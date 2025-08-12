const http = require('http');
const express = require('express');
const app = express();
const port = '3000';


//인터프리트 방식이라 순서 중요하다..
//------------------------------------------------------------------------------------
// todolist 목록에 사용할 임시 데이터 배열 (나중에 DB의 내용으로 바뀜) - 임시데이터 설정
let todoList = [
    {no:1, title:'출근하기', done:false},
    {no:2, title:'업무보기', done:true},
    {no:3, title:'점심시간', done:false}
];

let cnt = 4;


//-------------------------------------------------------------------------------------

// 뷰 템플릿 디렉토리 설정
app.set('view engine', 'ejs'); // 확장자(suffix)
app.set('views', 'views'); // 경로(prefiX)

//GET방식
app.get('/todos', (req,res) => {
    req.app.render('todos', {todoList: todoList}, (err, html) => { //데이터의 key:value가 동일하면 1개만 써줘도 된다.
        res.end(html);
    });
});
//-------------------------------------------------------------------------------------
// body-parser 미들웨어
app.use(express.json()); // JSON 형식의 요청 본문(body)를 파싱 (Ajax 요청 일때)

// HTML form 데이터 전송 처리 (application/x-www-form-urlencoded)
app.use(express.urlencoded({'extended':false})); 

// POST방식
//post 방식의 요청 파라미터 데이터 전달을 위한 설정
app.post('/todos', (req,res) => {
    // 새 할일 입력 폼에서 전달
    console.log('POST - /todos');
    console.dir(req.body);

    let newTodo = {
        no: cnt++,
        title: req.body.title,
        done: (req.body.done == 'true') ? true : false
    }

    // push(), splice(), findIndex()
    todoList.push(newTodo);

    res.redirect('/todos');
});







//----------------------------------------------------------------

// app.get('/', (req,res) => {
//     res.end('<h1>Hello linux nodejs world</h1>')
// });

// static 디렉토리 설정 (server0static 미들웨어)
app.use(express.static('public'));



// node.js
app.get('/hello', (req,res) => {
    res.end('<h1>Hello</h1>')
});





const server = http.createServer(app);
server.listen(port, () => {
    console.log(`run on server, http://localhost:${port}`);
});