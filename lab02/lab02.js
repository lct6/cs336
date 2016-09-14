//Lab02
//Lisa Terwilliger

//excercise 1
function Person(name, birthdate, friends, greeting) {
	this.name = name;
	this.birthdate = new Date(birthdate);
	this.friends = friends;
	this.greeting = greeting;
}

//change name mutator
Person.prototype.changeName = function(newName){
	this.name = newName;
}

//add Friend
Person.prototype.addFriend = function(PersonFriend){
	this.friends.push(PersonFriend);
}


//age function
function getAge(Person) {
    var today = new Date();
    var birthDate = new Date(Person.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//greeting function
function greeting(Person){
	document.write(Person.name + " says: " + Person.greeting + "! " + '\n');

}


//tests
//people
var Fred = new Person("Fred", "2005/12/15", [], "Yo");
var me = new Person("Lisa", "1995/03/27", [Fred], "hello world");
var Sue = new Person("Sue", "1985/03/29", [me], "Bonjour");
var Jane = new Person("Jane", "1975/05/06", [me], "Go away");
console.log(me);

//getage, change name
console.log(getAge(me));
me.changeName("Wonder Woman");
me.addFriend(Sue);
me.addFriend(Jane);
console.log(me);

//check greeting
greeting(me);
greeting(Sue);
greeting(Jane);

//compare ages
if(getAge(me) > getAge(Fred)){
	document.write(me.name + " Is older than " + Fred.name + "\n");
} else {
		document.write(Fred.name + " Is older than " + me.name + "\n");
}

if(getAge(Sue) > getAge(Jane)){
	document.write(Sue.name + " Is older than " + Jane.name + "\n");
} else {
		document.write(Sue.name + " Is older than " + Jane.name + "\n");
}


//excersize 2
function student(name, birthdate, friends, greeting, major){
	Person.call(this, name, birthdate, friends, greeting);
	this.major = major;
}

student.prototype = Object.create(Person.prototype);

//create a student and test
var Lisa = new student("Lisa", "1995/03/27", [Fred], "I'm a student", "cs");
var Wendy = new student("Wendy", "1995/06/11", [Lisa], "I'm a student too", "English");
greeting(Lisa);
console.log(Lisa);

//inherited methods
Lisa.changeName("Lisa Cristine");
Lisa.addFriend(Wendy);
console.log(Lisa);

//instance of checking
console.log(Lisa instanceof student);
console.log(me instanceof student);
console.log(Lisa instanceof Person);