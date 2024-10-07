1 - Primeiro irei instalar as dependencias necessárias para o projeto, usando: npm install @tailwindcss/aspect-ratio@^0.4.2 @tailwindcss/forms@^0.5.9 @tailwindcss/typography@^0.5.15 @tanstack/react-query@^4.36.1 @tanstack/react-query-devtools@^4.36.1 axios@^1.7.7 next@^14.2.14 react@^18.3.1 react-dom@^18.3.1 react-icons@^5.3.0;

2 - Após a instalção das dependencias irei modificar meu arquivo layout para eu poder utilizar as ferramentas do Tanstack Query. Após isso, irei criar meu contexto de autenticação que irá propagar os dados meu usuário por toda aplicação. Irei criar uma pasta types para abrigar os tipos das entidades e payloads. Após isso irei, irei criar uma pasta service que irá abrigar todos os serviços da minha aplicação, incluido uma instancia do axios para requisições;

3 - Irei criar uma pasta "components" que irá obter os compenentes que serão reutilizados por toda a aplicação. Logo após isso, irei criar uma pasta hooks que irá abrigar os componentes de query que podem ser reutilizados;

4 - Após a criação dos componentes, irei criar a tela de login;

5 - Agora irei modificar o arquivo "Home" para conter os componentes sidebar e stationList;

6 - Após isso, irei criar os formulários de edição e deleção de radio da lista. Irei instalar as dependencias formik e yup para manipulação e validação dos formulários;

7 - Fiz umas melhorias refatorando o código de formulário de login e adicionando um toast para exibir mensagens;

8 - Agora irei implementar uma alteração necessária que fiz no back-end, para melhorar a ação de adicionar rádio à lista;
