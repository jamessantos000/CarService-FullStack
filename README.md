
# CarService

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![macOS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0)


O projeto em questão é uma aplicação CRUD (Create, Read, Update, Delete) que tem como objetivo fornecer um sistema para gerenciamento de carros e seus respectivos defeitos. Com este sistema, é possível cadastrar novos carros, registrar os defeitos apresentados por cada veículo, atualizar informações existentes e excluir dados desnecessários.

Por meio da interface do CRUD, o usuário tem acesso a um conjunto de funcionalidades que facilitam a administração do sistema. Entre elas, destacam-se a pesquisa de informações específicas por modelo, fabricante e/ou defeito.

O front-end da aplicação foi desenvolvido em React, uma biblioteca JavaScript, o back-end foi desenvolvido em Laravel, um framework PHP e por fim, o banco de dados utilizado é o MySQL, um dos sistemas de banco de dados mais populares conhecido por sua confiabilidade, segurança e desempenho.

    React - Utilizado para o FrontEnd
        Axios - Solicitações HTTP para o back-end
    PHP
        Laravel - Foi utilizado o framework para toda estrutura back-end
    MySQL - Banco de dados padrão para servir toda aplicação
    Git/Github - Usado para publicação do projeto nesssa plataforma
    Docker - Toda estrutura foi possibilitada a rodar em Containers com base em imagens personalizadas

#### Algumas coisas que foram utilizadas...

# FRONTEND
        Js/React
        Hooks
        Lottie
        Axios
        Condicional Ternário
        Modal
        Rotas
        Map
        JSON
# BACKEND
        Php/Laravel
        Rotas
        Parametro de Rotas
        Eloquent
        QueryException
        Facade
        JSON

## Como executar o projeto
#### Siga o passo a passo na mesma ordem descrita !


    CRIACAO DE REDE
        docker network create rede-carservice

### Cada comando deve ser executando dentro da respectiva pasta

## MySQL - CarServiceMySQL
    PARA CRIAR O BANCO DE DADOS
        docker build -t mysql-carservice .
    PARA EXECUTAR
        docker run --name MySQL-CarService --network rede-carservice -d -p 3306:3306 mysql-carservice

## Front - CarServiceReact
    PARA CRIAR O FRONTEND
        docker build -t front-carservice .
    PARA EXECUTAR
        docker run --name Front-CarService -d -p 3000:3000 front-carservice

## Back - CarServiceLaravel
    PARA CRIAR O BACKEND
        docker build -t back-carservice .
    PARA EXECUTAR	
	    docker run --name Back-CarService --network rede-carservice -p 8000:8000 -v $(pwd):/var/www/html back-carservice
    NO TERMINAL DO CONTAINER, # php artisan key:generate
