enchant();

class Vector {
    constructor(posY) {
        this.position = posY;
    }
    distance(posY) {
        return this.position - posY;
    }
}
class Timer {
    constructor() {
        this.start = new Date();
    }
    getTime() {
        return new Date() - this.start;
    }
}

var pLabel = enchant.Class.create(Label, {
    initialize: function(stage, text, x, y) {
        Label.call(this,text);
        this.width = stage.width;
        stage.addChild(this);
        this.font = '32px cursive';
        this.color = 'white';
        this.x = x;
        this.y = y;
        this.text = 'result:';
    }
});


var pStage = enchant.Class.create(Scene, {
    initialize: function(game) {
        Scene.call(this);
        this.backgroundColor = 'green';
        this.label1 = new pLabel(this, 'Distance: ', 0, 0);
        this.label2 = new pLabel(this, 'TIme: ', 0, 32);
        game.pushScene(this);
    }
});


window.onload = function() {
    var game = new Core(1020, 1920);
    game.fps = 120;

    game.onload = function() {
        var stage = new pStage(game);
        stage.addEventListener('touchstart', function(e) {
            console.time('timer');
            this.time = new Timer();
            this.vec = new Vector(e.y);
        });
        stage.addEventListener('touchend', function(e) {
            console.timeEnd('timer');
            this.label1.text += this.time.getTime();
            this.label2.text += this.vec.distance(e.y);
        });
    };

    game.start();
};
