# Backup and Recovery SOP

Run daily MongoDB backups, verify archive size, restore to a test environment weekly, and store encrypted copies outside the server. Recovery must prioritize MongoDB, then Redis queues, then uploaded documents.
