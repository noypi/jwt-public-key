### Generating cert file
```
// https://stackoverflow.com/questions/11992036/how-do-i-create-an-ecdsa-certificate-with-the-openssl-command-line
openssl ecparam -list_curves

openssl req -new -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 -x509 -nodes -days 365 -out app_one_cert_ecdsa.pem -keyout app_one_key_ecdsa.pem

// get public key
openssl x509 -pubkey -noout -in cert.pem
```