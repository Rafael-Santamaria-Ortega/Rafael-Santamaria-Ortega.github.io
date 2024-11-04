---
layout: default
---

## Encryption with Python

This code is meant to encrypt and decrypt basic data using `asymmetric encryption`, `Python` and the `Linux Command Line`. This means that it leverages Python encryption capabilities in a `Linux OS`, and uses a relatively secure method of encryption that relies on a `public key` for encryption and a `private key` for decryption. Thus, only the intended recipient can decrypt the message encrypted with the shared public key, as they are intrinsically related. to The first step is to use Python to generate an encryption key pair in order to encrypt and decrypt data:

### Generate Key Pair

```python
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
```

This snippet imports functions from Python's `cryptography` module such as RSA-related cryptographic primitives and `serialization` functions from the cryptography library, which are necessary to create, serialize, and save the key pair.

```python
private_key = rsa.generate_private_key(
    public_exponent=65537, 
    key_size=2048           
)
```

This code snippet creates a private `RSA ke`y with a key size of `2048 bits`. The `public_exponent 65537` was chosen, because a standard choice for RSA, as it provides a balance between security and computational efficiency.

```python
priv_pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,                   
    format=serialization.PrivateFormat.TraditionalOpenSSL, 
    encryption_algorithm=serialization.NoEncryption()      
)
```

This code snippet converts the private key to a byte format suitable for saving to a file. The encoding is set to PEM, a `Base64` encoded format commonly used for `cryptographic keys`, and no encryption is applied.

```python
with open("priv.pem", 'wb') as priv_pem_file:
    priv_pem_file.write(priv_pem)
```

This snippet opens a new file, `priv.pem`, in binary write mode and saves the serialized private key to this file.

```python
public_key = private_key.public_key()
```

This snippet derives the `public key` from the generated `private key`.

```python
pub_pem = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,                       
    format=serialization.PublicFormat.SubjectPublicKeyInfo     
)
```

This snippet converts the public key to a `PEM-encoded` byte format, making it suitable for saving in a file.

```python
with open("pub.pem", 'wb') as pub_pem_file:
    pub_pem_file.write(pub_pem)
```

This snippet opens a new file, `pub.pem` in binary write mode and saves the serialized public key to this file.

### Encrypting and Decrypting

The following code encrypts a message (`news_alert`) using a public key, then decrypts it using the corresponding private key. It reads the key file paths from environment variables and uses `asymmetric encryption` (RSA) with `Optimal asymmetric encryption padding` (OAEP) to improve the process.

```python
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
import sys, os
```

Imports the relevant modules: serialization, to manage key loading and format handling; hashes, to provides cryptographic hash functions (`SHA-256`); padding, to provide padding options for secure RSA encryption (`OAEP`); sys and os to Handle command-line arguments and environment variables.

```python
if (len(sys.argv)) != 2:
    print ('Usage: ./capstone.py news_alert')
    exit(-1)
```

This code snippet verifies that exactly one command-line argument (the news alert message) is provided. If not, it displays usage instructions and exits.

```python
org_alert = sys.argv[1].encode()
```

This line of code ncodes the news alert message from the command-line argument to bytes, required for encryption.

```python
pub_pem = os.environ.get('PUB_PEMK')
with open(pub_pem, 'rb') as pub_key_file:
    public_key = serialization.load_pem_public_key(pub_key_file.read())
```

This code snippet reads the public key file path from the environment variable `PUB_PEMK`; and then opens the public key file in binary mode, reads it, and loads it as a PEM-encoded public key using `serialization.load_pem_public_key`.

```python
encrypted = public_key.encrypt(
    org_alert,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),  
        algorithm=hashes.SHA256(),                   
        label=None                                  
    )
)
```

This code snippet encrypts `org_alert` using the `public key`; and then uses `OAEP` with `SHA-256` algorithm for both the main hash and the mask generation function 1 `MGF1`, which adds security by making the encryption include a factor of randomness, so as to produce different encryption outputs even if the same message is encrypted with the same key.

```python
priv_pem = os.environ.get('PEMK')
with open(priv_pem, 'rb') as key_file:
    private_key = serialization.load_pem_private_key(
        key_file.read(),
        password=None
    )
```

This code snippet retrieves the private key file path from the environment variable `PEMK`; and opens the file in binary mode, reads it, and loads it as a PEM-encoded private key. The password parameter is set to None because the key is unecrypted.

```python
decrypted = private_key.decrypt(
    encrypted,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),  # Mask generation function with SHA-256
        algorithm=hashes.SHA256(),                   # Main hash algorithm for OAEP
        label=None                                   # Optional label, set to None
    )
)
```

This code snippet decrypts the encrypted message using the private key; and again uses `OAEP` padding with `SHA-256` for both the main hash algorithm and the `MGF1` function to ensure secure decryption.

```python
print(decrypted.decode())
```

Finnaly, this line prints the decoded message in plaintext. 

### Appendix

Here is the code adapted to run also using Windows operating systems:

```python
import os
import sys
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding

# RSA Key Generation and Saving
def generate_keys():
    # Generate private key
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )

    # Serialize and save private key
    priv_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    )
    with open("priv.pem", 'wb') as priv_pem_file:
        priv_pem_file.write(priv_pem)
    
    # Derive and serialize public key
    public_key = private_key.public_key()
    pub_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    with open("pub.pem", 'wb') as pub_pem_file:
        pub_pem_file.write(pub_pem)

    print("RSA Key pair generated and saved as 'priv.pem' and 'pub.pem'.")

# Load Keys from Environment Variables
def load_keys():
    # Get public key path
    pub_pem = os.environ.get('PUB_PEMK', 'pub.pem')
    with open(pub_pem, 'rb') as pub_key_file:
        public_key = serialization.load_pem_public_key(pub_key_file.read())

    # Get private key path
    priv_pem = os.environ.get('PEMK', 'priv.pem')
    with open(priv_pem, 'rb') as priv_key_file:
        private_key = serialization.load_pem_private_key(
            priv_key_file.read(),
            password=None
        )
    
    return public_key, private_key

# Encrypt Message
def encrypt_message(message, public_key):
    encrypted = public_key.encrypt(
        message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    print("Message encrypted.")
    return encrypted

# Decrypt Message
def decrypt_message(encrypted, private_key):
    decrypted = private_key.decrypt(
        encrypted,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    print("Message decrypted.")
    return decrypted.decode()

# Main script logic
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: encryption_script.py <message>")
        sys.exit(1)

    # Generate keys if they don't exist
    if not os.path.isfile("priv.pem") or not os.path.isfile("pub.pem"):
        generate_keys()

    # Load keys
    public_key, private_key = load_keys()

    # Message encoding and encryption
    org_alert = sys.argv[1].encode()  # Encode message from command line
    encrypted = encrypt_message(org_alert, public_key)

    # Decrypt message and display result
    decrypted_message = decrypt_message(encrypted, private_key)
    print("Decrypted message:", decrypted_message)
```

To run in a terminal: 

"
python encryption_script.py "Your message to encrypt and decrypt"
"

[back](./)
