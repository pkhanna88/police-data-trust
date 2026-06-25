"use client"

import { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts/LineChart"
import { apiFetch } from "@/utils/apiFetch"
import { apiBaseUrl } from "@/utils/apiRoutes"
import API_ROUTES from "@/utils/apiRoutes"
import { ComplaintsOverTimePoint } from "@/utils/api"

export default function OverviewPage() {
  const [data, setData] = useState<ComplaintsOverTimePoint[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadData = async (): Promise<void> => {
      try {
        const res = await apiFetch(`${apiBaseUrl}${API_ROUTES.complaints.metricsOverTime}`)
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const json: ComplaintsOverTimePoint[] = await res.json()
        if (active) {
          setData(json)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load data")
        }
      }
    }

    loadData()
    return () => {
      active = false
    }
  }, [])

  if (error) {
    return <div style={{ color: "red", padding: "1rem" }}>Error: {error}</div>
  }

  if (data === null) {
    return <div style={{ padding: "1rem" }}>Loading…</div>
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Complaints Over Time</h1>
      <LineChart
        xAxis={[
          {
            data: data.map((point) => point.year),
            scaleType: "point",
            label: "Year"
          }
        ]}
        series={[
          {
            data: data.map((point) => point.complaint_count),
            label: "Complaints"
          }
        ]}
        height={400}
      />
    </div>
  )
}
