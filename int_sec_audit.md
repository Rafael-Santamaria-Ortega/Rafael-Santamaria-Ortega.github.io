---
layout: default
---

# Internal Security Audit for a Fictional Toy Company | GRC (Governance, Risk & Compliance) 

In this exercise from the Google Cybersecurity Professional Certificate, I simulated being an IT auditor for `Botium Toys`, a small U.S. toy company that is expanding its online presence. The scenario involved reviewing the company’s `security posture` to support its growing international market. My goal was to assess the IT manager’s scope, goals, and risk assessment for an internal `security audit`, focused on identifying risks, ensuring compliance (particularly with online payment and E.U. regulations), and recommending steps to `strengthen the company’s security posture`.

The scenario was described as such: 

"_Botium Toys is a small U.S. business that develops and sells toys. The business has a single physical location, which serves as their main office, a storefront, and warehouse for their products. However, Botium Toy’s online presence has grown, attracting customers in the U.S. and abroad. As a result, their information technology (IT) department is under increasing pressure to support their online market worldwide._

_The manager of the IT department has decided that an internal IT audit needs to be conducted. She's worried about maintaining compliance and business operations as the company grows without a clear plan. She believes an internal audit can help better secure the company’s infrastructure and help them identify and mitigate potential risks, threats, or vulnerabilities to critical assets. The manager is also interested in ensuring that they comply with regulations related to internally processing and accepting online payments and conducting business in the European Union (E.U.)._  

_The IT manager starts by implementing the National Institute of Standards and Technology Cybersecurity Framework (NIST CSF), establishing an audit scope and goals, listing assets currently managed by the IT department, and completing a risk assessment. The goal of the audit is to provide an overview of the risks and/or fines that the company might experience due to the current state of their security posture._

_Your task is to review the IT manager’s scope, goals, and risk assessment report. Then, perform an internal audit by completing a controls and compliance checklist._" 

To complete the `Control and Compliance Checklist` I had to review the following documents:

* [Botium Toys:  Scope, goals, and risk assessment report](https://github.com/Rafael-Santamaria-Ortega/Rafael-Santamaria-Ortega.github.io/blob/main/Botium%20Toys%20Scope%2C%20goals%2C%20and%20risk%20assessment%20report.pdf)
* [Botium Toys Controls Catagories](https://github.com/Rafael-Santamaria-Ortega/Rafael-Santamaria-Ortega.github.io/blob/main/Botium%20Toys%20Control%20categories.pdf)

Then, I completed the audit by means of the following checklist:

## Controls and compliance checklist

### Part 1: Controls Assesment checklist

| **Best practice**                                   | **Yes** | **No** |
|:-----------------------------------------------------|---------|--------|
| Least Privilege                                      |         |   X     |
| Disaster recovery plans                              |         |   X     |
| Password policies                                    |   X      |        |
| Separation of duties                                 |         |    X    |
| Firewall                                             |   X      |        |
| Intrusion detection system (IDS)                     |         |   X     |
| Backups                                              |         |    X    |
| Antivirus software                                   |    X     |        |
| Manual monitoring, maintenance, and intervention for legacy systems | X | |
| Encryption                                           |         |    X    |
| Password management system                           |         |    X   |
| Locks (offices, storefront, warehouse)               |     X    |        |
| Closed-circuit television (CCTV) surveillance        |     X    |        |
| Fire detection/prevention (fire alarm, sprinkler system, etc.) | X | |


### Part 2: Compliance Checklists

| **Payment Card Industry Data Security Standard (PCI DSS) best Practice**                                                      | **Yes** | **No** |
|-------------------------------------------------------------------------------------------------------------------------------|---------|--------|
| Only authorized users have access to customers’ credit card information.                                                      |         |    X    |
| Credit card information is stored, accepted, processed, and transmitted internally, in a secure environment.                  |         |    X    |
| Implement data encryption procedures to better secure credit card transaction touchpoints and data.                           |         |    X    |
| Adopt secure password management policies.                                                                                    |         |    X    |


| **General Data Protection Regulation (GDPR) best Practice**                                                                   | **Yes** | **No** |
|-------------------------------------------------------------------------------------------------------------------------------|---------|--------|
| E.U. customers’ data is kept private/secured.                                                                                |         |     X   |
| There is a plan in place to notify E.U. customers within 72 hours if their data is compromised/there is a breach.            |   X      |        |
| Ensure data is properly classified and inventoried.                                                                          |    X      |        |
| Enforce privacy policies, procedures, and processes to properly document and maintain data.                                  |    X    |        |

| **System and Organizations Controls (SOC type 1, SOC type 2) best Practice**                                                  | **Yes** | **No** |
|-------------------------------------------------------------------------------------------------------------------------------|---------|--------|
| User access policies are established.                                                                                        |         |     X   |
| Sensitive data (PII/SPII) is confidential/private.                                                                           |         |    X    |
| Data integrity ensures the data is consistent, complete, accurate, and has been validated.                                   |     X    |        |
| Data is available to individuals authorized to access it.                                                                    |     X    |        |


[Back](./)
