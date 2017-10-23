# Emitator
JavaScript events imitator.

## Install
```npm
npm install events-imitator
```

## Usage
### tl;dr
```javascript
import Emitator from 'events-imitator'

Emitator.init()

// set
Emitator.set('GREETING', () => {
    console.log('Hello, World!')
}, 'HELLO_WORLD_1')
Emitator.set('GREETING', () => {
    console.log('Welcome my app!')
}, 'HELLO_WORLD_2')
Emitator.set('GREETING', () => {
    console.log('Well, let`s start!')
})

// emit 1
Emitator.emit('GREETING')
// Result:
// ->> Hello, World!
// ->> Welcome my app!
// ->> Well, let`s start!

// emit 2
Emitator.get('GREETING').emit('HELLO_WORLD_1')
// Result:
// ->> Hello, World!

// unset
Emitator.get('GREETING').unset('HELLO_WORLD_2')

// emit
Emitator.get('GREETING').emit()
// Result:
// ->> Hello, World!
// ->> Well, let`s start!
```

### Import and Init
Emitator.init([options:object])
```javascript
import Emitator from 'events-imitator'

// init
Emitator.init()
```

### Creating "event"
Emitator.set([eventName:string], [consequence:function], [consequenceName:string])
```javascript
// create and set consequence
// NOTE: in case 'TEST_EVENT' already exists command will add new consequence
Emitator.set('GREETING', () => {
    // consequence callback
    console.log('Hello, World!')
})

// create and set consequence with consequenceName
// NOTE: in case 'HELLO_WORLD' already exists command will rewrite consequence
Emitator.set('GREETING', () => {
    // consequence callback
    console.log('Hello, World!')
}, 'HELLO_WORLD')
```

### Emitting "event"
Emitator.emit([eventName:string], [consequenceName:string])
```javascript
// Emits all created consequences
Emitator.emit('GREETING')

// Emits exact created consequence
Emitator.emit('GREETING', 'HELLO_WORLD')
```

### Getting "event"
Emitator.get([eventName:string])
```javascript
// return Event object
// NOTE: it is NOT a native JS Event
let event = Emitator.get('GREETING')
```

### Working with "event" - setting consequence
event.set([consequence:function], [consequenceName:string])
```javascript
event.set('GREETING')
```

### Working with "event" - unsetting all consequences
event.clear()
```javascript
event.clear()
```

### Working with "event" - unsetting exact consequence
event.unset([consequenceName:string])
```javascript
event.unset('GREETING')
```

### Working with "event" - emitting all consequences
event.emitAll()
```javascript
event.emitAll()
```

### Working with "event" - emitting exact consequence
event.emitExact([consequenceName:string])
```javascript
event.emitExact('GREETING')
```

### Working with "event" - emitting all/exact consequences
event.emit([consequenceName:string])
```javascript
event.emit()                // the same as event.emitAll()
event.emit('GREETING')      // the same as event.emitExact('GREETING')
```