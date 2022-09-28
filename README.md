First create a private key and import it to keychain

Use this private key to generate CSR

Use the generated CSR to create merchant and payment proccessing certificates

Download certificates and import them to keychain
Export them to p12
Convert to PEM to use in the server

```
openssl pkcs12 -in merchant_id.p12 -out merchant_id.pem -nodes -clcerts
```