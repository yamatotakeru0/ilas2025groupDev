const boxCols = document.getElementById("boxCols");
var colClass = document.getElementsByClassName("col");
var colClassArray =Array.prototype.slice.call(colClass);
const addBox = document.getElementById("addBox");
const selectUnits = document.getElementById("addUnitSelect");
const selectRequests = document.getElementById("reqestSelect");
let selectUnit = "個";
let selectRequest = "簡単な料理";
selectUnits.addEventListener("change",(event) =>{
    selectUnit = selectUnits.options[selectUnits.selectedIndex].label;
});
selectRequests.addEventListener("change",(event) =>{
    selectRequest = selectRequests.options[selectRequests.selectedIndex].label;
    ryourijouken(selectRequest);
    if (selectRequest == "その他：「～な料理」で以下に入力してください") {
        document.getElementById("requestOther").readOnly = false;
    } else {
        document.getElementById("requestOther").readOnly = true;
    };
});

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
    child1113.insertAdjacentHTML("beforeend",'<li class="list-group-item">0'+ selectUnit +'</li>');
    child1114.insertAdjacentHTML("beforeend",'<a class="btn btn-success" href="#" role="button">＋</a>');
    child1115.insertAdjacentHTML("beforeend",'<a href="#" class="btn btn-danger">－</a>');
    child11111.insertAdjacentHTML("beforeend",'<button class="btn btn-outline-danger" type="button">×</button>');
    boxCols.insertBefore(child1,addBox);
    colClass = document.getElementsByClassName("col");
    colClassArray =Array.prototype.slice.call(colClass);
    foodArrayAdd(foodTitle);
    foodUnits.push(selectUnit);
    unregister();
    register();
};

// Boxを削除する関数.
function erase() {
    var thisIndex =colClassArray.indexOf(this.closest(".col"));
    this.closest(".col").remove();
    colClass = document.getElementsByClassName("col");
    colClassArray =Array.prototype.slice.call(colClass);
    foodTitles.splice(thisIndex ,1);
    foodNumbers.splice(thisIndex ,1);
    foodUnits.splice(thisIndex ,1);
};

//食材の個数を+1する関数.
function addFoodNumber() {
    var thisIndex =colClassArray.indexOf(this.closest(".col"));
    foodNumbers[thisIndex] = foodNumbers[thisIndex] +1;
    colClass[thisIndex].querySelectorAll(".list-group-item")[0].innerHTML = foodNumbers[thisIndex] +foodUnits[thisIndex];
};

//食材の個数を-1する関数.
function reduceFoodNumber() {
    var thisIndex =colClassArray.indexOf(this.closest(".col"));
    if (foodNumbers[thisIndex] >= 1) {
        foodNumbers[thisIndex] = foodNumbers[thisIndex] -1;
    };
    colClass[thisIndex].querySelectorAll(".list-group-item")[0].innerHTML = foodNumbers[thisIndex] +foodUnits[thisIndex];
};

// erase(),addFoodNumber(),reduceFoodNumber()を各Boxのボタンに付与する関数.
function register() {
    for (var i=0; i < colClass.length -1; i++) {
        // 各Boxの削除ボタンにerase()を付与.
        colClass[i].querySelectorAll(".btn-outline-danger")[0].addEventListener('click', erase, false);

        // 各ボックスの＋ボタンにaddFoodNumber()を付与.
        colClass[i].querySelectorAll(".btn-success")[0].addEventListener('click', addFoodNumber, false);

        // 各ボックスの－ボタンにreduceFoodNumber()を付与.
        colClass[i].querySelectorAll(".btn-danger")[0].addEventListener('click', reduceFoodNumber, false);
    };
};
register();

