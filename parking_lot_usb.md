---
layout: default
---

# Parking lot USB Baiting | Attacker Mindset, Risk Analysis

In this hands-on activity from the `Google Cybersecurity Professional Certificate`, I simulated being part of a security team at Rhetorical Hospital, where I discovered an unattended USB stick with the hospital's logo in the parking lot. To safely investigate whether the device was compromised, I used `virtualization software` in an isolated environment on a workstation. This allowed me to `examine the USB drive without risking infection of other systems`, as the virtualized instance was disconnected from the main network and files. This type of `social engineering attack` is called USB baiting, and is defined as an attack in which a threat actor strategically leaves a malware USB stick for an employee to find and install to unknowingly infect a network.

The scenario was described as such:

"You are part of the security team at Rhetorical Hospital and arrive to work one morning. On the ground of the parking lot, you find a USB stick with the hospital's logo printed on it. There’s no one else around who might have dropped it, so you decide to pick it up out of curiosity.

You bring the USB drive back to your office where the team has virtualization software installed on a workstation. Virtualization software can be used for this very purpose because it’s one of the only ways to safely investigate an unfamiliar USB stick. The  software works by running a simulated instance of the computer on the same workstation. This simulation isn’t connected to other files or networks, so the USB drive can’t affect other systems if it happens to be infected with malicious software."

The contents of the USB were:

![usb](https://github.com/Rafael-Santamaria-Ortega/Rafael-Santamaria-Ortega.github.io/blob/main/usb.png)

To complete this task I described the contents of the USB, then applied an `attacker mindset` to define how this could be exploited by an attacker, and analyzing the risk of it happening.

My `Risk Analysis` of the incident is the following:

| **Category**            | **Details**                                                                                                                                                       |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Contents**            | - The USB drive contains PII, including family photos, family activities, and a CV.<br>- Sensitive work files, like schedules and employee budgets, are included.<br>- Storing personal files with work-related ones is unsafe and unprofessional. |
| **Attacker Mindset**    | - **Employee Vulnerability**: An attacker could use the schedule to plan a break-in or even a kidnapping.<br>- **Relative Vulnerability**: Photos might be exploited to identify or impersonate family members.<br>- **Business Access**: The leaked schedule could help an attacker determine a good time for physical entry into the business. |
| **Risk Analysis**       | - **Awareness Campaigns**: The company could provide training on proper incident responses.<br>- **Antivirus Checks**: Implement regular antivirus scans to detect potential threats.<br>- **Disable Autoplay**: Configure devices to prevent USB devices from automatically executing files. |

[Back](./)
