---
title: "Why isn't Vanadium AOT?"
show: true
layout: post
last_edited: 2025-06-09
---

Vanadium is mentioned as a systems language, has a `comptime` keyword, but even like that it isn't ahead-of-time compiled.

That's because Vanadium is actually just-in-time (a.k.a *JIT*) compiled.

## What is JIT compilation?
If in AOT (ahead-of-time) compilation the code is compiled before running it (e.g. when using C++, you first compile the code into a binary and then run it), then JIT is the opposite, compilation happens **WHEN THE PROGRAM IS RUNNING**.

This means that for this program:

File `config.vn`:
```vanadium
from "std/IO" include println;

struct Field {
    public key: string;
    public value: string;

    public func display(self: &Field) {
        println(self.key + ": " + self.value);
    }
    
    new(self: &Field, key: string, value: string?) {
        self.key = key;
        self.value = value ifnot "";
    }
}

struct Config {
    private fields: []Field;

    public func get_fields(self: &Config): const []Field {
        self.fields
    }

    new(self: &Config, fields: []Field) {
        self.fields = fields;
    }
}

static let global_config = new Config([new Field("name")]);
```

File: `main.vn`
```vanadium
from "config" include global_config;

static func main() {
    for field in global_config.get_fields() {
        field.display();
    }
}
```

AOT compilation would:
1. Compile `main.vn`.
2. Compile `config.vn`.
3. Link the files.
4. Build a single binary to disk.
5. **At runtime** create the static instance.

JIT compilation would:
1. Compile `main.vn`.
2. Compile `config.vn` and cache it.
3. Feed the code to the VM.
4. Create the static instance.

And all of this at runtime.

We can go deeper and say that JIT is slower as you parse, compile and then run it, that you lose the bytecode once the program ends **BUT** you can make a binary packing both the bytecode and VM, that compilation here can be also called codegen (=code generation) because you normally just make bytcode and not direct binary, and much more, but at the core, JIT is just AOT but it does everything at runtime.

## Why not use AOT?
AOT might seem better and more fitting in Vanadium, but for AOT there is a very big problem: **THE TARGET**.

When you compile code for AOT you can't just use in-memory numbers, you need to find something static, so you need a target.

Most languages compile to an [IR (intermediate representation)](https://en.wikipedia.org/wiki/Intermediate_representation), which is then compiled to binary. The most famous option for this would be LLVM, where you first generate LLVM IR, and LLVM compiles it to binary.

So, why doesn't Vanadium use AOT compilation? Because I didn't find a target that fitted. 

LLVM is a heavy dependency, and control over the runtime is very low, which means that to make LLVM really work for Vanadium I need to either modify it or strap a lot of important things from my concept of Vanadium.

I could also compile to Assembly, but to make that cross-platform is a pain, or to some binary format directly, but that is too complex, or even [transpile](https://en.wikipedia.org/wiki/Source-to-source_compiler) (basically compile to another standalone language) to C or similar, but that means users need a C compiler and that I have to hand off runtime to C!

So the best option is to make my very own format using just in-memory unsigned integers fed to my own stack-based VM. If you want a static binary, you can build a simple VM wrapper that reads from `stdin` and pack it into a binary where direct bytecode is fed into the VM through `stdin`, or use another method for JIT static compilation. The thing is, Vanadium isn't getting AOT, [*or is it?*](https://youtu.be/KF8wlNegMas).

## But, isn't it slow?
You could think that JIT compilation is slow, and in some cases *slower* than interpretation, but it's actually very fast.

I mean, think about it, what's faster:
1. Directly interpret an in-memory complex structural tree.
2. Generate a flat list of bytecode and run it through a VM.

You might think that the extra overhead of compiling at runtime costs more than directly walking and evaluating the tree, but it's actually not just pretty fast, but also compensates a lot with the fact that the VM will be working with plain, compact and defined bytecode.

If you aren't still convinced, then let's say I want to run this:
```vanadium
static func main() {
    let x = 2 + 3 * 5;
}
```

When parsed, let's say it gives this result:

FuncDecl (`static func main { ... }`)
- name: *"main"*
- static: **yes**
- Block (`{ ... }`)
    - VarDecl (`let x = 2 + 3 * 5`);
        - name: *"x"*
        - value: BinaryExpr(Literal(2), "+", BinaryExpr(Literal(3), "\*", Literal(5))) (`2 + 3 * 5`).

So, what's more efficient now?
1. Walk and interpret the tree (*here it's simple, but imagine in real world code*)
2. Convert it into literally just a list of `uint32_t` and run it through a stack based VM.

## JIT vs. AOT
JIT can be faster than interpretation and all of that, but if you say that AOT is faster then that's actually true, because directly running **STATIC** binary is a lot more faster than letting the VM run **IN-MEMORY DYNAMIC** bytecode.

The most important thing you have to consider is that in JIT you are storing bytecode directly in-memory and at runtime, while in AOT you are emitting static binary that is just red from the disk and directly fed into the CPU (well, not DIRECTLY, but you get it).

JIT will never be faster than AOT, and if it is then either the benchmark was horrible, the AOT is horrible or there is dark magic involved.
