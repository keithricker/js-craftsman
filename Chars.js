const { hasFunc, validate, history } = require('./utils')
const { Objekt } = require('./Objekt')
const klass = require('./klass')
const { mirrors } = require('./Mirror')

const Chars = klass({
   name: "Chars",
   extends: String,
   constructor: function Chars(string) {
      validate(string,'string')
      let returnVal = this.Super(string)  
      let newString = new String(string.valueOf());

      Objekt.proto.set(newString,Objekt.proto.get(this))

      if (!history.has(returnVal))
         history.set(returnVal,{0: newString})
      return returnVal
   },
   static: {
      findAll(str,search,callback = null) {
         validate(str,'string')
         const regex = new RegExp(search,'g')
         var matches = [], match
         while ((match = regex.exec(str)) !== null) {
            if (match[1]) match = match[1]
            if (callback) callback(match)
            matches.push(match)
         }
         const matchesUnique = [ ...new Set(matches)]
         Object.defineProperty(matches,'unique',{ value:matchesUnique,enumerable:false })
         return matches
      },
      random(length = 8) {
         let num = length / 2 + 2;
         return (
            Math.random().toString(36).substring(2, num) +
            Math.random().toString(36).substring(2, num)
         );
      }
   },
   prototype: {
      has(target, str) {
         if (!str) { 
            target = this; str = target 
         }
         return hasFunc(target, str)
      },
      findAll(search,callback = null) {
         let thiss = this
         let found = Chars.findAll(this,search,callback)
         let mixin = (replace) => { 
            return thiss.replace(search).with(replace).all()
         }
         return Objekt.mixin(found,mixin)
      },
      replace(...target) {
         let str = this
         let theString = str
         const walkBack = Objekt.clone(theString)
         let hist = history.has(theString) ? history.get(theString) : mirrors.has(theString) ? history.get(mirrors.get(theString)['<target>']) : null
         if (hist) {
            let histKeys = Reflect.ownKeys(hist).filter(num => !isNaN(num))
            let last = hist[histKeys.length-1]
            if (!Objekt.equivalent(last,theString))
               hist[histKeys.length] = Objekt.clone(theString)
         }
         let replaceM
         function _with(strg = theString,trg=target,replacement) {
            replaceM = replacement
            strg = strg.toString()
            trg.forEach(tr => {
               strg = String.prototype.replace.call(strg,tr,replacement)
            })
            return strg
         }
         let twoArgs = (arguments.length === 2 && (typeof arguments[0] === 'string' && typeof arguments[1] === 'string')) 
         theString = twoArgs ? _with(theString,[arguments[0]],arguments[1]) : theString 
         let mixin1 = {
            with: (replacement) => {
               theString = walkBack
               theString = _with(theString,target,replacement)
               let mixin = {
                  all: () => {
                     let results = str.toString()
                     target.forEach(trg => {
                        Chars.findAll(str, trg, (match) => results = String.prototype.replace.call(results,match,replacement))
                     })
                     return new Chars(results)
                  }            
               } 
               Object.setPrototypeOf(mixin,Chars.prototype)
               return Object.setPrototypeOf(Object(theString),mixin)           
            },
            ...twoArgs && { 
               all: () => {
                  let results = str.toString()
                  target.forEach(trg => {
                     Chars.findAll(str, trg, (match) => results = String.prototype.replace.call(results,match,replaceM))
                  })
                  return new Chars(results)
               }    
            }
         }
         Object.setPrototypeOf(mixin1,Chars.prototype)
         return Object.setPrototypeOf(Object(theString),mixin1)
      },
      random(length = 8) {
         return Chars.random(length)
      }
   }
})
module.exports = Chars