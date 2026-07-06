/**
 * Dashboard Component
 * Main dashboard displaying key EV efficiency metrics and real-time data
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import clsx from 'clsx';

import { fetchTrips, selectTripStats } from '../store/slices/tripsSlice';
import { useTrips } from '../hooks/useTrips';
import EfficiencyChart from './EfficiencyChart';
import RecommendationCard from './RecommendationCard';
import Loading from './Loading';
import StatCard from './StatCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { trips, loading, error } = useTrips();
  const stats = useSelector(selectTripStats);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    // Fetch trips on component mount
    dispatch(fetchTrips());
  }, [dispatch]);

  // Calculate trend data from trips
  useEffect(() => {
    if (trips && trips.length > 0) {
      const last7Days = generateLast7Days();
      const enrichedData = last7Days.map(date => {
        const dayTrips = trips.filter(trip =>
          format(new Date(trip.start_time), 'yyyy-MM-dd') === date
        );
        
        return {
          date: format(new Date(date), 'MMM dd'),
          efficiency: dayTrips.length > 0
            ? (dayTrips.reduce((sum, t) => sum + t.efficiency_kwh_per_km, 0) / dayTrips.length).toFixed(2)
            : 0,
          trips: dayTrips.length,
          energy: dayTrips.reduce((sum, t) => sum + t.energy_consumed_kwh, 0).toFixed(1)
        };
      });
      setTrendData(enrichedData);
    }
  }, [trips]);

  const generateLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) =>
      format(subDays(new Date(), 6 - i), 'yyyy-MM-dd')
    );
  };

  if (loading) return <Loading message="Loading dashboard data..." />;
  if (error) return <DashboardError error={error} />;

  const currentTrip = trips?.find(t => t.status === 'active');
  const completedTrips = trips?.filter(t => t.status === 'completed') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Real-time EV efficiency monitoring and analytics</p>
      </div>

      {/* Active Trip Alert */}
      {currentTrip && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-semibold">
            🚗 Active Trip in Progress
          </p>
          <p className="text-blue-700 text-sm mt-1">
            Started {format(new Date(currentTrip.start_time), 'p')} • 
            {currentTrip.distance_km.toFixed(1)} km
          </p>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Average Efficiency"
          value={stats.avgEfficiency?.toFixed(2) || '—'}
          unit="kWh/km"
          icon="⚡"
          trend={stats.efficiencyTrend}
        />
        <StatCard
          label="Total Distance"
          value={stats.totalDistance?.toFixed(0) || '—'}
          unit="km"
          icon="🗺️"
          trend="+12%"
        />
        <StatCard
          label="Energy Consumed"
          value={stats.totalEnergy?.toFixed(1) || '—'}
          unit="kWh"
          icon="🔋"
        />
        <StatCard
          label="Trips Completed"
          value={stats.tripCount || '—'}
          unit="trips"
          icon="✓"
          trend={`+${stats.weeklyTripCount || 0} this week`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Efficiency Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Efficiency Trend (7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorEfficiency)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">Best Efficiency</span>
              <span className="font-semibold text-green-600">
                {stats.bestEfficiency?.toFixed(2) || '—'} kWh/km
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">Avg Speed</span>
              <span className="font-semibold">{stats.avgSpeed?.toFixed(0) || '—'} km/h</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-600">Rank (Peers)</span>
              <span className="font-semibold">{stats.peerPercentile || '—'}th %ile</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">This Month</span>
              <span className="font-semibold">{stats.monthlyTrips || '—'} trips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recommendations for You</h2>
        {stats.recommendations && stats.recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recommendations.slice(0, 4).map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-slate-600">No recommendations available yet. Keep driving!</p>
          </div>
        )}
      </div>

      {/* Recent Trips */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Recent Trips</h2>
        </div>
        {completedTrips.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Distance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Energy</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Efficiency</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Avg Speed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {completedTrips.slice(0, 5).map(trip => (
                  <tr key={trip.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {format(new Date(trip.end_time), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {trip.distance_km.toFixed(1)} km
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {trip.energy_consumed_kwh.toFixed(2)} kWh
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={clsx(
                        'px-2 py-1 rounded font-semibold',
                        trip.efficiency_kwh_per_km < 0.2
                          ? 'bg-green-100 text-green-800'
                          : trip.efficiency_kwh_per_km < 0.25
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      )}>
                        {trip.efficiency_kwh_per_km.toFixed(2)} kWh/km
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {trip.average_speed_kmh.toFixed(0)} km/h
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href={`/trips/${trip.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-slate-600">
            No completed trips yet. Start your first trip to see analytics!
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardError = ({ error }) => (
  <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
    <div className="bg-white rounded-lg shadow p-8 max-w-md">
      <h2 className="text-2xl font-bold text-red-900 mb-4">Error Loading Dashboard</h2>
      <p className="text-red-700 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  </div>
);

export default Dashboard;
