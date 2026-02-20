import { Link } from "react-router";
import { TrendingUp, DollarSign, Target, Calendar, BarChart3, Settings, Bell, LogOut, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const accountStats = {
    balance: 50250.75,
    equity: 51125.4,
    profitLoss: 1125.4,
    profitLossPercent: 2.29,
    todayPL: 425.8,
    todayPLPercent: 0.85,
    openPositions: 3,
    closedTrades: 47,
    winRate: 68.1,
    profitTarget: 55000,
    maxDrawdown: 5000,
    currentDrawdown: 874.6,
  };

  const recentTrades = [
    { id: 1, pair: "EUR/USD", type: "BUY", entry: 1.085, exit: 1.0875, lots: 2.5, profit: 625, time: "2 hours ago", status: "closed" },
    { id: 2, pair: "GBP/JPY", type: "SELL", entry: 185.5, exit: 185.2, lots: 1.0, profit: 300, time: "4 hours ago", status: "closed" },
    { id: 3, pair: "USD/JPY", type: "BUY", entry: 148.2, current: 148.45, lots: 3.0, profit: 750, time: "6 hours ago", status: "open" },
    { id: 4, pair: "XAU/USD", type: "SELL", entry: 2050.0, current: 2048.5, lots: 0.5, profit: 150, time: "1 day ago", status: "open" },
    { id: 5, pair: "EUR/GBP", type: "BUY", entry: 0.855, exit: 0.854, lots: 2.0, profit: -200, time: "1 day ago", status: "closed" },
  ];

  const openPositions = recentTrades.filter((t) => t.status === "open");

  return (
    <>
      <Navbar />
      <div className="bg-[#0F1115] text-white min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Trading Dashboard</h1>
              <p className="text-slate-400">Welcome back, Trader! Here's your account overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></span>
              </button>
              <button className="p-3 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors">
                <Settings size={20} />
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <LogOut size={20} />
              </Link>
            </div>
          </div>

          {/* Account Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Balance */}
            <div className="bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Account Balance</span>
                <DollarSign size={20} className="text-yellow-400" />
              </div>
              <div className="text-3xl font-bold mb-1">${accountStats.balance.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Equity:</span>
                <span className="text-white font-semibold">${accountStats.equity.toLocaleString()}</span>
              </div>
            </div>

            {/* Total P/L */}
            <div className="bg-linear-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Total P/L</span>
                <TrendingUp size={20} className="text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-emerald-400 mb-1">+${accountStats.profitLoss.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight size={16} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">+{accountStats.profitLossPercent}%</span>
              </div>
            </div>

            {/* Today's P/L */}
            <div className="bg-linear-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Today's P/L</span>
                <Calendar size={20} className="text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">+${accountStats.todayPL.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight size={16} className="text-blue-400" />
                <span className="text-blue-400 font-semibold">+{accountStats.todayPLPercent}%</span>
              </div>
            </div>

            {/* Win Rate */}
            <div className="bg-linear-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Win Rate</span>
                <Target size={20} className="text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">{accountStats.winRate}%</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">{accountStats.closedTrades} trades closed</span>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Profit Target Progress */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Profit Target Progress</span>
                <span className="text-emerald-400 font-bold">
                  ${accountStats.balance.toLocaleString()} / ${accountStats.profitTarget.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
                <div
                  className="bg-linear-to-r from-emerald-400 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(accountStats.balance / accountStats.profitTarget) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-slate-400">{((accountStats.balance / accountStats.profitTarget) * 100).toFixed(1)}% to next milestone</div>
            </div>

            {/* Drawdown */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Max Drawdown</span>
                <span className="text-yellow-400 font-bold">
                  ${accountStats.currentDrawdown.toLocaleString()} / ${accountStats.maxDrawdown.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
                <div
                  className="bg-linear-to-r from-yellow-400 to-amber-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(accountStats.currentDrawdown / accountStats.maxDrawdown) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-slate-400">
                {((accountStats.currentDrawdown / accountStats.maxDrawdown) * 100).toFixed(1)}% of max allowed
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Trades */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Trades</h2>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors">
                      All Trades
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Pair</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Entry</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Exit/Current</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Lots</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">P/L</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrades.map((trade) => (
                        <tr key={trade.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-4 font-semibold">{trade.pair}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                trade.type === "BUY" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
                              }`}
                            >
                              {trade.type}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-300">{trade.entry}</td>
                          <td className="py-4 px-4 text-slate-300">{trade.exit || trade.current}</td>
                          <td className="py-4 px-4 text-slate-300">{trade.lots}</td>
                          <td className={`py-4 px-4 font-semibold ${trade.profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {trade.profit >= 0 ? "+" : ""}${trade.profit}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                trade.status === "open" ? "bg-blue-400/10 text-blue-400" : "bg-slate-700 text-slate-400"
                              }`}
                            >
                              {trade.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions & Open Positions */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2">
                    <TrendingUp size={20} />
                    New Trade
                  </button>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2">
                    <DollarSign size={20} />
                    Request Payout
                  </button>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2">
                    <BarChart3 size={20} />
                    View Analytics
                  </button>
                </div>
              </div>

              {/* Open Positions */}
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Open Positions ({openPositions.length})</h3>
                <div className="space-y-4">
                  {openPositions.map((pos) => (
                    <div key={pos.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{pos.pair}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            pos.type === "BUY" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
                          }`}
                        >
                          {pos.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-400">Entry: {pos.entry}</span>
                        <span className="text-slate-300">Current: {pos.current}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">{pos.lots} lots</span>
                        <span className={`font-bold ${pos.profit! >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {pos.profit! >= 0 ? "+" : ""}${pos.profit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
