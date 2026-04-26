# Deployment Architecture

Production services: web, api, worker, MongoDB, Redis, Nginx, object storage, monitoring, and backup jobs. Nginx routes `/api` to API and all other traffic to web. Workers do not expose public traffic and should authenticate to API using a worker secret.
