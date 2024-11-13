---
layout: default
---

# Incident report applying the NIST CSF to a Fictional Case | GRC (Governance, Regultion and Compliance), NIST CSF 

In this exercise from the `Google Cybersecurity Professional Certificate`, I simulated being a cybersecurity analyst for a multimedia company that experienced a Distributed Denial of Service (`DDoS`) attack, disrupting network services for two hours. The attack exploited an `unconfigured firewall`, allowing a flood of `ICMP packets` (Internet Control Message Protocol) to overwhelm the network. My task was to create a security improvement plan in an `Ìncident Report` and analyze it using the `NIST Cybersecurity Framework (CSF)`. This plan incorporated `new firewall rules`, `IP verification`, `network monitoring`, and `IDS/IPS systems` to enhance the company’s network resilience.

The scenario was described as such:

"_You are a cybersecurity analyst working for a multimedia company that offers web design services, graphic design, and social media marketing solutions to small businesses. Your organization recently experienced a DDoS attack, which compromised the internal network for two hours until it was resolved._

_During the attack, your organization’s network services suddenly stopped responding due to an incoming flood of ICMP packets. Normal internal network traffic could not access any network resources. The incident management team responded by blocking incoming ICMP packets, stopping all non-critical network services offline, and restoring critical network services._ 

_The company’s cybersecurity team then investigated the security event. They found that a malicious actor had sent a flood of ICMP pings into the company’s network through an unconfigured firewall. This vulnerability allowed the malicious attacker to overwhelm the company’s network through a distributed denial of service (DDoS) attack._ 

_To address this security event, the network security team implemented:_ 

_1. A new firewall rule to limit the rate of incoming ICMP packets_

_2. Source IP address verification on the firewall to check for spoofed IP addresses on incoming ICMP packets_

_3. Network monitoring software to detect abnormal traffic patterns_

_4. An IDS/IPS system to filter out some ICMP traffic based on suspicious characteristics_

_As a cybersecurity analyst, you are tasked with using this security event to create a plan to improve your company’s network security, following the National Institute of Standards and Technology (NIST) Cybersecurity Framework (CSF). You will use the CSF to help you navigate through the different steps of analyzing this cybersecurity event and integrate your analysis into a general security strategy. We have broken the analysis into different parts in the template below. You can explore them here:_

_**Identify** security risks through regular audits of internal networks, systems, devices, and access privileges to identify potential gaps in security._

_**Protect** internal assets through the implementation of policies, procedures, training and tools that help mitigate cybersecurity threats._ 

_**Detect** potential security incidents and improve monitoring capabilities to increase the speed and efficiency of detections._ 

_**Respond** to contain, neutralize, and analyze security incidents; implement improvements to the security process._ 

_**Recover** affected systems to normal operation and restore systems data and/or assets that have been affected by an incident._"

To conduct and analyze this `incident report` I used the following guide for references to the `NOST CSF`:

[NIST CSF](https://github.com/Rafael-Santamaria-Ortega/Rafael-Santamaria-Ortega.github.io/blob/main/Applying%20the%20NIST%20CSF%20.pdf)

After studying the document I conducted said report:

## Incident Report Analysis with the NIST CSF

| **Category** | **Description** |
|--------------|-----------------|
| **Summary**  | The organization’s network services suddenly stopped responding. After being made aware of this, the security team investigated the incident and found that `network traffic was flooded with ICMP packets`. The security team blocked all `ICMP packets`, halted non-critical network services, and restored critical network services. Further inspection revealed that the company was a victim of an `ICMP flood DDoS attack`. That means, that a malicious actor flooded the network with `ICMP requests` using different IP addresses through an `unconfigured firewall`, bypassing security measures and disrupting the `network`. The servers were down for two hours, resulting in financial losses, downtime, and loss of consumer trust. To prevent future attacks, the security team configured the firewall appropriately. |
| **Identify** | The security team audited the company’s network to identify vulnerabilities, discovering that the network servers were compromised by a `flood of ICMP requests from multiple IP addresses`. This led to the conclusion that the company was a victim of an `ICMP flood DDoS attack`, where a malicious actor disrupted business continuity by overwhelming the network with ICMP packets. |
| **Protect**  | To prevent future attacks, the security team configured the `firewall` by `adding rules` to limit ICMP packet receptions. Additionally, they implemented an `Intrusion Prevention System (IPS)` and `Intrusion Detection System (IDS)` to filter incoming packets with suspicious characteristics. |
| **Detect**   | To detect future threats, the security team implemented `IP address verification for ICMP packets` and deployed a `Security Information and Event Management (SIEM) tool` to identify abnormal incoming traffic patterns. Regular security audits of the network were also scheduled. |
| **Respond**  | For responding to similar attacks in the future, the security team should `block all ICMP packets`, halt non-critical network services, and restore critical services. Further investigation should include reviewing network traffic logs in the SIEM tool to identify vulnerabilities. The team should also report vulnerabilities, implement preventive measures like network segmentation, notify authorities, and inform clients and employees of service disruptions. Additionally, they should regularly verify that systems are updated and properly configured to block malicious traffic while allowing legitimate traffic. |
| **Recover**  | To restore `business continuity`, the security team must bring back all network services affected by the attack. This involves `blocking ICMP traffic through the firewall, stopping non-critical services temporarily, and restoring critical services first`. Once packet flow returns to normal, non-critical services can be gradually re-enabled, fully restoring business continuity. |

[Back](./)
