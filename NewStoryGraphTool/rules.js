class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {

    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        if (this.key !== key) {
            this.key = key;
            this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        }

        if (locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for (let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text + `(${choice.Target})`, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }

        if (locationData.goods && locationData.goods.length > 0) {
            for (let item of locationData.goods) {
                this.engine.addGoods(key, item);
            }
        }

    }

    handleChoice(choice) {
        if (choice) {
            // Determine if there are entry conditions
            if (choice.condition) {
                let conditionResult = this.engine.evalCondition(choice.condition);
                if (!conditionResult) {
                    this.engine.show("&gt; " + choice.Text);
                    this.engine.show(`You cannot go there yet. Because you are missing the ${choice.condition}.Go and get it now！`);
                    this.create(this.key)
                    return;
                }
            }
            this.engine.show("&gt; " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');