export class ZooNameError extends Error {
  constructor(public type: 'InvalidFormat' | 'ReceiverNotFound') {
    super(`Zoo Name Error: ${type}`);
    this.name = 'ZooNameError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export const isZooIdentityLocalhost = (
  zooIdentity: string,
): boolean => {
  return (
    zooIdentity.includes('localhost.arb-sep-zoo') ||
    zooIdentity.includes('localhost.sep-zoo') ||
    zooIdentity.includes('localhost.zoo')
  );
};

export const extractJobIdFromInbox = (deserializedId: string): string => {
  const parts: string[] = deserializedId.split('::');
  if (parts.length < 3 || !isJobInbox(deserializedId)) {
    throw new ZooNameError('InvalidFormat');
  }

  const jobId = parts[1];
  return jobId;
};

export const isJobInbox = (inboxId: string): boolean => {
  const parts: string[] = inboxId.split('::');
  if (parts.length < 3) {
    throw new ZooNameError('InvalidFormat');
  }
  return parts[0] === 'job_inbox';
};

export const buildInboxIdFromJobId = (jobId: string): string => {
  // TODO: job_inbox, false is hardcoded
  return `job_inbox::${jobId}::false`;
};
