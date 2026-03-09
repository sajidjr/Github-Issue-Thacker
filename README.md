1.What is the difference between var, let, and const?...
* var = Function scope , Reassign allowed , Redeclare allowed..
Example : var a = 10;
          var a = 20; // allowed

* let = Block scope , Reassign allowed , Redeclare Not allowed..
Example : let b = 10;
          b = 20; // allowed
          // let b = 30; ❌ error

* const = Block scope , Reassign not allowed , Redeclare Not allowed..
Example : const c = 10;
          // c = 20; ❌ error    