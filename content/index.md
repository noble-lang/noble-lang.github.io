---
<<<<<<< HEAD
title: Vanadium
layout: index.html
vanadium_desc: "Vanadium is a lightweight high-level systems language designed for clarity, safety, and reliability. Designed to replace the pain C++ is."
---
Vanadium is a robust systems-level programming language built with expressiveness, safety and strictness in mind. It combines systems-level features, like manual memory management or bit-sized integers, with high-level features, like lambdas or a file-based module system. 

Vanadium is often thought of as the safer, more expressive version of C++.

Some of its core features are:
- C interoperability
- Blocks as expressions
- Strong typing and weak casts
- Low overhead *(if you don't mess up a lot)*
- JIT-compilation
- Clean error handling
- Intuitive module system
- Simple iterators <small>*(yes, [that exists](https://preview.redd.it/just-do-for-loops-why-do-you-gotta-complicate-things-so-much-v0-ha3h3fd7a4ue1.png?width=640&crop=smart&auto=webp&s=64d0a896b143714a2db035a598a232462707238b))*</small>
- Sealed classes
- Lambdas

### Hello, World!

```vanadium
from "std/IO" include println;

static func main() {
    println("Hello, World!");
}
```

=======
title: Noble
layout: index.html
noble_desc: "Noble is a Java-like high-level language designed for ease of use, clarity, transparency. It aims to have much lower overhead than Java."
---

Noble is a high-level Java-like language, designed with transparency and clarity in mind.

The language aims to minimize overhead by ensuring that a program without any imports includes only what the programmer explicitly declares. Noble avoids having exposed "magic" methods, and the only thing you can find in a program with no imports is what you declared.

Right now, in the early phases, it is planned to be garbage-collected, but an ownership-based or generally better system will be tried at later phases.

## vs. Java

---

This is a simple Java program that greets you using command line arguments:

```java
public class Greet {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("Hello, " + args[0] + "!");
        } else {
            System.out.println("Hello, world!");
        }
    }
}
```

And this is the same program in noble:

```noble
module main

import noble/system
import noble/console

function main() {
  if system.argv.len > 1 {
    console.print("Hello, " system.argv[1] + "!") # Note that the first arg in argv (argv[0]) is always the command used to run the program
  } else {
    console.print("Hello, World!")
  }
}
```

## Example

---

### Hello, World!

```noble
module main

import noble/console

function main() {
  console.print("Hello, World!")
}
```
>>>>>>> ea9e60e (add all new files)

### More examples:

<details> 
<summary><strong>Iterate over an array</strong></summary>

<<<<<<< HEAD
```vanadium
from "std/IO" include println;

static func main() {
    let names = ["Jhon", "Tom", "Angela", "Luca"];
    for name in names {
        println("Hello, " + name + "!");
    }
}
```

</details>

<details> 
<summary><strong>Unsafe usage</strong></summary>

```vanadium
static func main() {
    let long_int: long = 0xFFFFF;

    @@ Unsafe narrowing cast
    let long_as_short: short = unsafe { long_int as short };

    unsafe {
        let to_float: float = long_int as float;
        discard long_to_short(long_int);
    };

    @* Compile error
    discard long_to_short(long_int); 
    *@
}

unsafe func long_to_short(n: long): short {
    return n as short;
=======
```noble
module main

import noble/console

function main() {
  var names = ["John", "Tom", "Angela", "David"]
  for (var name in names) {
    console.print("Hello, " + name + "!")
  }
>>>>>>> ea9e60e (add all new files)
}
```

</details>

<details> 
<summary><strong>Error handling</strong></summary>

<<<<<<< HEAD
```vanadium
from "std/IO" include println;
from "std/err" include Exception;

func div(a: int, b: int): !int {
    return a / b unless b == 0 ifso throw new Exception("Can't divide by zero");
}

static func main() {
    let result = try div(5, 0) catch {|err|
        println("Error: " + err);
        return;
    };
    println("Result: " + result);
}
```
=======
```noble
module main

import noble/console
import noble/except/Exception
import noble/process

function div(a: int, b: int): int {
  if b == 0 or a == 0 {
    throw Exception.new("Can't divide by 0")
  }
  return a / b
}

function main() {
  var result = try div(5, 0) catch (err: Exception) {
    console.print("Error: " + err.as_string())
    process.exit(1)
  }
  console.print("Result: " + result)
}
```

>>>>>>> ea9e60e (add all new files)
</details>

<details> 
<summary><strong>Create a Vector2 class</strong></summary>

<<<<<<< HEAD
```vanadium
class Vector2 {
    public x: float,
    public y: float,

    static func new(self: &Vector2, x: float, y: float) {
        self.x = x;
        self.y = y;
    }
}

static func main() {
    let my_vec = new Vector2(0.6, 4.7);
=======
```noble
module main

class Vector2 {
  public var x: float,
  public var y: float,

  function new(x: float, y: float) {
    this.x = x
    this.y = y
  }
}

function main() {
  var vec = Vector2.new(0.6, 4.7)
>>>>>>> ea9e60e (add all new files)
}
```

</details>

<details> 
<<<<<<< HEAD
<summary><strong>Import another file</strong></summary>

File `math.vn`:

```vanadium
export static func add(a: int, b: int): int {
    a + b
}

export static func sub(a: int, b: int): int {
    a - b
}
```


File `main.vn`:

```vanadium
from "std/IO" include println;
include "math";
from "math" include sub;

static func main() {
    println(math.add(5, 5));
    println(sub(6, 3));
}
```

</details>

<details> 
<summary><strong>Use static variables</strong></summary>

File `config.vn`:

```vanadium
struct Config {
    public secrets: {string}string = {};
}

export static conf = new Config;
```

File `secrets.vn`:

```vanadium
include "config";

export static func init_secrets() {
    config.conf.secrets["PASSW"] = "passivationisthebest123";
}
```

File `main.vn`:

```vanadium
from "std/IO" include println;
include "config";
include "secrets";

static func main() {
    secrets.init_secrets();
    println(config.conf.secrets);
=======
<summary><strong>Declare and use another module</strong></summary>

File `math.nb`:

```noble
module math

public function add(a: int, b: int): int {
    return a + b
}

public function sub(a: int, b: int): int {
    return a - b
}
```

File `main.nb`:

```noble
module main

import math
import math/sub
import noble/console

function main() {
    console.print(math.add(5, 5))
    console.print(sub(6, 3))
>>>>>>> ea9e60e (add all new files)
}
```

</details>

<details>
<summary><strong>Make an assert function</strong></summary>

<<<<<<< HEAD
```vanadium
from "std/err" include Exception;

static func assert(condition: bool, message: string?) {
    throw new Exception(message ifnot "Assertion failed!") unless condition;
}
```

</details>

<details>
<summary><strong>Allocate, reference and free memory</strong></summary>

```vanadium
static func main() {
    @@ Manually allocated array
    let arr = new [4]ulong;
    assert(arr[2] == 0);
    arr[2] = 0xFFFFF;
    defer delete arr;

    let num = 7;
    let ptr = &amp;num; @@ Referencing
    defer delete ptr;

    *ptr = 5; @@ Dereferencing
    assert(num == 5);
}

@@ Ignore this!
from "std/err" include Exception;
static func assert(condition: bool, message: string?)  {
    throw new Exception(message ifnot "Assertion failed!") unless condition;
=======
```noble
module assert

import noble/exception/Exception

function assert(condition: bool, message: string?) {
  if not condition {
    throw Exception.new(message ifnot "Assertion failed!")
  }
>>>>>>> ea9e60e (add all new files)
}
```

</details>

[Get started](/docs/)
<<<<<<< HEAD

=======
>>>>>>> ea9e60e (add all new files)
