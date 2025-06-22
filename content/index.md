---
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

## Examples

---

### Hello, World!

```noble
module main

import noble/console

function main() {
  console.print("Hello, World!")
}
```

### More examples:

<details> 
<summary><strong>Iterate over an array</strong></summary>

```noble
module main

import noble/console

function main() {
  var names = ["John", "Tom", "Angela", "David"]
  for var name in names {
    console.print("Hello, " + name + "!")
  }
}
```

</details>

<details> 
<summary><strong>Error handling</strong></summary>

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

</details>

<details> 
<summary><strong>Create a Vector2 class</strong></summary>

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
}
```

</details>

<details> 
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
}
```

</details>

<details>
<summary><strong>Make an assert function</strong></summary>

```noble
module assert

import noble/except/Exception

function assert(condition: bool, message: string?) {
  if not condition {
    throw Exception.new(message ifnot "Assertion failed!")
  }
}
```

</details>

[Get started](/docs/)
