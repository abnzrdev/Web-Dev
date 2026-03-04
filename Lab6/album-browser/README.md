# Album Browser – Routing & HTTP

This lab project builds an Angular 17 single-page application that browses albums and photos using client-side routing and HTTP calls to JSONPlaceholder.

## Features

- Angular routing between Home, About, Albums, Album Detail, and Album Photos views
- Data fetching with `HttpClient` and a shared `AlbumService`
- CRUD-style interactions against JSONPlaceholder endpoints:
  - Read albums
  - Read album details
  - Read album photos
  - Update album title
  - Delete album

## Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Start the development server:

	```bash
	ng serve
	```

3. Open your browser at:

	```
	http://localhost:4200/
	```

## Note on JSONPlaceholder Mutations

JSONPlaceholder simulates create/update/delete requests. Mutation requests return successful responses, but changes are **not persisted** on the server.
