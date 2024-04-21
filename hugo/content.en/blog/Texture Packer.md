+++
author = "Guilhermo Barretti"
title = "Um Texture Packer simples"
date = "2024-04-20"
description = "Texture Packer"
tags = [
    "indigo",
]
categories = [
    "indigo",
]

showthedate = true
draft = true
+++

![](/images/TexturePacker.png)
<figcaption>Texture Packer em Indigo.</figcaption>

Hoje vou falar um pouco sobre como funciona o Texture Packer do Indigo. Esta foi uma forma rápida e simples de montar um texture packer bom o suficiente para o que eu preciso utilizando [cute_aseprite.h](https://github.com/RandyGaul/cute_headers/blob/master/cute_aseprite.h) e [stb_rect_pack.h](https://github.com/nothings/stb/blob/master/stb_rect_pack.h). Mas primeiramente…
<!--more-->

## O que é um Texture Packer?
Basicamente serve para agrupar várias texturas em uma grande imagem. Como meu jogo é em pixel art com tamanhos muito pequenos é possível utilizar apenas uma grande imagem contendo todos as texturas do jogo. 

## Por que juntar tudo em uma grande imagem? 
O maior motivo para juntar todas as texturas numa imagem grande é por causa de como a GPU funciona para renderizar elas. Não entrarei em detalhes nesse post pois não é o foco, mas basicamente em vez de carregar várias texturas separadas, agrupá-las em uma única imagem reduz as chamadas de renderização, o que pode melhorar significativamente o desempenho do jogo. Isso ocorre porque cada chamada para renderizar uma textura tem um custo computacional associado, e reduzir o número de chamadas pode resultar em uma execução mais suave do jogo.

## Qual foi a motivação de fazer esse Texture Packer?
Para criar a pixel art do meu jogo estou utilizando o Aseprite que é um ótimo programa com diversas funcionalidades que facilita muito a criação de pixel arts. Com ele você consegue criar *layers* para compor um frame (assim como no Photoshop), criar animações, podendo colocar tempo diferente para cada frame da animação, direção da animação (pra frente, pra trás, ping-pong) e se animação fica em loop infinito. Além de um monte de funcionalidades que fazem Aseprite ser um dos programas mais utilizados entre os pixel artistas.

É uma ferramenta que me ajuda muito, mas queria facilitar ainda mais o processo de inserir dentro do jogo o que eu crio nele. Gostaria que ao salvar um arquivo .aseprite contendo uma imagem ou uma animação, ela aparecesse automaticamente dentro do jogo pronto para uso. Sem ter que ficar exportando uma animação/imagem e adicionando isso manualmente para dentro do jogo.

<!-- <hr> -->
<div class="separator"></div>

## Como quero que funcione?
1. Ter uma única pasta contendo todos os arquivos .aseprite. Esses arquivos contém todas as imagens que serão utilizadas no jogo: texturas dos objetos, frames das animações e UI.
2. Checar se a pasta contém um arquivo novo adicionado.
3. Se tiver um arquivo novo adicionado, ler todos os arquivos .aseprite e carregar todas as informações na memória.
4. Ao ir carregando cada arquivo, identificar se ele representa uma textura ou uma animação.
5. Após carregar tudo, calcular como como posicionar todas essas imagens num pacote (uma grande imagem) de forma que melhor utilize o espaço.
6. Renderizar tudo numa grande textura.
7. Salvar a textura num arquivo e as referências com o nome e coordenadas para cada textura/animação dentro da imagem. No caso de animações salvar também as informações de cada frame, tempo de duração e repetição.

## Carregar os arquivos .aseprite com cute_aseprite.h
Começarei pela parte de abrir e carregar os arquivos *.aseprite* e deixarei a explicação de como checar automaticamente por arquivos adicionados na pasta por último.

Como dito no início, estou utilizando duas single file header libraries. A primeira é o [cute_aseprite.h](https://github.com/RandyGaul/cute_headers/blob/master/cute_aseprite.h). Ela é uma uma library que abre um arquivo *.aseprite* e carrega todo seu conteúdo. Nele você encontra os pixels de cada *layer*, de cada frame (que é a junção de todas as layers), as informações de cada animação e suas configurações (repeat, direção da animação, etc). 

Se você se interessar por como que um arquivo *.aseprite* é estruturado, você pode ver toda as especificações [aqui](https://github.com/aseprite/aseprite/blob/main/docs/ase-file-specs.md). Não entrarei em muitos detalhes pois cute_aseprite.h faz a parte mais difícil para a gente. 

O que eu preciso dentro do arquivo para mim são os pixels dos frames e as informações das animações.

Para carregar na memória um arquivo *.aseprite* basta fazer isso:

{{<highlight cpp>}}
ase_t* ase = cute_aseprite_load_from_file("player.aseprite", NULL);
{{</ highlight >}}

Com todo conteúdo carregado podemos acessar os elementos que nos interessa. Aqui está um pequeno exemplo para demonstrar:

{{< highlight cpp >}}
// Largura do frame
int w = ase->w;

// Altura do frame
int h = ase->h;

// Quantidade de frames
int frame_count = ase->frame_count;

for (int i = 0; i < frame_count; i++)
{
  // Todos os pixels do frame
  ase_color_t* pixels = ase->frames[i]->pixels;
  
  // Duração em milisegundos de um frame 
  // caso ele faça parte de uma animação
  int duration_milliseconds = ase->frames[i]->duration_milliseconds;
}

// Quantidade de animações
int tag_count = ase->tag_count;

for (int i = 0; i < tag_count; i++)
{
  // Conteúdo da animação
  ase_tag_t* animation = ase->tags[i];
  
  // Nome da animação
  char* animation_name = ase->tags[i]->name;
  
  // Índice do frame do início da animação
  int from_frame = ase->tags[i]->from_frame;
  
  // Índice do frame final da animação
  int to_frame = ase->tags[i]->to_frame; 
  
  // Repetição da animação
  int repeat = ase->tags[i]->repeat;
}
{{</highlight>}}

Esse exemplo é apenas para ilustrar a facilidade de pegar todas as informações do arquivo, pois por enquanto não estamos fazendo nada com elas.

Isso é tudo que utilizarei para cada frame e animação de um arquivo *.aseprite*. Essas estruturas possuem mais informações que não estarei utilizando, mas fique a vontade de ver o que mais tem nelas se você se interessar.

Tendo carregado todos os frames dos arquivos já seria possível renderizá-los numa imagem grande, porém tem um problema. Como faremos isso?

Queremos organizar o pacote de forma com o mínimo de área perdida, para que caiba o máximo número de texturas possível dentro. Fazer de qualquer jeito pode resultar em uma imagem com vários espaços vazios perdidos (ver imagem abaixo), o que não é bom pois queremos aproveitar o máximo de espaço possível.

![](/images/WrongPack.png "300px")
<figcaption>Ilustrando um Texture Pack com vários espaços vazios.</figcaption>

Esse é um problema complexo que não possui uma solução perfeita. Há diversos algoritmos que resolvem o problema, porém todos possuem vantagens e desvantagens. Para quem se interessar a entender melhor sobre o assunto de _Rect Packing_ tem um artigo bem interessante [aqui](https://www.david-colson.com/2020/03/10/exploring-rect-packing.html).

Para resolver esse problema estarei usando o stb_rect_pack.h. Que é uma solução simples e boa o suficiente para o que eu preciso.

## Rect Packing usando stb_rect_pack.h
O [stb_rect_pack.h](https://github.com/nothings/stb/blob/master/stb_rect_pack.h) é uma library que dado uma lista de retângulos ela agrupa eles dentro de um “pacote” com as dimensões que você definir de forma otimizada (não é perfeita, mas é bom o suficiente). Para isso ela utiliza o algoritmo _Skyline Bottom-Left_, onde o artigo que eu mencionei acima entra em mais detalhes de como funciona.

Um retângulo nessa library é definida da seguinte forma:

{{<highlight cpp>}}
struct stbrp_rect
{
  // Id será utilizado para gente associar
  // os frames lidos dos arquivos com os
  // retângulos utilizados pela library.
  int            id;

  // Tamanho do retângulo que representa um
  // frame. w = largura, h = altura
  stbrp_coord    w, h;

  // Após executar o packer, aqui será 
  // atribuído as coordenadas do retângulo 
  // dentro do pack.
  stbrp_coord    x, y;
  
  // Usado pela library para identificar
  // quais retângulos foram empacotados.
  // Se não foi possível empacotar o 
  // retângulo o valor será zero.
  int            was_packed;
};
{{</highlight>}}

Com isso, para cada frame criado pelo cute_aseprite eu crio um retângulo associado com as dimensões dele e por fim passo essa lista de retângulos para o stb_rect_pack.h. O resultado disso é que ele atribui as coordenadas para cada retângulo de forma que eles se encaixem no “pacote” (que será a imagem final).

{{<highlight cpp>}}
bool RectPack(stbrp_rect* rects_array, int rect_count)
{
  // O contexto que representa um pack
  // Necessário para iniciar o processo
  stbrp_context context;
  
  // Dimensão do pack (imagem final)
  int pack_size_width = 1024;
  int pack_size_height = 1024;
  
  // Nodes serão utilizados como um
  // armazenamento temporário pela library,
  // pois ela não utiliza nenhuma alocação
  // de memória.
  // É aconselhado que o nodeCount seja maior
  // que o pack_size_width.
  const int nodeCount = 4096*2;
  struct stbrp_node nodes[nodeCount];
  
  // Inicia o contexto de um rect pack com 
  // as dimensões e os nodes.
  stbrp_init_target(&context, pack_size_width, 
          pack_size_height, nodes, nodeCount);

  // Executa o algoritmo para empacotar todos
  // os retângulos dentro do pacote.
  // Retorna 1 se foi bem sucedido e 0 se falhou.
  if (stbrp_pack_rects(&context, rects_array, rect_count))
  {
    printf("Packed all rects.");
    return true;
  }
  
  printf("Could not pack all rects.");
  return false;
}
{{</highlight>}}

Sabendo a coordenada de cada frame, basta eu renderizar todos em uma imagem final e salvar em um arquivo.

## Montando a imagem final
Com as informações das coordenadas de todos os frames, conseguimos renderizar tudo em uma imagem final e salvar num arquivo PNG.

Minha engine utiliza SDL e estarei usando suas funcionalidades para montar essa imagem.

{{<highlight cpp>}}
void TexturePacker::SaveToFile()
{
  // Cria uma Surface com as dimensões do pacote.
  SDL_Surface* spritesheet_surface = SDL_CreateRGBSurfaceWithFormat(0, pack_size.x, 
          pack_size.y, 32, SDL_PIXELFORMAT_RGBA32);
  if (spritesheet_surface == NULL)
    SDL_LogError("spritesheet_surface error");
  
  // Percorre a lista de retângulos
  for (int i = 0; i < rects_info.size(); i++)
  {
    // Cria uma nova Surface com as dimensões do 
    // retângulo atual.
    SDL_Surface* frame_surface = SDL_CreateRGBSurfaceWithFormat(0, 
        (int) rects_array[i].w, (int) rects_array[i].h, 32, 
        SDL_PIXELFORMAT_RGBA32);
    
    // Copia os pixels do frame associado ao retângulo
    // para essa Surface.
    memcpy(frame_surface->pixels, rects_info[i].pixels_ptr, 
        rects_array[i].w*rects_array[i].h*4);
    
    // Transforma o retângulo usando no stb_rect_pack.h
    // num retângulo usado pelo SDL.
    SDL_Rect sdl_rect;
    sdl_rect.x = rects_array[i].x;
    sdl_rect.y = rects_array[i].y;
    sdl_rect.w = rects_array[i].w;
    sdl_rect.h = rects_array[i].h;
    
    // Copia os pixels da Surface desse retângulo
    // para a spritesheet_surface.
    SDL_UpperBlit(frame_surface, NULL, spritesheet_surface, &sdl_rect);
    
    // Libera a alocação.
    SDL_FreeSurface(frame_surface);
  }
  
  // Salva a Surface num arquivo PNG.
  if (IMG_SavePNG(spritesheet_surface, GetPath("graphics/spritesheet.png").c_str()) < 0)
    SDL_LogCritical("[TexturePacker] Save failed");
  else
    SDL_Log("[TexturePacker] Save successful");
  
  SDL_FreeSurface(spritesheet_surface);;
}
{{</highlight>}}

## Checando se há arquivos novos adicionados na pasta
Para checar se há arquivos novos adicionados estou utilizando uma forma bem simples, apesar de não cobrir todos os casos e ter como melhorar mais, para mim está bom o suficiente.

{{<highlight cpp>}}
int TexturePacker::ListAsepriteFiles(bool check_new_files)
{
	if (!check_new_files)
		SDL_Log("[TexturePacker] Get list of .aseprite files.");

	int count = 0;
	if (!fs::exists(path))
	{
		SDL_LogError("[TexturePacker] %s folder not found", path.c_str());
		return count;
	}

	// Go through all files in the folder
	for (auto &p : fs::recursive_directory_iterator(path))
	{
		if (p.path().extension() == ext)
		{
			file_name_list.push_back(p.path().stem().string());

			// Get file modification date
			// convert to gmt
			fs::file_time_type ftime = fs::last_write_time(p.path());
			std::time_t tt = to_time_t(ftime);
			std::tm *gmt = std::gmtime(&tt);

			// Update latest modification
			if (count == 0)
			{
				latest_modification = *gmt;
			}
			else
			{
				time_t t1 = mktime(gmt);
				time_t t2 = mktime(&latest_modification);
				if (difftime(t1, t2) > 0) // If positive, then tm1 > tm2
				{
					latest_modification = *gmt;
				}
			}

			std::stringstream buffer;
			buffer << std::put_time(gmt, "%A, %d %B %Y %H:%M");
			std::string formattedFileTime = buffer.str();
			count++;
		}
	}

	// Compare if there is new modifications
	// if it doesn't cancel TexturePacker
	time_t t1 = mktime(&latest_modification);
	time_t t2 = mktime(&Graphics::GetInstance()->game->settings.last_sprite_modification);
	
	// Last saved modification can be invalid
	// if it's then set date manually to an
	// old date
	if (t2 < 0)
	{
		std::tm new_tm;
		new_tm.tm_year = 91;
		new_tm.tm_mon = 8;
		new_tm.tm_mday = 23;
		new_tm.tm_hour = 15;
		new_tm.tm_min = 35;
		new_tm.tm_sec = 0;
		new_tm.tm_isdst = 0;

		Graphics::GetInstance()->game->settings.last_sprite_modification = new_tm;
		t2 = mktime(&new_tm);
	}
	if (check_new_files)
	{
		if (difftime(t1, t2) > 0) // If positive, then tm1 > tm2
		{
			SDL_Log("[TexturePacker] New sprites modification found!");
		}
		else
		{
			std::stringstream buffer;
			buffer << std::put_time(&(Graphics::GetInstance()->game->
				settings.last_sprite_modification), "%A, %d %B %Y %H:%M");
			std::string formattedFileTime = buffer.str();
			// SDL_Log("[TexturePacker] No new sprite modification found. 
			//		Last save modification: %s ", formattedFileTime.c_str());
			file_name_list.clear();
			return 0;
		}
	}
	return count;
}
{{</highlight>}}

## Juntando tudo

<div class="separator"></div>

## Utilizando
![](/images/TextureAtlas.png)
<figcaption>Texture Atlas contendo todas as animaçoes e texturas do jogo.</figcaption>

Com isso basta eu buscar dentro da engine pela textura. Para organizar isso fiz da seguinte forma: arquivos contendo apenas um frame é uma textura e seu nome é igual ao nome do arquivo (sem a extensão). Arquivos contendo animações com apenas um frame também são texturas e seu nome é _________. E por fim os arquivos com animações com mais de um frame são animações.

Inserir código que faz isso

Escolhi dessa forma pois é possível ter arquivos com múltiplas texturas de um mesmo objeto agrupado num mesmo arquivo. Criar animações com um único frame. Por exemplo as texturas da Glove. Eu preciso de várias texturas para cada direção _(Daria pra apenas rotacionar a imagem porém as sombras não ficariam corretas)_. Como o nome do arquivo é Glove, o nome de cada textura fica como nome do arquivo + nome da animação.

![](/images/Glove.png "70%")

Então no codigo de um objeto posso simplesmente fazer:

{{<highlight cpp>}}
Texture my_texture = Atlas->GetTexture(“Glove_Right”);
{{</highlight>}}

Tudo isso apenas salvando o arquivo na pasta certa.

## Conclusão
Talvez isso tudo parece muito trabalho, porém foi bem rápido de se fazer, graças as duas libraries que facilitam muito todo o processo. Na verdade eu gastei mais tempo escrevendo esse post do que implementando tudo.

Você encontra todo o código fonte do Texture Packer da minha engine [aqui](https://gist.github.com/GuilhermoBarretti/1b7336d84e77ff76882104f8eb3377ed).
