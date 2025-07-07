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

//データの削除
function deleteButton(i, x, y) {
    if (i > x.length || i <= 0) {
        return [x, y];
    } else {
        x.splice(i - 1, 1);
        y.splice(i - 1, 1);
        return [x, y];
    }
}


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

