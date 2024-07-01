# CurryBot
A handy site for managing group curry orders.

### Overview

Overall there will be 4 main components to the bot:

- **frontend**: An HTML/CSS/JavaScript webpage that handles user interaction and submits orders to the backend.
- **backend**: A NodeJS app that listens for requests from the frontend, or scheduled emailer - and updates/gets information to/from the database.
- **database**: An SQL database that is setup with the curry bot table definitions and is connectable by the backend.
- **scheduled emailer**: A scheduled application that will run at 11:15am every Friday and collate the orders into a single email.

They will likely be connected like so:
```
user --- [ frontend ] -- HTTP -- [ backend api ] -- SQL -- [ database ]
                                                                |
                                                               SQL
                                                                |
                                                      [ scheduled emailer ]
```
> Note: the emailer could either make a request to the API, or directly talk to the database - whichever is easier.


### Safeguards

- The emailing system should require some form of user confirmation before sending an email to the resturant. This could be a button in the email that makes a request to the backend, or just some instructions to forward the email onto the resturants email address.

