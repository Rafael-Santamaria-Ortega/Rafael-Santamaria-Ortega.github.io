---
layout: default
---

# Security Risk Assesment Report for a Fictional Company | Network Hardening, GRC (Governance, Regulation an Compliance)

In this exercise from the `Google Cybersecurity Professional Certificate`, I simulated being a security analyst for a social media organization following a major data breach that compromised customer personal information. The scenario involved _identifying four key vulnerabilities_, including shared passwords, default admin credentials, lack of firewall traffic filtering, and absence of multifactor authentication (MFA). My task was to conduct a `security risk assessment` of the incident and recommend `network hardening practices` to prevent future breaches.

The scenario is described as such: 

"_You are a security analyst working for a social media organization. The organization recently experienced a major data breach, which compromised the safety of their customers’ personal information, such as names and addresses. Your organization wants to implement strong network hardening practices that can be performed consistently to prevent attacks and breaches in the future._ 

_After inspecting the organization’s network, you discover four major vulnerabilities. The four vulnerabilities are as follows:_

_1. The organization’s employees' share passwords_

_2. The admin password for the database is set to the default_

_3. The firewalls do not have rules in place to filter traffic coming in and out of the network_

_4. Multifactor authentication (MFA) is not used_ 

_If no action is taken to address these vulnerabilities, the organization is at risk of experiencing another data breach or other attacks in the future._ 

_In this activity, you will write a security risk assessment to analyze the incident and explain what methods can be used to further secure the network._"

To conduct the `Security Risk Assesment` I had to consider the following network hardening tools:

* [Network Hardening Tools](https://github.com/Rafael-Santamaria-Ortega/Rafael-Santamaria-Ortega.github.io/blob/main/Network%20hardening%20tools%20-%20Sheet1.pdf)

After carefully reading the document I proceeded to conduct said assesment:

## Security risk assessment report 

| **Part 1: Recommended methods to implement for avoiding security breaches in the future** | 
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <br> 1. Strict password policies <br> 2. Multifactor Authorization (MFA) <br> 3. Disabling unused ports |

| **Part 2: Explain the recommendations ** | 
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <br> The main security concerns for the organization are: <br><br> 1. The organization’s employees' share passwords. <br> 2. The admin password for the database is set to the default. <br> 3. The firewalls do not have rules in place to filter traffic coming in and out of the network. <br> 4. Multifactor authentication (MFA) is not used. <br><br> That is why the aforementioned methods are recommended. A detailed explanation of them follows. <br><br> As three of the four security concerns pertain to passwords, the focus should be on implementing measures that harden passwords. First, strict password policies will help in ensuring employees do not share passwords and that passwords are strong, especially the admin password for the database. For this, the NIST (National Institute of Standards and Technology) recommends salting and hashing passwords; that means making passwords unique values that are impossible to decrypt (hashing) and using random characters to hashed passwords like ‘*’ or ´%’, etc. (salting). <br><br> After that, it is imperative to enforce MFA, because it adds more steps to verify a user's identity before granting access to a system. Thus, mitigating the risk of malicious actors accessing the network. This MFA can be Security keys, Safety questions, Captcha or reCaptcha, biometric data, etc. <br><br> Finally, the firewall must be configured to filter unwanted network traffic and disable ports that are not used in the company’s daily activities. This makes network traffic more safe and minimizes the attack surface. Thus, limiting the ways that the network can be compromised by a malicious actor. | 
