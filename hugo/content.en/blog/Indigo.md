+++
author = "Guilhermo Barretti"
title = "Indigo"
date = "2021-12-30"
description = "Indigo"
tags = [
    "indigo",
]
categories = [
    "indigo",
]

showthedate = true
+++

<!-- # Indigo -->

<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/ys2Y0pNRqJ8" frameborder="0" allowfullscreen></iframe>
<figcaption>Example of a challenging level to test the game mechanics</figcaption>

The goal of this first post is to show what the idea of the game Indigo is, its current development state and where it is heading to.

Indigo is a 2D platform game with level creation that I am developing using C++, OpenGL and SDL.
<!--more-->

At the moment, the focus of the development is to implement engine functionalities. The following functionalities are already implemented so far: level editor (insert/erase sprites, copy, paste, area operations, undo, resize level size), physics, collisions, frame cap, mod support through Lua scripts, replay system and texture atlas. As soon as I finish its basic functionalities, the focus will be on game design and level design.

## Why not use an engine?

<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/VSUr1eoMr9c" frameborder="0" allowfullscreen></iframe>

I have been playing around with SDL for a long time, and I like the idea of having everything (or most of it) that happens with my code under control. I have always had the curiosity of knowing how things work in lower levels, and I like to play with that.

I believe I would not be able (or have time) to do this if the game were more complex, had 3D graphics or were multiplayer for example, but, for the intentions that I have for this game, it is totally possible to make it "from scratch" and by yourself.

Could I do all of this in an engine and save time with things that are already ready there? I could, but it was precisely due to the desire to learn something with OpenGL and mess around with lower-level stuff that I started making this game. It is something that I like to do and even excites me. Games must be made in the environment that pleases you the most, whether you are using an engine or not, and, to me, making my own engine was what pleased me the most.

By using an engine, you save a lot of time with the functionalities that it offers you. However, this may have the disadvantage of being made for general purposes, meeting multiple functionalities that are not always straight to the point for something specific and simple that you want. By creating my own engine, the code is focused only on the things I need for my game and designed with the workflow that satisfies me most.

You should use the environment and tools that make you comfortable to develop, and, to me, this was the way that pleased me the most to make this game.

However, I am not exactly making everything "from scratch", hence the quotation marks. I am using some libraries that help a lot and are really good. Next, I am going to go over each one of what I have chosen to use to help and make my engine.

## SDL