// erase(),addFoodNumber(),reduceFoodNumber()を各Boxのボタンから解除する関数.
function unregister() {
    for (var i=0; i < colClass.length -1; i++) {
        // 各Boxの削除ボタンからerase()を解除.
        colClass[i].querySelectorAll(".btn-outline-danger")[0].removeEventListener('click', erase, false);

        // 各ボックスの＋ボタンからaddFoodNumber()を解除.
        colClass[i].querySelectorAll(".btn-success")[0].removeEventListener('click', addFoodNumber, false);

        // 各ボックスの－ボタンからreduceFoodNumber()を解除.
        colClass[i].querySelectorAll(".btn-danger")[0].removeEventListener('click', reduceFoodNumber, false);
    };
};

// 各Boxの食材の個数と単位のところを配列foodNumbers,foodUnitsの要素と対応させる関数.
function loadFoodData() {
    for (var i=0; i < foodTitles.length ; i++) {
        colClass[i].querySelectorAll(".card-title")[0].innerHTML = foodTitles[i];
        colClass[i].querySelectorAll(".list-group-item")[0].innerHTML = foodNumbers[i] +foodUnits[i];
    };
};

// 初期データ.
let foodNumbers = []; // 食品の個数.
let foodTitles = []; // 食品の名前.
let foodUnits =[];
let foodNumbersJson;
let foodTitlesJson;
let foodUnitsJson;
let mokuteki = "料理";

//　データの保存.
function dataSave(){
    foodNumbersJson = JSON.stringify(foodNumbers);
    foodTitlesJson = JSON.stringify(foodTitles);
    foodUnitsJson = JSON.stringify(foodUnits);
    localStorage.setItem('number',foodNumbersJson);
    localStorage.setItem('name',foodTitlesJson);
    localStorage.setItem('unit',foodUnitsJson);
};

// データの取得と反映.
function dataLoad(){
    let currentFoodColsNumbers = colClass.length - 1;
    foodNumbersJson=localStorage.getItem('number');
    foodTitlesJson=localStorage.getItem('name');
    foodUnitsJson=localStorage.getItem('unit');
    const dataNumbers = JSON.parse(foodTitlesJson).length;
    while (currentFoodColsNumbers < dataNumbers) {
        boxCreate();
        currentFoodColsNumbers++;
    };
    while (currentFoodColsNumbers > dataNumbers) {
        colClass[0].remove();
        currentFoodColsNumbers--;
    };
    foodNumbers = JSON.parse(foodNumbersJson);
    foodTitles = JSON.parse(foodTitlesJson);
    foodUnits = JSON.parse(foodUnitsJson);
    loadFoodData();
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
    if (selectRequest == "その他：「～な料理」で以下に入力してください") {
        selectRequest = document.getElementById("requestOther").value;
        ryourijouken(selectRequest)
    };
    const openAiApiKey = document.getElementById("openAiApiKey").value;
    let syokuzai = "";
    for (let i = 0; i < foodNumbers.length; i++) {
        syokuzai += `${foodTitles[i]}が${foodNumbers[i]}${foodUnits[i]}、`;
    }

    // 送信メッセージ.
    const yosei = `今、冷蔵庫に${syokuzai}あります。この食材を使って作ることのできる${mokuteki}を教えてください`;

    // fetch で OpenAI API にリクエスト
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + openAiApiKey 
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: yosei }]
        })
    });

    // レスポンスボディを JSON として取り出す
    const rdata = await response.json();

    // 応答メッセージを抜き出して出力
    document.getElementById("response").value = rdata.choices[0].message.content;
};


// 以下、テスト実行用.
foodArrayAdd("牛肉");
foodNumbers[0] = 1;
foodUnits.push("個");

foodArrayAdd("トマト");
foodNumbers[1] = 2;
foodUnits.push("個");

foodArrayAdd("卵");
foodNumbers[2] = 3;
foodUnits.push("個");

foodArrayAdd("白菜");
foodNumbers[3] = 4;
foodUnits.push("個");

foodArrayAdd("キャベツ");
foodNumbers[4] = 5;
foodUnits.push("個");

loadFoodData();