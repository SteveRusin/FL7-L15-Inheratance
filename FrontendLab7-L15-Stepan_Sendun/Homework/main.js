function assign() {
    var ObjforMerging = Object(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
        var nextObj = arguments[i];
        for (var key in nextObj) {
            if (Object.prototype.hasOwnProperty.call(nextObj, key)) {
                ObjforMerging[key] = nextObj[key];
            }
        }
    }

    return ObjforMerging;
}
//Invocation example for assign ================================================//||
//||
//var defaults = {                                                              //||
//    width: 100,                                                               //||
//    height: 100                                                               //||
//};                                                                            //||
//var options = {                                                               //||
//    width: 150                                                                //||
//};                                                                            //|| 
//var configs = assign({}, defaults, options); // -> {width: 150, height: 100}  //||
//console.log(configs);                                                         //||
//==============================================================================//||

function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}



function Creature(obj) {
    this.name = obj.name;
    this.attack = obj.attack;
    this.hitpoints = obj.hitpoints;
    this.totalHitpoints = obj.hitpoints;
    this.Alive = true;

} //Creature

Creature.prototype.getHitpoints = function () {
    console.log(`${this.name} has ${this.hitpoints} hitpoints!`);

    return this;
}

Creature.prototype.setHitpoints = function (value) {
    this.hitpoints = value;
    if (this.hitpoints > this.totalHitpoints) {
        this.hitpoints = this.totalHitpoints;
    }

    return this;
}

Creature.prototype.getTotalHitpoits = function () {
    console.log(`${this.name} has ${this.totalHitpoints} total hitpoints!`);

    return this;
}

Creature.prototype.setTotalHitpoints = function (value) {
    this.totalHitpoints = value;
    if (value < this.hitpoints) {
        this.hitpoints = value;
    }

    return this;
}

Creature.prototype.getAttack = function () {
    console.log(`${this.name} can make ${this.attack} possible damage! `);

    return this;
}

Creature.prototype.setAttack = function (value) {
    this.attack = value;

    return this;
}

Creature.prototype.fight = function (enemy) {
    if (this.hitpoints <= 0) {
        this.Alive = false;
        console.log(`${this.name} is dead! He cannot fight!`)
    }
    
    if (this === enemy) {
        console.log(`${this.name} cannot fight with himself!`)
    } else if (this.Alive) {
        if (!enemy.willBlock) {
            enemy.hitpoints -= this.attack;
        }
        enemy.willBlock = false;
    }









    return this;
}

Creature.prototype.isAlive = function () {
    console.log(this.Alive);

    return this;
}


//====================================================================================

function Champion(obj) {

    Creature.call(this, obj);
    this.type = 'hero';

    // ability to block the next one incoming attack
    this.willBlock = false;

} // Champion

extend(Champion, Creature);

Champion.prototype.rest = function () {
    this.hitpoints += 5;

    return this;
}

Champion.prototype.defence = function () {

    this.willBlock = true;

    return this;
}

Champion.prototype.fight = function (enemy) {

    if (enemy.hitpoints > 0) {
        Creature.prototype.fight.call(this, enemy);

        if (enemy.hitpoints <= 0) {
            this.attack += 1;
            console.log(`${enemy.name} is dead! Your attack has been increased!`)
        }
    }





    return this;
}




//===================================End of the Champion constructor==============================================



function Monster(obj) {
    Creature.call(this, obj);

    this.type = 'monster';

    // Counter for double enraged attacks
    this.enrageCounter;


    this.enrageAttack = this.attack * 2;


} // Monster

extend(Monster, Creature);

Monster.prototype.fight = function (enemy) {
    if (enemy.hitpoints > 0) {

        if (this.enrageCounter > 0) {
            this.attack *= 2;
            this.enrageCounter--;
            Creature.prototype.fight.call(this, enemy);
            this.attack /= 2;
        } else {
            Creature.prototype.fight.call(this, enemy);
            if (enemy.hitpoints <= 0) {
                this.hitpoints += Math.floor(enemy.totalHitpoints * 0.25);
                this.totalHitpoints += Math.floor(enemy.totalHitpoints * 0.1);
            }
        }



    }

    return this;
}

Monster.prototype.enrage = function () {
    this.enrageCounter = 2;

    return this;
}


//=======================================End of the Monster constructor=================================================

//var heracles = new Champion({
//    name: 'Heracles',
//    attack: 10,
//    hitpoints: 50
//});
//
//
//var boar = new Monster({
//    name: 'Erymanthian Boar',
//    attack: 5,
//    hitpoints: 100
//});



module.exports = {
    Champion: Champion,
    Monster: Monster,
    assign: assign
}