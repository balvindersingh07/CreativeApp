import axios from "axios";
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8081";
export const http = axios.create({ baseURL: API_BASE });

export interface AnalyticsSummary {
  counts: Record<string, number>;
  creatorsByCity: { city: string; count: number }[];
  topEvents: { title: string; score?: number; id?: string }[];
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const res = await api.get("/api/v1/analytics/summary");
  return res.data as AnalyticsSummary;
}

export interface EventItem {
  id?: string;
  title?: string;
  city?: string;
  category?: string;
  date?: string;         // ISO or any parseable format
  fee?: number | string; // optional
  applyLink?: string;    // optional
  organizer?: { email?: string } | null;
}

export async function getEvents(): Promise<EventItem[]> {
  const res = await api.get("/api/v1/events");
  return Array.isArray(res.data) ? res.data as EventItem[] : [];
}
