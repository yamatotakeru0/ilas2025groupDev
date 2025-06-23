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


function boxErase() {
    console.log(event.target);
};