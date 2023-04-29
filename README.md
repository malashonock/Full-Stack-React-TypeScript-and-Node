# Forum App

This app is based on, and inspired by, the respective main task of the book "Full-Stack React, Typescript, and Node" by Packt.
Despite being based on some of the code snippets from the original book, most of the app's codebase was written independently.

## Borrowings from the original book

- App features list (as well as what the app is _not_ capable of)
- App styling (and some CSS rules)

## Different, new & enhanced parts, added on top

- Latest lib versions used (e.g. GraphQL implementation is now different as compared to the one in the book)
- Many minor naming differences (route paths, model naming, etc.)
- Form and Field components, useForm hook and the overall approach to building forms (in the original, it's far from DRY)
- Custom form validation (written from scratch, zero dependencies)
- Fully implemented REST API server (in the book, only the beginnings were implemented for illustration, most focus was given to GraphQL)
- Fully implemented REST client (again, the book followed the GraphQL path)
- Typed Express controllers
- Set up monorepo, shared code (types, validation) moved to shared packages and installed as dependencies as needed
- Shared types: form fields, DTOs
- Shared validation: validators used both on server and client
