var boxCols = document.getElementById("boxCols");
var addBox = document.getElementById("addBox");


function boxCreate() {
    let child1 = document.createElement("div");
    let child11 = document.createElement("div");
    let child111 = document.createElement("div");
    let child1111 = document.createElement("div");
    let child1112 = document.createElement("h5");
    let child1113 = document.createElement("ul");
    let child1114 = document.createElement("form");
    let child1115 = document.createElement("form");
    let child11111 = document.createElement("form");
    child1.classList.add("col");
    child11.classList.add("card","text-dark","border-dark","bg-light","mb-3");
    child111.classList.add("card-body");
    child1111.classList.add("d-grid","gap-2","d-md-flex","justify-content-md-end");
    child1112.classList.add("card-title");
    child1113.classList.add("list-group","list-group-flush");
    child11.style.maxWidth = "18rem";
    child1.append(child11);
    child11.append(child111);
    child111.append(child1111);
    child111.append(child1112);
    child111.append(child1113);
    child111.append(child1114);
    child111.append(child1115);
    child1111.append(child11111);
    child1112.insertAdjacentHTML("beforeend","Food title")
    child1113.insertAdjacentHTML("beforeend",'<li class="list-group-item">x個</li>');
    child1114.insertAdjacentHTML("beforeend",'<a class="btn btn-success" href="#" role="button">＋</a>');
    child1115.insertAdjacentHTML("beforeend",'<a href="#" class="btn btn-danger">－</a>');
    child11111.insertAdjacentHTML("beforeend",'<button class="btn btn-outline-danger" type="button">×</button>');
    console.log(child1);

    boxCols.insertBefore(child1,addBox);

};

require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

// 初期データ
let x = []; // 食品の個数
let y = []; // 食品の名前
let mokuteki = "料理";

// データの取得
x=localStorage.getItem('number');
y=localStorage.getItem('name');
//　データの保存


localstorage.setItem('number',x);
localstorage.setItem('name',y);



// ボタンで食品を追加
function bottun_add() {
    x.push(0);
    y.push("");
}

// 食品の個数をインクリメント
function run_python_code() {
    if (x.length > 0) {
        x[0] += 1;
        console.log("～を追加しました");
    }
}

// 目的に条件を加える（例：簡単な料理）
function ryourijouken(condition) {
    mokuteki += "、" + condition;
    return mokuteki;
}

// ChatGPT APIで料理を提案
async function ryourigpt() {
    let syokuzai = "";
    for (let i = 0; i < x.length; i++) {
        syokuzai += `${y[i]}が${x[i]}個、`;
    }

    const yosei = `今、冷蔵庫に${syokuzai}あります。この食材を使って作ることのできる${mokuteki}を教えてください`;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: yosei }],
    });

    const reply = completion.data.choices[0].message.content;
    return reply;
}

// 以下、テスト実行用
bottun_add();
x[0] = 2;
y[0] = "たまご";

bottun_add();
x[1] = 1;
y[1] = "トマト";

ryourijouken("簡単な料理");

// 実行
ryourigpt().then(reply => {
    console.log("ChatGPTの提案:", reply);
});

