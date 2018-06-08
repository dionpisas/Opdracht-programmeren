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
    function Bullet(x, y, game) {
        var _this = _super.call(this, "bullet") || this;
        _this.speedY = 10;
        _this.game = game;
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
        this.numberOfAsteroids = 10;
        this.gameObjects = new Array();
        this.gameObjects.push(new SpaceShip("spaceship", this));
        for (var i = 0; i < this.numberOfAsteroids; i++) {
            this.gameObjects.push(new Asteroid("asteroid"));
        }
        this.gameObjects.push();
        this.gameloop();
    }
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.gameloop = function () {
        var _this = this;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var gameObject = _a[_i];
            gameObject.move();
            console.log(gameObject);
        }
        requestAnimationFrame(function () { return _this.gameloop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun(parentElement, game) {
        var _this = _super.call(this, "gun", parentElement) || this;
        _this.bullets = new Array();
        _this.game = game;
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
        this.bullets.push(new Bullet(x, y, this.game));
    };
    Gun.prototype.move = function () {
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.move();
        }
    };
    Object.defineProperty(Gun.prototype, "getBullets", {
        get: function () {
            return this.bullets;
        },
        enumerable: true,
        configurable: true
    });
    return Gun;
}(GameObject));
var SpaceShip = (function (_super) {
    __extends(SpaceShip, _super);
    function SpaceShip(type, game) {
        var _this = _super.call(this, "spaceship") || this;
        _this.game = game;
        _this.speedX = 8;
        _this.y = window.innerHeight - 50;
        _this.x = window.innerWidth / 2;
        _this.gun = new Gun(_this.div, _this.game);
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
//# sourceMappingURL=main.js.map