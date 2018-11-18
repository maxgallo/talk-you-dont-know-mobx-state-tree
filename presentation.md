# [fit]You Don't know
# [fit]_**M**_obX _**S**_tate _**T**_ree

Berlin _|_ 20-21 November 2018

<br />

![inline 120%](assets/images/codemotion.png) ![inline 25%](assets/images/CC.png)

---

![right](assets/images/me.jpg)

# Hi 👋🏻
## [fit]I'm Max Gallo

About me:🍝 💻 🇬🇧 🎶 🏍 📷 ✈️ ✍️

Principal Engineer @ DAZN
<br />
![inline 40%](assets/images/dazn.png)

_twitter:_ @\_maxgallo
_more:_ maxgallo.io

---

# [fit] Agenda 

- _Part One:_ MobX
- _Part Two:_ MobX State Tree
- _Part Three:_ Designing a Reactive Project

---
![background fill](assets/images/bg.png)

# Part One
## _**MobX**_

---

# [fit]MobX

- Simple introduction to _Reactive Programming_
- Flexible / Unopinionated
- _Transparent_ Functional Reactive Programming 
- Helps Decoupling View from Business Logic

---

# MobX _**Observables & reactions**_
^ It's "Transparent" since we don't have manual subscription

[.code-highlight: 1-6]
[.code-highlight: 8-9]
[.code-highlight: 8-13]

```javascript
import { observable, autorun} from 'mobx';

const album = observable({
	title: 'Californication',
	playCount: 0,
});

autorun(() => console.log(`New play count: ${album.playCount}`))
// New play count: 0

album.playCount = 1; // New play count: 1

album.playCount = 24; // New play count: 24
```

---
^ - Computed values are derivation of the state
- Computed values are observable
- Computed values are lazily evaluated, only if observed

# MobX _**Computed Values**_

[.code-highlight: 1-6]
[.code-highlight: 8-9]
[.code-highlight: 8-11]
[.code-highlight: 8-15]

```javascript
import { observable, autorun, computed} from 'mobx';

const album = observable({
	title: 'Californication',
	playCount: 0,
});

const all = computed(() => album.title + album.playCount);

autorun(() => console.log(all))
// Californication0

album.playCount = 1;        // Californication1
album.title = 'OkComputer'; // OkComputer1
album.playCount = 24;       // OkComputer24 
```

---

#[fit] MobX _**Recap**_

_**Observable state**_
Mutable Application State

_**Reactions**_
Side effects like _autorun_ or updating a React component

_**Computed Values**_
Automatically derived values, lazily evaluated

---

![background fill](assets/images/bg.png)

# Part Two
## _**MobX State Tree**_

---


# [fit] __*M*__obX __*S*__tate __*T*__ree

- Powered by _*MobX*_
- The State is strongly typed
- Opinionated / Ready to use
- Relies on the concept of Trees (Stores)

---
# What's a __*Tree*__/__*Store*__ ?

[.code-highlight: 1-6]
[.code-highlight: 7-11]
[.code-highlight: 1-11]
[.code-highlight: 13-14]

```javascript
import { types } from 'mobx-state-tree';

const CarStore = types
	.model('Car', {             
	    name: types.string       // mobx observable
	})
	.views(self => ({
		get isFerrari() {        // mobx computed
			return self.name.includes('Ferrari')
		}
	})
	
const carStore = CarStore.create({ name: 'Ferrari Enzo'});
console.log(carStore.isFerrari); // true
```


---
^ - Car inside Car Park
- Type casting of CarStore

![left fit](assets/codeExamples/mobxStateTree/carbon.png)

#[fit] MobX State Tree _**Stores**_

_**Model**_

- Mutable observable state
- Contains type information
- Could contain other trees

_**Views**_
MobX computed values

_**Actions**_
The only way to update the model

---

### MobX State Tree

# How to connect __*Stores*__ with React components ?

---
^ - Inject everywhere
- Testing by overriding injections

![fit](assets/codeExamples/mstAppJs/carbon.png)
![fit](assets/codeExamples/mstViewJs/carbon.png)

