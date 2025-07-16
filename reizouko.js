var boxCols = document.getElementById("boxCols");
var colClass = document.getElementsByClassName("col");
var colClassArray =Array.prototype.slice.call(colClass);
var addBox = document.getElementById("addBox");

// ボックスを新たに生成する関数.
function boxCreate() {
    let foodTitle = document.getElementsByName("foodTitle")[0].value;
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
    child1112.insertAdjacentHTML("beforeend",foodTitle);
    child1113.insertAdjacentHTML("beforeend",'<li class="list-group-item">0個</li>');
    child1114.insertAdjacentHTML("beforeend",'<a class="btn btn-success" href="#" role="button">＋</a>');
    child1115.insertAdjacentHTML("beforeend",'<a href="#" class="btn btn-danger">－</a>');
    child11111.insertAdjacentHTML("beforeend",'<button class="btn btn-outline-danger" type="button">×</button>');

    boxCols.insertBefore(child1,addBox);
    colClass = document.getElementsByClassName("col");
    colClassArray =Array.prototype.slice.call(colClass);
    foodArrayAdd(foodTitle);
    erase();
    changeFoodNumber();
    console.log(foodTitles);
    console.log(foodNumbers);
};

// 「Boxを削除する関数」を各Boxの削除ボタンに付与する関数.
function erase() {
    for (var i=0; i < colClass.length -1; i++) {
        colClass[i].querySelectorAll(".btn-outline-danger")[0].addEventListener('click', function() {// 各Boxの削除関数.
            // thisはクリックした要素にあたる.
            var thisIndex =colClassArray.indexOf(this.closest(".col"));
            this.closest(".col").remove();
            colClass = document.getElementsByClassName("col");
            colClassArray =Array.prototype.slice.call(colClass);
            foodTitles.splice(thisIndex ,1);
            foodNumbers.splice(thisIndex ,1);
        } , false);
    };
};
erase();

// 各Boxの食材の個数のところを配列foodNumbersの要素と対応させる関数.
function loadFoodNumber() {
    for (var i=0; i < foodTitles.length ; i++) {
        colClass[i].querySelectorAll(".list-group-item")[0].innerHTML = foodNumbers[i] +"個";
    }
};

// 「食材の個数を+1(or -1)する関数」を各Boxの+-ボタンに付与する関数.
function changeFoodNumber() {
    for (var i=0; i < colClass.length -1; i++) {
        // 食材の個数を+1する関数.
        colClass[i].querySelectorAll(".btn-success")[0].addEventListener('click', function() {// 各食材の個数を増やす関数.
            // thisはクリックした要素にあたる.
            var thisIndex =colClassArray.indexOf(this.closest(".col"));
            foodNumbers[thisIndex] = foodNumbers[thisIndex] +1;
            colClass[thisIndex].querySelectorAll(".list-group-item")[0].innerHTML = foodNumbers[thisIndex] +"個";
        } , false);

        // 食材の個数を-1する関数.
        colClass[i].querySelectorAll(".btn-danger")[0].addEventListener('click', function() {// 各食材の個数を増やす関数.
            // thisはクリックした要素にあたる.
            var thisIndex =colClassArray.indexOf(this.closest(".col"));
            if (foodNumbers[thisIndex] >= 1) {
                foodNumbers[thisIndex] = foodNumbers[thisIndex] -1;
            };
            colClass[thisIndex].querySelectorAll(".list-group-item")[0].innerHTML = foodNumbers[thisIndex] +"個";
        } , false);
    };
};
changeFoodNumber();


// require('dotenv').config();
// const { Configuration, OpenAIApi } = require('openai');

// 初期データ.
let foodNumbers = []; // 食品の個数.
let foodTitles = []; // 食品の名前.
let mokuteki = "料理";

// データの取得.
function dataLoad(){
    foodNumbers=localStorage.getItem('number');
    foodTitles=localStorage.getItem('name');
};

//　データの保存.
function dataSave(){
    localStorage.setItem('number',foodNumbers);
    localStorage.setItem('name',foodTitles);
};


// 配列に新たな食品を追加.
function foodArrayAdd(i) {
    foodTitles.push(i);
    foodNumbers.push(0);
};

// 食品の個数をインクリメント.
function run_python_code() {
    if (foodNumbers.length > 0) {
        foodNumbers[0] += 1;
        console.log("～を追加しました");
    }
}

// 目的に条件を加える（例：簡単な料理）.
function ryourijouken(condition) {
    mokuteki += "、" + condition;
    return mokuteki;
}

// ChatGPT APIで料理を提案.
async function ryourigpt() {
    let syokuzai = "";
    for (let i = 0; i < foodNumbers.length; i++) {
        syokuzai += `${foodTitles[i]}が${foodNumbers[i]}個、`;
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

// 以下、テスト実行用.
foodArrayAdd("牛肉");
foodNumbers[0] = 1;

foodArrayAdd("トマト");
foodNumbers[1] = 2;

foodArrayAdd("卵");
foodNumbers[2] = 3;

foodArrayAdd("白菜");
foodNumbers[3] = 4;

foodArrayAdd("キャベツ");
foodNumbers[4] = 5;

loadFoodNumber();

ryourijouken("簡単な料理");

// 実行.
ryourigpt().then(reply => {
    console.log("ChatGPTの提案:", reply);
});

console.log(foodTitles);
console.log(foodNumbers);