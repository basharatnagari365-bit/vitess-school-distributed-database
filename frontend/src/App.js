import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function App() {
  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({ school_id: '', school_name: '', city: '', total_students: '' });
  const [message, setMessage] = useState('');
  const [autoCount, setAutoCount] = useState(0);

  useEffect(() => {
    fetchSchools();
    const interval = setInterval(fetchSchools, 5000); // Auto refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await axios.get(`${API}/schools`);
      setSchools(res.data);
    } catch (err) {
      console.log('Waiting for backend...');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/schools`, {
        school_id: parseInt(form.school_id),
        school_name: form.school_name,
        city: form.city,
        total_students: parseInt(form.total_students),
      });
      setMessage(`✅ School ID ${form.school_id} added successfully!`);
      setForm({ school_id: '', school_name: '', city: '', total_students: '' });
      fetchSchools();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Error: Duplicate ID or connection issue');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // 🎲 AUTO GENERATE
  const generateRandomSchools = async () => {
    setMessage('⏳ Generating 5 random schools across shards...');
    const cities = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Multan', 'Quetta', 'Rawalpindi', 'Faisalabad'];
    const prefixes = ['International', 'City', 'Modern', 'National', 'Progressive', 'Excellence', 'Foundation', 'Campus', 'Elite', 'Premier'];
    const suffixes = ['School', 'Academy', 'Grammar School', 'Public School', 'College', 'High School', 'Model School'];

    let added = 0;
    for (let i = 0; i < 5; i++) {
      const school_id = Math.floor(Math.random() * 900) + 100;
      const city = cities[Math.floor(Math.random() * cities.length)];
      const name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
      const total_students = Math.floor(Math.random() * 3000) + 500;

      try {
        await axios.post(`${API}/schools`, { school_id, school_name: name, city, total_students });
        added++;
      } catch (err) {
        // Skip duplicates silently
      }
    }
    fetchSchools();
    setAutoCount(autoCount + 1);
    setMessage(`✅ ${added} new schools distributed across Shard 0 & Shard 1! Check terminal now! 🚀`);
    setTimeout(() => setMessage(''), 5000);
  };

  const styles = {
    container: { fontFamily: '"Segoe UI", Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', background: '#f5f7fa', minHeight: '100vh' },
    header: { background: 'linear-gradient(135deg, #1a73e8, #0d47a1)', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 15px rgba(26,115,232,0.3)' },
    subtitle: { fontSize: '14px', opacity: 0.9, marginTop: '5px' },
    statBar: { display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '15px' },
    statItem: { background: 'rgba(255,255,255,0.2)', padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' },
    buttonRow: { display: 'flex', gap: '15px', marginTop: '25px' },
    refreshBtn: { background: 'white', color: '#1a73e8', border: '2px solid #1a73e8', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', flex: 1, transition: '0.3s' },
    generateBtn: { background: 'linear-gradient(135deg, #0d904f, #07a33a)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', flex: 1, boxShadow: '0 4px 12px rgba(13,144,79,0.4)', transition: '0.3s' },
    columns: { display: 'flex', gap: '20px', marginTop: '25px' },
    card: { flex: 1, border: '1px solid #e0e0e0', borderRadius: '10px', padding: '18px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    cardHeader: { borderBottom: '2px solid #1a73e8', paddingBottom: '10px', marginBottom: '12px', fontSize: '16px', fontWeight: 'bold', color: '#1a73e8' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th: { background: '#f5f7fa', padding: '10px 8px', textAlign: 'left', border: '1px solid #e0e0e0', fontWeight: 'bold', color: '#555' },
    td: { padding: '8px', border: '1px solid #e0e0e0', color: '#333' },
    formCard: { background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e0e0e0', marginTop: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    input: { flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', outline: 'none' },
    submitBtn: { background: 'linear-gradient(135deg, #1a73e8, #1557b0)', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', width: '100%', marginTop: '10px', boxShadow: '0 4px 12px rgba(26,115,232,0.3)' },
    message: { padding: '12px', marginTop: '15px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', background: '#e8f5e9', color: '#0d904f', fontSize: '14px' },
    shardBadge0: { display: 'inline-block', background: '#e8f5e9', color: '#0d904f', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', marginLeft: '5px' },
    shardBadge1: { display: 'inline-block', background: '#fce4ec', color: '#c62828', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', marginLeft: '5px' },
  };

  const recentSchools = schools.slice(-10); // Last 10 for main view

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{margin:0, fontSize:'28px'}}>🏫 Distributed School Database</h1>
        <p style={styles.subtitle}>Vitess + MySQL — Cloud-Native Sharded Architecture</p>
        <div style={styles.statBar}>
          <span style={styles.statItem}>📊 Total Schools: {schools.length}</span>
          <span style={styles.statItem}>🟢 Shard 0: Running</span>
          <span style={styles.statItem}>🔴 Shard 1: Running</span>
          <span style={styles.statItem}>⚡ Auto-Refresh: 5s</span>
        </div>
      </div>

      <div style={styles.buttonRow}>
        <button style={styles.refreshBtn} onClick={fetchSchools}>🔄 Refresh Now</button>
        <button style={styles.generateBtn} onClick={generateRandomSchools}>🎲 Generate 5 Random Schools</button>
      </div>

      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.columns}>
        {/* VTGate View */}
        <div style={{...styles.card, flex: 1.5}}>
          <div style={styles.cardHeader}>
            📊 Application View (VTGate — Port 15306)
            <span style={{float:'right', fontSize:'12px', color:'#666'}}>All Queries Routed Automatically</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr><th style={styles.th}>ID</th><th style={styles.th}>School Name</th><th style={styles.th}>City</th><th style={styles.th}>Students</th></tr>
            </thead>
            <tbody>
              {recentSchools.map(s => (
                <tr key={s.school_id}>
                  <td style={styles.td}><b>{s.school_id}</b></td>
                  <td style={styles.td}>{s.school_name}</td>
                  <td style={styles.td}>{s.city}</td>
                  <td style={styles.td}>{s.total_students}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{marginTop:'12px', textAlign:'center', color:'#1a73e8', fontWeight:'bold'}}>
            Showing {recentSchools.length} of {schools.length} schools
          </div>
        </div>

        {/* Architecture Info */}
        <div style={{flex: 1}}>
          <div style={{...styles.card, marginBottom: '15px', borderLeft: '5px solid #0d904f'}}>
            <div style={styles.cardHeader}>🗄️ Shard 0 <span style={styles.shardBadge0}>PRIMARY</span></div>
            <p style={{fontSize:'12px',color:'#666', margin:'5px 0'}}>🐬 MySQL Port: <b>3306</b></p>
            <p style={{fontSize:'12px',color:'#666', margin:'5px 0'}}>📱 vttablet: <b>15100</b></p>
            <p style={{fontSize:'12px',color:'#666', margin:'5px 0'}}>📁 /var/lib/vitess_shard0</p>
          </div>

          <div style={{...styles.card, marginBottom: '15px', borderLeft: '5px solid #c62828'}}>
            <div style={styles.cardHeader}>🗄️ Shard 1 <span style={styles.shardBadge1}>PRIMARY</span></div>
            <p style={{fontSize:'12px',color:'#666', margin:'5px 0'}}>🐬 MySQL Port: <b>3307</b></p>
            <p style={{fontSize:'12px',color:'#666', margin:'5px 0'}}>📱 vttablet: <b>15101</b></p>
            <p style={{fontSize:'12px',color:'#666', margin:'5px 0'}}>📁 /var/lib/vitess_shard1</p>
          </div>

          <div style={{...styles.card, borderLeft: '5px solid #fbbc04', background: '#fffef5'}}>
            <div style={styles.cardHeader}>ℹ️ Architecture Stack</div>
            <p style={{fontSize:'11px',color:'#555',lineHeight:'2', margin:'5px 0'}}>
              🖥️ <b>React</b> :3000<br/>
              🔧 <b>Flask API</b> :5000<br/>
              🚪 <b>VTGate</b> :15306<br/>
              ⚙️ <b>vttablet x2</b> :15100/15101<br/>
              🐬 <b>MySQL x2</b> :3306/3307<br/>
              📚 <b>etcd</b> :2379<br/>
              🎛️ <b>vtctld</b> :15000
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={styles.formCard}>
        <h3 style={{marginBottom:'15px', color:'#333'}}>➕ Add School Manually (Auto-Routed to Shard)</h3>
        <form onSubmit={handleSubmit}>
          <div style={{display:'flex', gap:'10px'}}>
            <input style={styles.input} type="number" placeholder="School ID (e.g., 500)" value={form.school_id} onChange={e => setForm({...form, school_id: e.target.value})} required />
            <input style={styles.input} type="text" placeholder="School Name" value={form.school_name} onChange={e => setForm({...form, school_name: e.target.value})} required />
            <input style={styles.input} type="text" placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
            <input style={styles.input} type="number" placeholder="Total Students" value={form.total_students} onChange={e => setForm({...form, total_students: e.target.value})} required />
          </div>
          <button style={styles.submitBtn} type="submit">⚡ Add School (Vitess Routes to Correct Shard)</button>
        </form>
      </div>
    </div>
  );
}

export default App;
