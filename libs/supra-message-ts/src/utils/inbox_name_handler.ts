export class SupraNameError extends Error {
  constructor(public type: 'InvalidFormat' | 'ReceiverNotFound') {
    super(`Supra Name Error: ${type}`);
    this.name = 'SupraNameError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export const isSupraIdentityLocalhost = (
  supraIdentity: string,
): boolean => {
  return (
    supraIdentity.includes('localhost.arb-sep-supra') ||
    supraIdentity.includes('localhost.sep-supra') ||
    supraIdentity.includes('localhost.supra')
  );
};

export const extractJobIdFromInbox = (deserializedId: string): string => {
  const parts: string[] = deserializedId.split('::');
  if (parts.length < 3 || !isJobInbox(deserializedId)) {
    throw new SupraNameError('InvalidFormat');
  }

  const jobId = parts[1];
  return jobId;
};

export const isJobInbox = (inboxId: string): boolean => {
  const parts: string[] = inboxId.split('::');
  if (parts.length < 3) {
    throw new SupraNameError('InvalidFormat');
  }
  return parts[0] === 'job_inbox';
};

export const buildInboxIdFromJobId = (jobId: string): string => {
  // TODO: job_inbox, false is hardcoded
  return `job_inbox::${jobId}::false`;
};
