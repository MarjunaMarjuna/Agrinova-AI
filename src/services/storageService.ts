import { ScanReport, Language } from '../types';
import { DISEASES_DATABASE } from '../data/diseases';

const STORAGE_KEY_REPORTS = 'agrinova_scan_reports';
const STORAGE_KEY_LANG = 'agrinova_language';
const STORAGE_KEY_OFFLINE_PACKS = 'agrinova_offline_packs';

export const storageService = {
  getLanguage(): Language | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY_LANG);
    return (stored === 'ta' || stored === 'hi' || stored === 'en') ? stored : null;
  },

  setLanguage(lang: Language): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  },

  getReports(): ScanReport[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
    if (!raw) {
      // Seed with initial realistic scans for demo experience
      const initial: ScanReport[] = [
        {
          id: 'scan-seed-1',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          cropId: 'tomato',
          imageUri: DISEASES_DATABASE.tomato_early_blight.sampleImage,
          disease: DISEASES_DATABASE.tomato_early_blight,
          status: 'treating',
          isOffline: false
        },
        {
          id: 'scan-seed-2',
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          cropId: 'rice',
          imageUri: DISEASES_DATABASE.rice_bacterial_blight.sampleImage,
          disease: DISEASES_DATABASE.rice_bacterial_blight,
          status: 'resolved',
          isOffline: true
        }
      ];
      this.saveReports(initial);
      return initial;
    }

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveReports(reports: ScanReport[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
  },

  addReport(report: ScanReport): void {
    const reports = this.getReports();
    // Prepend new report to top
    const updated = [report, ...reports];
    this.saveReports(updated);
  },

  updateReportStatus(id: string, status: 'active' | 'treating' | 'resolved'): void {
    const reports = this.getReports();
    const updated = reports.map(r => r.id === id ? { ...r, status } : r);
    this.saveReports(updated);
  },

  isOfflinePackDownloaded(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY_OFFLINE_PACKS) === 'true';
  },

  setOfflinePackDownloaded(val: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_OFFLINE_PACKS, val ? 'true' : 'false');
  }
};
