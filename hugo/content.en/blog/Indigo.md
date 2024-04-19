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

[To be translated]

<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/ys2Y0pNRqJ8" frameborder="0" allowfullscreen></iframe>
<figcaption>Exemplo de uma fase desafiadora para testar as mecânicas do jogo</figcaption>

A intenção deste primeiro post é mostrar qual é a ideia do jogo Indigo, qual o estado do desenvolvimento dele, e para onde ele irá.

Indigo é o jogo de plataforma 2D com criação de fases que estou fazendo usando C++, OpenGL e SDL.
<!--more-->

No momento, o foco do desenvolvimento está em implementar funcionalidades da *engine*. As seguintes funcionalidades já estão implementadas até agora: editor de fases (colocar/apagar *sprites*, copiar, colar, operações em área, voltar ações, redimensionar o tamanho do *level*), física, colisões, *frame cap*, suporte para *mods* utilizando *scripts* Lua, sistema de *replay*, *texture atlas*. Terminando as funcionalidades básicas o foco será no *game design* e *level design*.

## Por que não usar uma engine?

<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/VSUr1eoMr9c" frameborder="0" allowfullscreen></iframe>

Eu já venho brincando com SDL há um bom tempo e gosto da ideia de ter controle de tudo (ou boa parte) que acontece no meu código. Sempre tive a curiosidade de saber como as coisas funcionam em níveis mais baixo e gosto de mexer com isso.

Creio que eu não teria capacidade ou tempo de fazer isso se o jogo fosse mais complexo, tivesse gráficos 3D ou fosse *multiplayer* por exemplo, mas para as intenções que tenho para esse jogo é totalmente possível fazer do "zero" e sozinho.

Poderia fazer tudo isso numa *engine* e economizar tempo com coisas que já estão lá pronta? Poderia, mas foi justamente por querer aprender algo como OpenGL e mexer em coisas em mais baixo nível que eu comecei a fazer esse jogo. É algo que gosto muito de fazer e me anima. O jogo deve ser feito no ambiente que melhor te agrada, usando *engine* ou não, sabendo das vantagens de desvantagens que cada um oferece, e, para mim, fazer minha própria *engine* foi o que mais me agradou.

Usando uma *engine* pronta, você economiza bastante tempo com funcionalidades que ela te oferece. Porém, isso pode vir com a desvantagem de que ela é feita para propósito geral, atendendo às múltiplas funcionalidades que nem sempre é direto ao ponto para algo específico e simples que você quer. Fazendo minha própria *engine*, o código é focado em apenas nas coisas que preciso para o meu jogo e pensado no *workflow* que mais me satisfaz.

Cada um utiliza o ambiente e ferramentas que mais lhe deixa confortável para desenvolver e, para mim, essa foi a forma que mais me agradou para fazer este jogo.

Contudo, não estou fazendo exatamente tudo do "zero", por isso o uso das aspas. Estou utilizando algumas *libraries* que ajudam bastante e são muito boas. A seguir, vou falar um pouco de cada uma que escolhi usar para ajudar a fazer minha *engine*.

## SDL

