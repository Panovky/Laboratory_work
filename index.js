const http = require("http"),
    crud = require("./crud");
    static = require("node-static");

const echo = (res, content) => {
    res.end(JSON.stringify(content));
};


const student = (req, res) => {
    res.writeHead(200, {"Content-type": "application/json"});
    const url = req.url.substring(1).split("/");
    switch(req.method) {

        case "GET":
            if(url.length > 1)
                echo(res, crud.get(url[1]));
            else
                echo(res, crud.getAll());
            break;

        case "POST":
            getAsyncData(req, data => {
                echo(res, crud.create(JSON.parse(data)));
            });
            break;

        case "PUT":
            getAsyncData(req, data => {
                echo(res, crud.update(JSON.parse(data)));
            });
            break;

        case "DELETE":
            if(url.length > 1)
                echo(res, crud.delete(url[1]));
            else
                echo(res, {error: "не передан id"});
            break;
    }
};

const getAsyncData = (req, callback)=>{

    let data = "";
    //связывание функции chunk c датой, т.е. пока данные поступают на сервер
    req.on("data", chunk => {data += chunk;}); // в дату добавляются введенные строчки из json
    //событие data генерируется, когда на сервер поступает данные
    req.on("end", () => callback(data)); //когда все данные прибыли, мы вызываем дату
    //end генерируется, когда все данные прибыли
};

const handler = function (req, res) {
    const url = req.url.substring(1).split("/");
    switch(url[0]) {
        case "student":
            student(req,res);
            return;
        case "":
            res.end("index");
            return;
    }
    console.log("AFTER SWITCH");
    console.log(req.url);
    console.log(req.method);
    res.end("echo");
}

http.createServer(handler).listen(8090, () => {
    console.log("run");
})