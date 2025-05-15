"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface FundingOverviewProps {
  fundingData: any[]
}

export function FundingOverview({ fundingData }: FundingOverviewProps) {
  // Transform data for the chart
  const chartData = fundingData.map((item) => ({
    name: item.status,
    value: item._sum.amount || 0,
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Funding Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No funding data available.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
