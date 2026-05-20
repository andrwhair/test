import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import TreeCompareV2 from './components/tree-compare-v2'
import TreeCompareV3 from './components/tree-compare-v3'

const basename = process.env.PUBLIC_URL || ''

const homeStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  maxWidth: 800,
  margin: '40px auto',
  padding: '0 24px',
}

const cardStyle = {
  display: 'block',
  padding: '20px 24px',
  marginBottom: 12,
  border: '1px solid #ddd',
  borderRadius: 8,
  textDecoration: 'none',
  color: '#1a1a1a',
  background: '#fff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
}

const titleStyle = {
  fontSize: 18,
  fontWeight: 600,
  margin: '0 0 4px',
}

const descStyle = {
  fontSize: 14,
  color: '#666',
  margin: 0,
}

const backStyle = {
  display: 'inline-block',
  marginBottom: 20,
  fontSize: 14,
  color: '#0070f3',
  textDecoration: 'none',
}

function HomePage() {
  return (
    <div style={homeStyle}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Andrew's Prototype Sandbox</h1>
      <p style={{ color: '#555', marginBottom: 32 }}>Fast-iteration prototypes — no PR overhead required.</p>

      <h2 style={{ fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', marginBottom: 12 }}>
        Tree Compare
      </h2>

      <Link to="/tree-compare/v2" style={cardStyle}>
        <p style={titleStyle}>Tree Compare — V2</p>
        <p style={descStyle}>Side-by-side tree comparison (Andrew Hair as focus person)</p>
      </Link>

      <Link to="/tree-compare/v3" style={cardStyle}>
        <p style={titleStyle}>Tree Compare — V3</p>
        <p style={descStyle}>Side-by-side tree comparison (Wendy Sheley as focus person)</p>
      </Link>
    </div>
  )
}

function PrototypePage({ title, children }) {
  return (
    <div>
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
        <Link to="/" style={backStyle}>← Back to sandbox</Link>
        <span style={{ fontSize: 14, color: '#999', marginLeft: 8 }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function App() {
  return (
    <Router basename={basename}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/tree-compare/v2" render={() => (
          <PrototypePage title="Tree Compare V2">
            <TreeCompareV2 />
          </PrototypePage>
        )} />
        <Route path="/tree-compare/v3" render={() => (
          <PrototypePage title="Tree Compare V3">
            <TreeCompareV3 />
          </PrototypePage>
        )} />
      </Switch>
    </Router>
  )
}

export default App
