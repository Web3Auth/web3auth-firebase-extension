### See it in action

Take a look at how this extension works:

1. Head to your Firebase console's Authentication dashboard (https://console.firebase.google.com/project/${param:PROJECT_ID}/authentication/users).
2. Create a new user.
3. Navigate to the Firebase console's Real Time Database (https://console.firebase.google.com/project/${param:PROJECT_ID}/database).
4. You'll see a new user account with the user's details and Ethereum Public address.

### Using the extension

Once a user's account is created from your project's authenticated users, this extension automatically generates an Ethereum Public-Private Key pair using Web3Auth. It then stores the public address and user data in the Real Time Database.

To create a user, you can either do so directly in your Authentication dashboard (https://console.firebase.google.com/project/${param:PROJECT_ID}/authentication/users), or by using any of the Firebase Authentication SDKs. For more information, check out the Authentication documentation (https://firebase.google.com/docs/auth).

### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
