---
layout: default
---

# Suspicious Network Traffic Analysis | Networking, tcpdump, logs, TCP/IP model

In this hands-on activity I simulated being a Cybersecurity analyst from a Fictional IT Services Company investigating why customers cannot access the fictional site `www.yummyrecipesforme.com`, using a `tcpdump` log: 

```tcpdump
13:24:32.192571 IP 192.51.100.15.52444 > 203.0.113.2.domain: 35084+ A? yummyrecipesforme.com. (24)
13:24:36.098564 IP 203.0.113.2 > 192.51.100.15: ICMP 203.0.113.2 udp port 53 unreachable length 254
13:26:32.192571 IP 192.51.100.15.52444 > 203.0.113.2.domain: 35084+ A? yummyrecipesforme.com. (24)
13:27:15.934126 IP 203.0.113.2 > 192.51.100.15: ICMP 203.0.113.2 udp port 53 unreachable length 320
13:28:32.192571 IP 192.51.100.15.52444 > 203.0.113.2.domain: 35084+ A? yummyrecipesforme.com. (24)
13:28:50.022967 IP 203.0.113.2 > 192.51.100.15: ICMP 203.0.113.2 udp port 53 unreachable length 150
```

After this analysis of the DNS connectivity issue at yummyrecipesforme.com, I had to complete a formal cybersecurity incident report with my personal findings: 

## Cybersecurity Incident Report: Network Traffic Analysis 

| **Provide a summary of the problem found in the DNS and ICMP traffic log** | 
|:---------------------------------------------------------------------------------------------------------------|
| <br> The UDP protocol analysis reveals that `DNS` (Domain Name System) server requests to map the IP address of `yummyrecipesforme.com` cannot be fulfilled. `Source IP 192.51.100.15` attempted to reach `DNS server 203.0.113.2` multiple times without success. <br><br> Network analysis using tcpdump shows `ICMP` (Internet Control Message Protocol) echo replies consistently returning the error message: "udp port 53 unreachable". The log data shows outbound `UDP` (User Datagram Protocol) packets requesting DNS resolution, followed immediately by ICMP error responses. <br><br> `Port 53`, which is the standard port for DNS server requests, is completely unreachable by users, preventing all domain name resolution attempts. The tcpdump logs confirm that no service is actively listening on the receiving DNS port. <br> | 

| **Data Analysis and Incident Cause Assessment** | 
|:------------------------------------------------------------------------------------------------------------|
| Initial incident timing: First detected at `13:24:32.192571 (1:24 p.m.)`. Subsequent attempts at 1:26 p.m., 1:27 p.m., and 1:28 p.m. confirmed persistence of the issue as identical errors were logged each time. <br><br> The IT team was alerted by the HR department when they encountered "destination port unreachable" errors while attempting to access `www.yummyrecipesforme.com`. Multiple users across different client organizations reported the same issue. So, the cybersecurity immediately started an investigation. <br><br> The key findings were that packet capture analysis using tcpdump confirms `DNS service disruption`, log patterns show `UDP packets` failing to reach `DNS port 53`, the error messages suggest no service is listening on the DNS port, and multiple retry attempts produced identical failure patterns. <br><br> Probable Causes (in order of likelihood): <br><br> - Intentional firewall rule implementation blocking port 53 traffic <br> - Misconfigured firewall rule accidentally affecting port 53 <br> - DNS server compromise via DoS/DDoS attack targeting port 53 <br> | 

[Back](./)
