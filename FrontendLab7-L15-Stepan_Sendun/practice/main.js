function inheritance(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Pokemon(obj) {
    this.height = obj.height;
    this.weight = obj.weight;
} //Pokemon

Pokemon.prototype.getType = function () {
    console.log(`Hi, my type is ${this.type}`);

    return this.type;
}

Pokemon.prototype.getSpecie = function () {
    console.log(`My type is ${this.specie}`);

    return this.species;
}

Pokemon.prototype.getHeight = function () {
    console.log(this.height);

    return this.height;
}

Pokemon.prototype.canWalk1 = function () {
    console.log(this.canWalk);
}

Pokemon.prototype.canFly1 = function () {
    console.log(this.canFly);
}





inheritance(Charmander, Pokemon);

function Charmander(obj) {
    Pokemon.call(this, obj);
    this.type = 'Fire';
    this.specie = 'Lizard Pokemon';
    this.canWalk = true;
    this.canFly = false;

} //Charmander


inheritance(Charmeleon, Charmander);

function Charmeleon(obj) {
    Charmander.call(this, obj)
    this.specie = 'Flame Pokemon';

} //Charmeleon


inheritance(Charizard, Charmeleon);


function Charizard(obj) {
    Charmeleon.call(this, obj);
    this.canFly = true;

} //Charizard







var embury = new Charmander({
    height: 1,
    weight: 15

});
var mercury = new Charmeleon({
    height: 2,
    weight: 45

});
var morderbrand = new Charizard({
    height: 10,
    weight: 200

});


//embury.getType(); // -> “Fire”
//embury.getType() === mercury.getType();
//console.log(mercury.getType() === morderbrand.getType()); // -> true
//
//morderbrand.getType();
//embury.getType();
//mercury.getType();

//console.log(mercury);
//embury.getSpecie(); // -> “Lizard Pokémon”
//mercury.getSpecie(); // -> “Flame Pokémon”
//console.log(morderbrand.getSpecie() === mercury.getSpecie()); // -> true

//embury.getHeight(); // -> 1
//morderbrand.canWalk1(); // -> true
//
//embury.canFly1(); // -> false
//morderbrand.canFly1(); // -> true


Pichu.prototype.getPokemonType = function () {
    console.log(this.PokemonType);
}

Pichu.prototype.getType = function () {
    console.log(this.type);
}

function Pichu() {
    this.PokemonType = 'Pichu';
    this.type = 'Electric';
    this.lvl = 1;

}
inheritance(Pikachu, Pichu);

Pichu.prototype.evolve = function () {
    return new Pikachu;
}



function Pikachu() {
    Pichu.call(this);
    this.type = 'Electric';
    this.PokemonType = 'Pikachu';
    this.lvl = 2;

}

inheritance(Raichu, Pikachu);


Pikachu.prototype.evolve = function () {
    return new Pikachu;
}



function Raichu() {
    Pikachu.call(this);
    this.PokemonType = 'Raichu';
    this.lvl = 'max';
}


Raichu.prototype.evolve = function () {
    return `It's the maximum lvl`;
}

var my_pokemon = new Pichu();

my_pokemon.getPokemonType();
my_pokemon = my_pokemon.evolve();
my_pokemon.getType();
my_pokemon.getPokemonType();
my_pokemon = my_pokemon.evolve();
my_pokemon.getPokemonType()
my_pokemon.getType();