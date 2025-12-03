// /lib/dashboard-data.ts

// --- INTERFACES ---
export interface DistrictData {
    id: number;
    district: string;
    workers: number;
    liveRiskScore: number;
    predictedRiskScore: number;
    highRiskSites: number;
    color: 'red' | 'orange' | 'yellow' | 'green';
}

export interface AlertData {
    id: number;
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    description: string;
    time: string;
}

// --- MOCK DATA FOR FRONTEND DEVELOPMENT ---

export const MOCK_DISTRICTS: DistrictData[] = [
    { id: 1, district: "Ernakulam", workers: 100414, liveRiskScore: 8.9, predictedRiskScore: 8.7, highRiskSites: 23, color: "red" },
    { id: 2, district: "Thrissur", workers: 78230, liveRiskScore: 8.1, predictedRiskScore: 6.4, highRiskSites: 19, color: "orange" },
    { id: 3, district: "Kozhikode", workers: 45230, liveRiskScore: 6.8, predictedRiskScore: 8.2, highRiskSites: 12, color: "yellow" },
    { id: 4, district: "Palakkad", workers: 38470, liveRiskScore: 5.9, predictedRiskScore: 3.8, highRiskSites: 9, color: "yellow" },
    { id: 5, district: "Kottayam", workers: 21560, liveRiskScore: 3.4, predictedRiskScore: 2.9, highRiskSites: 4, color: "green" },
    { id: 6, district: "Thiruvananthapuram", workers: 18920, liveRiskScore: 2.8, predictedRiskScore: 2.3, highRiskSites: 3, color: "green" },
    { id: 7, district: "Kannur", workers: 34120, liveRiskScore: 6.2, predictedRiskScore: 5.7, highRiskSites: 8, color: "yellow" },
    { id: 8, district: "Alappuzha", workers: 26340, liveRiskScore: 4.1, predictedRiskScore: 3.6, highRiskSites: 5, color: "green" },
];

export const MOCK_ALERTS: AlertData[] = [
    { id: 1, type: "critical", title: "Critical Safety Violation", description: "Major construction site reported unsafe scaffolding.", time: "5 mins ago" },
    { id: 2, type: "warning", title: "Health Complaint Spike", description: "Fish processing zone reports 12 new respiratory complaints.", time: "23 mins ago" },
    { id: 3, type: "info", title: "AI Prediction Alert", description: "AI model predicts 70% probability of safety incident within 48 hours.", time: "1 hour ago" },
    { id: 4, type: "success", title: "Compliance Improvement", description: "Manufacturing belt achieved 98% safety compliance rate.", time: "3 hours ago" },
];

export const MOCK_RISK_TREND = [
    { week: "W1", liveRisk: 2.3, predictedRisk: 2.1 },
    { week: "W2", liveRisk: 4.5, predictedRisk: 3.8 },
    { week: "W3", liveRisk: 6.2, predictedRisk: 5.9 },
    { week: "W4", liveRisk: 8.5, predictedRisk: 8.2 },
];

export const MOCK_INCIDENT_CATEGORIES = [
    { name: "Construction", value: 42, color: "#2563eb" },
    { name: "Manufacturing", value: 23, color: "#f97316" },
    { name: "Services", value: 17, color: "#a855f7" },
    { name: "Hospitality", value: 18, color: "#10b981" },
];