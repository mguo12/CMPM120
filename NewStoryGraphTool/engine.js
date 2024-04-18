class Engine {
    key = "";

    itemCollection = [];

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));
        this.goodsContainer = document.body.appendChild(document.createElement("div"));

        fetch(storyDataUrl).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass)
            }
        );
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        this.scene.create(data);
    }

    addChoice(action, data) {
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        button.setAttribute("style", "margin-right: 10px;")
        button.onclick = () => {
            while(this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild)
            }
            while(this.goodsContainer.firstChild) {
                this.goodsContainer.removeChild(this.goodsContainer.firstChild)
            }
            this.scene.handleChoice(data);
        }
    }

    addGoods(key, data) {
        if (this.key && this.key !== key) {
            while(this.goodsContainer.firstChild) {
                this.goodsContainer.removeChild(this.goodsContainer.firstChild)
            }
        }

        this.key = key;

        let form = this.goodsContainer.appendChild(document.createElement("form"));
        form.name = data.name;
        form.innerText = data.name + ":";
        for(let item of data.options) {
           let input = document.createElement("input");
           input.type = "radio";
           input.name = item.label;
           input.value = item.value;
           input.addEventListener("change",() => {
               // Cancel other selections
               let radios = form.querySelectorAll(`input[name='${item.label}']`);
               for (let radio of radios) {
                   if (radio.value !== item.value) {
                       radio.checked = false;
                   }
               }
               this.handleGoodsChange(item.label, item.value, item);
           })
           form.appendChild(input)
            let label = document.createElement("label");
           label.innerText = item.value;
            form.appendChild(label)
        }
    }

    handleGoodsChange(key, option, data) {
        if (key === "key" && option === 'Obtain') {
            this.itemCollection.push(key);
           this.storyData.
               Locations["Lost And Found Office"].goods = [];
        }

        this.show(data.message)
    }

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    show(msg) {
        let div = document.createElement("div");
        div.innerHTML = msg;
        this.output.appendChild(div);
    }

    evalCondition(condition) {
        return this.itemCollection.filter(item => item === condition).length || false;
    }


}

class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() { }

    update() { }

    handleChoice(action) {
        console.warn('no choice handler on scene ', this);
    }
}