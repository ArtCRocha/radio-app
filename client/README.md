# Radio Browser App - This is a challenge by [Coodesh](https://coodesh.com/)

### Acessar o Sistema

Uma aplicação web que permite aos usuários explorar, ouvir e gerenciar suas rádios favoritas.
[Clique aqui para acessar o sistema](https://radio-app-arthur-rocha.vercel.app/)

## Tecnologias Utilizadas

- **Linguagens**: TypeScript e C#
- **Framework**: Next.js e .NET 8
- **Bibliotecas**: Axios, Tanstack Query, React Icons, React Toastify, Formik, Yup, AutoMapper, AutoMapper.Extensions.Microsoft.DependencyInjection, BCrypt.Net-Next, DotNetEnv, MediatR, Microsoft.AspNetCore.Authentication.JwtBearer, Microsoft.AspNetCore.JsonPatch, Microsoft.EntityFrameworkCore, Microsoft.EntityFrameworkCore.Design, Microsoft.EntityFrameworkCore.Relational, Microsoft.VisualStudio.Azure.Containers.Tools.Targets, Npgsql.EntityFrameworkCore.PostgreSQL, Swashbuckle.AspNetCore e System.IdentityModel.Tokens.Jwt
- **Estilização**: Tailwind CSS

## Instalação e Uso

### Pré-requisitos

- Node.js instalado
- Projeto Supabase configurado para banco de dados (opcional)

### Instalação

1. **Clone o repositório:**

   git clone https://github.com/ArtCRocha/radio-app.git
   cd radio-browser-app

2. Instale as dependências:

   npm install

3. **Crie um arquivo `.env` com suas variável de ambiente `NEXT_PUBLIC_API_URL`, sendo o valor a url da api disponibilizada à você.**
4. **Execute a aplicação em modo de desenvolvimento:**

   npm run dev

5. **Acesse a aplicação:**
   Abra o navegador e vá para `http://localhost:3000`.

## Relatório de Desenvolvimento Por Commits

1 - Primeiro irei instalar as dependencias necessárias para o projeto, usando: npm install @tailwindcss/aspect-ratio@^0.4.2 @tailwindcss/forms@^0.5.9 @tailwindcss/typography@^0.5.15 @tanstack/react-query@^4.36.1 @tanstack/react-query-devtools@^4.36.1 axios@^1.7.7 next@^14.2.14 react@^18.3.1 react-dom@^18.3.1 react-icons@^5.3.0;

2 - Após a instalção das dependencias irei modificar meu arquivo layout para eu poder utilizar as ferramentas do Tanstack Query. Após isso, irei criar meu contexto de autenticação que irá propagar os dados meu usuário por toda aplicação. Irei criar uma pasta types para abrigar os tipos das entidades e payloads. Após isso irei, irei criar uma pasta service que irá abrigar todos os serviços da minha aplicação, incluido uma instancia do axios para requisições;

3 - Irei criar uma pasta "components" que irá obter os compenentes que serão reutilizados por toda a aplicação. Logo após isso, irei criar uma pasta hooks que irá abrigar os componentes de query que podem ser reutilizados;

4 - Após a criação dos componentes, irei criar a tela de login;

5 - Agora irei modificar o arquivo "Home" para conter os componentes sidebar e stationList;

6 - Após isso, irei criar os formulários de edição e deleção de radio da lista. Irei instalar as dependencias formik e yup para manipulação e validação dos formulários;

7 - Fiz umas melhorias refatorando o código de formulário de login e adicionando um toast para exibir mensagens;

8 - Agora irei implementar uma alteração necessária que fiz no back-end, para melhorar a ação de adicionar rádio à lista;

9 - Tive que refatorar o componente ProtectedPages, pois ele só verificava se estia o token no localStorage, mas se o token do servidro expirar, ele permitia ainda acessar a home;

10 - Adição de informações no README de como rodar o projeto e criaçaõ do arquivo .env;

11 - O localStorage não pode ser interpretado no lado do servidor, por isso tive realizar umas mudanças no meu contexto, verificando se o tipo de ambiente acessado é na parte do client e criando um estado que vai gerenciar a inicialização do token;

12 - Acabei de fazer o deploy da minha aplicação na Vercel. Disponibilizei o link no topo do documento.
