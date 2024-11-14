---
layout: default
---

# Parking lot USB Baiting | Attacker Mindset, Risk Analysis

In this hands-on activity from the `Google Cybersecurity Professional Certificate`, I simulated being part of a security team at Rhetorical Hospital, where I discovered an unattended USB stick with the hospital's logo in the parking lot. To safely investigate whether the device was compromised, I used `virtualization software` in an isolated environment on a workstation. This allowed me to `examine the USB drive without risking infection of other systems`, as the virtualized instance was disconnected from the main network and files. This type of `social engineering attack` is called USB baiting, and is defined as an attack in which a threat actor strategically leaves a malware USB stick for an employee to find and install to unknowingly infect a network.

The scenario was described as such:

"You are part of the security team at Rhetorical Hospital and arrive to work one morning. On the ground of the parking lot, you find a USB stick with the hospital's logo printed on it. There’s no one else around who might have dropped it, so you decide to pick it up out of curiosity.

You bring the USB drive back to your office where the team has virtualization software installed on a workstation. Virtualization software can be used for this very purpose because it’s one of the only ways to safely investigate an unfamiliar USB stick. The  software works by running a simulated instance of the computer on the same workstation. This simulation isn’t connected to other files or networks, so the USB drive can’t affect other systems if it happens to be infected with malicious software."

The reflection 
