import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX, FiClock } from "react-icons/fi";
import { api } from "../../services/api";
import { useToast } from "../../Components/Toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function JourneyManager() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const [form, setForm] = useState({
    year: '',
    month: '',
    era: '',
    headline: '',
    body: '',
    photoLabel: '',
    stat: { val: '', lbl: '' },
    tags: '',
    color: '#f05a28',
    side: 'right',
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadMilestones();
  }, []);

  const loadMilestones = async () => {
    try {
      setLoading(true);
      const data = await api.getJourney();
      setMilestones(data);
    } catch (err) {
      addToast("Failed to load journey milestones", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        tags: form.tags.toString()
      };

      if (editId) {
        await api.updateJourney(editId, data, imageFile);
        addToast("Milestone updated successfully", "success");
      } else {
        await api.addJourney(data, imageFile);
        addToast("Milestone added successfully", "success");
      }
      setShowModal(false);
      resetForm();
      loadMilestones();
    } catch (err) {
      addToast(err.message || "Operation failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (m) => {
    setEditId(m._id);
    setForm({
      year: m.year,
      month: m.month,
      era: m.era,
      headline: m.headline,
      body: m.body,
      photoLabel: m.photoLabel || '',
      stat: m.stat || { val: '', lbl: '' },
      tags: m.tags ? m.tags.join(', ') : '',
      color: m.color || '#f05a28',
      side: m.side || 'right',
      order: m.order || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      try {
        await api.deleteJourney(id);
        addToast("Milestone deleted", "success");
        loadMilestones();
      } catch (err) {
        addToast("Delete failed", "error");
      }
    }
  };

  const resetForm = () => {
    setForm({
      year: '',
      month: '',
      era: '',
      headline: '',
      body: '',
      photoLabel: '',
      stat: { val: '', lbl: '' },
      tags: '',
      color: '#f05a28',
      side: 'right',
      order: 0
    });
    setImageFile(null);
    setEditId(null);
  };

  return (
    <div className="admin-journey-manager">
      <div className="admin-header">
        <div className="admin-header-info">
          <FiClock className="admin-header-icon" />
          <div>
            <h2>Our Journey</h2>
            <p>Manage timeline milestones</p>
          </div>
        </div>
        <button className="admin-add-btn" onClick={() => { resetForm(); setShowModal(true); }}>
          <FiPlus /> Add Milestone
        </button>
      </div>

      <div className="admin-content-grid">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Year/Month</th>
                  <th>Era</th>
                  <th>Headline</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m) => (
                  <tr key={m._id}>
                    <td>
                      <strong>{m.year}</strong>
                      <br />
                      <small>{m.month}</small>
                    </td>
                    <td><span className="admin-badge" style={{ background: m.color + '20', color: m.color }}>{m.era}</span></td>
                    <td>{m.headline}</td>
                    <td>{m.order}</td>
                    <td className="admin-actions">
                      <button className="admin-edit-btn" onClick={() => handleEdit(m)}><FiEdit /></button>
                      <button className="admin-delete-btn" onClick={() => handleDelete(m._id)}><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editId ? "Edit Milestone" : "Add Milestone"}</h3>
              <button onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Year</label>
                  <input type="text" value={form.year} onChange={e => setForm({...form, year: e.target.value})} required placeholder="e.g. 2020" />
                </div>
                <div className="form-group">
                  <label>Month Text</label>
                  <input type="text" value={form.month} onChange={e => setForm({...form, month: e.target.value})} required placeholder="e.g. March 2020" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Era Name</label>
                  <input type="text" value={form.era} onChange={e => setForm({...form, era: e.target.value})} required placeholder="e.g. The Founding" />
                </div>
                <div className="form-group">
                  <label>Display Side</label>
                  <select value={form.side} onChange={e => setForm({...form, side: e.target.value})}>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Headline</label>
                <input type="text" value={form.headline} onChange={e => setForm({...form, headline: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description (Body)</label>
                <textarea value={form.body} onChange={e => setForm({...form, body: e.target.value})} required rows={3} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Stat Value</label>
                  <input type="text" value={form.stat.val} onChange={e => setForm({...form, stat: {...form.stat, val: e.target.value}})} placeholder="e.g. 500+" />
                </div>
                <div className="form-group">
                  <label>Stat Label</label>
                  <input type="text" value={form.stat.lbl} onChange={e => setForm({...form, stat: {...form.stat, lbl: e.target.value}})} placeholder="e.g. Projects" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="tag1, tag2" />
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input type="color" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Photo Label</label>
                  <input type="text" value={form.photoLabel} onChange={e => setForm({...form, photoLabel: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-cancel-btn">Cancel</button>
                <button type="submit" className="admin-submit-btn" disabled={saving}>
                  {saving ? "Saving..." : <><FiSave /> Save Milestone</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
