"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(type, parentElement) {
        if (parentElement === void 0) { parentElement = document.body; }
        this.div = document.createElement(type);
        parentElement.appendChild(this.div);
    }
    GameObject.prototype.move = function () {
        this.draw();
    };
    GameObject.prototype.remove = function () {
        this.div.remove();
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(type) {
        var _this = _super.call(this, "asteroid") || this;
        _this.speedY = Math.random() * 10 + 2;
        _this.x = Math.random() * window.innerWidth;
        _this.y = Math.random() * window.innerHeight;
        return _this;
    }
    Asteroid.prototype.move = function () {
        this.y += this.speedY;
        this.repeatAsteroids();
        _super.prototype.move.call(this);
    };
    Asteroid.prototype.repeatAsteroids = function () {
        if (this.y > window.innerHeight) {
            this.x = Math.random() * (window.innerWidth - 100);
            this.y = -400 - (Math.random() * 450);
        }
    };
    Asteroid.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Asteroid;
}(GameObject));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y) {
        var _this = _super.call(this, "bullet") || this;
        _this.speedY = 10;
        _this.x = x;
        _this.y = y;
        _this.draw();
        return _this;
    }
    Bullet.prototype.move = function () {
        this.y -= this.speedY;
        _super.prototype.move.call(this);
    };
    Bullet.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Bullet;
}(GameObject));
var Game = (function () {
    function Game() {
        this._numberOfAsteroids = 10;
        this.screens = {
            gameover: GameOver,
            start: startScreen,
            game: gameScreen
        };
        this.activeScreen = new this.screens.start(this);
        this.gameloop();
    }
    Game.prototype.changeScreens = function (name) {
        this.activeScreen.cleanScreen();
        this.activeScreen = new this.screens[name](this);
    };
    Object.defineProperty(Game.prototype, "numberOfAsteroids", {
        get: function () {
            return this._numberOfAsteroids;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gameloop = function () {
        var _this = this;
        this.activeScreen.update();
        requestAnimationFrame(function () { return _this.gameloop(); });
    };
    Game.addGameObject = function (gameObject) {
        Game.gameObjects.push(gameObject);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Screens = (function () {
    function Screens(g, textfield) {
        this.game = g;
        this.textfield = document.createElement("textfield");
        this.textfield.innerHTML = textfield;
        document.body.appendChild(this.textfield);
    }
    Screens.prototype.update = function () {
    };
    Screens.prototype.cleanScreen = function () {
        document.body.innerHTML = "";
    };
    Screens.prototype.switchScreens = function (name) {
        this.game.changeScreens(name);
    };
    Screens.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Screens;
}());
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(g, type) {
        return _super.call(this, g, 'Game over boy!') || this;
    }
    return GameOver;
}(Screens));
var gameScreen = (function (_super) {
    __extends(gameScreen, _super);
    function gameScreen(g) {
        var _this = _super.call(this, g, "") || this;
        _this.numberOfAsteroids = 0;
        Game.gameObjects = new Array();
        Game.gameObjects.push(new SpaceShip("spaceship"));
        var sound = new Howl({
            src: ['./librarie/sound.mp3']
        });
        sound.play();
        for (var i = 0; i < _this.game.numberOfAsteroids; i++) {
            var test = new Asteroid("asteroid");
            Game.gameObjects.push(test);
            _this.numberOfAsteroids++;
        }
        return _this;
    }
    gameScreen.prototype.update = function () {
        for (var _i = 0, _a = Game.gameObjects; _i < _a.length; _i++) {
            var gameObject = _a[_i];
            gameObject.move();
            if (gameObject instanceof Bullet) {
                for (var _b = 0, _c = Game.gameObjects; _b < _c.length; _b++) {
                    var asteroid = _c[_b];
                    if (asteroid instanceof Asteroid) {
                        if (this.checkCollision(gameObject.getRectangle(), asteroid.getRectangle())) {
                            console.log("BOTSING");
                            asteroid.remove();
                            var index = Game.gameObjects.indexOf(asteroid);
                            Game.gameObjects.splice(index, 1);
                            gameObject.remove();
                            index = Game.gameObjects.indexOf(gameObject);
                            Game.gameObjects.splice(index, 1);
                            this.numberOfAsteroids--;
                            if (this.numberOfAsteroids == 0) {
                                this.switchScreens('gameover');
                            }
                            break;
                        }
                    }
                }
            }
        }
    };
    return gameScreen;
}(Screens));
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun(parentElement) {
        var _this = _super.call(this, "gun", parentElement) || this;
        _this.x = 10;
        _this.y = -30;
        _this.draw();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Gun.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "Backspace":
                console.log("pew pew");
                this.shoot();
                break;
        }
    };
    Gun.prototype.shoot = function () {
        var y = this.div.getBoundingClientRect().top;
        var x = this.div.getBoundingClientRect().left + 10;
        Game.addGameObject(new Bullet(x, y));
    };
    Gun.prototype.move = function () {
    };
    return Gun;
}(GameObject));
var SpaceShip = (function (_super) {
    __extends(SpaceShip, _super);
    function SpaceShip(type) {
        var _this = _super.call(this, "spaceship") || this;
        _this.speedX = 8;
        _this.y = window.innerHeight - 50;
        _this.x = window.innerWidth / 2;
        _this.gun = new Gun(_this.div);
        return _this;
    }
    SpaceShip.prototype.move = function () {
        this.x += this.speedX;
        this.gun.move();
        _super.prototype.move.call(this);
        this.checkBorders();
    };
    SpaceShip.prototype.checkBorders = function () {
        if (this.x + this.div.clientWidth > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
    };
    SpaceShip.prototype.shoot = function () {
        this.gun.shoot();
    };
    return SpaceShip;
}(GameObject));
var startScreen = (function (_super) {
    __extends(startScreen, _super);
    function startScreen(g) {
        var _this = _super.call(this, g, "Start het spel") || this;
        _this.textfield.addEventListener("click", function () { return _this.switchScreens('game'); });
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    startScreen.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "Space":
                console.log("pew pew");
                this.switchScreens('game');
                break;
        }
    };
    return startScreen;
}(Screens));
//# sourceMappingURL=main.js.map