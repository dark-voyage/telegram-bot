export interface Liveness {
  status: string;
}

interface ReadinessContent {
  status: string;
  message?: string;
}

interface ReadinessGitaly {
  status: string;
  labels: {
    shard: string;
  };
}

export interface Readiness {
  status: string;
  master_check: ReadinessContent[];
  db_check: ReadinessContent[];
  cache_check: ReadinessContent[];
  queues_check: ReadinessContent[];
  rate_limiting_check: ReadinessContent[];
  sessions_check: ReadinessContent[];
  shared_state_check: ReadinessContent[];
  trace_chunks_check: ReadinessContent[];
  gitaly_check: ReadinessGitaly[];
}