![](https://cdn-images-1.medium.com/max/2000/0*EOcCgyVqaajcBq-G.png)

*Simple DirectMedia Layer* é uma *library open source* que fornece acesso ao teclado, mouse, áudio, controles, e a gráficos através do OpenGL. Ela tem suporte oficial para as principais plataformas como Windows, Mac, Linux, Android, iOS e outras plataformas também são suportadas através da ajuda da comunidade. Com isso, foi muito fácil compilar Indigo para Windows, Mac e Android sem muitos obstáculos. Além disso, pequenas e grandes empresas de jogos utilizam o SDL e [até financiam o desenvolvimento dessa *library*](https://www.patreon.com/posts/58563886). Há outras *libraries* parecidas como SFML, raylib, Allegro, mas acredito que a SDL é a mais utilizada e está melhor desenvolvida.

Já tenho brincado com ela há um tempo; é uma ótima biblioteca, e não vejo necessidade de ter que fazer isso do zero, pelo menos para o que eu quero, pois tem todas as funcionalidades básicas para você começar sua *engine*. Criar uma janela no Windows pode até não ser tão difícil, porém fazer isso e muitas outras funcionalidades para cada plataforma que você quer que seu jogo rode já é algo muito mais trabalhoso, pois cada plataforma tem um jeito diferente de fazer. Ela cuida muito bem dessas funções (criar janelas, pegar input do teclado/mouse/controle), o desenvolvimento é bem ativo e boa parte da indústria utiliza. Por esses fatores, eu escolhi utilizar essa *library*.

## **Dear ImGui**

![A utilização de Dear ImGui no Indigo](https://cdn-images-1.medium.com/max/2784/1*FEprVgJZtc8kkk8ii8uwDA.png)
<figcaption>A utilização de Dear ImGui no Indigo</figcaption>

Uma outra *library* que tem me ajudado bastante é a [*Dear ImGui*](https://github.com/ocornut/imgui), que é uma *library* para renderizar GUI (Graphical User Interface) de uma maneira muito fácil. Isso me ajuda a criar varias janelas para menus para alterar configurações da *engine*, dos objetos, gravidade, velocidade, mensurar o FPS, ou qualquer outra coisa que eu queira ter acesso fácil e visual dentro do jogo.

Gostei muito dela pois foi muito fácil integrar ao meu código e começar a criar a interface do jeitinho que quero.

Toda a documentação desta *library* está em um código com exemplo de todas as funcionalidades dela. Quer saber como criar um *combo box*? Tem um exemplo no código utilizando ela de forma simples e fácil de entender!

Perdi um bom tempo só brincando com as funcionalidades, testando o que é possível criar com ela e [até vendo o que os outros conseguem fazer com ela](https://github.com/ocornut/imgui/issues/4451). Recomendo muito!

## Cereal

![](https://cdn-images-1.medium.com/max/2000/0*7-t0Vu2c0aQHJi-n.png)

O jogo precisa salvar todas as informações em arquivos. Informações das configurações da *engine*, dos *levels*, dos objetos e muitas outras coisas. Para isso eu decidi utilizar [Cereal](https://uscilab.github.io/cereal/), que é uma *library header-only* em C++ para serializar dados em vários formatos diferentes como XML, JSON ou binário. Estou gostando bastante dela, pois é muito fácil de utilizar e faz muito bem o trabalho de salvar os dados. A única coisa que não gostei tanto foi que o tempo de compilação das partes do código que utiliza ela aumenta bastante.

Não estava nem um pouco afim de criar meu *serializer* e achei essa *library* e gostei bastante.

## **Lua scripts**

![Exemplo de um script Lua para um objeto (Shell/Casco)](https://cdn-images-1.medium.com/max/2000/1*XkdvAJ-a2sUsT-0CM_A7rQ.png)
<figcaption>Exemplo de um script Lua para um objeto (Shell/Casco)</figcaption>

A criação de fases não será limitada apenas aos *game objects* oficiais do jogo; será possível criar *game objects* customizados utilizando scripts Lua. Isso facilitará muito a criação de *mods* para o jogo. Com ele, é possível ter controle de tudo que o objeto faz, como ele reage a colisões, criar a própria física dele (ou usar o padrão), alterar os sprites/animações, instanciar novos objetos, etc. Há infinitas possibilidades de criações.

Explicando de forma bem rápida, Lua é uma linguagem de programação interpretada desenvolvida aqui no Brasil na PUC-Rio. É uma linguagem muito leve e fácil de "embbedar" no seu código. Seu código compilado (aquilo que você precisa "embeddar" na sua aplicação) tem por volta de 400 KB apenas! É uma linguagem muito rápida comparada às outras interpretadas como Javascript ou Python por exemplo. E é interpretada, ou seja, todo código é compilado em tempo de execução e roda de forma contida dentro de sua *Virtual Machine*, trazendo mais segurança para os scripts que você rodar de outras pessoas. Não é à toa que essa é uma linguagem amplamente usada para *mods* de jogos.

## **Slopes**

![](https://cdn-images-1.medium.com/max/2784/1*EGpWNDg8juYHb1n4DmoeVg.png)

A implementação mais recente do jogo foi *slopes* (rampas)! Há duas intensidades de inclinações. Olhando a captura de tela, a rampa à esquerda do personagem é mais leve e à direita mais íngrime. Futuramente, irei fazer um post detalhado sobre essa implementação!

## O que Indigo é no momento e para onde vai

![](https://cdn-images-1.medium.com/max/2000/1*i0PIhTPxYgWOvPdKSY3zEQ.png)
> Indigo é uma cor entre o azul e o violeta. É a cor da devoção, sabedoria, justiça e conhecimento. Atrelada à intuição e o que não é visto, é também considerada uma cor espiritual.
> Como muitas cores, indigo recebe o nome de objeto do mundo natural — a planta nomeada indigo utilizada para tingir roupas.

No momento, Indigo é um editor de fases que possuí alguns objetos como casco, *on/off switch*, espinhos, trampolim, canhão, cordas, etc. É possível criar/salvar/jogar fases, tem um sistema de *replay* das fases que você jogou, toda física/detecção de colisões foram feitas do zero, e é possível criar novos objetos utilizando scripts Lua. Com o personagem, é possível dar *dash*, *wall slide*, segurar e jogar objetos.

A ideia do jogo pronto é ser um jogo de plataforma 2D desafiador, com bastante fases e apenas um pouquinho de história. O editor de fases será liberado para os jogadores/jogadoras criarem e compartilharem suas próprias fases, tendo amplo suporte para *mods* através de scripts Lua. Acredito estar um pouco longe disso, mas vamos vendo como o jogo vai se moldando até lá.

Após terminar as funcionalidades básicas da *engine*, o foco será voltado para o *game design* e *level design*. É uma área que também gosto muito mas tenho muito a aprender ainda.

Futuramente, farei mais posts sobre assuntos específicos do desenvolvimento dele, como física, colisões, replay, *slopes*, *scripts* Lua, *texture atlas*, e muito mais.

Você pode acompanhar mais sobre o desenvolvimento do jogo me seguindo aqui no [Medium](https://guiks.medium.com/), no [Twitter](https://twitter.com/guilhermodsb), na minha página no [Itch.io](https://guiks.itch.io/) e na [Twitch](https://twitch.tv/guiks7).
