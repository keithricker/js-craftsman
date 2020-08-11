# js-craftsman

Tools for creating, modifying and traversing objects and classes in javascript.

js-craftsman consists of 9 tools designed for convenient introspection and modification of your Javascript objects and classes.

## konstructor
is a builder of objects. 
- Quickly and easily create static attributes and methods, and instance properties.
- Easily define advanced properties like writability, enumerability, etc.
- Support for private attributes and initializer functions.
- Full control over "super" functions (not forced to invoke before accessing "this"). Use it how you wish.
 
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

## Mirror
Proxy generator for extending functionality of objects.

