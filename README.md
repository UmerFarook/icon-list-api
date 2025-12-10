# Icon Service – GraphQL API

This project is a minimal **GraphQL-based Icon Management Service**, built using:

- **Node.js**
- **graphql** (`buildSchema`)
- **Custom resolvers**
- **nanoid** for unique ID generation

It demonstrates how to define GraphQL object types, input types, enums, and mutations for creating and querying icon metadata. The backend stores data in-memory for simplicity, making it ideal for learning GraphQL fundamentals or prototyping UI icon tools.

---

## 🚀 Features

### ✔ GraphQL Types
- `Icon` – represents an icon  
- `IconSize` – holds size variants of an icon  
- `Sizes` enum – `SM`, `MD`, `LG`  
- Query: `getIcons(id: ID)`  
- Mutation: `setIcons(input: IconInput)`  

### ✔ Resolvers
Includes two primary resolvers:
- **getIcons**: Fetch a single icon by ID  
- **setIcons**: Create a new icon and return it  

### ✔ In-Memory Storage
Icons are stored inside an object acting as an in-memory database.

### ✔ Auto-generated IDs
Uses **nanoid** to generate unique IDs when new icons are created.

---

## Project Structure

```
.
├── schema.js         # GraphQL schema definition
├── resolvers.js      # Query + Mutation resolvers
├── server.js         # GraphQL execution (optional depending on setup)
└── README.md
```

---

## GraphQL Schema Overview

Your schema defines:

```graphql
type Icons {
  id: ID
  name: String
  defaultFontSize: Int
  color: String
  svgAvailable: Boolean
  sizesAvailable: [IconSizes]
}

type IconSizes {
  name: Sizes
  sizeInPX: String
}

enum Sizes {
  SM
  MD
  LG
}

type Query {
  getIcons(id: ID): Icons
}

input IconsInput {
  id: ID
  name: String
  defaultFontSize: Int
  color: String
  svgAvailable: Boolean
  sizesAvailable: [IconSizesInput]
}

input IconSizesInput {
  name: Sizes
  sizeInPX: String
}

type Mutation {
  setIcons(input: IconsInput): Icons
}
```

---

## Resolvers

### getIcons Resolver
Fetches a single icon by `id`.

```js
getIcons: ({ id }) => {
  const data = iconHolder[id];
  if (!data) return null;
  return new Icons(id, data);
}
```

### setIcons Resolver
Creates a new icon and stores it.

```js
setIcons: ({ input }) => {
  const id = nanoid();
  iconHolder[id] = { ...input };
  return new Icons(id, iconHolder[id]);
}
```

---

## Example Mutation (Create Icon)

```graphql
mutation {
  setIcons(input:{
    name: "ico_selection"
    defaultFontSize: 21
    color: "blue"
    svgAvailable: true
    sizesAvailable: [{ name: SM, sizeInPX: "12PX" }]
  }) {
    id
    name
  }
}
```

### Sample Response:

```json
{
  "data": {
    "setIcons": {
      "id": "b7Qp3F1x9W2_ZxLm8Kd0A",
      "name": "ico_selection"
    }
  }
}
```

---

## Example Query (Fetch Icon)

```graphql
{
  getIcons(id: "b7Qp3F1x9W2_ZxLm8Kd0A") {
    id
    name
    defaultFontSize
    color
    svgAvailable
    sizesAvailable {
      name
      sizeInPX
    }
  }
}
```

---

## Running the Project

### Install dependencies:

```bash
npm install
```

### Start your GraphQL server (example):

```bash
node server.js
```

Then open GraphiQL / Postman and run your queries.

---

## Notes

- Data is **not persistent** — everything resets when the server restarts.
- To turn this into a production API, you can swap the in-memory storage with:
  - MongoDB
  - PostgreSQL
  - Prisma
  - Redis
- Apollo Server or Yoga can be integrated for more scalability and middleware support.

---

## Project Purpose

This project serves as a:

- Learning tool for understanding **GraphQL schema design**
- Example of implementing **Queries + Mutations** with resolvers
- Lightweight backend prototype for **icon configuration tools**
- Starter template for developers transitioning into GraphQL

It is intentionally minimal, readable, and extendable.

---

## Next Steps (Optional Enhancements)

If you want to grow this project, consider adding:

- `updateIcon(id, input)` mutation
- `deleteIcon(id)` mutation
- Validation for icon sizes
- Persistent database support
- TypeScript types for schema + resolvers
- Apollo Federation compatibility
- REST → GraphQL migration patterns
