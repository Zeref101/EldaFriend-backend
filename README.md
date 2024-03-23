# Eldafriend-backend

- Backend for Eldafriend app, A pal for the elder community! Track your medication, along with reminders and many showstopper features that ensure completely homely care.

End-Points:

- [User Authentication endpoints](#auth)
- [Medicine endpoints](#meds)
- [Community endpoints](#community)
- [Expense endpoints](#expense)
- [User functionalities](#user)

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

### <a id="auth" ></a>User Authentication

### GET /api/auth

**Returns a greeting message.**

### POST /api/auth/sign-up/getOtp

**Creates a new user and sends an OTP to their email.**

#### Headers:

- Content-Type: application/json

#### Request Body:

```json
{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

#### Sample Response:

- If Phone number is not valid

```json
{
  "message": "Phone number is not valid"
}
```

- If Email already Exists

```json
{
  "message": "Email already exists"
}
```

- If Phone number already exists

```json
{
  "message": "Phone number already exists"
}
```

- If User is not added to the database due to internal server error

```json
{
  "message": "User not created due to an Internal server error"
}
```

- If OTP generated successfully

```json
{
  "userId": "ufiabifahbigubapigbiua",
  "message": "An OTP has been successfully sent to your registered email address"
}
```

- HTTP status codes: 201 for success, 400 for bad request, 404 for not found, 500 for internal server error.

### POST /api/auth/sign-up/verify-otp

**Verifies the OTP sent to the user's email.**

#### Headers:

- Content-Type: application/json

#### Request Body:

```json
{
  "userId": "123",
  "otp": "456789"
}
```

#### Sample Response:

- Successful creation

```json
{
  "message": "User created successfully"
}
```

- Error while verifying the OTP

```json
{
  "message": "User not created"
}
```

- User enters wrong OTP

```json
{
  "message": "Invalid OTP"
}
```

- User enters the correct OTP

```json
{
  "message": "User verified!"
}
```

- HTTP status codes: 201 for success, 400 for bad request, 404 for not found, 500 for internal server error.

### POST /api/auth/login

**Logs in a user.**

#### Headers:

- Content-Type: application/json

#### Request Body:

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Sample Response:

- Email doesn't exists in database

```json
{
  "message": "User not found"
}
```

- User types invalid password

```json
{
  "message": "Invalid password"
}
```

- If Email and password matches and the user exists in database

```json
{
  "_id": "65e5e402368294524c92cc00",
  "fullname": "John",
  "phone": "+919999999999",
  "email": "john@gmail.com",
  "password": "$hashedPassword",
  "picture": null,
  "globalPin": 1234,
  "communities": [],
  "medicines": [],
  "expenses": [],
  "otp": 0,
  "verified": true
}
```

### <a id="meds" ></a>Medicines

### POST /api/user/create-med

**Creates a new medicine for a user.**

#### Headers:

- Content-Type: application/json

#### Request Body:

```json
{
  "userId": "123",
  "dosageType": "Syrup",
  "medAmount": "2",
  "medName": "cough syrup",
  "duration": "1",
  "scheduledTime": "08:00"
}
```

#### Sample Response:

- If medicine is not created

```json
{
  "message": "Failed to create Medicine"
}
```

- If medicine is created

```json
{
  "message": "Medicine created successfully"
}
```

- HTTP status codes: 201 for success, 400 for bad request, 404 for not found, 500 for internal server error.

### PATCH /api/user/med-taken

**Updates the status of a medicine as taken.**

#### Headers:

- Content-Type: application/json

#### Request Body:

```json
{
"userId": "123",
"medicineId": "456",
"setTrueForDate": 2024-03-05T15:11:24.451+00:00,
"setTrue": true
}
```

#### Sample Response:

- If Server error while updating medicine taken status

```json
{
  "message": "Internal Server error while updating the medicine taken status"
}
```

- HTTP Status Code: 204 No Content

### <a id="community"></a>User Community

### POST /api/community/create

**Creates a new community.**

#### Headers:

- Content-Type: application/json

#### Request Body:

```json
{
  "adminUserId": "123",
  "name": "Community Name",
  "description": "Community Description",
  "picture": "http://example.com/picture.jpg",
  "banner": "http://example.com/banner.jpg"
}
```

#### Sample Response:

- If the community is created successfully:

```json
{
  "message": `Community created and Admin status is updated`
}
```

- If the input data is incorrect:

```json
{
  "message": "Failed to create community. Please check your input data."
}
```

- If there's an internal server error:

```json
{
  "message": "Internal Server Error while creating community"
}
```

- HTTP status codes: 201 for success, 400 for bad request, 500 for internal server error.

### GET /api/community/get-community

**Fetches all communities.**

#### Headers:

_None required_

#### Response:

```json
[
  {
    "_id": "123",
    "adminUserId": "123",
    "name": "Community Name",
    "description": "Community Description",
    "picture": "http://example.com/picture.jpg",
    "banner": "http://example.com/banner.jpg"
  },
  ...
]
```

### <a id="expense"></a>Expense

### POST /api/user/add-expense

**Adds a new expense for a user.**

#### Headers:

_Content-Type: application/json_

#### Request Body:

```json
{
  "userId": "123",
  "itemName": "Groceries",
  "itemPrice": 50.0
}
```

#### Responses

- If the request body validation fails:

```json
{
  "message": "Validation error messages"
}
```

- If the user ID is not found:

```json
{
  "message": "User ID not found"
}
```

- If there's an error while adding the expense:

```json
{
  "message": "Error message from addExpense service"
}
```

- If the expense is added successfully but there's an error while updating the user:

```json
{
  "message": "Failed to update user with new expense"
}
```

- If the expense is added and the user is updated successfully:

```json
{
  "message": "Expense Updated successfully"
}
```

- HTTP status codes: 201 for success, 400 for bad request, 404 for not found, 500 for internal server error.

### <a id="user"></a>User Functionalities

### GET /api/user/get-similar-users/:medicine_name

**Fetches a list of users who are associated with a specific medicine.**

#### Parameters

- `medicine_name`: The name of the medicine. This is a path parameter.

#### Responses

- `200 OK`: The request was successful. The response body contains an array of users who are associated with the specified medicine. Each user object includes the user's full name, phone number, and email address.

- `400 Bad Request`: The request was unsuccessful because the `medicine_name` parameter was not provided. The response body contains a message explaining the error.

- `500 Internal Server Error`: The request was unsuccessful due to an unexpected error on the server. The response body contains a message explaining the error.

#### Request:

_Empty_

#### Response:

```json
[
  {
    "fullname": "John Doe",
    "phone": "123-456-7890",
    "email": "johndoe@example.com"
  },
  {
    "fullname": "Jane Doe",
    "phone": "098-765-4321",
    "email": "janedoe@example.com"
  }
]
```
