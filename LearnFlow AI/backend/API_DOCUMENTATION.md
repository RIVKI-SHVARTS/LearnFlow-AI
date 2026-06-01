# LearnFlow AI — Backend API Documentation

Base URL: `http://<host>:5000`

## Endpoint Summary

| Method | Path | Description | Authentication | Request Body | Response Example |
|--------|------|-------------|----------------|--------------|------------------|
| GET | `/users/` | List all users | Admin only (JWT) | — | `[ { "id": "...", "name": "Alice", "phone": "0501234567", "is_admin": false } ]` |
| GET | `/users/<user_id>` | Get user by ID | JWT (owner or admin) | — | `{ "id": "...", "name": "Alice", "phone": "0501234567", "is_admin": false }` |
| GET | `/users/phone/<phone>` | Get user by phone | Public | — | `{ "id": "...", "name": "Alice", "phone": "0501234567", "is_admin": false }` |
| POST | `/users/login` | Login with phone + username; returns JWT | Public | `{ "phone": "0501234567", "name": "Alice" }` | `{ "token": "<jwt>", "user_id": "...", "name": "Alice", "is_admin": false }` |
| POST | `/users` | Register new user | Public | `{ "name": "Alice", "phone": "0501234567" }` | `{ "id": "...", "name": "Alice", "phone": "0501234567", "is_admin": false }` |
| PATCH | `/users/<user_id>` | Update user's profile (name/phone) | JWT (owner or admin) | `{ "name": "New Name", "phone": "05..." }` | `{ "message": "User updated" }` |
| DELETE | `/users/<user_id>` | Delete user | JWT (owner or admin) | — | `{ "message": "User deleted" }` |
| GET | `/users/admin` | Simple admin access check | Admin only (JWT) | — | `{ "message": "Admin access confirmed", "user_id": "..." }` |
| GET | `/categories/` | List all categories | Public | — | `[ { "id": "...", "name": "Math" } ]` |
| GET | `/categories/<category_id>` | Get a category | Public | — | `{ "id": "...", "name": "Math" }` |
| POST | `/categories/` | Create a category | Admin only (JWT) | `{ "name": "New Category" }` | `{ "id": "...", "name": "New Category" }` |
| PATCH | `/categories/<category_id>` | Rename a category | Admin only (JWT) | `{ "name": "Updated Name" }` | `{ "message": "Category updated successfully" }` |
| DELETE | `/categories/<category_id>` | Delete a category | Admin only (JWT) | — | `{ "message": "Category deleted successfully" }` |
| GET | `/sub-categories/` | List all sub-categories (optional `?category_id=` filter) | Public | — | `[ { "id":"...","name":"Algebra","category_id":"..." } ]` |
| GET | `/sub-categories/<sub_cat_id>` | Get sub-category by ID | Public | — | `{ "id":"...","name":"Algebra","category_id":"..." }` |
| POST | `/sub-categories/` | Create sub-category | Admin only (JWT) | `{ "name": "Topic", "category_id": "<category_id>" }` | `{ "id":"...","name":"Topic","category_id":"..." }` |
| PATCH | `/sub-categories/<sub_cat_id>` | Update sub-category (name or parent) | Admin only (JWT) | `{ "name": "New", "category_id": "..." }` | `{ "message": "Sub-category updated" }` |
| DELETE | `/sub-categories/<sub_cat_id>` | Delete sub-category | Admin only (JWT) | — | `{ "message": "Sub-category deleted" }` |
| POST | `/prompts/generate` | Generate a lesson via AI and save prompt | JWT required | `{ "user_id": "...", "category_id": "...", "sub_category_id": "...", "topic": "Describe X" }` | `{ "id": "...", "prompt": "Describe X", "response": "<lesson text>", "user_id": "...", "category_id": "...", "sub_category_id": "...", "created_at": "2026-..." }` |
| GET | `/prompts/` | List all prompts | Public | — | `[ { "id":"...","prompt":"...","response":"...","user_id":"...","created_at":"..." } ]` |
| GET | `/prompts/<prompt_id>` | Get a prompt by ID | Public | — | `{ "id":"...","prompt":"...","response":"...","user_id":"...","created_at":"..." }` |
| GET | `/prompts/history/<user_id>` | Get prompt history for a user | JWT required | — | `[ { "id":"...","prompt":"...","response":"...","created_at":"..." } ]` |
| DELETE | `/prompts/<prompt_id>` | Delete a prompt | Public (no auth enforced) | — | `{ "message": "Prompt deleted" }` |

