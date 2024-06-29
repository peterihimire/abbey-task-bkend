# Abbey Fullstack Challenge API

## Table of Contents

- [General Information](#general-information)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Usage](#usage)
- [Postman Documentation](#postman-documentation)

---

## General Information

The Abbey Fullstack challenge implementation by me, is a REST API, built with TypeScript, NodeJS, Express framework, PostgreSQL RDMS, Prisma ORM, Redis to manage the session which is the best practice when working with sessions on the server.

In this API a User can Register, Login, add a friend, follow another user while on the flip side of things other user can also add other Users as friends and start following other users. This means that the relationship of user to friends and followers is many to many relationship.

---

## Dependencies

The following dependencies are required for the application:

- `typescript`
- `cookie-parser`
- `express`
- `express-session`
- `bcrypt`
- `redis`
- `connect-redis`
- `prisma`
- `postgresql`
- `pg`
- `pg-hstore`
- `cors`
- `dotenv`

---

## Setup

1. Clone this repository to your desktop:
   ```sh
   git clone https://github.com/peterihimire/abbey-task-bkend.git
   ```
2. Change directory into the project folder:
   ```sh
   cd abbey-task-bkend
   ```
3. Create a .env file:
   ```sh
   touch .env
   ```
4. Copy the following environment variables to your .env file and customize them as needed:
   ```txt
   DATABASE_URL=postgresql://postgres:testing123@localhost:5432/abbey_app?schema=public
   PORT=8082
   SESSION_SECRET=secret$%^134
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```
5. Install the dependencies:
   ```sh
   npm install
   ```
6. Generate the Prisma client:
   ```sh
   npx prisma generate
   ```
7. Start the application:
   ```sh
   npm run start
   ```
   If all the setup is correct, on the server command line you should see this :
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1719684444/Screenshot_2024-06-29_at_7.06.01_PM_swxxdw.png)
8. To test the API endpoints, use Postman or Insomnia. Optionally, add a global environment variable for the base URL (http://127.0.0.1:8082/api/abbeytask/v1) and name it as desired (e.g., {{URL}}).

9. I provided a test API endpoint(http://127.0.0.1:8082/api/abbeytask/v1/test/test_api)
The response is below:

    ```json
    {
      "status": "success",
      "msg": "Abbey Task API was initiated successfully!"
    }
    ```

---

## Usage



- **Register:** Use this endpoint: http://127.0.0.1:8082/api/abbeytask/v1/auth/register. The response will look like this:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1719683426/Screenshot_2024-06-29_at_6.34.44_PM_cvgdzd.png)

- **Login:** Use this endpoint: http://127.0.0.1:8082/api/abbeytask/v1/auth/login. This is what login looks like. I purposely return minimal user information, so that when a user request for their account info, they get to see more of their details:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1719683427/Screenshot_2024-06-29_at_6.34.57_PM_g9gg9u.png)

- **Add Friend:** Use this endpoint: http://127.0.0.1:8082/api/abbeytask/v1/users/add_friend. If session is setup properly, a cookie from the server will be sent to the browser for validating of the user to be able to add a friend:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1719683435/Screenshot_2024-06-29_at_6.33.44_PM_qhfa5l.png)

- **Start Following a User:** Use this endpoint: http://127.0.0.1:8082/api/abbeytask/v1/users/add_follower. Only authenticated users can follow another user, els an error will be thrown that you are not authorized to view the resources:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1719683426/Screenshot_2024-06-29_at_6.34.21_PM_uxk4tn.png)
- **Get Accout Details:** Use this endpoint: http://127.0.0.1:8082/api/abbeytask/v1/users/acct_info. This endpoint returns the complete user information, including his friends, followers and more:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1719683422/Screenshot_2024-06-29_at_6.31.58_PM_we1s70.png)

- **Logout:** Use this endpoint: http://127.0.0.1:8082/api/abbeytask/v1/auth/logout. This endpoint is used to logout from the application, this clears the session from the redis store:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1719683427/Screenshot_2024-06-29_at_6.35.08_PM_exipsx.png)

---

## Postman Documentation

For more detailed information and API documentation, visit the [Postman Documentation](https://documenter.getpostman.com/view/12340633/2sA3duGDGB).
