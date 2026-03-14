import { Logger } from '../utils/logger';
import { AuditEntry } from '../types';
import { DatabaseClient } from '../database/database-client';

/**
 * Audit Logger - Maintains comprehensive audit trail for all operations
 */
export class AuditLogger {
  private entries: Map<string, AuditEntry> = new Map();
  private database: DatabaseClient | null = null;

  constructor(database?: DatabaseClient) {
    this.database = database || null;
  }

  async logAction(
    action: string,
    changes: Record<string, any>,
    userId?: string,
    metadata?: Record<string, any>
  ): Promise<AuditEntry> {
    const entry: AuditEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action,
      userId,
      changes,
      metadata,
    };

    this.entries.set(entry.id, entry);

    Logger.info(`Audit log: ${action}`, {
      auditId: entry.id,
      userId,
      timestamp: entry.timestamp,
    });

    // Persist to database if available
    if (this.database) {
      try {
        await this.database.saveRecord('audit_logs', entry);
      } catch (error) {
        Logger.error('Failed to persist audit log to database', { error });
      }
    }

    return entry;
  }

  getEntry(id: string): AuditEntry | undefined {
    return this.entries.get(id);
  }

  getEntriesByAction(action: string): AuditEntry[] {
    return Array.from(this.entries.values()).filter((entry) => entry.action === action);
  }

  getEntriesByUser(userId: string): AuditEntry[] {
    return Array.from(this.entries.values()).filter((entry) => entry.userId === userId);
  }

  getEntriesInTimeRange(startTime: Date, endTime: Date): AuditEntry[] {
    return Array.from(this.entries.values()).filter(
      (entry) => entry.timestamp >= startTime && entry.timestamp <= endTime
    );
  }

  async generateAuditReport(
    startDate: Date,
    endDate: Date
  ): Promise<{
    period: { start: Date; end: Date };
    totalActions: number;
    actionsByType: Record<string, number>;
    entries: AuditEntry[];
  }> {
    const entries = this.getEntriesInTimeRange(startDate, endDate);
    const actionsByType: Record<string, number> = {};

    entries.forEach((entry) => {
      actionsByType[entry.action] = (actionsByType[entry.action] || 0) + 1;
    });

    return {
      period: { start: startDate, end: endDate },
      totalActions: entries.length,
      actionsByType,
      entries,
    };
  }

  exportAsJSON(startDate?: Date, endDate?: Date): string {
    let entries = Array.from(this.entries.values());

    if (startDate && endDate) {
      entries = this.getEntriesInTimeRange(startDate, endDate);
    }

    return JSON.stringify(entries, null, 2);
  }

  clearOldEntries(olderThanDays: number): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    let removedCount = 0;
    for (const [id, entry] of this.entries) {
      if (entry.timestamp < cutoffDate) {
        this.entries.delete(id);
        removedCount++;
      }
    }

    Logger.info(`Cleared ${removedCount} audit entries older than ${olderThanDays} days`);
    return removedCount;
  }
}
