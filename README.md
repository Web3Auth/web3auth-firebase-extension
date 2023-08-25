# Generate Ethereum Wallet Address using Web3Auth

**Author**: Web3Auth (**[https://web3auth.io](https://web3auth.io/)**)

**Description**: Generate Ethereum Wallet Address with Web3Auth using it's MPC based Key Management System (KMS) and store it in Firebase Realtime Database.

---

## 🧩 How to Install This Extension

### Using the Firebase Console

To install and manage extensions, you can use the Firebase console.

[![Install using console](https://www.gstatic.com/mobilesdk/210513_mobilesdk/install-extension.png "Install using console")][install-link]

[install-link]: https://console.firebase.google.com/project/_/extensions/install?ref=web3auth/web3auth-147be@1.0.0

### Using the Firebase CLI

To install and manage extensions, you can also use the Firebase CLI:

**Step 1**: Run the following npm command to install the CLI or update to the latest CLI version:

```bash
npm install -g firebase-tools
```

**Step 2**: Install this extension by running the following command:

```bash
firebase ext:install web3auth/web3auth-147be --project=[your-project-id]
```

> Learn more about installing extensions in the Firebase Extensions documentation:
> [console](https://firebase.google.com/docs/extensions/install-extensions?platform=console),
> [CLI](https://firebase.google.com/docs/extensions/install-extensions?platform=cli)

## Configuration Parameters

- Cloud Functions location: Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).
- Client ID from Web3Auth Dashboard: What is your Client ID?
- Web3Auth Network: What is your Web3Auth Network?
- Verifier Name created on Web3Auth Dashboard: What is your Verifier Name?
- Firebase Realtime Database instance: What is the path to store the Ethereum Public Address in Firebase Realtime Database?

---

## How to Use This Extension

Take a look at how this extension works:

1. Head to your Firebase console's Authentication dashboard (https://console.firebase.google.com/project/${param:PROJECT_ID}/authentication/users).
2. Create a new user.
3. Navigate to the Firebase console's Real Time Database (https://console.firebase.google.com/project/${param:PROJECT_ID}/database).
4. You'll see a new user account with the user's details and Ethereum Public address.

### Using the extension

Once a user's account is created from your project's authenticated users, this extension automatically generates an Ethereum Public-Private Key pair using Web3Auth. It then stores the public address and user data in the Real Time Database.

To create a user, you can either do so directly in your Authentication dashboard (https://console.firebase.google.com/project/${param:PROJECT_ID}/authentication/users), or by using any of the Firebase Authentication SDKs. For more information, check out the Authentication documentation (https://firebase.google.com/docs/auth).

With this extension, you can use Firebase Authentication to securely generate an Ethereum Public-Private Key pair with Web3Auth.

Using Firebase Authentication, you can use any of the following Firebase Authentication SDK sign-in methods with Web3Auth:

- Email and password-based authentication
- Federated identity provider integrations (Google, Apple, Facebook, Twitter, GitHub)
- Phone number authentication
- Custom auth system integrations
- Anonymous auth

### Additional Setup

Before installing this extension, set up Firebase Authentication in your Firebase project.
You must also sign up for a Web3Auth account before installing this extension—you can do so on the [Web3Auth Dashboard](https://dashboard.web3auth.io).

### Billing

This extension uses the following Firebase services, which may have associated charges:

- Cloud Functions
- Firebase Authentication
- Firebase Realtime Database

This extension also uses the following third-party services:

- Web3Auth ([pricing information](https://web3auth.io/pricing))

You are responsible for any costs associated with your use of these services.

### Additional Setup

Before installing this extension, set up Firebase Authentication in your Firebase project.
You must also signup and set up a Web3Auth account before installing this extension—you can do so with [this sign up link](https://dashboard.web3auth.io).

### Note from Firebase

Your Firebase project must be on the Blaze (pay-as-you-go) plan to install the extension. You will only be charged for the resources you use. Most Firebase services offer a free tier for low-volume use. [Learn more about Firebase billing.](https://firebase.google.com/pricing)

When installing or reconfiguring this extension, you will be billed a small amount (typically less than $0.10). See Cloud Functions under [Firebase Pricing](https://firebase.google.com/pricing) for a detailed explanation.

## Development

### Local setup

1. Install the Firebase CLI

```bash
npm install -g firebase-tools
```

2. Clone this repo and Install the dependencies

```bash
git clone https://github.com/Web3Auth/web3auth-firebase-extension
cd functions
npm install
npm run build:watch

# Open another terminal
cd functions/integration-tests
firebase emulators:start --project=demo-test
```
