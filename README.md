# FriendZone: App

Recentemente, diversas plataformas de redes sociais anônimas têm optado por se distanciar das grandes redes consolidadas. As motivações para essa mudança são variadas, desde a evolução no modelo de interação dos usuários até as preocupações com a privacidade e a busca por alternativas mais independentes.

## Sobre o FriendZone

![](https://i.ibb.co/G0y9CHJ/Screenshot-20231125-192426-Expo-Go.jpg)
![](src="https://i.ibb.co/sggM78R/Screenshot-20231125-192413-Expo-Go.jpg)
![](https://i.ibb.co/rwvBM2Z/Screenshot-20231126-193906-Friend-Shoulder.jpg)
![](src="https://i.ibb.co/5c638WT/Screenshot-20231129-002525-Expo-Go.jpg)

O FriendZone: App é um aplicativo destinado a pessoas que se preocupam em manter a privacidadede seus dados, onde o usuário pode relatar experiência, desabafar, buscar ajuda, conversar, dentre outros, sem se preocupar em expor algum dado seu para ser publico.

### Como o aplicativo funciona
- O aplicativo é feito utilizando a linguagem Typescript.
- O aplicativo funciona junto ao aplicativo em Java Springboot que por sua vez funciona ao lado do servidor.
- A comunicação com o servidor se dá usando métodos HTTP para criar e listar publicações.
- Além disso o aplicativo se comunica com o servidor a partir de WebSocket para enviar e receber mensagem dos usuários, onde as mensagens recebidas são armazenadas no celular do usuário. Apenas mensagens não recebidas são alocadas temporariamente no servidor enquanto o usuário destinatário não se comunique com o servidor (offline).
- É possível comentar as publicações dos usuários em tempo real utilizando WebSockets e paralelamente o comentário é salvo ao lado do servidor.
- O login de usuário é feito a partir do serviço OAuth2 da Googgle junto a API WebBrowser do React Native. (Em Andamento).

## Como executar o App

- Tenha o serviço Expo CLI em sua máquina. Faça login na sua conta (se preferir).
- Tenha o aplicativo [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt&gl=US&pli=1) instalado no seu celular para se comunicar com o serviço Expo CLI. Faça login no aplicativo (se preferir).
- Execute o comando do diretório do projeto: > npx expo --clear
- Execute o aplicativo Java Springboot do FriendZone para que o App do FriendZone possa se comunicar com o servidor. (Os passos estão disponíveis aqui: [FriendZone](https://github.com/LeviJunior21/FriendZn)).
- Abra o aplicativo Expo Go no seu celular. Caso seu esteja logado com a mesma conta logada no terminal, então aparecerá automaticamente o endereço para rodar o aplicativo. Caso não esteja logado, abra a opção de ler QRCode e aponte seu celular para o QRCode mosrado no terminal.
- Como o OAuth2 está em andamento, isso não é um problema. Vá no diretŕoio do FriendZone Java Springboot e execute o comando (go run RunApiRest.go), ele criará um usuário temporário, publicações e comentários. Você pode criar quantos usuários desejar. O ID temporário usado pelo App é igual a 1, então o primeiro usuário criado é o seu.

### Segunda forma de usar (não recomendado ainda).
#### Ainda não é recomendável pois o servidor está em desenvolvimento e é preciso habilitar o CORS para permitir requisições vindos de outros endereços além do padrão que é usado pelo roteador do usuário.
- Executar no terminal para construir o APK: eas build -p android --profile preview
- Aguarde o EAS CLI construir o aplicativo, você pode acompanhar a construção em tempo real visualizando os LOGS
- Quando terminar a construção ele mostrará tanto no terminal, quanto no link de construção o link de Download do APK.
- Instale o APP e rode o Java Springboot.
- Execute o aplicativo. Pronto!
