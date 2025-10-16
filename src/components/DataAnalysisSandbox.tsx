import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Filter, Download, Share2, TrendingUp, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const mockData = [
  { name: "Very Satisfied", value: 145, percentage: 42 },
  { name: "Satisfied", value: 98, percentage: 28 },
  { name: "Neutral", value: 67, percentage: 19 },
  { name: "Dissatisfied", value: 38, percentage: 11 },
];

const sentimentData = [
  { sentiment: "Positive", count: 156, color: "#22c55e" },
  { sentiment: "Neutral", count: 89, color: "#94a3b8" },
  { sentiment: "Negative", count: 42, color: "#ef4444" },
];

const responses = [
  { id: 1, text: "Great service! Very happy with the experience.", sentiment: "positive" },
  { id: 2, text: "Could be better, some issues with delivery time.", sentiment: "neutral" },
  { id: 3, text: "Excellent product quality, will buy again!", sentiment: "positive" },
  { id: 4, text: "Not satisfied with customer support response.", sentiment: "negative" },
  { id: 5, text: "Good value for money, meets expectations.", sentiment: "positive" },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

interface DataAnalysisSandboxProps {
  onComplete?: () => void;
}

export const DataAnalysisSandbox = ({ onComplete }: DataAnalysisSandboxProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const exportData = (format: string) => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`, {
      description: "Your report is being generated",
    });
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Survey Results Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            348 responses • Last updated 2 hours ago
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveFilter(activeFilter ? null : "satisfied")}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => exportData("pdf")}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Responses</p>
              <p className="text-3xl font-bold mt-2">348</p>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12% from last week
              </p>
            </div>
            <Users className="w-12 h-12 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              <p className="text-3xl font-bold mt-2">70%</p>
              <p className="text-sm text-muted-foreground mt-1">Very Satisfied + Satisfied</p>
            </div>
            <TrendingUp className="w-12 h-12 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Text Responses</p>
              <p className="text-3xl font-bold mt-2">287</p>
              <p className="text-sm text-muted-foreground mt-1">82% response rate</p>
            </div>
            <MessageSquare className="w-12 h-12 text-primary opacity-20" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="responses">Individual Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Satisfaction Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Response Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Text Response Sentiment</h3>
            <div className="space-y-4">
              {sentimentData.map((item) => (
                <div key={item.sentiment} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.sentiment}</span>
                    <span className="text-sm text-muted-foreground">{item.count} responses</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.count / 287) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Sample Responses</h3>
            <div className="space-y-4">
              {responses.map((response) => (
                <div
                  key={response.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Response #{response.id}</span>
                    <Badge
                      variant={
                        response.sentiment === "positive"
                          ? "default"
                          : response.sentiment === "negative"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {response.sentiment}
                    </Badge>
                  </div>
                  <p className="text-sm">{response.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
        <div className="flex gap-2">
          <Badge variant="outline">Interactive Analytics</Badge>
          <Badge variant="secondary">Live Data</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Explore different views and export options to master data analysis
        </p>
      </div>
    </div>
  );
};
