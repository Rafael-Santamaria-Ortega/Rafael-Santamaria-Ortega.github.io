---
layout: default 
---

# Tightening Security with a Role Based Access Control Python Algorithm | Python, IAM, Hardneing

In this bonus task from the J.P. Morgan & Chase Co. `Cybersecurity Virtual Internship` program I was tasked with engineering an automation solution to limit the number of active roles that a person has at the time. In order to achieve that, the solution had to keep track of all the assigned roles to a person, and drop the oldest role when a new one is added. More precisely, the instructions for the code were the following:

* Implement the constructor, get, and set methods of RolesCache. Each instance of the RolesCache corresponds to a single person.
* Finally, fill out the runtime complexity for get and set and the overall space used
* Use Big O notation, i.e. O(1), O(N), etc. 

The code I wrote was the following:

```python
class RolesCache:
    def __init__(self, capacity):
        # Initialize the cache with a maximum number of items
        self.capacity = capacity
        # Dictionary to store role-message pairs
        self.cache = {}
        # Dictionary to track the last access time of each role
        self.lru = {}
        # Counter to track the order of access
        self.count = 0

    def get(self, role):
        # Retrieve a message for a given role
        if role in self.cache:
            # Update the last used time for this role
            self.lru[role] = self.count
            # Increment the access counter
            self.count += 1
            # Return the cached message
            return self.cache[role]
        # Return None if the role is not in the cache
        return None
        
    def set(self, role, message):
        # Check if cache is full and the role is new
        if len(self.cache) >= self.capacity and role not in self.cache:
            # Find the least recently used role
            # Uses min() with a key function to find the role with the lowest access time
            oldest_role = min(self.lru, key=self.lru.get)
            # Remove the oldest role from both cache and LRU tracking
            del self.cache[oldest_role]
            del self.lru[oldest_role]
        
        # Add or update the role and its message
        self.cache[role] = message
        # Update the last used time for this role
        self.lru[role] = self.count
        # Increment the access counter
        self.count += 1

    def _complexity(self):
        # Provide time and space complexity information for the cache operations
        return {
            'get': 'O(1)',    # Constant time retrieval
            'set': 'O(N)',    # Linear time for finding least recently used item
            'space': 'O(N)'   # Space scales linearly with number of items
        }
```

* The point of such an algorithm was to ensure that roles are updated according to `least privilege and separation of duties principles`.

[Back](./)
