# Notes Project Test

Create a very simple blog API. Here is a list of definitions that will be used in this API:
● administrator is a User that has a SystemAdmin Role and has all access.
● account is a User that has an Account Role.
The API have to fulfill these requirements:
1. As a user, I can create a new account.
● New registered account will automatically have Account role
● Insert new row to user_roles
● Fetch accesses that related to Account role, and associate those accesses
with this new account that just created to user_accesses
2. As a user, I can create a new article.
● Article can be created only if logged in user has ArticleStore access.
● Once new article is created, return response with HTTP code 201 created
and the article object as response body.
● If logged in account does not have ArticleStore access, return response with
HTTP code 401 unauthorized.
3. As an administrator, I can remove access from an account
● the selected account will not have relation to selected access (delete data
from user_accesses)
● For example, it is possible that a user has Account role but doesn’t have
ArticleStore access
4. As an administrator, I can give a user ArticleAdminUpdate access
● that user will be able to update article that not created by that user.
5. As a user, I can update article.
● If logged in account has ArticleOwnerUpdate access and if that article is
created by logged in account, then article can be updated. Else, return
response with HTTP code 401 unauthorized.
● If logged in account has ArticleAdminUpdate access, then article can be
updated. Else return response with HTTP code 401 unauthorized.
● Once article is updated, return response with HTTP code 204 updated and
the article object as response body.

# Setup

1. Database : `postgre`
2. Postman documentation : https://documenter.getpostman.com/view/4064052/TVmS8vaX#9ff96a0c-a301-4aeb-96f9-750f7f44b357
3. Postman collection : https://www.getpostman.com/collections/e2f8e7d0d9d5d73e7cb3

# Seeder Detail
`
     private async initRoles(){
        await this.rolesRepository.save({
            id: 1,
            name: 'SystemAdmin'
        })

        await this.rolesRepository.save({
            id: 2,
            name: 'Account'
        })
    }

    private async initAccess(){
        await this.accessRepository.save({
            id: 1,
            name: 'ArticleStore'
        })

        await this.accessRepository.save({
            id: 2,
            name: 'ArticleAdminUpdate'
        })

        await this.accessRepository.save({
            id: 3,
            name: 'ArticleOwnerUpdate'
        })
    }

    private async initRoleAccess(){
        await this.roleAccessRepository.save({
            id:1,
            roleId: 2,
            accessId: 1
        })

        await this.roleAccessRepository.save({
            id:2,
            roleId: 2,
            accessId: 3
        })
    }

    private async initUser(){
        const salt = await bcrypt.genSalt()

        await this.userRepository.save({
            id: 1,
            fullName: "Ibid Admin",
            email: "admin@admin.com",
            password: await bcrypt.hash("admin",salt),
            gender: "L"
        })

        await this.userRoleRepository.save({
            userId: 1,
            roleId: 1,
        })

        await this.userRepository.save({
            id: 2,
            fullName: "Intotu Admin",
            email: "intotu@gmail.com",
            password: await bcrypt.hash("intotu",salt),
            gender: "Laki"
        })

        await this.userRoleRepository.save({
            userId: 2,
            roleId: 1,
        })

        await this.userRepository.save({
            id: 3,
            fullName: "Jaja Admin",
            email: "jaja@gmail.com",
            password: await bcrypt.hash("jaja",salt),
            gender: "Laki"
        })

        await this.userRoleRepository.save({
            userId: 3,
            roleId: 1,
        })
    }
`




<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
