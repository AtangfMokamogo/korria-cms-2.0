<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="/minimalistickorria.jpeg" alt="Project logo"></a>
</p>

<h3 align="center">korria-cms-2.0</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

This is Korria Headless CMS API version 2. See the first version [here](https://github.com/AtangfMokamogo/korria-cms)

---

## 📝 Table of Contents

- [Introduction](#introduction)
- [About Version 2.0](#about)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 Introduction <a name = "introduction"></a>

Korria-cms-2.0 is an implementation of a minimal headless CMS. This version aims to solve the pain points encountered with using and tesing the [first version](https://github.com/AtangfMokamogo/korria-cms) `now refered to as Korria-1.0 going forward`.

## 🏁 Why version 2 <a name = "about"></a>

Korria-1.0 was developed as REST API. While the key features requested were successfully implemented, it became apparent during testing that the project and its growth would be severely limited by the common problems associated with fetching data from a REST API. One of the the problems that was outstanding was `under-fetching` content details. :

- **Under fetching**
Since getting the two supported types of data (image and text) was limitted to respective endpoints, getting extra information, for example details about the project owner, meant successive requests to the Content server, This can become quite tedious if you need more and more data not returned by previous queries.

> packaging all the required information into an endpoint could be one way of solving this but now we would have too much data coming in one endpoint **(Overfetching another classic REST problem)**

#### REST to GraphQL

The above qouted problem and some other **see** [![GitHub Issues](https://img.shields.io/github/issues/atangfmokamogo/korria-cms)](https://github.com/atangfmokamogo/korria-cms/issues) made me realise that i needed to implement a new way of fetching data from the CMS.

The biggest change was switching from REST to a GraphQL API, such a change necessitated the version jump to 2.0 and an entirely new repository to house the code. Since the new implementation, problems like underfetching or even over-fetching have been solved.

### Progress:

- Account setup and authentication features have been added

- Currently base queries to fetch content types and defined parcels (`parcels are a content modelling tool for korria. They defined a group of content types under a single name, for example a basic Blog Post parcel may contain a heading text, an image/s and a blog body. all these are different form of content, text, image and text respectively grouped under one parcel type`) have been implemented. You can form a single GraphQL query to fetch all these different types. (once documentation is ready i will link the demo [here]())

- You can also add new parcels, create new text content and new projects as the query mutations to define those types have been implemented.

### Current issues:

- **Multipart/form-data** request are not supported out of the box with GraphQL, while there are some packages that deal with the issue, none offer a meaning full approach that fits perfectly into the code architecure of Korria-CMS-2.0. As such i will explore the possibility of creating a separate image and video media server that handles upload and valaidation of images and other supported media.
This approach allows me to implement a full featured content validation and security measures on a separate server without fighting with the core architecture of the main GraphQl server.
**One potential issue** with this is that we will have two separte servers that users will have to deal with, but since the plan is to develop a management dashboard afterwards i think we will use that to abstract this complexity away from the user.

- **Resolving MongoDB queries into supported GrapQL fields is not yet fully functional without an indirect work around**. While most qury types are set up to mirror the data returned from the server, the parcel type that has a lot of relations to other types is still quite a challenge to resolve. there are nested fields in the mongoDB results that the GraphQL reslover cant acces, one work around albeit temporary was to build the data from mongoDB into an object that the GraphQL query resolvers can parse

## Getting started

:exclamation: `Once all features of Korria-1.0 have been ported to Korria-2.0 a comprehensive guide on how to install and deploy the API will be available`

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [ApolloGraphQL](https://www.apollographql.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@atangfmokamogo Github](https://github.com/atangfmokamogo)
- [@atangfmokamogo LinkedIn](www.linkedin.com/in/atang-mokamogo-955610253)

See also the list of [contributors](https://github.com/atangfmokamogo/korria-cms-2.0/contributors) who participated in this project.

## 🎉 [Acknowledgements](https://github.com/AtangfMokamogo/korria-cms#-acknowledgements-) <a name = 'acknowledgement'></a>

- [ApolloGraphQL](https://www.apollographql.com/docs/) documentation.
