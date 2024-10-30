---
layout: default
---

## Encryption with Python

This code is meant to encrypt and decrypt basic data using asymmetric encryption, Python and the Linux Command Line. The first step is to use Python to generate an encryption key pair in order to encrypt and decrypt data:

### Generate Key Pair

```python
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
```

This snippet imports functions from Python's 'cryptography' module such as RSA-related cryptographic primitives and serialization functions from the cryptography library, which are necessary to create, serialize, and save the key pair.

```python
private_key = rsa.generate_private_key(
    public_exponent=65537, 
    key_size=2048           
)
```

This code snippet creates a private RSA key with a key size of 2048 bits. The public_exponent 65537 was chosen, because a standard choice for RSA, as it provides a balance between security and computational efficiency.

```python
priv_pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,                   
    format=serialization.PrivateFormat.TraditionalOpenSSL, 
    encryption_algorithm=serialization.NoEncryption()      
)
```

This code snippet converts the private key to a byte format suitable for saving to a file. The encoding is set to PEM, a Base64 encoded format commonly used for cryptographic keys, and no encryption is applied.

```python
with open("priv.pem", 'wb') as priv_pem_file:
    priv_pem_file.write(priv_pem)
```

This snippet opens a new file, priv.pem, in binary write mode and saves the serialized private key to this file.

```python
public_key = private_key.public_key()
```

This snippet derives the public key from the generated private key.

```python
pub_pem = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,                       
    format=serialization.PublicFormat.SubjectPublicKeyInfo     
)
```

This snippet converts the public key to a PEM-encoded byte format, making it suitable for saving in a file.

```python
with open("pub.pem", 'wb') as pub_pem_file:
    pub_pem_file.write(pub_pem)
```

This snippet opens a new file, 'pub.pem' in binary write mode and saves the serialized public key to this file.



[back](./)
