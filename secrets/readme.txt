This directory contains sensitive files that should not be committed to version control.

- keys/fernet.key: Fernet encryption key used for encrypting/decrypting sensitive data (API keys, etc.)

IMPORTANT: Never commit the fernet.key file to version control!
If you need to set up a new environment, generate a new key using:
  python -c "from cryptography.fernet import Fernet; key = Fernet.generate_key(); open('secrets/keys/fernet.key', 'wb').write(key)"
