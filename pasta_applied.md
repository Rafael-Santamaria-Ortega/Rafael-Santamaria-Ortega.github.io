---
layout: default
---

# Applying the PASTA Framework for a Fictional Company | GRC (Governance, Regulation and Compliance), PASTA Framework

In this hands-on activity for the `Google Cybersecurity Professional Certificate`, I simulated being as a security analyst for a sneaker company preparing to launch a mobile app for buying and selling shoes. Using the PASTA threat modeling framework, I conducted a comprehensive threat model to identify key security requirements at each stage of the framework:

1. Define Business Objectives – Reviewed the app’s functionality and objectives to align security with business needs.
2. Define the Technical Scope – Identified the app's technical components, such as user authentication and transaction handling.
3. Application Decomposition and Analysis – Mapped out the app's workflows to understand potential entry points for attackers.
4. Threat Analysis – Analyzed potential threats, focusing on vulnerabilities unique to e-commerce and user data handling.
5. Weakness and Vulnerability Analysis – Identified key security weaknesses, such as input validation and authentication.
6. Attack Modeling and Simulation – Simulated attack scenarios to assess potential impact and detect critical vulnerabilities.
7. Risk and Impact Analysis – Prioritized risks based on likelihood and impact, developing targeted security measures for launch.

The scenario was described as such:

"You’re part of the growing security team at a company for sneaker enthusiasts and collectors. The business is preparing to launch a mobile app that makes it easy for their customers to buy and sell shoes. 

You are performing a threat model of the application using the PASTA framework. You will go through each of the seven stages of the framework to identify security requirements for the new sneaker company app."

The PASTA worksheet I created is the following:

### PASTA Worksheet

| **Stages**                             | **Sneaker Company**                                                                                                                                                                                                                                                                                                                                                                           |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **I. Define business and security objectives** | The app aims to connect sellers and buyers of sneakers, necessitating secure transaction processing in adherence to PCI-DSS standards to avoid fines. The app's backend operations handle user data, which the company wants to manage securely, in compliance with ISO/IEC 27002 and GDPR. Compliance with the NIST CSF framework is also recommended. |
| **II. Define the technical scope**     | **Technologies used:** API, PKI, AES, SHA-256, SQL. The main priority should be preventing SQL injection attacks, as SQL databases are often vulnerable. If not properly secured, SQL injection could lead to significant damage.                                                                                                                         |
| **III. Decompose application**         | Sample data flow diagram.                                                                                                                                                                                                                                                                                                                                                                      |
| **IV. Threat analysis**                | **Internal Threats:** Employees accidentally or maliciously disclosing sensitive information, like passwords and usernames, or inserting SQL injection code.<br>**External Threats:** Hackers attempting to access sensitive data, such as credit card payments and PII, through methods like malware or SQL injection.                                 |
| **V. Vulnerability analysis**          | **Key Vulnerabilities:** The payment system must ensure encrypted transactions in compliance with PCI-DSS, or it may be exploited. Improper SQL database configuration is also a risk, potentially granting access to sensitive information. Mitigations include using prepared statements and encrypting both the database and app communications.         |
| **VI. Attack modeling**                | Sample attack tree diagram.                                                                                                                                                                                                                                                                                                                                                                    |
| **VII. Risk analysis and impact**      | Recommended security controls to minimize risk: <br>• Prepared statements <br>• Strong password policies <br>• Principle of least privilege <br>• Encrypt transactions and communications within the app.                                                                                                                                                 |

[Back](./)
