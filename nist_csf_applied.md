---
layout: default
---

# Incident report applying the NIST CSF to a Fictional Case | GRC (Governance, Regultion and Compliance), NIST CSF 

In this exercise from the `Google Cybersecurity Professional Certificate`, I simulated being a cybersecurity analyst for a multimedia company that experienced a Distributed Denial of Service (`DDoS`) attack, disrupting network services for two hours. The attack exploited an `unconfigured firewall`, allowing a flood of `ICMP packets` (Internet Control Message Protocol) to overwhelm the network. My task was to create a security improvement plan in an `Ìncident Report` and analyze it using the `NIST Cybersecurity Framework (CSF)`. This plan incorporated `new firewall rules`, `IP verification`, `network monitoring`, and `IDS/IPS systems` to enhance the company’s network resilience.

The scenario is described as such:

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

| **Summary** | **Identify** | **Protect** | **Detect** | **Respond** | **Recover** | 
|--------------------------|-----------------------------|----------------------------|---------------------------|------------------------------|---------------------|
| <br> The organization’s network services suddenly stopped responding. After being made aware of this, the security investigated the incident and found that network traffic was flooded with ICMP packets. So, the security team blocked all ICMP packets, halted all non critical network services, and restored critical network services. Upon further inspection, the security team determined that the company was a victim of a type of DDoS (Distributed Denial of Service) attack called “ICMP flood”. Indeed, a malicious actor sent a flood of ICMP requests with different IP addresses through an unconfigured firewall, thus bypassing security measures and forcing the network server to stop responding altogether. The impact of this DDoS attack must not be undermined, since the servers were down for two hours costing the company precious financial resources and time, and even worse, consumer trust. To prevent another DDoS attack the security team configured the previously unconfigured firewall. <br> | <br> The security team audited the company’s network to find vulnerabilities. It found that network servers stopped responding after a flood of ICMP requests sent by a malicious actor with different IP addresses through an unconfigured firewall. Thus, it was concluded that the company was a victim of a type of DDoS attack called “ICMP flood”, where a malicious actor floods a network with ICMP packets sent from various IP addresses to disrupt business continuity. <br> | <br> To prevent future attacks, the security team configured the firewall by implementing a new firewall rule to limit ICMP packet receptions, and an Intrusion prevention system (IPS) and Intrusion detection system (IDS) to filter incoming packets based on suspicious characteristics. <br> | <br> To detect new threats the security team implemented IP address verification for ICMP packets, a SIEM tool to detect abnormal incoming traffic patterns. Also, regular security audits of the network were implemented. <br> | <br> To respond to future similar attacks, the security team should block all ICMP packets, halt noncritical network services and restore critical ones. After that, they should investigate further by checking network traffic logs in the SIEM tool for vulnerabilities. When said vulnerability is found, they should report it and implement measures to avoid further disruption, like isolating affected systems. For this, it would be good to implement network segmentation. The company must also, on the one hand, inform the competent authorities, and inform their clients and employees of the reason they can’t access network services and apologize. Finally, the security team must regularly check if systems are updated and configured correctly to detect and block unwanted and malicious traffic, while allowing desired traffic. <br> | <br> To recover business continuity the security team must restore all network services, that are currently unable to process requests. So, ICMP traffic should be blocked with the firewall. Then, all non-critical services must be stopped for servers to recuperate. After that, critical services must be restored. When the packet flow stops, and the server can process requests again, all noncritical network systems can be restored. Thus, restoring business continuity. <br> | 
