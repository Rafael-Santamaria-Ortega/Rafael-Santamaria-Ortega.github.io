---
layout: default
---

# Simulated DDoS Attack Response and Mitigation | Incident response, Threat analysis and mitigation, Digital Forensics

This project is part of the `cybersecurity virtual internship` offered by `Telstra` on Forage, and the main idea behind is to perform some of the daily tasks that an `Information Security Analyst` would be tasked with. In this case, the situation is incident response by communicating with stakeholders, Threat analysis using network logs, mitigation by coding a firewall rule, and performing digital forensics by documenting and reflecting on the incident. The scenario of the simulation was:

"
You are an information security analyst in the `Security Operations Centre`. A common task and responsibility of information security analysts in the SOC is to respond to triage incoming threats and respond appropriately, by notifying the correct team depending on the severity of the threat. It’s important to be able to communicate the severity of the incident to the right person so that the organisation can come together in times of attack.

The firewall logs & list of infrastructure has been provided, which shows critical services that run the Spring Framework and need to be online / uninterrupted. A list of teams has also been provided, which depending on the severity of the threat, must be contacted.

It’s important to note that the service is down and functionality is impaired due to the malware attack.
"

### First Task: Respond to Malware Attack

WIth that in mind, my task a `Information Security Analyst` was to first `triage` the malware threat and figure out what infrastructure was compromised; and second, to alert via email the respective team so as to kickstart incident response. For this, I was provided an [excel document](https://github.com/Rafael-Santamaria-Ortega/Telstra-internship/blob/main/Task%201_2%20-%20Firewall_Infrastructure%20List%20(1).xlsx) with a dashboard, a list of `firewall logs`, and a list of the company's infrastructure with their priorities and stakeholders. 

After analyzing the logs and the list I concluded that the affected infrastructure was the `NBN connection`, as the logs revealed an unusual http request that exploited a [zero day vulnerability](https://spring.io/security/cve-2022-22965) of the `Spring Framework` to impair the service. Then, I wrote an email to the nbn team notifying them of the incident:

"
From: Telstra Security Operations
To: nbn Team (nbn@email)
Subject: Critical Security Alert
—
Body: 
Hello nbn Team,

At 03:16:34 on the day 2022-03-20 a security alert was triggered, when a http request bypassed security of the NBN connection, by exploiting a vulnerability of Spring Framework. As the compromised asset is of Critical priority, the Security team is reverting the incident by updating said framework. 

We will be in touch with updates on the matter and recommend having engineers ready for mitigation.

For any questions or issues, don’t hesitate to reach out to us.

Kind regards,
Telstra Security Operations
"

### Second Task: Analyze the Attack

The next step was to properly analyze the attack by deep diving into the `firewall logs` to find patterns of attack against the network. However, as the attack appears to be distributed, blocking an `IP` is not effective. Indeed, by reviewing the SpringCore payload another pattern emerged: the attacks had a common request path `/tomcatwar.jsp` and the fellowing `HTTP header information`:  

"
suffix=%>//
c1=Runtime
c2=<%
DNT=1
Content-Type=application/x-www-form-urlencoded
"
[Picture related](https://github.com/Rafael-Santamaria-Ortega/Telstra-internship/blob/main/Screenshot%202024-10-29%20211830.png) 

So, a firewall rule that blocks network from that client path and/or with that header should fix the issues. The vulnerability also affects a deprecated version of the Spring Framework so updating it should likewise resolve the situation. With that in mind I proceeded to write an email to the network team asking for the creation of firewall rule blocking requests with said patterns:

"
From: Telstra Security Operations
To: Networks Team (networks@email.com)
Subject: [URGENT] Create Firewall Rule to Mitigate Malware Attack
—
Body: 
Hello Networks Team,

We would like to request the creation of a firewall rule and provide you more information about the ongoing attack.

The company is experiencing an attack looking to accomplish Remote Code Execution by exploiting a vulnerability in the Spring Cloud Functions framework known as ‘Spring4shell’.

Hence, we request that you establish a firewall rule to block incoming traffic from the request path “/tomcatwar.jsp”, and traffic with this header: 

suffix=%>//
c1=Runtime
c2=<%
DNT=1
Content-Type=application/x-www-form-urlencoded

Additionally, the attack was targeted to our external client network, so it would be wise to keep a close eye for request made to this path.

If any question or issue arises, don’t hesitate to reach out to us.

Kind regards,
Telstra Security Operations
"

### Third Task: Mitigate the Attack

With the `malware patterns` identified, the attack can be mitigated by implementing a `firewall rule` using `Python`. So, first I started the server and scripted the firewall rule:

```python
from http.server import BaseHTTPRequestHandler, HTTPServer
import re  # For regular expression matching

host = "localhost"
port = 8000

# Replace with specific patterns you want to block
BLOCKED_HEADERS_PATTERNS = [
    "suffix":"%>//",
    "c1":"Runtime",
    "c2":"<%",
    "DNT":"1",
    "Content-Type":"application/x-www-form-urlencoded"  # Example suspicious header
    # Add more patterns as needed
]

def block_request(self):
    # Check for blocked headers
    if self.path=='/tomcatwar.jsp':
        for pattern in BLOCKED_HEADERS_PATTERNS:
            if any(re.search(pattern, header) for header, _ in self.headers.items()):
                print("Blocking request")
                return True

    return False  # Allow request if no blocking criteria met


def handle_request(self):
    if block_request(self):
        self.send_response(403, "Forbidden")  # Respond with 403 for blocked requests
    else:
        self.send_response(200)  # Allow legitimate requests
    self.send_header("content-type", "text/plain")  # Set appropriate content type
    self.end_headers()
    self.wfile.write(b"Firewall message: Request processed.")


class ServerHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        handle_request(self)

    def do_POST(self):
        handle_request(self)


if __name__ == "__main__":
    server = HTTPServer((host, port), ServerHandler)
    print("[+] Firewall Server (Blocking)")
    print("[+] HTTP Web Server running on: %s:%s" % (host, port))

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass

    server.server_close()
    print("[+] Server terminated. Exiting...")
    exit(0)
```

[Picture related](https://github.com/Rafael-Santamaria-Ortega/Telstra-internship/blob/main/Screenshot%20(916).png)

Then I proceeded to test the `firewall rule` by making 5 requests using the `malicious payload` using this code:

```python
import http.client


host = "localhost"
port = 8000


def main():
    target = "%s:%s" % (host, port)
    print("[+] Beginning test requests to: %s" % target)
    successful_responses = 0


    for x in range (0,5):
        payload = "class.module.classLoader.resources.context.parent.pipeline.first.pattern=%25%7Bc2%7Di%20if(%22j%22.equals(request.getParameter(%22pwd%22)))%7B%20java.io.InputStream%20in%20%3D%20%25%7Bc1%7Di.getRuntime().exec(request.getParameter(%22cmd%22)).getInputStream()%3B%20int%20a%20%3D%20-1%3B%20byte%5B%5D%20b%20%3D%20new%20byte%5B2048%5D%3B%20while((a%3Din.read(b))!%3D-1)%7B%20out.println(new%20String(b))%3B%20%7D%20%7D%20%25%7Bsuffix%7Di&class.module.classLoader.resources.context.parent.pipeline.first.suffix=.jsp&class.module.classLoader.resources.context.parent.pipeline.first.directory=webapps/ROOT&class.module.classLoader.resources.context.parent.pipeline.first.prefix=tomcatwar&class.module.classLoader.resources.context.parent.pipeline.first.fileDateFormat="
        print("[%s/5]: Making test request to %s with payload: %s" % (x + 1, target, payload))
        conn = http.client.HTTPConnection(target)


        conn.request('POST', '/tomcatwar.jsp', payload,  {
            "suffix": "%>//",
            "c1": "Runtime",
            "c2": "<%",
            "DNT": "1",
            "Content-Type": "application/x-www-form-urlencoded",
        })
        response = conn.getresponse()
        status_code = response.status
        if status_code == 200:
            successful_responses += 1
        print("Response status code: %s" % status_code)
        print("=============")


    print("[+] Test completed.")
    print("[+] Successful responses: %s/5" % successful_responses)


if __name__ == "__main__":
    main()
```

As expected the `firewall rule` blocked each attempt:

[Picture related client side](https://github.com/Rafael-Santamaria-Ortega/Telstra-internship/blob/main/Screenshot%20(915).png)

[Picture related server side](https://github.com/Rafael-Santamaria-Ortega/Telstra-internship/blob/main/Screenshot%202024-10-29%20221716.png)

### Fourth Task: Incident Postmortem

With the server protected, the next task was documenting the incident with a `postmortem incident report`, covering the timeline, who was involved, a root cause and actions taken. This can be used later for GRC audits or to generate Incident Response Playbooks:

"
**Incident Postmortem: RCE by exploiting ‘SpringCore0day’ attack**

**Summary**

Incident Start Time: 2022-03-20T03:16:34Z 

Incident End Time: 2022-03-20T05:16:34Z 

Participants: Telstra Security Operations, nbn team, Networks team 

Status: Resolved 

Impact: Severity 1 - Critical Detection 

Time: 2022-03-20T03:16:34Z Root Cause Fixed Time: 2022-03-20T02:16:34Z.

**Impact**

The impact of the incident was severe since the attacker was able to perform many requests and business continuity was interrupted for 2 hours.

**Detection**

The incident was detected due to the triggering of a security alert and reports of impaired business continuity.

**Root Cause**

The cause was a vulnerability in Spring Framework versions 5.3.0 to 5.3.17, 5.2.0 to 5.2.19, and older versions, that can be exploited using data binding to populate an object from request parameters (either query parameters or form data) for Remote Code Execution. In this case it was targeted to the “nbn.external.network” using HTTP POST requests with malicious payloads.

**Resolution**

After the alert was triggered in 2022-03-20T03:16:34Z, for 30 minutes the Security team triaged the incident and informed the nbn Team, in charge of the targeted external system. 

The next 30 minutes were expended doing incident analysis and forwarding the information to Networks team, to create a firewall rule to block malicious traffic.

The following 60 minutes were allocated to create and implement said firewall rule. After that, the issue was resolved.

**Action Items**

To avoid this type of attacks in the future it is essential to enforce the firewall rule, monitor request to external networks more closely, keeping software up to date, implementing playbooks and perform threat intelligence for similar vulnerabilities.
"

This concluded the project. In summary, in this job simulation I played the part of an `Information Security Analyst` by `responding, analyzing, mitigating and performin digital forensics on a malware attack`. The experience was wonderful and challenging. But, most important of all, I learned how to perform many cybersecurity tasks in a simulation of real-world scenario. I am eager to learn more!

[back](./)
