# Distributed School Database System

### Vitess + MySQL - Cloud-Native Sharded Architecture

---

## Project Overview

A complete 3-tier distributed system showcasing horizontal sharding using Vitess. Data is automatically distributed across 2 MySQL shards based on school_id.

---

## Architecture

Browser (React :3000) -> Flask API (:5000) -> VTGate (:15306) -> [Shard 0 (:3306) + Shard 1 (:3307)]

---

## Components

| Layer | Technology | Port |
|:---:|:---:|:---:|
| Frontend | React | 3000 |
| Backend API | Python Flask | 5000 |
| Query Router | Vitess VTGate | 15306 |
| Tablets | vttablet x2 | 15100, 15101 |
| Database | MySQL 8.0 x2 | 3306, 3307 |
| Topology | etcd | 2379 |
| Manager | vtctld | 15000 |

---

## Features

- 2 MySQL Shards running independently
- Vitess VTGate for automatic query routing
- Sharding Key: school_id (Hash-based)
- Auto data distribution across shards
- React Dashboard with live data
- Random data generator for testing
- MySQL-compatible - standard SQL works

---

## Verify Sharding

VTGate shows all data:
mysql -h 127.0.0.1 -P 15306 -u root -e "SELECT * FROM school_results.schools;"

Shard 0 only:
mysql -u root -S /var/lib/vitess_shard0/mysql.sock -e "SELECT * FROM vt_school_results.schools;"

Shard 1 only:
mysql -u root -S /var/lib/vitess_shard1/mysql.sock -e "SELECT * FROM vt_school_results.schools;"

Each shard has different data, but VTGate shows everything together!

---

## Authors

Basharat Hussain, Syed Waqas Imam, Sajad Ali
Distributed Systems Project
