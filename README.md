# How to use traefik for auth flow

This is a simple example using traefik, redis and simple nodejs backends to implement an auth flow.

# How it works from a user's perspective

- A user wants to access secured resources at http://localhost
- As this is the first time and the use isn't validated yet, the user is redirected to http://localhost/sso
- the user interacts with the page (like entering user/password or solving a captcha)
- the user gets a cookie and is redirected back to http://localhost

# How it works from a tech perspective

The user accesses http://localhost, which is configured with the [ForwardAuth](https://doc.traefik.io/traefik/middlewares/http/forwardauth/) middleware. This middleware validates the HTTP request against an internal service endpoint.

The service endpoint checks for a cookie named "auth" and validates its value against a Redis database.

If the value is found in the database, the middleware returns a 200 OK response, allowing the user to access the requested URL.

If there is no cookie present or if the value cannot be found in the database, the user is redirected to /sso, where a login/captcha page is presented. Upon successful validation of the user, a random value is generated, written to Redis, and returned as a cookie named "auth".

# How to run it

```bash
docker compose up -d --build
```

Access at http://localhost
