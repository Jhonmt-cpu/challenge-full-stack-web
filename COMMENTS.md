# Avisos importantes e instruções para uso do projeto

1.O banco de dados usado foi o PostgresSQL

2.Primeiramente use o comando yarn ou npm install para instalar todas as dependências do projeto tanto na pasta "backend" como "frontent"

3.Depois crie na raiz da pasta "backend" o arquivo **ormconfig.json** de acordo com o arquivo **ormconfigexample.json** que deixei na raiz do projeto substituindo os campos necessários no caso os campos "username" e "password" ou o "host" e "port" caso seu banco não rode na porta 5432 no localhost.

4.Agora vá no seu gerenciador de banco de dados Postgres e crie uma nova database chamada "challenge"

5.Em seguida execute o comando "npm run typeorm migration:run" ou "yarn typeorm migration:run" na pasta "backend" para que seja criada a tabela na database challenge que você criou

6.Por fim, para iniciar a api use o comando "npm run dev:server" ou "yarn dev:server" na pasta "backend" que ele inicirá a API na porta 3333 e para iniciar o front-end execute o comando "npm run serve" ou "yarn serve" na pasta "frontend"

# Decisão de arquitetura utilizada

Para a contrução da Api do desafio segui a arquitetura (Domain Driven Design) aplicando alguns conceitos SOLID. Utilizei o DDD pois com ele eu consigo tornar a escalabilidade e manuntenção da API mais simples com a separação da camada de domínio da camada de infra. Conseguindo alterar requisitos não funcionais sem alterar as regras de negócios da API. Além de deixar o código mais simples e definido em cada service.

# Lista de bibliotecas de terceiros

* cors
* express
* express-async-errors
* pg
* reflect-metadata
* tsyringe
* typeorm
* uuid

PS: Também utilizei as libs eslint, prettier e typescript como dependências de desenvolvimento.

# O que você melhoraria se tivesse mais tempo

1. Adicionaria uma validação de dados que vem do frontend, por mais que o front já faça isso.

2. Colocaria um sistema de cache usando o redisdb, para reduzir o número de querries feitas no banco e acelerar o processo de busca de resultados.

3. Faria uma interface mais otimizada em relação a requisições feitas no banco.

4. Adicionaria um limitador de requisições para barrar algo/alguém que tente derrubar o server por ataque de brute force.
