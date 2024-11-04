---
layout: default
---

# Digital Dumpster Diving Executable Malware | Python, Penetration testing

This `Python` script for offensive security conducts `digital dumpster diving` by exfiltrating all data from a `Windows Recycle Bin`, even if Python isn't installed on the compromised device.

The idea behind this type of malware is that important information like `PII` or `intellectual property` may not always be properly deleted, as users often neglect to empty their Recycle Bin. This creates an opportunity for attackers, especially if a careless employee has unwittingly left sensitive information behind. While `initial access` is required, possibly through `social engineering` or plugging a `USB` into the device, and the code could be further optimized, that isn't the primary objective here. Instead, the script highlights a fundamental vulnerability and tests whether employees routinely clean out their Recycle Bin.

This script could serve as a helpful tool in `social engineering awareness campaigns`, encouraging better information disposal practices among a company's employees. After all, we know the saying:

"One man's trash is another man's treasure."

### Dumpster Dive code:

```python
import winshell
import os

def dumpster_diving():
    dumpster = winshell.recycle_bin()
    for item in dumpster:
        og_path=item.original_filename()
        trash_item=os.path.basename(og_path)
        print(trash_item)

if __name__ == "__main__":
    dumpster_diving()
```

### Code to make the Executable

This is the code used to create the executable using `PytInstaller`. The extra lines of code are meant to create the executable in a usb drive, but they can be commented without issue:

```python
import PyInstaller.__main__ 
import os
import shutil

filename = "dumpsterdive.py"
exename = "dumpsterdive"
pwd = os.getcwd()
usbdir = os.path.join(pwd,"USB")

dist_path = os.path.join(pwd, "dist")
build_path = os.path.join(pwd, "build")
spec_path = os.path.join(pwd, exename + ".spec")

if os.path.isfile(exename):
    os.remove(exename)

# Create executable from Python script
PyInstaller.__main__.run([
    "dumpsterdive.py",
    "--onefile",
    "--clean",
    "--log-level=ERROR",
    "--name="+exename,
])

# Clean up after Pyinstaller
shutil.move(os.path.join(dist_path,exename+'.exe'),pwd)
shutil.rmtree("dist")
shutil.rmtree("build")
shutil.rmtree("__pycache__")
if os.path.isfile(spec_path):
    os.remove(spec_path)
```

[back](./)
