---
title: "The three rewrites Vanadium went through"
show: true
layout: post
last_edited: 2025-06-09
---

If you take a peek at Vanadium's commit history, you will see two interesting commits:

- [54fb61d](https://github.com/vn-language/vanadium/commit/54fb61d2f2d20fdca91932f70c0293f367fbcfab): `feat: effing RWR (Rewrite it In Rust)`
- [d8e6af7](https://github.com/vn-language/vanadium/commit/d8e6af745b36b00909f0c1efb400fa95839c5c05): `feat: rewrite in C++ (I PROMISE IT'S THE FINAL REWRITE!)`

And this is because Vanadium has changed development language two times.

## Zig

It was first going to be made in Zig, but I realized that I was going too slow and the code was too messy, refactoring was too hard at that moment, so I decided to archive the version and try to make it in Rust.

What I had for that version:

- A full [lexer](https://en.wikipedia.org/wiki/Lexical_analysis).
- Already started doing the [parser](https://en.wikipedia.org/wiki/Parsing).

## Rust

When I noticed Zig wouldn't work, I changed to Rust.

I chose Rust because it's a very robust language, it has very good tooling, and it's overall a very good option. Then I noticed that I don't know anything about Rust, I thought it was going to be easy coming from C++, but it seems that it didn't really work at the end. I was messing around with types, trying to understand all the weird errors, until I just admitted that Rust wasn't going to work.

## C++

If Zig didn't work because it became too complex very fast, and Rust didn't work because it has a very steep learning curve and I couldn't start coding in it by developing a language then I needed to go for something familiar, something that I already knew how to use, so I chose C++.

Vanadium is now being developed in C++, and it will remain like that until...

## Self-hosting?

In the future, I will probably try [self-hosting](<https://en.wikipedia.org/wiki/Self-hosting_(compilers)>). Self-hosting basically consists of:

- Writing a stage-one compiler in C++ (already on it).
- Writing a stage-two compiler in Vanadium to act as main compiler.
- Compile the stage-two compiler with the stage-one (or _bootstrap_) compiler.
- Distribute the compiled stage-two.

This allows for me to first go through the pain of making Vanadium in C++, then adding new features in Vanadium, which is less painful, and also allows for rewriting all the logic already made in C++ in Vanadium so it can be refined.

The inspiration for making Vanadium self-hosted in the future was [Zig](https://github.com/ziglang/zig). Zig has a **97.6% of Zig code** in it's **source code**, the current stage-one compiler it's only **2.1% of the source code**. Other languages that did this (and far sooner than Zig) are:

- C, originally written in Assembly.
- Rust, originally written in OCaml.
