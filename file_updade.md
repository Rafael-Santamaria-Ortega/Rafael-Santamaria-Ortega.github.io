---
layout: default
---

# File Update Python Algorithm | Python, Linux

In this project I have been tasked with creating a Python program that compares two lists, one of allowed ip’s to a system and the other the remove list, that has IP’s to be removed from access privileges. This, to update the users allowed to access patient information in a health care provider. 

## Open the file that contains the allow list 

So, first, I open the file with the ‘with’ and ‘open’ commands: 

```python
import_file='allow_list.txt'
remove_list=['192.168.97.225','192.168.158.180','192.168.201.40','192.168.58.57']
with open(import_file,'r') as file:
```
## Read the file contents

Then I read the contents of the document with the `. read()` function inside the 'with open' statement: 

```python
    ip_addresses=file.red()
```

## Convert the string into a list 

Then I turn the contents currently stored as a string into a list for Python to easily parse the data with the `.split()` method: 

```python
ip_addresses=ip_addresses.split()
```

## Iterate through the remove list using a 'for' loop

```python
for ip in ip_addresses:
```

## Remove IP addresses that are in the remove list inside the 'for' loop.

```python
    if ip in remove_list:
        ip_addresses.remove(ip)
```

## Convert `ip_addresses` back to list for updating the file

```python
ip_addresses=' '.join(ip_addresses)
```

## Update the file with the revised list of IP addresses

Using a `with open` method in `w` (write) I update the file with the `write()` method.

```python
with open(import_file,'w') as file:
    file.write(ip_addresses)
```

## FULL CODE

```python
import_file='allow_list.txt'
remove_list=['192.168.97.225','192.168.158.180','192.168.201.40','192.168.58.57']
with open(import_file,'r') as file:
    ip_addresses=file.red()
ip_addresses=ip_addresses.split()
for ip in ip_addresses:
    if ip in remove_list:
        ip_addresses.remove(ip)
ip_addresses=' '.join(ip_addresses)
with open(import_file,'w') as file:
    file.write(ip_addresses)
```


[back](./)