---

## Detailed endpoint descriptions

### Users

#### GET /users/
- Method: GET
- Path: `/users/`
- Description: Return a list of all registered users.
- Authentication: Admin only (JWT)
- Request body: none
- Response example:

```json
[
  { "id": "60f7b2...", "name": "Alice", "phone": "0501234567", "is_admin": false }
]
```

---

#### GET /users/<user_id>
- Method: GET
- Path: `/users/<user_id>`
- Description: Fetch a single user's public profile. Caller must be the user themself or an admin.
- Authentication: JWT required (owner or admin)
- Request body: none
- Response example:

```json
{ "id": "60f7b2...", "name": "Alice", "phone": "0501234567", "is_admin": false }
```

---

#### GET /users/phone/<phone>
- Method: GET
- Path: `/users/phone/<phone>`
- Description: Look up a user by phone number (used by frontend login flow).
- Authentication: Public
- Request body: none
- Response example:

```json
{ "id": "60f7b2...", "name": "Alice", "phone": "0501234567", "is_admin": false }
```

---

#### POST /users/login
- Method: POST
- Path: `/users/login`
- Description: Login endpoint using phone + username only. If match, issues JWT containing `user_id` and `is_admin`.
- Authentication: Public
- Request body:

```json
{ "phone": "0501234567", "name": "Alice" }
```

- Response example:

```json
{
  "token": "<JWT_TOKEN>",
  "user_id": "60f7b2...",
  "name": "Alice",
  "is_admin": false
}
```

Notes: Store returned token client-side and send as `Authorization: Bearer <token>`.

---

#### POST /users
- Method: POST
- Path: `/users`
- Description: Register a new user with `name` and `phone`.
- Authentication: Public
- Request body:

```json
{ "name": "Alice", "phone": "0501234567" }
```

- Response example:

```json
{ "id": "60f7b2...", "name": "Alice", "phone": "0501234567", "is_admin": false }
```

---

#### PATCH /users/<user_id>
- Method: PATCH
- Path: `/users/<user_id>`
- Description: Update user's profile fields (`name`, `phone`). Only the owner or admin may update.
- Authentication: JWT required (owner or admin)
- Request body (any of):

```json
{ "name": "New Name", "phone": "0507654321" }
```

- Response example:

```json
{ "message": "User updated" }
```

---

#### DELETE /users/<user_id>
- Method: DELETE
- Path: `/users/<user_id>`
- Description: Remove a user account. Owner or admin only.
- Authentication: JWT required (owner or admin)
- Request body: none
- Response example:

```json
{ "message": "User deleted" }
```

---

#### GET /users/admin
- Method: GET
- Path: `/users/admin`
- Description: Simple admin-only check endpoint used by frontend to validate admin privileges.
- Authentication: Admin only (JWT)
- Request body: none
- Response example:

```json
{ "message": "Admin access confirmed", "user_id": "60f7b2..." }
```

---

### Categories

#### GET /categories/
- Method: GET
- Path: `/categories/`
- Description: List all categories.
- Authentication: Public
- Request body: none
- Response example:

```json
[ { "id": "c1", "name": "Math" }, { "id": "c2", "name": "Science" } ]
```

---

#### GET /categories/<category_id>
- Method: GET
- Path: `/categories/<category_id>`
- Description: Fetch a single category by ID.
- Authentication: Public
- Request body: none
- Response example:

```json
{ "id": "c1", "name": "Math" }
```

---

#### POST /categories/
- Method: POST
- Path: `/categories/`
- Description: Create a new top-level category. Admin only.
- Authentication: Admin only (JWT)
- Request body:

```json
{ "name": "New Category" }
```

- Response example:

```json
{ "id": "c3", "name": "New Category" }
```

---

#### PATCH /categories/<category_id>
- Method: PATCH
- Path: `/categories/<category_id>`
- Description: Update category name. Admin only.
- Authentication: Admin only (JWT)
- Request body:

```json
{ "name": "Updated Name" }
```

- Response example:

```json
{ "message": "Category updated successfully" }
```

---

#### DELETE /categories/<category_id>
- Method: DELETE
- Path: `/categories/<category_id>`
- Description: Delete a category. Admin only.
- Authentication: Admin only (JWT)
- Request body: none
- Response example:

