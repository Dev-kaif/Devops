### Generate a Self-Signed SSL Certificate

For local development, generate a self-signed SSL certificate using OpenSSL:

```bash
openssl req \
  -x509 \
  -nodes \
  -days 365 \
  -newkey rsa:2048 \
  -keyout nginx-selfsigned.key \
  -out nginx-selfsigned-public.crt
```

#### Command Breakdown

- **`openssl`** – Launches the OpenSSL toolkit.
- **`req`** – Creates a certificate request. When used with `-x509`, it generates a self-signed certificate instead of a Certificate Signing Request (CSR).
- **`-x509`** – Generates a self-signed X.509 certificate.
- **`-nodes`** – Creates the private key without encrypting it with a passphrase, allowing Nginx to start without prompting for a password.
- **`-days 365`** – Makes the certificate valid for 365 days.
- **`-newkey rsa:2048`** – Generates a new 2048-bit RSA private key.
- **`-keyout nginx-selfsigned.key`** – Saves the generated private key to `nginx-selfsigned.key`.
- **`-out nginx-selfsigned-public.crt`** – Saves the generated self-signed certificate to `nginx-selfsigned-public.crt`.
