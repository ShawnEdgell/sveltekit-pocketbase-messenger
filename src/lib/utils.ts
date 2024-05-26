import type { Message } from './stores/messages';

export function mapToMessages(records: Record<string, unknown>[]): Message[] {
  return records.map(record => ({
    id: record.id as string,
    sender_id: record.sender_id as string,
    content: record.content as string,
    timestamp: record.timestamp as string,
  }));
}