![](https://cdn-images-1.medium.com/max/2000/0*EOcCgyVqaajcBq-G.png)

*Simple DirectMedia Layer* is an open-source library that provides access to keyboard, mouse, audio, controllers and graphics through OpenGL. It has official support for the main platforms, such as Windows, Mac, Linux, Android, iOS and other ones are also supported through the help of the community. Because of that, it was very easy to compile Indigo for Windows, Mac and Android with no hassle. Also, small and big game companies use SDL and [even support its development financially](https://www.patreon.com/posts/58563886). There are other similar libraries like SFML, raylib and Allegro, but I believe SDL is the most widely used and best developed one.

I have been playing around with it for a while; it is a great library, and I don't see any reason to have to make it from scratch, at least not for what I want, because it has all the basic functionalities for you to start making your engine. Creating a window on Windows might even not be that hard, but doing this and many other functionalities for each platform you want your game to run on is far more demanding, since each platform has its own way of dealing with them. It handles those functions very well (creating windows and managing keyboard/mouse/controller input), its development is very active and it has a lot of relevance in the industry. That is why I have chosen to use this library.

## **Dear ImGui**

![Utilizing Dear ImGui in Indigo](https://cdn-images-1.medium.com/max/2784/1*FEprVgJZtc8kkk8ii8uwDA.png)
<figcaption>Utilizing Dear ImGui in Indigo</figcaption>

Another library that has been helping me a lot is [Dear ImGui](https://github.com/ocornut/imgui), which is a library for rendering GUI (Graphical User Interface) in a very easy way. This helps me create many windows for menus to change all engine, object, gravity and speed settings, measure FPS or anything else that I would like to have easy and visual access to in the game.

I liked it a lot because it was rather easy to integrate with my code and begin to create the interface the exact way that I wanted.

All the documentation for this library is in a code with examples for every single functionality of it. Would you like to create a combo box? There is an example in the code using it in a simple and easy way to understand!

I have spent a good amount of time just playing around with its functionalities, testing what is possible to create with it and [even taking a look at what other people can do with it](https://github.com/ocornut/imgui/issues/4451). I highly recommend it!

## Cereal

![](https://cdn-images-1.medium.com/max/2000/0*7-t0Vu2c0aQHJi-n.png)

The game needs to save all information in files. Information about the engine, level and object settings, among many others. For this, I decided to use [Cereal](https://uscilab.github.io/cereal/), which is a header-only library in C++ for serializing data in many different formats, such as XML, JSON or binary. I like it a lot because it is easy to use and great at saving data. The only thing that I did not like that much was that the compile time for parts of the code that uses Cereal increases quite a bit.

I was not in the mood to make my own serializer, so I found this library and liked it a lot.

## **Lua scripts**

![Example of a Lua script for an object (Shell)](https://cdn-images-1.medium.com/max/2000/1*XkdvAJ-a2sUsT-0CM_A7rQ.png)
<figcaption>Example of a Lua script for an object (Shell)</figcaption>

Level creation will not be only limited to the official game objects; it will be possible to create custom game objects utilizing Lua scripts. This will make it easier to create mods for the game. With it, it is possible to have control of everything that the object does, how it reacts to collisions, create its own physics (or use the default one), change sprites and animations, instance new objects, etc. There are endless possibilities for creations.

In a nutshell, Lua is an interpreted programming language developed here in Brazil at PUC-Rio. It is a rather lightweight language and is easy to embed into your code. Its compiled code (what you need to embed in your application) has around 400 KB only! It is a fast language compared to other interpreted ones like Javascript or Python, for example. It is interpreted, that is, the entire code is compiled in execution time and runs in a contained way in its Virtual Machine, bringing more security to the scripts from other people you might run. It is not a coincidence that this is a widely used language for game mods.

## **Slopes**

![](https://cdn-images-1.medium.com/max/2784/1*EGpWNDg8juYHb1n4DmoeVg.png)

The latest game implementation was the slopes! There are two intensities of slopes. Looking at the screenshot, the ramp on the left of the character is less intense and, on the right, steeper. In the future, I will write an in-depth post about this implementation!

## What Indigo is at the moment and where it is heading to

![](https://cdn-images-1.medium.com/max/2000/1*i0PIhTPxYgWOvPdKSY3zEQ.png)
> Indigo is a color between blue and violet. It is a color of devotion, wisdom, justice, and knowledge. Tied to intuition and what is not seen, it is also considered spiritual.
> Like many colors, indigo gets its name from an object in the natural world - the plant named indigo once used for dyeing cloth.

At the moment, Indigo is a level editor with some objects like shell, on/off switch, spikes, trampoline, canons, ropes, etc. It is possible to create/save/play levels, it has a replay system for the levels you played, all the physics and collision detection were made from scratch and it is possible to create new objects using Lua scripts. It is also possible to dash, wallslide, hold and throw objects with your character.

The idea of the game is to be a challenging, 2D platform game, with many levels and just a bit of background story. The level editor will be available for all players to create and share their own levels, and it will have wide support for mods through Lua scripts. I believe I am a bit far from that, but let's see how the game shapes up by then.

After finishing its basic functionalities, the focus will be on game design and level design. It's an area that I also really enjoy but I still have a lot to learn.

In the future, I will write more posts about specific topics regarding its development, like physics, collisions, replay, slopes, Lua scripts, texture atlas and many more.

You can follow more about the development of this game by following me on [Medium](https://guiks.medium.com/), no [Twitter](https://twitter.com/guilhermodsb), on my [Itch.io](https://guiks.itch.io/) page and on [Twitch](https://twitch.tv/guiks7).