---
### MobX State Tree __*Stores*__
# [fit] Deep Dive 🐙

- Mutable and Immutable (Snapshots, Time Travelling)
- Composition
- Lifecycle Methods
- Dependency Injection

---

^ Examples: Logger, API calls 

### MobX State Tree __*Stores*__
# [fit] Dependency
# [fit] Injection

![left fit](assets/codeExamples/dependencyInjection/carbon.png)

<br />

- Inject anything
- Environment is shared per tree
- Useful for testing

---

![background fill](assets/images/bg.png)

# Part Three
## _**Designing a reactive project**_

---

#[fit] Designing 🎨
# __*Stores*__

*1. Shape your Trees*
One Root Store vs Multiple Root Stores

*2. Stores Communication*
How Stores communicate between each other

---
### __*Shape your trees*__
# [fit] One Root Store

![left fit](assets/pdf/one_root_store.pdf)

_Pros_

- Easier to perform actions on everything at once (snapshot, creation, destroy).
- Unique environment for dependency injection.

_Cons_
Very easy to create tightly coupled stores

---

### __*Shape your trees*__
# Multiple Root Stores

![left fit](assets/pdf/multiple_root_store.pdf)


_Pros_
Easier to reason by Domain

_Cons_

- Less immediate to perform actions on everything
- Not single environment for dependency injection

---
## __*Real World*__
#[fit] Stores communication 📞

1. Default Approach

1. Actions Wrapper

1. Dependency Injection

---
### __*Stores Communication*__
#[fit] Default Approach
Each Store access directly other Stores.
<br/>

- Easier when using a Single Root Store
- Each Store could end up knowing the whole structure ⚠️

![left fit](assets/codeExamples/communicationDefault/carbon.png)

---
^ The action caller is unaware of what's going on behind the scene

### __*Stores Communication*__
#[fit] Actions Wrapper
One Store,
to rule them all 🧙‍♂️🌋💍
<br/>

- Calls directly other Stores
- Friendly interface
- Knows a lot about your App


![left fit](assets/codeExamples/communicationWrapper/carbon.png)

---

### __*Stores Communication*__
#[fit] Dependency Injection
Injecting one or multiple stores into another one.
<br/>
 
- You could use it for both **Actions** and **Views**
- Circular dependencies while loading could be non-trivial


![left fit](assets/codeExamples/communicationInjection/carbon.png)

---

#[fit] One more thing ...
![inline](assets/gif/oneMoreThing.gif)


---

## __*Store*__
# Composition
Two or more stores can be composed

<br/>

- Separation of Concerns
- Reusability

![left fit](assets/codeExamples/composition/carbon.png)


---

^ - Mobile: Inertial Scrolling
- Desktop: Scrolling with arrows
- Renders only item in the view 

### __*Composition*__
# Real World Example 

![inline](assets/gif/mobileScroll.gif)![inline](assets/gif/desktopScroll.gif)

---

![left fit](assets/pdf/composition.pdf)

### Composition
# Real World Example 

**Data Store**
Holds the data to render

**Inertial/Arrow Scrolling**
Manages scrolling

**Element Pooling Store**
Renders only in view

---

![background fill](assets/images/bg.png)

# Conclusions
## _**Derive Everything**_

---

^ - Avoid manual subscription
  - Avoid undersubscribe or oversubscribe

Next time you're adding properties to the *Model*, <br/>ask yourself first


# [fit] _Can I derive it?_ 🤔

<br />

> _Anything that can be derived from the application state, should be derived. Automatically_
--- Michel Weststrate

---


#[fit] Takeaways 🖇

- *MobX* opens the doors of _Reactive Programming_
- *MobX State Tree* provides a structure 
- Shape your tree & setup the communication
- Embrace *Composition*!
- Embrace *Reactivity*!

---

#[fit] Thanks 

<br />

🤓 github.com/maxgallo/you-dont-know-mobx-state-tree
✉️ hello@maxgallo.io
_twitter_ @\_maxgallo
_web_ maxgallo.io