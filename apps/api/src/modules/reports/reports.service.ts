import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  dashboard() {
    return {
      totalRentBilledThisMonth: 0,
      totalCollectedThisMonth: 0,
      outstandingBalances: 0,
      lateTenants: 0,
      vacantUnits: 0,
      occupiedUnits: 0,
      offlineRecordsPendingSync: 0,
      syncConflictsRequiringAdminReview: 0,
    };
  }

  report(name: string) {
    return { report: name, generatedAt: new Date().toISOString(), rows: [] };
  }
}
