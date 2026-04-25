# Distributed School Database System

## Vitess + MySQL - Cloud-Native Sharded Architecture

### Project Overview
A complete 3-tier distributed system showcasing horizontal sharding using Vitess.

| Layer            | Technology      | Port            |
|------------------|-----------------|-----------------|
| **Frontend**     | React           | 3000            |
| **Backend API**  | Python Flask    | 5000            |
| **Query Router** | Vitess VTGate   | 15306           |
| **Tablets**      | vttablet x2     | 15100, 15101    |
| **Database**     | MySQL 8.0 x2    | 3306, 3307      |
| **Topology**     | etcd            | 2379            |
| **Manager**      | vtctld          | 15000           |

### Architecture
Browser (React :3000) -> Flask API (:5000) -> VTGate (:15306) -> [Shard 0 (:3306) + Shard 1 (:3307)]

### Features
- 2 MySQL Shards running independently
- Vitess VTGate for automatic query routing
- Sharding Key: school_id (Hash-based)
- Auto data distribution across shards
- React Dashboard with live data
- Random data generator for testing
- MySQL-compatible - standard SQL works

### Author
Basharat Hussain, Syed Waqas Imam, Sajad Ali - Distributed Systems Project
