// ## AGENTS_MD_VERIFIED ##
import Layout from './components/Layout'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

function App() {
  // Sample dashboard data
  const kpis = [
    { label: 'Revenue', value: '$148.7k', delta: '+12.3%' },
    { label: 'Orders', value: '3,942', delta: '+4.1%' },
    { label: 'Active Users', value: '28,410', delta: '+6.8%' },
    { label: 'Conversion', value: '3.42%', delta: '+0.3%' },
  ]

  const revenue = [
    { day: 'Mon', value: 18 },
    { day: 'Tue', value: 22 },
    { day: 'Wed', value: 19 },
    { day: 'Thu', value: 24 },
    { day: 'Fri', value: 28 },
    { day: 'Sat', value: 26 },
    { day: 'Sun', value: 21 },
  ]

  const channels = [
    { name: 'Search', value: 5200 },
    { name: 'Email', value: 3400 },
    { name: 'Social', value: 2800 },
    { name: 'Affiliates', value: 1900 },
  ]

  const geo = [
    { name: 'NA', value: 42 },
    { name: 'EU', value: 31 },
    { name: 'APAC', value: 19 },
    { name: 'LATAM', value: 8 },
  ]

  const COLORS = ['#52d6ff', '#7aff9c', '#ffd76a', '#ff9da1']

  const recent = [
    { id: 'INV-1043', customer: 'Futura Labs', amount: '$3,240', status: 'Paid', trend: 'up' },
    { id: 'INV-1042', customer: 'Nova Design', amount: '$1,980', status: 'Due', trend: 'flat' },
    { id: 'INV-1041', customer: 'Aether Inc', amount: '$5,120', status: 'Paid', trend: 'up' },
    { id: 'INV-1040', customer: 'Echo Studio', amount: '$780', status: 'Overdue', trend: 'down' },
  ]

  return (
    <Layout>
      <div className="grid" aria-label="Dashboard grid">
        {/* KPI cards */}
        {kpis.map((k) => (
          <section key={k.label} className="card" style={{ gridColumn: 'span 3' }} aria-live="polite">
            <h3>{k.label}</h3>
            <div className="stat">
              <div className="value" aria-label={`${k.label} value`}>{k.value}</div>
              <span className="badge" aria-label={`Change ${k.delta}`}>{k.delta}</span>
            </div>
          </section>
        ))}

        {/* Revenue line chart */}
        <section className="card" style={{ gridColumn: 'span 8' }}>
          <h3>Revenue (last 7 days)</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={revenue} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
                <XAxis dataKey="day" stroke="#9fb0c3" tickLine={false} axisLine={false} />
                <YAxis stroke="#9fb0c3" tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: '#203040', strokeWidth: 1 }} contentStyle={{ background: '#0b0f14', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10 }} />
                <Line type="monotone" dataKey="value" stroke="#52d6ff" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Channel performance */}
        <section className="card" style={{ gridColumn: 'span 4' }}>
          <h3>Top Channels</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={channels} margin={{ left: -10, right: 10, top: 8, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#9fb0c3" tickLine={false} axisLine={false} />
                <YAxis stroke="#9fb0c3" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#0b0f14', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#7aff9c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Geo split */}
        <section className="card" style={{ gridColumn: 'span 4' }}>
          <h3>Geo Split</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={geo} dataKey="value" nameKey="name" innerRadius={54} outerRadius={86} paddingAngle={3}>
                  {geo.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={24} />
                <Tooltip contentStyle={{ background: '#0b0f14', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Recent activity table */}
        <section className="card" style={{ gridColumn: 'span 8' }}>
          <h3>Recent Invoices</h3>
          <table className="table" role="table" aria-label="Recent invoices">
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Customer</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Trend</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.customer}</td>
                  <td>{r.amount}</td>
                  <td>
                    <span className="badge" style={{ color: r.status === 'Overdue' ? '#ff9da1' : undefined, background: r.status === 'Overdue' ? 'rgba(255,157,161,.1)' : undefined }}>
                      {r.status}
                    </span>
                  </td>
                  <td><span className="spark" aria-hidden="true" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  )
}

export default App