```json
{ "message": "Category deleted successfully" }
```

---

### Sub-categories

#### GET /sub-categories/
- Method: GET
- Path: `/sub-categories/`
- Description: List all sub-categories. Optional query parameter `category_id` filters by parent category.
- Authentication: Public
- Request body: none
- Response example:

```json
[ { "id":"s1","name":"Algebra","category_id":"c1" } ]
```

---

#### GET /sub-categories/<sub_cat_id>
- Method: GET
- Path: `/sub-categories/<sub_cat_id>`
- Description: Get sub-category details by ID.
- Authentication: Public
- Request body: none
- Response example:

```json
{ "id":"s1","name":"Algebra","category_id":"c1" }
```

---

#### POST /sub-categories/
- Method: POST
- Path: `/sub-categories/`
- Description: Create a sub-category under a category. Admin only.
- Authentication: Admin only (JWT)
- Request body:

```json
{ "name": "Topic", "category_id": "c1" }
```

- Response example:

```json
{ "id":"s2","name":"Topic","category_id":"c1" }
```

---

#### PATCH /sub-categories/<sub_cat_id>
- Method: PATCH
- Path: `/sub-categories/<sub_cat_id>`
- Description: Update sub-category name or parent category. Admin only.
- Authentication: Admin only (JWT)
- Request body:

```json
{ "name": "New Topic", "category_id": "c2" }
```

- Response example:

```json
{ "message": "Sub-category updated" }
```

---

#### DELETE /sub-categories/<sub_cat_id>
- Method: DELETE
- Path: `/sub-categories/<sub_cat_id>`
- Description: Delete a sub-category. Admin only.
- Authentication: Admin only (JWT)
- Request body: none
- Response example:

```json
{ "message": "Sub-category deleted" }
```

---

### Prompts / Lessons

#### POST /prompts/generate
- Method: POST
- Path: `/prompts/generate`
- Description: Generate an AI lesson for the given topic and save it as a prompt record. Requires the user to be authenticated.
- Authentication: JWT required
- Request body:

```json
{
  "user_id": "60f7b2...",
  "category_id": "c1",
  "sub_category_id": "s1",
  "topic": "Explain Pythagorean theorem"
}
```

- Response example:

```json
{
  "id": "p1",
  "prompt": "Explain Pythagorean theorem",
  "response": "<generated lesson text>",
  "user_id": "60f7b2...",
  "category_id": "c1",
  "sub_category_id": "s1",
  "created_at": "2026-06-01T12:00:00Z"
}
```

---

#### GET /prompts/
- Method: GET
- Path: `/prompts/`
- Description: List all saved prompts/lessons.
- Authentication: Public
- Request body: none
- Response example:

```json
[ { "id":"p1","prompt":"...","response":"...","user_id":"...","created_at":"..." } ]
```

---

#### GET /prompts/<prompt_id>
- Method: GET
- Path: `/prompts/<prompt_id>`
- Description: Retrieve a prompt by ID.
- Authentication: Public
- Request body: none
- Response example:

```json
{ "id":"p1","prompt":"...","response":"...","user_id":"...","created_at":"..." }
```

---

#### GET /prompts/history/<user_id>
- Method: GET
- Path: `/prompts/history/<user_id>`
- Description: Return all prompts created by a specific user. Caller must be authenticated.
- Authentication: JWT required
- Request body: none
- Response example:

```json
[ { "id":"p1","prompt":"...","response":"...","created_at":"..." } ]
```

---

#### DELETE /prompts/<prompt_id>
- Method: DELETE
- Path: `/prompts/<prompt_id>`
- Description: Delete a saved prompt. (Note: route currently does not enforce auth.)
- Authentication: Public (no enforcement in current code)
- Request body: none
- Response example:

```json
{ "message": "Prompt deleted" }
```

---

## Notes & Recommendations

- All JWT-protected routes expect the token in the `Authorization` header with the `Bearer` scheme.
- Use a strong `JWT_SECRET` in production (set via `.env`).
- Consider enforcing authentication for prompt deletion if that should be restricted.
- Consider returning consistent error shapes (e.g., `{ "error": "..." }`) and HTTP status codes for validation and auth failures.

---

Generated from backend route definitions in `backend/routes/`.
