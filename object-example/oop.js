//inherit function
// args Object, Object
// return void
Object.prototype.extends = function(ParentObject){
	this.prototype = Object.create(ParentObject.prototype); // overwrite Developer prototype with Person's prototype
	// this.prototype.__super__ = ParentObject; //in case we need parent originals
	this.prototype.constructor = this; // link Developer constructor back to original Developer
}

//print to screen
// args string
// return void
function sout(string){
	var x = document.getElementById('strings');
	var para = document.createElement("P");
	var t = document.createTextNode(string);
	para.appendChild(t);
	x.appendChild(para);
}

// Class / Entity Person 
function Person(firstname, lastname){
    this.firstname = firstname;
    this.lastname = lastname; 
}

Person.prototype.getFullname = function(){
	return this.firstname + " " + this.lastname;
}

// Class Person knows how to greet
Person.prototype.greet = function() {
	console.log(this);
    sout('Hi, my name is ' + this.getFullname());
}

var jonathan = new Person("Jonathan", "Tobi"); // new Person Object
var agon = new Person("Agon", "Emanuel"); // other Person Object 

jonathan.greet(); // Hi, my name is Jonathan Tobi - Object jonathan greets
agon.greet(); // Hi, my name is Agon Emanuel -- Object agon greets

jonathan.firstname ="Hakeem"; // object property changed
jonathan.greet(); // Hi, my name is Hakeem Tobi - New property Object jonathan

// Lets give Person something extra
Person.prototype.bye = function() {
	sout(this.firstname + " was here. Bye now");
}

// newly created function available for object that are already created
jonathan.bye();
agon.bye();


// Lets create a new Class Developer and inherit from Person
function Developer(firstname, lastname, languages){
	Person.apply(this, arguments); //apply parent arguments to parent

	this.languages = languages;
}

Developer.extends(Person);


var timothy = new Developer("Timothy", "Pocorni", ["HTML", "CSS", "JavaScript", "PHP", "C++", "C#", "Objective-C"]);

timothy.greet(); //Developer inherits from Person so they can also greet

Developer.prototype.showLanguages =  function(){
	var languages = this.languages;
	var lang = "";

	for (var i = 0; i < languages.length; i++) {

		if (i == 0) {
			lang += languages[i];
		}else if(i ==  languages.length - 1){
			lang += " and "+ languages[i];
		}else{
			lang += ", "+ languages[i];
		}
	}

	sout("I know "+lang);
}

timothy.showLanguages(); //developer can now show its languages

// But Developers dont greet like that right? So lets give them a proper greet method
// @override
Developer.prototype.greet = function(){
	sout("Sup, I'm "  + this.firstname + ". Got some coffee?");
}

timothy.greet();  //now this is what I'm talking about

//How do I still get the original greet method? you ask. Say no more
// Lets give Developers their normal greet back
Developer.prototype.normalGreet = function(){
	this.__proto__.__proto__.greet.call(this); // the inherited greet function is called in the Developer class context
}

timothy.normalGreet();