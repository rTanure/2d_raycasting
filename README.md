# Ray Casting
[Rodar o projeto](https://rtanure.github.io/2d_raycasting/)
## O que é o Ray Casting.
Ray casting é um algoritmo utilizado para a sintetização de imagens 3d com base no lançamento de vetores que partem de um ponto central em diversas direções, retornando, caso haja alguma colisão com um objeto em determinada coordenada, as informações desse evento.
## Sobre o projeto.
Esse projeto consiste em um ponto central que dispara raios em diversas direções até encontrarem com alguma parede presente no banco de dados da aplicação.
## Como o código funciona.
### Visão Geral
- O algoritmo, no geral, gira em torno de duas classes, a "Wall" e a "Ray" que são inseridas de acordo com a quantidade estabelecida para cada uma para dento de dois Arrays presentes no código, o "walls" e o "ray".
- A primeira classe tem a função apenas de receber as coordenadas de ambos os pontos que formarão a parede em questão, assim como retornar uma função responsavel por desenhar aquela parede. 
- Já a segunda classe é responsavel por guardar as informações do Array, como o seu ponto de origem, a sua direção, o seu alvo final, dentre outras informações, assim como retornar uma função para desenhar aquele raio e outra para calcular a colisão daquele raio com alguma parede presente no Array "walls".
### Wall
- Classe responsavel por armazenar as informações e funções referentes a uma unica parede.
- A quantidade de paredes que serão simuladas pode ser alterada por meio do input presente a baixo do canvas, podendo variar entre 1 e 10.
- De acordo com a quantidade de paredes que serão geradas, coordenadas aleatorias são calculadas para cada ponto da reta e um objeto herdando as propriedades da classe wall é inserido dentro do Array walls para ser acessada posteriormente.
