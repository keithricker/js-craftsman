# js-craftsman

Tools for creating, modifying and traversing objects and classes in javascript.

js-craftsman consists of 9 tools designed for convenient introspection and modification of your Javascript objects and classes.

## konstructor
is a builder of objects. 
- Quickly and easily create static attributes and methods, and instance properties.
- Easily define advanced properties like writability, enumerability, etc.
- Support for private attributes and initializer functions.
- Full control over "super" functions (not forced to invoke before accessing "this"). Use it how you wish.

[More on konstructor](https://github.com/keithricker/js-craftsman/wiki/konstructor)  
 
## Objekt
Advanced tools for existing objects.
- Gain quick insight in to your objects with advanced introspection tools.
- **Clone** objects, including non-enumerable properties.
- Easily **merge** object properties
- Safely **delete** properties without errors on proptected attributes
- **Backup** objects: when using Objekt tools, copies of objects are backed up before modification, and can be accessed at any time.
- **mixins:** highly flexible mixin tool allows you to borrow certain attributes from classes without having to extend them.
- **lineage:** View a full, traversible inheritence tree for your object. Includes 'prev' and 'next' properties for full traversing.
More detailed and powerful than **instanceof operator**.

## klass
A more flexible way of defining a class.
- Use functions to define classes with greater functionality.
- Allow functions to inherit as if they were normal classes.
- Support for private variables that really are private.
- No *"Must call super constructor in derived class before accessing 'this'"* Go ahead and access properties of *this* if needed, and call the super constructor when it makes sense for your situation.
- Incredible flexibility for class definition. Define your static and prototype methods within an object template, or simply include them *within the constructor function.* Or use javascript's native class syntax. **konstructor** is great for unusual coding situations where flexibility is needed.

## Mirror
Proxy generator for extending functionality of objects.
- **Clone:** Create a virtual copy of an object.
- **Extend:** Add functionality to an object while preserving the original object's properties.
- **Merge:** Merge properties of multiple objects in a powerful and flexible way.

## funktion
Highly useful function creation tools.
- **Tie:** re-usable function binding. Change the "bound" objects unlimited times (regular function binding can only be done once per function).
- **Creation:** Easy 'eval' style function creation. Pass in the function name, eval text, and a key/value formatted object with replacements.

## ObjectMap
A map tool for Objects. 
- Represents an object as a map, allowing you to use array methods on your object.
- Iterate through an object as if it were an array.
Among it's many methods: Loop (forEach), find, filter, reduce, splice

## Tree
a more flexible Map
- Most normal Map functionality and methods are available.
- Simplified creation of Map objects (support for key/value pairs).
- Improved syntax for finding entries (find by value as well as key).
```
const tree = new Tree(
{key:'test1 key', value:'test1 value'},
{key:'test2 key', value:'test2 value'})

const test1 = tree('test1 key')
const test2 = tree.query(null, 'test2 value')
```
- Simplified access to entries. Iterate through entries as key/value pairs; i.e. object.key, object.value. Direct access to Map items (no "hiding" them). Directly alter a map item through it's array of entries, or via it's normal methods ("set").

## Chars
a better find/replace tool for Strings
- Regex support
- Result (matches) returned as array
- Accepts a callback function (run for each match in the results array)
- Methods include *find*, *findAll*, *replace*, *replaceAll.*

