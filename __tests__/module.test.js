const { Objekt } = require('../Objekt')
const konstructor = require('../konstructor')
const { Mirror, mirrors } = require('../Mirror')
const Chars = require('../Chars')
const funktion = require('../funktion')
const { history } = require('../utils')
const klass = require('../klass')
const Tree = require('../Tree')

let rand1 = Chars.random(); let rand2 = Chars.random()
let rand3 = Chars.random(); let rand4 = Chars.random()
let rand5 = Chars.random(); let rand6 = Chars.random()
let rand7 = Chars.random(); let rand8 = Chars.random()
let rand9 = Chars.random(); let rand10 = Chars.random()
let newCls = function newClass() {}
let newInstance = new newCls()
let newObj = { [rand1]:rand2,[rand3]: rand4 }
let objk = Objekt(newObj)
test('test for Objekt clone', () => {
   let cloneObj = objk.clone()
   expect(newObj).toEqual(cloneObj);
});
test('delete and define', () => {
    objk.delete(rand3)
    expect(newObj).not.toHaveProperty(rand3);
    objk.define(rand5,rand6)
    expect(newObj).toHaveProperty(rand5);
    expect(newObj[rand5]).toEqual(rand6);
});
test('misc', () => {
   expect(objk.TypeOf).toBe('Object');
   expect(objk.equivalent(objk.clone())).toBe(true)
   expect(objk.superClass).toBe(Object)
});
test('ObjectMap', () => {
   objk.properties.set('property1','value1')
   objk.properties.set('property2','value2')
   expect(objk.has('property2')).toBe(true)
   expect(newObj).toHaveProperty('property2');
   expect(objk.properties.get('property1').value).toBe('value1')
   objk.properties({property3:'value3',property4:'value4'})
   expect(objk.properties.get('property3').value).toBe('value3')
   let objMap = objk.properties
   objMap.concat({ [rand7]:rand8 })
   expect(newObj).toHaveProperty(rand7);
   let loop1=''; let loop2='';
   objMap.loop(key => loop1=loop1+key)
   expect(loop1).toMatch(/property3/)
   expect(loop1).toMatch(/property2/)
   let testFind = objMap.find(key => key === 'property1' && key)
   expect(testFind).toBe('property1')
   objMap.modify(key => key === 'property1' && 'property one')
   expect(newObj.property1).toBe('property one')
   objMap.push({prop:'value'})
   expect(objMap.pop().value).toBe('value')
   expect(Object.values(newObj)[0]).toBe(objMap.shift().value)
   objMap.unshift({unshifted:'element'})
   expect(objMap.shift().value).toBe('element')
   objMap.remove(key => key === 'property1')
   expect(newObj).not.toHaveProperty('property1');
   newObj.property1 = 'property one'
   expect(newObj).toHaveProperty('property1');
   let filtered = objMap.filter(key => key !== 'property1')
   expect(filtered).toHaveProperty('property2');
   expect(filtered).not.toHaveProperty('property1');
   let mapped = newObj.map((key,val,ob,ind) => {
     return { ['prop'+ind]: 'value'+ind }
   })
   expect(mapped).toHaveProperty('prop1');
   expect(mapped).toHaveProperty('prop3');
   expect(objMap.reduce((cum,key) => {  
      cum[key] = newObj[key]; return cum 
   },{})).toMatchObject(newObj)
   objMap.splice(1, 0, {prop2: 'property2'});
   expect(newObj).toHaveProperty('property2');
});
test('konstructor', () => {
   newObj.eject()
   function newFunc() {}
   Object.setPrototypeOf(newObj,newFunc.prototype)
   expect(Object.getPrototypeOf(newObj).constructor).toBe(newFunc);
   let kons = konstructor(newObj)
   kons.define('konstructorTest',true)
   expect(newObj.konstructorTest).toBe(true);
   kons.extends(Array)
   expect(Object.getPrototypeOf(Object.getPrototypeOf(newObj)).constructor).toBe(Array);
   kons.get({hello: function hello() {return 'hello'}})
   expect(newObj.konstructorTest).toEqual(true);
   expect(newObj.hello).toBe('hello');
   kons.set({setTest: function setTest(val) { this.settingTest = 'setValue' }})
   newObj.setTest = 'setting value'
   expect(newObj.settingTest).toBe('setValue');
   kons.static({staticMethod1: function() { return 'static method'}})
   expect(newObj.constructor.staticMethod1()).toBe('static method');
   kons.properties({prop1:'property1',prop2:'property2'})
   expect(newObj.prop1).toBe('property1');
   expect(newObj.prop2).toBe('property2');

   Object.setPrototypeOf(newFunc.prototype,Object.prototype)
   Object.setPrototypeOf(newObj,newFunc.prototype)
   kons.integrate({integration:'object'})
   expect(newObj.integration).toBe('object')
   kons.prototype({
      protoMethod1() { return 'proto method 1' },
      protoMethod2() { return 'proto method 2' }
   })
   
   expect(newObj.protoMethod1()).toBe('proto method 1')
   expect(newObj.protoMethod2()).toBe('proto method 2')
   kons.init = () => newFunc.initialized = true
   kons.init = () => newfunc.initialized = false
   expect(newFunc.initialized).toBe(true)
   let res = kons.super('argument')
   kons['{{vars}}'].newVar = 'newVal'
   expect(kons['{{vars}}'].newVar).toBe('newVal')
});
test('lineage', () => {
   let ancestor1 = Object.keys(objk.lineage)[0]
   expect(ancestor1).toBe('newFunc')
   let ancestor2 = objk.lineage.newFunc.next.name
   expect(ancestor2).toBe('Object')
});
test('Chars', () => {
   let ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
   let sampleChars = new Chars(ipsum)
   expect(sampleChars.valueOf()).toBe(ipsum);
   let findText = sampleChars.findAll('consectetur')[0]
   expect(findText).toEqual(expect.arrayContaining(['consectetur']));
   let inNumber = sampleChars.findAll('in').length
   sampleChars = sampleChars.replace('in','replaceIn').all()
   expect(sampleChars.findAll('in').length).toBe(0)
   expect(sampleChars.findAll('replaceIn').length).toBe(inNumber)
});
test('funktion', () => {
   function newFunction(arg) { return this.message+arg }
   let newFunk = funktion(newFunction);
   let returnMsg = newFunk.call({message:'hello '},'world')
   expect(returnMsg).toBe('hello world')
   newFunk.tie({message:'tie message '})
   returnMsg = newFunk('world')
   expect(returnMsg).toBe('tie message world')
   let template = {
      toString: `const newfunc = function newfunc(arg) {
         return arg.msg+' '+obj.msg
      }; return newfunc`,
      obj: { msg: "obj message" }
   }
   let newerFunc = funktion('newerFunc',template)
   let newerFuncMsg = newerFunc({msg:'this is the'}); 
   expect(newerFuncMsg).toBe('this is the obj message')  
});
test('history', () => {
   let newerObj = { rand9:rand10, rand8:rand9 }
   Objekt.clone(newerObj)
   let newerObjHistory = history(newerObj)
   let backup = newerObjHistory[0]
   expect(Objekt.equivalent(backup,newerObj)).toBe(true)
   newerObj.newProperty = 'new property'
   expect(Objekt.equivalent(backup,newerObj)).toBe(false)
});
test('klass', () => {
  const newClass = klass({
    name: "newClass",
    extends: Array,
    constructor: function newClass(string) {
       let newArray = this.Super(string)
       return newArray
    },
    static: {
        staticMethod() { return 'static method' }
    },
    prototype: {
        random(length = 8) {
          return Chars.random(length)
        }
    }
  })  
  let randomString = newClass.prototype.random() 
  let instance = new newClass(randomString) 
  expect(instance[0]).toBe(randomString)
});
test('mirror', () => {
   let obj = { 
      rand5:rand6,rand7:rand8,rand9:rand10, 
      ext: function() { return 'original extension' },
      ext2: function() { return 'original extension 2' }
   }
   let extension = { 
      ext: function ext() { return 'This is an extension.' }, 
      ext2: function() { return 'extension 2' },
      ext3: function() { return 'extension 3' },
   }
   let prox = new Mirror(obj,extension)
   expect(prox.ext()).toBe('This is an extension.')
   expect(prox.rand5).toBe(rand6)
   mirrors(prox).exclusions.add('ext')
   expect(prox.ext()).toBe('original extension')
   expect(prox.ext2()).toBe('extension 2')
   mirrors(prox).deleteProperty('ext2')
   expect(prox.ext2).toBe(undefined)
   obj['ext2'] = function() { return 'original extension 2' }
   let newProx = Mirror.extender(obj,extension)
   expect(newProx.ext2()).toBe('original extension 2')
   expect(newProx.ext3()).toBe('extension 3')
   obj['ext2'] = function() { return 'original extension 2' }
   extension['ext2'] = function() { return 'extension 2' }
   let merger = Mirror.merger(obj,extension)
   expect(merger.ext2()).toBe('extension 2')
   let standin = Mirror.standIn(obj)
   expect(standin.ext()).toBe('original extension')
   expect(history.get(obj)[0].ext()).toBe('original extension')
   standin.ext3 = function() { return 'extension 3' }
   expect(obj.ext3()).toBe('extension 3')
});
test('tree', () => {
   newObj.treeTest = 'testing tree'
   let newTree = new Tree(Object.entries(newObj))
   expect(newTree.get('treeTest')).toBe('testing tree')
   newTree.set('treeTest','more tree testing')
   expect(newTree.get('treeTest')).toBe('more tree testing')
   let queried = newTree.query(null,'more tree testing')
   expect(queried.key).toBe('treeTest')
})