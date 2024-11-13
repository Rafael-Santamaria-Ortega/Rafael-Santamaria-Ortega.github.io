---
layout: default
---

# Home Office Network Device Inventory | Assest Management

In this hands-on activity from the `Google Cybersecurity Professional Certificate`, I simulated managing a `home office network` for a small business by creating an inventory of connected devices. The task involved identifying key networked devices, such as computers, smart home devices, and storage systems, listing each device’s important characteristics, and assigning a sensitivity level based on its need for protection. This inventory helps in identifying sensitive assets that require enhanced security measures. 

The inventory is the following: 

| **Asset**            | **Network Access** | **Owner**         | **Location**         | **Notes**                                                                             | **Sensitivity**    |
|----------------------|--------------------|-------------------|----------------------|---------------------------------------------------------------------------------------|---------------------|
| Network router       | Continuous         | ISP               | On-premises          | Has a 2.4 GHz and 5 GHz connection. All devices on the home network use 5 GHz.        | Confidential        |
| Desktop              | Occasional         | Homeowner         | On-premises          | Contains private information, like photos.                                            | Restricted          |
| Guest smartphone     | Occasional         | Friend            | On and Off-premises  | Connects to the home network.                                                         | Internal-only       |
| Personal smartphone  | Occasional         | Homeowner         | On and off-premises  | Connects to the home network and contains sensitive information.                      | Internal-only       |
| Smart printer        | Occasional         | Homeowner         | On-premises          | Bluetooth and WiFi-enabled device.                                                    | Internal-only       |
| Bluetooth headphones | Occasional         | Homeowner         | On and off-premises  | Bluetooth device.                                                                     | Confidential        |

## NOTES: The sensitivity categories concern the principle of least privilege

| **Categories**     | **Access Designation**           |
|--------------------|----------------------------------|
| Restricted         | Need-to-know                     |
| Confidential       | Limited to specific users        |
| Internal-only      | Users on-premises                |
| Public             | Anyone                           |


[Back](./)
